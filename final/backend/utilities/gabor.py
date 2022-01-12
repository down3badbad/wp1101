# Gabor Transform
from scipy.io import wavfile
from scipy.io.wavfile import write
import numpy as np
import math
import matplotlib.pyplot as plt
import cmath
import scipy.fftpack
# import pyfftw
import time

def Gabor(x, tau, t, f, sgm):
	start_time = time.time()

	dt = t[1]-t[0]
	dtau = tau[1] - tau[0]

	df = f[1] - f[0]
	S = round(dt/dtau)
	c0 = int(t[0])
	m0 = int(f[0])
	n0 = int(tau[0])

	C = int(t[-1]/dt -c0+1)
	F = int(f[-1]/df -m0+1)
	T = int(tau[-1]/dtau - n0 + 1)
	X = np.zeros((F,C), dtype=complex)

	N = int(1/(df*dtau))
	B = 1.9143/(sgm**0.5)
	Q = int(B/dtau)

	for n in range(c0,c0+C-1):
		x1 = np.zeros((1,N+1), dtype=complex)
		# x1 = pyfftw.empty_aligned(N+1, dtype='complex128')

		for q in range(0,int(2*Q)):
			if (n*S-Q+q >= 0) and (n*S-Q+q <= len(tau)-1):
				x1[0,q] = math.exp(-sgm* math.pi* ((Q-q)* dtau)**2)* x[int(n*S-Q+q)]
				# print(x1[0,q])

		# print('doing fft')
		# X1 = np.fft.fft(x1)
		X1 = scipy.fftpack.fft(x1)
		# X1 = pyfftw.interfaces.numpy_fft.fft(x1)
		# print('done fft1')

		for m in f:
			X[m-m0,n] = X1[0,m%N]* cmath.exp(0 + 2j* math.pi* (Q-n*S) * m/N)* dt

	X = sgm**(1/4) * X
	print(f"total execute time: {round(time.time()-start_time,2)}")

	return X, F, C

def Gabor_preprocess(data, fs, lowerBound_freq, upperBound_freq, sgm):
	if (len(data.shape) != 1):
		data = data[:,0]


	dtau = 1/fs	
	tau = np.empty([round(len(data)/fs/dtau)], dtype=float)
	for i in range(round(len(data)/fs/dtau)):
		tau[i] = i * dtau

	dt = 0.01
	df = 1

	total_seconds = round(len(tau)/fs,1)

	t = np.arange(0, round(max(tau)/dt), dtype=float)
	# print(type(t[0]))
	# print(type(dt))
	t *= dt
	lowerBound_freq, upperBound_freq = 0, 2000
	f = np.arange(lowerBound_freq, upperBound_freq, df)
	sgm = 200

	return data, tau, t, f


# if __name__ == '__main__':
# 	fs, data = wavfile.read('../../Chord.wav')
# 	print('read data...')

# 	fs, lowerBound_freq, upperBound_freq, sgm = 44100, 0, 2000, 200
# 	[data, tau, t, f] = Gabor_preprocess(data, fs, lowerBound_freq, upperBound_freq, sgm)
# 	print('preprocessing..')

# 	print('doing gabor transform...')
# 	y, row, col = Gabor(data, tau, t, f, sgm)

# 	horizontal_scale_forPlot = 8
# 	y1 = np.zeros((len(f),len(t)*horizontal_scale_forPlot), dtype=complex)

# 	for n in range(0,len(t)):
# 	    for k in range(n*horizontal_scale_forPlot, (n+1)*horizontal_scale_forPlot-1):
# 	        y1[:,k] = y[:,n]

# 	normalize = np.max(np.abs(y))
# 	plt.imshow(np.abs(y1)/normalize, cmap='gray', origin='lower')
# 	plt.xlabel('Time (sec)')
# 	plt.ylabel('Frequency (Hz)')
# 	plt.show()
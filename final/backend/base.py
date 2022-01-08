from flask import Flask, render_template, redirect, url_for, request, make_response, send_file, send_from_directory
from flask_cors import CORS
import cv2
from PIL import Image
import base64
import numpy as np
from scipy.io.wavfile import write
from utilities.gabor import Gabor, Gabor_preprocess
import librosa
import io
import json
from utilities.noise_filter import noise_reduction, sound_enhancement

def audio_preprocess(data):
    if (len(data.shape) != 1):
        data = data[:,0]
    return data


api = Flask(__name__)
CORS(api)

@api.route('/api/TF-spectrum', methods=['POST'])
def TF_spectrum():
    files = request.files # can check other request parameters: request.args, request.form
    files_dict = files.to_dict()
    audio = files_dict.get('file')
    audio = np.fromstring(audio.read(), np.int16)

    fs, lowerBound_freq, upperBound_freq, sgm = 44100, 0, 2000, 200
    [audio, tau, t, f] = Gabor_preprocess(audio, fs, lowerBound_freq, upperBound_freq, sgm)

    print('doing gabor transform...')
    tf_spectrum, row, col = Gabor(audio, tau, t, f, sgm)

    print('done, send back the response of an image')
    tf_spectrum = np.abs(tf_spectrum)
    tf_spectrum = 255*tf_spectrum/ np.max(tf_spectrum)

    img1 = Image.fromarray(tf_spectrum)
    img1 = img1.convert('RGB')
    img1.save('temp.jpg')

    # return output image
    img = cv2.imread("temp.jpg")
    img = cv2.flip(img, 0) # flip upside down
    retval, buffer = cv2.imencode('.jpg', img)
    buffer_string = base64.b64encode(buffer)
    buffer_string = buffer_string.decode('utf-8')

    response = {
        "img" : buffer_string,
    }
    return response

@api.route('/api/speed-adjustment', methods=['POST'])
def speed_adjustment():
    files = request.files # can check other request parameters: request.args, request.form
    files_dict = files.to_dict()
    audio = files_dict.get('file')
    audio = np.fromstring(audio.read(), np.int16)
    audio = audio.astype(np.float)

    test_audio = np.int16(audio/np.max(np.abs(audio)) * 32767)
    write('wtf.wav', 22050, test_audio)

    forms = request.form
    forms_dict = forms.to_dict()
    speed = forms_dict.get('speed')
    speed = float(speed)
    print(speed)

    data = audio_preprocess(audio)
    new_data = librosa.effects.time_stretch(data, speed)
    scaled_audio = np.int16(new_data/np.max(np.abs(new_data)) * 32767)
    write('temp.wav', 22050, scaled_audio)

    with open("temp.wav","rb") as binary_file:
        data = binary_file.read()
        wav_file = base64.b64encode(data).decode('UTF-8')

    data1 = {"snd": wav_file}
    res = api.response_class(response=json.dumps(data1), status=200, mimetype='application/json')

    return res

@api.route('/api/reduction-enhancement', methods=['POST'])
def reduction_enhancement():
    files = request.files # can check other request parameters: request.args, request.form
    files_dict = files.to_dict()
    audio = files_dict.get('file')
    audio = np.fromstring(audio.read(), np.int16)

    forms = request.form
    form_dict = forms.to_dict()
    mode = form_dict.get('mode')
    intervalSize = int(form_dict.get('intervalSize')) # this is L (filter length)
    decaySpeed = float(form_dict.get('decaySpeed')) # this is sigma
    print(decaySpeed)

    if (mode == "reduction"):
        new_data = noise_reduction(audio, intervalSize, decaySpeed)
    elif (mode == "enhancement"):
        new_data = sound_enhancement(audio, intervalSize, decaySpeed)

    scaled_audio = np.int16(new_data/np.max(np.abs(new_data)) * 32767)
    write('temp.wav', 22050, scaled_audio)

    with open("temp.wav","rb") as binary_file:
        data = binary_file.read()
        wav_file = base64.b64encode(data).decode('UTF-8')

    data1 = {"snd": wav_file}
    res = api.response_class(response=json.dumps(data1), status=200, mimetype='application/json')

    return res
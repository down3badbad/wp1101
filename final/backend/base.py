from flask import Flask, request
from flask_cors import CORS
import cv2
from PIL import Image
import base64
import numpy as np
from scipy.io.wavfile import write
import librosa
# import io
import json
# import pydub
import os
# import audio2numpy as a2n 
# import sounddevice as sd
from utilities.gabor import Gabor, Gabor_preprocess
from utilities.noise_filter import noise_reduction, sound_enhancement


current_path = os.getcwd()
current_path = current_path.replace("\\", "\\\\") + "\\\\"

def audio_preprocess(data):
    if (len(data.shape) != 1):
        data = data[:,0]
    return data


api = Flask(__name__)
CORS(api)

# api.config["MONGO_URI"] = "mongodb+srv://edo0419:<Npc991216>@webprogdb.3lx9o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
# mongo = PyMongo(api)
# user_collection = mongo.db.list_collection_names()
# print(user_collection)
# print("Connected to db!")


# client = pymongo.MongoClient("mongodb+srv://edo0419:<Npc991216>@webprogdb.3lx9o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
# db = client.list_database_names()
# print(db)


@api.route('/api/TF-spectrum', methods=['POST'])
def TF_spectrum():
    files = request.files # can check other request parameters: request.args, request.form
    files_dict = files.to_dict()
    audio = files_dict.get('file')
    audio = audio.read()
    while (len(audio)%16 != 0):
        audio += b'\x00'
    audio = np.fromstring(audio, np.int16)

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
    audio = audio.read()
    while (len(audio)%16 != 0):
        audio += b'\x00'
    audio = np.fromstring(audio, np.int16)
    audio = audio.astype(np.float32)

    forms = request.form
    forms_dict = forms.to_dict()
    speed = float(forms_dict.get('speed'))
    timeDuration = float(forms_dict.get('timeDuration'))

    fs = int(audio.shape[0]/timeDuration)

    # to test if the audio passed from frontend is correct:
    # test_audio = audio.astype(np.int16)
    # test_audio = np.int16(test_audio/np.max(np.abs(test_audio)) * 32767)
    # ori_song = pydub.AudioSegment(test_audio.tobytes(), frame_rate=fs, sample_width=2, channels=1) # sample_width = 2 is for 16-bits
    # ori_song.export(current_path+'original.mp3', format="mp3")

    data = audio_preprocess(audio)
    new_data = librosa.effects.time_stretch(data, speed)

    new_data = new_data.astype(np.int16) # type cast back to int16
    scaled_audio = np.int16(new_data/np.max(np.abs(new_data)) * 32767) #32767

    # for write .wav:
    write('processed.wav', fs, scaled_audio)
    with open("processed.wav","rb") as binary_file:
        data = binary_file.read()
        audio_file = base64.b64encode(data).decode('UTF-8')

    data1 = {"snd": audio_file}
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
    timeDuration = float(form_dict.get('timeDuration'))

    fs = int(audio.shape[0]/timeDuration)

    if (mode == "reduction"):
        new_data = noise_reduction(audio, intervalSize, decaySpeed)
    elif (mode == "enhancement"):
        new_data = sound_enhancement(audio, intervalSize, decaySpeed)

    scaled_audio = np.int16(new_data/np.max(np.abs(new_data)) * 32767)
    write('temp.wav', fs, scaled_audio)

    with open("temp.wav","rb") as binary_file:
        data = binary_file.read()
        wav_file = base64.b64encode(data).decode('UTF-8')

    data1 = {"snd": wav_file}
    res = api.response_class(response=json.dumps(data1), status=200, mimetype='application/json')

    return res

@api.route('/api/login', methods=['POST'])
def validate_login():
    isUser = False
    forms = request.form
    form_dict = forms.to_dict()
    user = form_dict.get('user')
    psw = form_dict.get('psw')

    print(user, psw)

    if(user == "admin" and psw == "wpwpwp"):
        isUser = True

    response = {
        "validate" : isUser,
    }

    return response
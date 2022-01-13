## WP1101 Final Project

### member:
- 王譽凱b07901122
- 顔子鈞b07901133
- 鍾淳鎰r08921078


after you have git clone the directory "/final", there will be 2 main subdirectories:  
"/final/frontend/" and "/final/backend", which our frontend work and backend work is separated.

## Frontend

### How to run
1. first, cd to "/final/frontend"

2. Type ```yarn``` in your cmd to install all the packages included in ```package.json```

3. Type ```yarn start``` and enjoy, the service is on ```localhost:3000/```

4. Please use the combination provided below to login: 
- username: admin
- password: wp1101

## Backend

### Setting up environment

1. first, cd to "/final/backend"

2. libraries/framework required:
- flask (Version: 2.0.2)
- flask-cors (Version: 3.0.10)
- flask-mongoengine (Version: 1.0.0)
- librosa (Version: 0.8.1)
- opencv-python (Version: 4.2.0.32)
- pillow (Version: 6.2.1)
- scipy (Version: 1.4.0)
- matplotlib (Version: 3.0.3)
- numpy (Version: 1.16.2) *(this will affect opencv-python, librosa, scipy, matplotlib. strongly suggest you to get the specified version!)*  
  
**you can just do it in a one liner:**
```pip install flask flask-cors flask-mongoengine opencv-python pillow numpy scipy librosa matplotlib```  
  
**or using the version specified command:**
```pip install flask==2.0.2 flask-cors==3.0.10 flask-mongoengine==1.0.0 librosa==0.8.1 opencv-python==4.2.0.32 pillow==6.2.1 scipy==1.4.0 matplotlib==3.0.3 numpy==1.16.2```

### How to run 

1. first, cd to "/final/backend/"

2. use the command line: ```flask run```, and wait for a while. You may see something like this getting printed on cmd:  
   ```connecting to Database, please wait for awhile...```

3. You may also experience ```* Restarting with stat```, it's ok and please wait.

4. finally, you will see:  
    ```
    successfully connect to mongoDB atlas!  
    retrieve all existed user's information! ready to server LogIn page!
    ```
    this indicates that the backend (apis) is ready to served at ```localhost:5000/```

5. Done, you may go to log in page to try out our work!

## Database

- We use MongoDB Atlas as our database. The account is from student **b0790113顏子鈞**
- All the password stored in db is encrypted, such as:  
![alt text](./mongodb.JPG?raw=true)


## 每位組員之負責項目
### b07901122
- 我在這個final project負責的項目為所有前端的開發以及前端與後端溝通API的部分。
- 因爲我們處理的是圖像、音檔等多媒體資料，因此需要對傳輸進來的資料進行base64的decode才能進行使用。
- 由於考量到使用者可能不會預先準備wav音檔，因此有准備一些example的音檔讓使用者去進行操作。
- 所有在前端操作后的結果都會有新的component顯示出來/或被更新，使用者可以選擇是否下載相應的結果。
- 登入的部分會提供一組提前准備好的賬號供使用者體驗，也會把使用者以前進行過的五筆資料從db拿回來顯示在前端，讓使用者下載結果。
  

### b07901133
- 我負責所有的backend和database的部分。因為我們此次的後台演算法需要比較intense的數字運算，而恰好js不擅長做這種工作，
而python有numpy這樣的工具，因此backend的語言是用python，然後api則是用flask來寫。
- 處理frontend api傳給我的參數，我會把計算好的結果encode成base64的string來回傳給frontend，讓他在前端decode。
- 計算好的結果也要存一份在DB上。而從DB retrieve 結果下來也是要先經過decode才能用。
- 而需要處理3大功能的演算法，我是透過修 ***丁建均老師的時頻分析與小波轉換*** 學到的，簡單來說就是 ***Gabor Transform, chipmunk effect, phase vocoder, even/odd gaussian filter***
- 然後我幫忙美化一些frontend的設計。
  
  
### r08921078
- 暫時無。
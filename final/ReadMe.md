## WP1101 Final Project

### member:
- b07901122
- b07901133
- r08921078


after you have git pull the directory "/final", there will be 2 main subdirectories:
"/final/frontend/" and "/final/backend", which our frontend work and backend work is separated.

## Frontend

### How to run
1. first, cd to "/final/frontend"

2. Type ```yarn``` in your cmd to install all the packages included in ```package.json```

3. Type ```yarn start``` and enjoy, the service is on ```localhost:3000/```

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

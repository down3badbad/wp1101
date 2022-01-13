## WP1101 Final Project

### member:
- b07901122
- b07901133
- r08921078

- after you have git pull the directory "/final", there will be 2 main subdirectories:
- "/final/frontend/" and "/final/backend", which our frontend work and backend work is separated.

## Backend

### Setting up environment

1. first, cd to "/final/backend"

2. libraries/framework required:
- flask
- flask-cors
- flask-mongoengine
- opencv-python
- pillow
- numpy
- scipy
- librosa
- matplotlib
- **or you can just do it in a one liner:**

```pip install flask flask-cors flask-mongoengine opencv-python pillow numpy scipy librosa matplotlib```

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

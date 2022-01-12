import { createContext, useContext, useState } from 'react';
import axios from '../api';

const AuthProvider = (props) => {
    const [isLogin, setisLogin] = useState(false);
    const [username, setUsername] = useState("");

    const p1 = "TF-spectrum";
    const p2 = "Speed-adjustment";
    const p3_a = "Reduction";
    const p3_b = "Enhancement";
    //Retrieve past data from db
    const [pastData1, setpastData1] = useState({ str: "", data: null, filename: ""});
    const [pastData2, setpastData2] = useState({ str: "", data: null, filename: ""});
    const [pastData3, setpastData3] = useState({ str: "", data: null, filename: ""});
    const [pastData4, setpastData4] = useState({ str: "", data: null, filename: ""});
    const [pastData5, setpastData5] = useState({ str: "", data: null, filename: ""});

    const setData = async (user) => {
      const formData = new FormData();  
      formData.append('user' ,user);
      const res = await axios.post('/api/retrieve', formData , {
        headers: {'Content-Type': 'multipart/form-data; '},
      });

      console.log(res.data)

      let index = 1;
      for (var key in res.data) {
        let tmp = "";
        if(res.data[key].operation === "1"){
          tmp += "Mode: " + p1;
          let converted_data = `data:image/jpg;base64,${res.data[key].data1}`;
          const update = { str: tmp, data: converted_data, filename: res.data[key].filename}
          if(index === 1) setpastData1(update);
          else if(index === 2) setpastData2(update);
          else if(index === 3) setpastData3(update);
          else if(index === 4) setpastData4(update);
          else setpastData5(update);
        }

        else if(res.data[key].operation === "2"){
          tmp += "Mode: " + p2 + "(" +  res.data[key].params + "x" + ")";
          let converted_data = `data:audio/mp3;base64,${res.data[key].data1}`;
          const update = { str: tmp, data: converted_data, filename: res.data[key].filename}
          if(index === 1) setpastData1(update);
          else if(index === 2) setpastData2(update);
          else if(index === 3) setpastData3(update);
          else if(index === 4) setpastData4(update);
          else setpastData5(update);
        }

        else{
          if(res.data[key].params === "reduction"){
            tmp += "Mode: " + p3_a;
            let converted_data = `data:audio/mp3;base64,${res.data[key].data1}`;
            const update = { str: tmp, data: converted_data, filename: res.data[key].filename}
            if(index === 1) setpastData1(update);
            else if(index === 2) setpastData2(update);
            else if(index === 3) setpastData3(update);
            else if(index === 4) setpastData4(update);
            else setpastData5(update);
          }
          else{
            tmp += "Mode: " + p3_b;
            let converted_data = `data:audio/mp3;base64,${res.data[key].data1}`;
            const update = { str: tmp, data: converted_data, filename: res.data[key].filename}
            if(index === 1) setpastData1(update);
            else if(index === 2) setpastData1(update);
            else if(index === 3) setpastData1(update);
            else if(index === 4) setpastData1(update);
            else setpastData5(update);
          }
        }
        index++;
      }
      
    }

    const setLogin = (val) => {
      setisLogin(val);
    }

    const setUser = (name) => {
      setUsername(name);
    }

    return (
        <AuthContext.Provider
          value={{
            isLogin,
            username,
            pastData1,
            pastData2,
            pastData3,
            pastData4,
            pastData5,
            setData,
            setLogin,
            setUser
          }}
          {...props}
        />
      );
}

const AuthContext = createContext({
    isLogin: false,
    username: "",
    pastData1: {},
    pastData2: {},
    pastData3: {},
    pastData4: {},
    pastData5: {},
    setData: ()=> {},
    setLogin: () => {},
    setUser: (user) => {},
  });

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };
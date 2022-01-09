import { createContext, useContext, useState } from 'react';

const BodyProvider = (props) => {
    const [currFunc, setcurrFunc] = useState("TF-spectrum");
    const [currNo, setcurrNo] = useState(0);
    
    const setFunc = (func) => {
        setcurrFunc(func);
    };

    const setNo = (no) => {
        setcurrNo(no);
    }

    return (
        <BodyContext.Provider
          value={{
            currFunc,
            currNo,
            setFunc,
            setNo
          }}
          {...props}
        />
      );
}

const BodyContext = createContext({
    currFunc: "",
    currNo: 0,
    setFunc: () => {},
    setNo: () => {},
  });

function useBody() {
    return useContext(BodyContext);
}

export { BodyProvider, useBody };
import './Mainpage.css'
import Header from './containers/Header'
import Title from './containers/Title'
import Body from './containers/Body';
import Body2 from './containers/Body2';
import Body3 from './containers/Body3';
import Login from './containers/Login';
import { useBody } from './hooks/useBody';
import { useAuth } from './hooks/useAuth';


function Mainpage(){
    const { currFunc } = useBody();
    const { isLogin } = useAuth();

    const Enter = (
        <div>
        <Header/>
        <Title/> 
        {currFunc == "TF-spectrum" ? <Body/> : (currFunc == "adjust-speed" ? <Body2/> : <Body3/>)}
        </div>
    );
    
    return (
        <>
        {isLogin == false ? <Login/> : Enter}
        </>
    )
}



export default Mainpage;
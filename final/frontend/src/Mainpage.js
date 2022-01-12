import './Mainpage.css'
import Header from './containers/Header'
import Title from './containers/Title'
import Body from './containers/Body';
import Body2 from './containers/Body2';
import Body3 from './containers/Body3';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import { useBody } from './hooks/useBody';
import { useAuth } from './hooks/useAuth';

function Mainpage(){
    const { currFunc } = useBody();
    const { isLogin } = useAuth();

    const Enter = (
        <div style ={{backgroundImage: `url(https://image.freepik.com/free-vector/sound-wave-black-digital-background-entertainment-technology_53876-116190.jpg`, height: "100vh"}}>
        <Header/>
        <Title/> 
        <Dashboard/>
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
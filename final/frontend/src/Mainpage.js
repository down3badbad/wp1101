import './Mainpage.css'
import Header from './containers/Header'
import Title from './containers/Title'
import Body from './containers/Body';
import Body2 from './containers/Body2';
import Body3 from './containers/Body3';



function Mainpage(){
    return (
        <>
        <Header/>
        <Title/> 
        {/* <Body/> */}
        {/* <Body2/> */}
        <Body3 />
        </>
    )
}



export default Mainpage;
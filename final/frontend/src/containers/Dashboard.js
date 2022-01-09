import { useState, useEffect } from 'react'
import './Dashboard.css';

export default function Dashboard() {
    const [item1, setItem1] = useState(null);
    const [item2, setItem2] = useState(null);
    const [item3, setItem3] = useState(null);
    const [item4, setItem4] = useState(null);
    const [item5, setItem5] = useState(null);

    return (
        <div className="container">
            <div className="items">
                <div className="items-head">
                <p>History (last 5 usages)</p>
                <hr/>
                </div>
                
                <div className="items-body">
                    <div className="items-body-content">
                        <div>{item1}</div>
                        <i className="fa fa-angle-right"></i>
                    </div>
                    <div className="items-body-content">
                        <div>{item2}</div>
                        <i className="fa fa-angle-right"></i>
                    </div>
                    <div className="items-body-content">
                        <div>{item3}</div>
                        <i className="fa fa-angle-right"></i>
                    </div>
                    <div className="items-body-content">
                        <div>{item4}</div>
                        <i className="fa fa-angle-right"></i>
                    </div>
                    <div className="items-body-content">
                        <div>{item5}</div>
                        <i className="fa fa-angle-right"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { useState, useEffect } from 'react'
import './Dashboard.css';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@mui/material';

export default function Dashboard() {
    const { pastData1, pastData2, pastData3, pastData4, pastData5 } = useAuth();

    return (
        <div className="container">
            <div className="items">
                <div className="items-head">
                <p>History (last 5 usages)</p>
                <hr/>
                </div>
                
                <div className="items-body">
                    <div className="items-body-content">
                        <div style = {{fontSize: "16px"}}>{pastData1.str}</div>
                        <a style = {{fontSize: "13px"}} href = {pastData1.data} download = {pastData1.filename}>{pastData1.filename}</a>
                        <i className="fa fa-angle-right"></i>
                    </div>
                    <div className="items-body-content">
                        <div style = {{fontSize: "16px"}}>{pastData2.str}</div>
                        <a style = {{fontSize: "13px"}} href = {pastData2.data} download = {pastData2.filename}>{pastData2.filename}</a>
                        <i className="fa fa-angle-right"></i>
                    </div>
                    <div className="items-body-content">
                        <div style = {{fontSize: "16px"}}>{pastData3.str}</div>
                        <a style = {{fontSize: "13px"}} href = {pastData3.data} download = {pastData3.filename}>{pastData3.filename}</a>
                        <i className="fa fa-angle-right"></i>
                    </div>
                    <div className="items-body-content">
                        <div style = {{fontSize: "16px"}}>{pastData4.str}</div>
                        <a style = {{fontSize: "13px"}} href = {pastData4.data} download = {pastData4.filename}>{pastData4.filename}</a>
                        <i className="fa fa-angle-right"></i>
                    </div>
                    <div className="items-body-content">
                        <div style = {{fontSize: "16px"}}>{pastData5.str}</div>
                        <a style = {{fontSize: "13px"}} href = {pastData5.data} download = {pastData5.filename}>{pastData5.filename}</a>
                        <i className="fa fa-angle-right"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
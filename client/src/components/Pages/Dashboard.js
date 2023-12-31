import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import list from '../../images/list.gif';
import appointment from '../../images/appointment.gif';
import axios from 'axios';


const Dashboard = () => {
    const [username, setUsername] = useState('')
    
    useEffect(() => {
        const token = localStorage.getItem('token')
    
        axios.post('https://pocketplanner-api.up.railway.app/user/getuser', { token: token })
            .then(response => {
            console.log(response.data);
            setUsername(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    })

    

    return (
        <div className='dashboard'>
            <h1 style={{'padding-top':'1%'}}>Hello {username}!</h1>
            <h1 className='welcome'>Welcome to PocketPlanner!</h1>
            <p>PocketPlanner is a planner / scheduler application which is targeted at students to help managed their time more effectively.</p>
            <p>PocketPlanner consists of 2 main components:
                <div className='components'>
                    <div className='todolist'>
                        <br></br>
                        1. A To-do List
                        <br></br>
                        <img src={list} width='200px' height='auto'></img>
                    </div>
                    <div className='scheduler'>
                        <br></br>
                        2. A Timetable Scheduler
                        <br></br>
                        <img src={appointment} width='225px' height='auto'></img>
                    </div>
                </div>
            </p>
            <footer>Happy planning!</footer>
        </div>
    );
};

export default Dashboard;
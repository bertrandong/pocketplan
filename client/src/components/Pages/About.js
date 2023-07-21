import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className='main_container'>
            <div className='odd_container'>
                <h1>About</h1>
            </div>
            <div className='even_container'>
                <h4 className='h4title'>Origin</h4>
                <p>Time management is a significant problem amongst students, especially those who stay in Halls of Residence. As Hall Residents, we know how busy a day can get as we navigate a wide range of academic, sporting and social activities. It is increasingly difficult to balance our responsibilities as the academic workload increases through the University years. There is much pressure to succeed academically and professionally, participate in Hall activities and maintain a social life.</p>
                <p>Having to split our time between social activities, events and meetings, there are additional time management challenges that require innovative and more interactive solutions to help manage our schedules better.</p>
            </div>
            <div className='odd_container'>
                <h4 className='h4title'>How to use?</h4>
                <ol>
                    <li>To Do List</li>
                    <ul>
                        <li>Create tasks to keep track what you need to do</li>
                        <li>Delete tasks upon completion</li>
                        <li>Edit tasks accordingly</li>
                    </ul>
                    <li>Calendar</li>
                    <ul>
                        <li>Plan out your day / week around your tasks</li>
                        <li>Select a date or time and add events to fill up your calendar!</li>
                        <li>See what your day looks like by viewing the 'Agenda' tab</li>
                    </ul>
                    <li>Analytics Page</li>
                    <ul>
                        <li>Track your progress and efficiency</li>
                        <li>Key in the required inputs and let it compute it for you</li>
                        <li>Know whether you are on track for the day!</li>
                    </ul>
                </ol>
            </div>
            <div className='even_container'>
                <h4 className='h4title'>Developers</h4>
                <p>CP2106 Independent Software Development Project (Orbital)</p>
                <p style={{'fontSize':'smaller'}}>Developed by Bertrand Ong (Y1 Computer Science) and Edwin Leck (Y1 Business Analytics) from the National University of Singapore</p>
            </div>
        </div>
    );
};

export default About;
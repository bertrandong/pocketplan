import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Analytics.css'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Analytics = () => {
    const [modal, setModal] = useState(false);
    const [intro, setIntro] = useState('')
    const [tasks, setTasks] = useState('0')
    const [left, setLeft] = useState('0')
    const [total, setTotal] = useState('0')
    const [completion, setCompletion] = useState('0')
    const [start, setStart] = useState(new Date())
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    const [avg, setAvg] = useState('')

    const handleChange = (e) => {
        const {name, value} = e.target
        
        if (name === 'tasks') {
            setTasks(value)
        } else {
            setTotal(value)
        }
    }

    const handleSave = () => {
        localStorage.setItem('tasks', tasks)
        localStorage.setItem('total', total)
        localStorage.setItem('start', start)

        setModal(false)
    }

    useEffect(() => {
        let tasks = localStorage.getItem('tasks')
        let total = localStorage.getItem('total')
        let start = localStorage.getItem('start')

        if (tasks !== null && total !== null && start !== null) {
            setTasks(tasks)
            setTotal(total)
            setStart(new Date(start))
        }
    }, [])

    useEffect(() => {
        const left = total - tasks
        setLeft(left)
    })

    useEffect(() => {
        const result = Math.round((tasks / total) * 100)
        setCompletion(result)
    })

    useEffect(() => {
        if (completion < 50) {
            setIntro('Time to get started...')
        } else if (completion > 75) {
            setIntro('Almost there!')
        } else if (isNaN(completion) || completion == Infinity) {
            setIntro('Enter inputs to track your progress!')
        } else {
            setIntro('Right on track, about halfway there!')
        }
    })

    useEffect(() => {
        let curr = moment()
        let timediff = moment(curr).diff(start, 'hours')
        setHours(timediff)
    })

    useEffect(() => {
        let curr = moment()
        let timediff = moment(curr).diff(start, 'minutes')
        let final = timediff % 60
        setMinutes(final)
    })

    useEffect(() => {
        let curr = moment()
        let timediff = moment(curr).diff(start, 'minutes')
        let average = Math.round(timediff / tasks)
    
        setAvg(average)
    })

    return (
        <main style={{'padding': '1%'}}>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet" />
            </head>
            <h1>Track today's progress:</h1>
            <p className='specialp' style={{'textAlign': 'center', 'padding-top':'1%'}}>{intro}</p>
            <button className='enterinputsbtn' onClick={() => setModal(true)}>Enter inputs</button>

            <Modal isOpen={modal} onRequestClose={() => setModal(false)}>
                <ModalHeader>Track your progress</ModalHeader>
                <ModalBody>
                    <div>
                        <label>Tasks accomplished</label>
                        <input onChange={handleChange} name='tasks' value={tasks} type='number'></input>
                    </div>
                    <div>
                        <label>Total number of tasks for today</label>
                        <input onChange={handleChange} name='total' value={total} type='number'></input>
                    </div>
                    <div>
                        <label>Start time</label>
                        <br></br>
                        <DatePicker showTimeSelect selected={start} onChange={(start) => setStart(start)} />
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button className='modalsave' onClick={handleSave}>Save</Button>
                </ModalFooter>
            </Modal>

            <div className='main_container'>
                <div className='infobox'>
                    <p className='specialp'>Number of tasks accomplished:<br></br>{tasks}</p>
                </div>
                <div className='infobox'>
                    <p className='specialp'>Number of tasks left:<br></br>{left}</p>
                </div>
                <div className='infobox'>
                    <p className='specialp'>Total number of tasks for today:<br></br>{total}</p>
                </div>


                <div className='infobox'>
                    <p className='specialp'>Completion rate:<br></br>{completion}%</p>
                </div>
                <div className='infobox'>
                    <p className='specialp'>Total duration:<br></br>{hours} hours {minutes} minutes</p>
                </div>
                <div className='infobox'>
                    <p className='specialp'>Average time taken to complete a task:<br></br>{avg} minutes</p>
                </div>
            </div>
        </main>
    );
};

export default Analytics;
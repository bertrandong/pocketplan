import React, {useEffect, useState} from 'react';
import CreateTask from './modals/CreateTask'
import Card from './Card';
import './TodoList.css';
import { v4 } from 'uuid';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])

    /*useEffect(() => {
        let arr = localStorage.getItem("taskList")

        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])*/

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')
            const response = await fetch('https://pocketplanner-api.railway.internal/api/todolist/getTasks', {
                method: 'POST',
                body: JSON.stringify({token: token}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()

            //let obj = JSON.parse(json)
            setTaskList(json)
        }

        fetchData()
    })


    const deleteTask = async (taskObj) => {
        const id = taskObj._id
        const response = await fetch('https://pocketplanner-api.railway.internal/api/todolist/' + id, {
            method: 'DELETE'
        })
        const json = await response.json();

        /*let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()*/
    }

    const updateListArray = async (taskArr, taskObj) => {
        const id = taskObj._id
        const response = await fetch('https://pocketplanner-api.railway.internal/api/todolist/' + id, {
            method: 'PATCH',
            body: JSON.stringify({taskName: taskArr['Name'], description: taskArr['Description'], date: taskArr['Duedate']}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()


        /*let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()*/
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = async (taskObj) => {
        try {
            const id = v4()
            const token = localStorage.getItem('token')
            const response = await fetch('https://pocketplanner-api.railway.internal/api/todolist/createTask', {
                method: 'POST',
                body: JSON.stringify({taskName: taskObj['Name'], description: taskObj['Description'], date: taskObj['Duedate'], token: token}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()

        /*let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)*/
        
        setModal(false)
    } catch (error) {
        throw error
    }
    }


    return (
        <>
            <div className = "title_container">
                <h3>Todo List</h3>
                <button className = "btn btn-primary mt-2" onClick = {() => setModal(true)}>Create Task</button>
            </div>
            <div className = "task-container">
            {taskList && taskList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
            </div>
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default TodoList;
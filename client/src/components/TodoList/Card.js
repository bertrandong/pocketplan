import React, {useState} from 'react';
import EditTask from './modals/EditTask'
import { BsFillTrash3Fill } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import moment from 'moment';

const Card = ({taskObj, index, deleteTask, updateListArray}) => {
    const [modal, setModal] = useState(false);

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateListArray(obj, index)
    }

    const handleDelete = () => {
        deleteTask(index)
    }

    return (
        <div class = "card-wrapper mr-5">
            <div class = "card-top" style={{"background-color": colors[index%5].primaryColor}}></div>
            <div class = "task-holder">
                <span class = "card-header" style={{"background-color": colors[index%5].secondaryColor, "border-radius": "10px", "height": "fit-content"}}>{taskObj.Name}</span>
                <p className = "mt-3">{taskObj.Description}</p>
                

                <div style={{"display": "flex", "position": "absolute", "right" : "20px", "bottom" : "1px"}}>
                    <p className = "mt-3" style={{'fontSize': '13px', 'margin-right': '52px'}}>Due: {moment(taskObj.Duedate).format('HH:mm, DD MMM, YYYY')}</p>
                    <AiOutlineEdit style={{"margin-right": "7px", "width": "15px", "height": "auto"}} onClick={() => setModal(true)} />
                    <BsFillTrash3Fill style={{"width": "15px", "height": "auto"}} onClick = {handleDelete} />
                </div>
        </div>
        <EditTask modal = {modal} toggle = {toggle} updateTask = {updateTask} taskObj = {taskObj}/>
        </div>
    );
};

export default Card;
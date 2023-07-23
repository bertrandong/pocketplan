import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCalendar,
    FaThList
} from "react-icons/fa";
import { ImExit } from 'react-icons/im'
import { NavLink } from 'react-router-dom';
import "./Sidebar.css";

const handleLogout = () => {
    if (localStorage.getItem('token') !== null) {
        localStorage.removeItem('token')
    }

    if (localStorage.getItem('tasks') !== null) {
        localStorage.removeItem('tasks')
    }

    if (localStorage.getItem('total') !== null) {
        localStorage.removeItem('total')
    }

    if (localStorage.getItem('start') !== null) {
        localStorage.removeItem('start')
    }
}

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/dashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/todopage",
            name:"To Do List",
            icon:<FaThList/>
        },
        {
            path:"/calendar",
            name:"Calendar",
            icon:<FaCalendar/>
        },
        {
            path:"/analytics",
            name:"Analytics",
            icon:<FaRegChartBar/>
        },
        {
            path:"/about",
            name:"About",
            icon:<FaUserAlt/>
        }
    ]

    return (
        <div className="sidebar-container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Menu</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none", "padding-top": "2px"}} className="iconlink_text">{item.name}</div>
                       </NavLink>
                   ))
               }
                <NavLink onClick={handleLogout} to='/' className="link" activeclassName="active">
                    <div className="icon"><ImExit/></div>
                    <div style={{display: isOpen ? "block" : "none", "padding-top": "2px"}} className="iconlink_text">Logout</div>
                </NavLink>
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;
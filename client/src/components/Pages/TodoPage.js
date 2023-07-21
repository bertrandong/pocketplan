import React from "react";
import TodoList from "../TodoList/TodoList";
import Sidebar from "../Sidebar";

function TodoPage() {
    return (
        <div>
            <h1 style={{'padding-top': '1%', 'padding-left':'1%'}}>To Do List!</h1>
            <TodoList />
        </div>
    );
};

export default TodoPage;
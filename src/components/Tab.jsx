import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Home from './Home';
import TodoList from './Todolist';


function TabApp() {

    const [value, setValue] = useState('home');

    const handleChange = (event, value) => {
        setValue(value);
    };



    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="home" label="Home" />
                <Tab value="todo" label="Todo list" />
            </Tabs>
            {value === 'home' && <Home />}
            {value === 'todo' && <TodoList />}
        </div>
    );
}

export default TabApp;
import Header from './Header.jsx';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import React, { useState, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



function TodoList() {
    const [todo, setTodo] = React.useState({
        description: '',
        date: '',
        priority: ''
    });

    const [todos, setTodos] = React.useState([]);
    const gridRef = useRef();

    const [columnDefs] = useState([
        {
            field: 'description',
            sortable: true,
            filter: true,
            floatingFilter: true
        },
        {
            field: 'priority',
            sortable: true,
            filter: true,
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' },
            floatingFilter: true
        },
        {
            field: 'date',
            sortable: true,
            filter: true,
            floatingFilter: true,

        }
    ]);

    const [dateValue, setDateValue] = React.useState(null);

    const changeDate = (newDateValue) => {
        setDateValue(newDateValue);
    }

    const addTodo = () => {
        const newTodo = { ...todo, date: dateValue?.format('YYYY-MM-DD') };
        setTodos([...todos, newTodo]);
        setTodo({ description: '', priority: '', date: '' });
        setDateValue(null);
    }

    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            const row = gridRef.current.getSelectedNodes()[0].id;
            setTodos(todos.filter((item, index) => row != index));
        }
        else {
            alert('Select at least one row');
        }
    }

    return (

        <Container>

            <Header />
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center"
                mt={2}>

                <TextField
                    label="Description"
                    value={todo.description}
                    onChange={e => setTodo({ ...todo, description: e.target.value })}
                />

                <TextField
                    label="Priority"
                    value={todo.priority}
                    onChange={e => setTodo({ ...todo, priority: e.target.value })}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={dateValue}
                        format='DD.MM.YYYY'
                        onChange={(newDateValue) => changeDate(newDateValue)}
                    />
                </LocalizationProvider>

                <Button onClick={addTodo} variant="contained">Add on the list</Button>
                <Button onClick={deleteTodo} variant="contained" color="error">Delete</Button>
            </Stack>

            <Stack
                alignItems="center"
                justifyContent="center">
                <div className='ag-theme-material' style={{ width: 600, height: 500 }}>
                    <AgGridReact
                        ref={gridRef}
                        onGridReady={params => gridRef.current = params.api}
                        rowSelection='single'
                        animateRows={true}
                        columnDefs={columnDefs}
                        rowData={todos}
                    />
                </div>
            </Stack>
        </Container>

    )
}

export default TodoList;
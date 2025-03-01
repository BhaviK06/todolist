import { useState } from 'react';
import { Todo } from '../types';
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function Todolist() {
    const [todo, setTodo] = useState<Todo>({ description: '', duedate: '', priority: '' });
    const [todos, setTodos] = useState<Todo[]>([]);

    const columnDefs: ColDef[] = [
        {
            field: "description",
            filter: "agTextColumnFilter", // Ensure the correct filter type
            floatingFilter: true, // Enable floating filter
        },
        {
            field: "duedate",
            filter: "agDateColumnFilter", // Set date filter for due date
            floatingFilter: true, // Enable floating filter
            filterParams: {
                comparator: (filterLocalDateAtMidnight: any, cellValue: string) => {
                    const cellDate = new Date(cellValue);
                    if (filterLocalDateAtMidnight < cellDate) {
                        return -1;
                    }
                    if (filterLocalDateAtMidnight > cellDate) {
                        return 1;
                    }
                    return 0;
                },
            },
        },
        {
            field: "priority",
            sortable: true,
            filter: true,
            floatingFilter: true, // Enable floating filter
            cellStyle: (params) => {
                console.log(params);
                return params.value === "High" ? { color: 'red' } : { color: 'green' };
            },
        },
    ];

    const handleAdd = () => {
        if (!todo.description) {
            alert("Enter some values first");
        } else {
            setTodos([todo, ...todos]);
            setTodo({
                description: '',
                duedate: '',
                priority: ''
            });
        }
    };

    const handleDelete = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <>
            <h3>My todos</h3>
            <input
                placeholder="Description"
                type='text'
                value={todo.description}
                onChange={e => setTodo({ ...todo, description: e.target.value })}
            />
            <input
                placeholder="Due date"
                type="date"
                value={todo.duedate}
                onChange={e => setTodo({ ...todo, duedate: e.target.value })}
            />
            <input
                placeholder="Priority"
                type='text'
                value={todo.priority}
                onChange={e => setTodo({ ...todo, priority: e.target.value })}
            />
            <button onClick={handleAdd}>Add</button>

            <div style={{ height: 400, width: 600 }} className="ag-theme-material">
                <AgGridReact
                    rowData={todos}
                    columnDefs={columnDefs}
                    domLayout='autoHeight'
                    animateRows={true} // Enable row animations
                    floatingFilter={true} // Ensure floating filter is enabled on the grid
                />
            </div>
        </>
    );
}

export default Todolist;

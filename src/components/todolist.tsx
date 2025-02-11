import { useState } from 'react';
import { Todo } from '../types';
import TodoTable from './todotable';

function Todolist() {
    const [todo, setTodo] = useState<Todo>({description: ' ', duedate: ' '});
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleAdd = () => {
        if (!todo.description){
            alert("Enter some values first");
        }
        else{
            setTodos([todo, ...todos]);
            setTodo({ description: ' ',
                    duedate: ' '
            });
        }
    };
    const handleDelete = (row: number) => {
        setTodos(todos.filter((_, index) => row !== index));
    };

    return(
        <>
        <h3>My todos</h3>
        <input 
            placeholder = "Description"
            value = {todo.description}
            onChange = {e => setTodo({...todo, description: e.target.value})}
            />
            <input 
            placeholder = "Due date"
            type = "date"
            value = {todo.duedate}
            onChange = {e => setTodo({...todo, duedate: e.target.value})}
            />
            <button onClick = {handleAdd}>Add</button>
            <TodoTable todos = {todos} handleDelete = {handleDelete}/>
            
        </>
    )
}

export default Todolist;
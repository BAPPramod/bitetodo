import { useState } from 'react';
import { Todo } from '../types';
import TodoTable from './TodoTable';

function TodoList() {
  const [todo, setTodo] = useState<Todo>({ description: '', duedate: '' });
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = () => {
    if (!todo.description) {
      alert('Please enter a description');
    }
    else {
      setTodos([todo, ...todos]);
      setTodo({ description: '', duedate: '' });
    }
  }

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  }

  return (
    <>
      <h2 style={{ color: 'blue' }}>My Todos</h2>
      <input
        placeholder='Description'
        value={todo.description}
        onChange={e => setTodo({ ...todo, description: e.target.value })}
      />
      <input
        placeholder='Due Date'
        type='date'
        value={todo.duedate}
        onChange={e => setTodo({ ...todo, duedate: e.target.value })}
      />
      <button onClick={handleAdd}>Add</button>
      <TodoTable todos={todos} handleDelete={handleDelete} />
    </>
  );
}

export default TodoList;
import { useState } from 'react';
import { Todo } from '../types';
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, themeMaterial } from 'ag-grid-community';


ModuleRegistry.registerModules([AllCommunityModule]);

function TodoList() {
  const [todo, setTodo] = useState<Todo>({ description: '', priority: '', duedate: '' });
  const [todos, setTodos] = useState<Todo[]>([]);
  const [colDefs] = useState<ColDef[]>([
    { field: "description", filter: true, floatingFilter: true },
    {
      field: "priority", filter: true, floatingFilter: true,
      cellStyle: (params) =>
        params.value === 'High' ? { color: 'red' } : { color: 'black' }
    },
    { field: "duedate", filter: true, floatingFilter: true }
  ]);

  const handleAdd = () => {
    if (!todo.description) {
      alert('Please enter a description');
    }
    else {
      setTodos([todo, ...todos]);
      setTodo({ description: '', priority: '', duedate: '' });
    }
  }

  /* const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  } */

  return (
    <>
      <h2 style={{ color: 'blue' }}>My Todos</h2>
      <input
        placeholder='Description'
        value={todo.description}
        onChange={e => setTodo({ ...todo, description: e.target.value })}
      />
      <input
        placeholder='Priority'
        value={todo.priority}
        onChange={e => setTodo({ ...todo, priority: e.target.value })}
      />
      <input
        placeholder='Due Date'
        type='date'
        value={todo.duedate}
        onChange={e => setTodo({ ...todo, duedate: e.target.value })}
      />
      <button onClick={handleAdd}>Add</button>
      <div style={{ height: 500, width: 700 }}>
        <AgGridReact
          rowData={todos}
          columnDefs={colDefs}
          theme={themeMaterial}
          onGridReady={params => params.api.sizeColumnsToFit()}
        />
      </div>
    </>
  );
}

export default TodoList;
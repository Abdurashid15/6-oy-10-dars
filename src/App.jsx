import './App.css'
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

// Reducer funksiyasi
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'UPDATE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

// Todo komponenti
const Todo = ({ todo, toggleTodo, updateTodo, deleteTodo }) => {
  const handleUpdate = () => {
    const updatedText = prompt('Enter updated text', todo.text);
    if (updatedText !== null) {
      updateTodo({
        id: todo.id,
        text: updatedText,
      });
    }
  };

  return (
    <div>
      <input 
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

// App komponenti
const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = text => {
    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: Date.now(),
        text,
        completed: false,
      },
    });
  };

  const toggleTodo = id => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const updateTodo = updatedTodo => {
    dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
  };

  const deleteTodo = id => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <div className='div
    '>
      <div className='Todo'>
        <h1>Todo List</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            const text = e.target.elements.todoInput.value;
            if (text.trim() !== '') {
              addTodo(text);
              e.target.elements.todoInput.value = '';
            }
          }}
        >
          <input type="text" className="todoInput"name="todoInput" placeholder="Enter todo..." />
          <button type="submit">Add Todo</button>
        </form>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

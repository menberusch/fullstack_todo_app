import React from 'react';

const TodoItem = ({name, completed, onDelete, onToggle}) => (
  <li>
    <span
      style={{
        textDecoration: completed ? 'line-through': 'none',
        cursor: 'pointer'
      }}
      onClick={onToggle}
    >
      {name}
    </span>
    <button type="button" onClick={onDelete}>
      X
    </button>
  </li> 
)

export default TodoItem;
import React from 'react';
import PropTypes from 'prop-types';
import './styles/TodoCard.css';
import { Draggable } from 'react-beautiful-dnd';

export default function TodoCard(props) {
  const {
    editTodoText, toggleTodoCompleted, deleteTodo, todo, id,
  } = props;

  const handleKeyPressDeleteTodo = (e, func) => {
    if (e.key === 'Enter') return func;
    return null;
  };

  const styleCompletedTodosWhileDragging = () => {
    const completedTodos = [...document.getElementsByClassName('Card--completed')];
    if (todo.completed) {
      completedTodos.map((completedTodo) => {
        completedTodo.parentElement.classList.add('Card--isDragging');
        return completedTodos;
      });
    }
  };

  const styleCompletedTodosAfterDrag = () => {
    if (todo.completed) {
      const completedTodos = [...document.getElementsByClassName('Card--completed')];
      completedTodos.map((completedTodo) => {
        completedTodo.parentElement.classList.remove('Card--isDragging');
        return completedTodos;
      });
    }
  };

  const handleDragTodoEvent = () => {
    styleCompletedTodosWhileDragging();

    window.addEventListener('pointerup', styleCompletedTodosAfterDrag());
    window.removeEventListener('pointerup', styleCompletedTodosAfterDrag());
  };

  const hoverCheckButton = (e) => {
    e.stopPropagation();
    const checkButton = e.target;
    if (checkButton.className === 'fas fa-check-circle') return;
    if (checkButton.className === 'far fa-circle') checkButton.className = 'far fa-check-circle';
    else checkButton.className = 'far fa-circle';
  };

  return (
    <Draggable
      draggableId={todo.id.toString()}
      index={id}
      key={todo.id}
      isDragDisabled={todo.completed}
    >
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="Card"
          // role="presentation"
          onPointerDown={() => handleDragTodoEvent()}
          onDragStart={() => styleCompletedTodosWhileDragging()}
          onDragEnd={() => styleCompletedTodosAfterDrag()}
        >

          <button
            className="Card__check"
            type="button"
          >
            <i
              className={!todo.completed ? 'far fa-circle' : 'fas fa-check-circle'}
              role="button"
              aria-label="Toggle completed todo"
              tabIndex={0}
              onClick={() => toggleTodoCompleted(todo)}
              onKeyPress={(e) => handleKeyPressDeleteTodo(e, toggleTodoCompleted(todo))}
              onMouseOver={(e) => hoverCheckButton(e)}
              onFocus={(e) => hoverCheckButton(e)}
              onMouseLeave={(e) => hoverCheckButton(e)}
            />
          </button>

          <p
            className={`Card__description${todo.completed ? ' Card--completed' : ''}`}
            onBlur={(e) => editTodoText(todo, e.target.innerText)}
            contentEditable="true"
            suppressContentEditableWarning
          >
            {todo.text}
          </p>

          <button
            className={`Card__delete--${todo.completed ? 'show' : 'hide'}`}
            type="button"
          >
            <i
              className="fas fa-times"
              role="button"
              aria-label="Delete todo"
              tabIndex={0}
              onClick={(e) => deleteTodo(e, todo)}
              onKeyPress={(e) => handleKeyPressDeleteTodo(e, deleteTodo(todo))}
            />
          </button>
        </li>
      )}
    </Draggable>
  );
}

TodoCard.propTypes = {
  editTodoText: PropTypes.func.isRequired,
  toggleTodoCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todo: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  id: PropTypes.number.isRequired,
};

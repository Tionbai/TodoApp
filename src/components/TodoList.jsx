import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import TodoCard from './TodoCard';
import './styles/TodoList.css';

export default function TodoList(props) {
  const {
    todos, editTodoText, toggleTodoCompleted, deleteTodo,
  } = props;

  const uncompletedTodos = [
    ...todos
      .filter((todo) => !todo.completed),
  ];

  const completedTodos = [
    ...todos
      .filter((todo) => todo.completed)
      .sort((a, b) => b.completedAt - a.completedAt),
  ];

  return (
    uncompletedTodos
    && (
      <>
        <Droppable droppableId="1">
          {(provided) => (
            <ul
              className="List"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {uncompletedTodos.map((todo, index) => (
                <TodoCard
                  key={todo.id}
                  id={index}
                  todo={todo}
                  editTodoText={editTodoText}
                  toggleTodoCompleted={toggleTodoCompleted}
                  deleteTodo={deleteTodo}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        <Droppable droppableId="2" isDropDisabled={completedTodos && true}>
          {(provided) => (
            <ul
              className="List"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {completedTodos.map((todo, index) => (
                <TodoCard
                  key={todo.id}
                  id={index}
                  todo={todo}
                  editTodoText={editTodoText}
                  toggleTodoCompleted={toggleTodoCompleted}
                  deleteTodo={deleteTodo}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </>
    )
  );
}

TodoList.propTypes = {
  todos: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  editTodoText: PropTypes.func.isRequired,
  toggleTodoCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

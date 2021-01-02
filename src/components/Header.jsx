import React from 'react';
import PropTypes from 'prop-types';
import './styles/Header.css';

export default function Header(props) {
  const { todos } = props;

  const uncompletedTodosLength = todos.filter((todo) => !todo.completed).length;

  return (
    <header className="Header">
      <h1 className="Header__title">Todos</h1>
      <h3 className="Header__subtitle">
        {!todos.length && 'You have no todos.'}
        {todos.length && !uncompletedTodosLength ? 'Whoop! All done for today!' : ''}
        {todos.length && uncompletedTodosLength ? `You have ${uncompletedTodosLength} todos.` : ''}
      </h3>
    </header>
  );
}

Header.propTypes = {
  todos: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

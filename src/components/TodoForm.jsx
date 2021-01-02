import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/TodoForm.css';

export default class SubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
    };
  }

  addTodo = (e) => {
    e.preventDefault();
    const { todo } = this.state;
    const { onFormSubmit } = this.props;
    if (todo === '') return;
    onFormSubmit(todo);
    this.setState({ todo: '' });
  }

  updateInput = (e) => {
    this.setState({ todo: e.target.value });
  }

  render() {
    const { todo } = this.state;

    return (
      <form
        className="Form"
        onSubmit={this.addTodo}
      >
        <input
          type="text"
          className="Form__input"
          placeholder="Add task..."
          value={todo}
          onChange={(e) => this.updateInput(e)}
        />
        <button
          type="submit"
          className="Form__button"
        >
          +
        </button>
      </form>
    );
  }
}

SubmitForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

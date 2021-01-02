import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    const todos = localStorage.getItem('todos');
    if (todos) {
      this.setState({
        todos: JSON.parse(todos),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  addTodo = (todo) => {
    const { todos } = this.state;
    const newTodos = [...todos, {
      id: uuidv4(),
      createdAt: Date.now(),
      text: todo,
      completed: false,
      completedAt: null,
    }];
    this.setState({ todos: newTodos });
  }

  editTodoText = (todo, input) => {
    const { todos } = this.state;
    const newTodos = [...todos];
    const text = input;
    const index = newTodos.indexOf(todo);
    newTodos[index].text = text;
    this.setState({ todos: newTodos });
  }

  toggleTodoCompleted = (todo) => {
    const { todos } = this.state;
    const newTodos = [...todos];
    const index = newTodos.indexOf(todo);
    newTodos.splice(index, 1, todo);
    if (!todo.completed) {
      newTodos[index].completed = true;
      newTodos[index].completedAt = Date.now();
    } else {
      newTodos[index].completed = false;
      newTodos[index].completedAt = null;
    }
    this.setState({ todos: newTodos });
  }

  deleteTodo = (e, todo) => {
    e.stopPropagation();
    const { todos } = this.state;
    const newTodos = [...todos];
    const index = newTodos.indexOf(todo);
    newTodos.splice(index, 1);
    this.setState({ todos: newTodos });
  }

  toggleCompletedTodosBackground = () => {
    const completedTodos = [...document.getElementsByClassName('Card--completed')];
    if (completedTodos) {
      completedTodos.map((todo) => {
        const completedTodoClasslist = todo.parentElement.classList;
        if (!completedTodoClasslist.contains('Card--isDragging')) {
          completedTodoClasslist.add('Card--isDragging');
        } else completedTodoClasslist.remove('Card--isDragging');
        return completedTodoClasslist;
      });
    }
  }

  onDragStart = () => {
    this.toggleCompletedTodosBackground();
  };

  onDragEnd = (result) => {
    this.toggleCompletedTodosBackground();

    const startPosition = result.source;
    const endPosition = result.destination;
    if (!endPosition) return;
    if (startPosition.droppableId === endPosition.droppableId
      && startPosition.index === endPosition.index) return;

    const { todos } = this.state;
    const draggedTodo = result.draggableId;

    const newTodos = [...todos];
    const uncompletedTodos = [...newTodos.filter((todo) => !todo.completed)];

    const sourceTodoIndex = newTodos.map((todo) => todo.id).indexOf(draggedTodo);
    const destinationTodoId = uncompletedTodos[endPosition.index].id;
    const destinationTodoIndex = newTodos.map((todo) => todo.id).indexOf(destinationTodoId);

    const reorderedTodo = newTodos.splice(sourceTodoIndex, 1);
    newTodos.splice(destinationTodoIndex, 0, ...reorderedTodo);
    this.setState({ todos: newTodos });
  }

  render() {
    const { todos } = this.state;

    return (
      <main className="App">
        <img className="App__image" alt="" />
        <Header
          todos={todos}
        />
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
        >
          <TodoList
            todos={todos}
            editTodoText={this.editTodoText}
            toggleTodoCompleted={this.toggleTodoCompleted}
            deleteTodo={this.deleteTodo}
          />
        </DragDropContext>
        <TodoForm
          onFormSubmit={this.addTodo}
        />
      </main>
    );
  }
}

import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { Todo } from "../model";
import { MdDone } from "react-icons/md";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import TodoList from "./TodoList";
import { Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { useTodos } from "../TodoContext";

interface props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completed: Boolean;
}

const SingleTodo = ({ index, todo, todos, setTodos, completed }: props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const { fetchTodos, url, handleDone } = useTodos();

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    axios
      .patch(`${url}/${id}` as string, {
        todo: editTodo,
        completed: todo.completed,
      })
      .then((response) => {
        fetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDelete = (id: number) => {
    // setTodos(todos.filter((todo) => todo._id !== id));
    axios
      .delete(`${url}/${id}` as string)
      .then((response) => {
        fetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Draggable draggableId={todo._id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos_single ${snapshot.isDragging ? "singledrag" : ""} ${
            completed ? "completed_task" : ""
          }`}
          onSubmit={(e) => handleEdit(e, todo._id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onDoubleClick={() => !completed && setEdit(!edit)}
          onBlur={() => setEdit(false)}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              className="todos_single--text"
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.completed ? (
            <s className="todos_single--text">{todo.todo}</s>
          ) : (
            <span className="todos_single--text">{todo.todo}</span>
          )}

          <div className="icon">
            <span
              className="icon_edit"
              onClick={() => {
                if (!edit && !todo.completed) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span
              className="icon_delete"
              onClick={() => handleDelete(todo._id)}
            >
              <AiFillDelete />
            </span>
            <span className="icon_done" onClick={() => handleDone(todo)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;

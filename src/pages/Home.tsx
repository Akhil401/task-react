import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import Input from '../components/Input';
import { Todo } from '../model';
import TodoList from '../components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import axios from 'axios';
import { useTodos } from '../TodoContext';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
   const [todo, setTodo] = useState<string>('');
   const { todos, completedTodos, setTodos, setCompletedTodos, fetchTodos, toggle, setToggle, url, loading, handleDone } =
      useTodos();

   const handleAdd = async (e: React.FormEvent) => {
      e.preventDefault();

      await axios
         .post(url as string, {
            todo: todo,
            completed: false
         })
         .then((response) => {
            fetchTodos();
         })
         .catch((err) => {
            console.log(err);
         });
      setTodo('');
   };

   const onDragEnd = (result: DropResult) => {
      const { destination, source } = result;

      if (!destination) {
         return;
      }

      if (destination.droppableId === source.droppableId && destination.index === source.index) {
         return;
      }

      let add;
      let active = todos;
      let complete = completedTodos;

      if (source.droppableId === 'TodoList') {
         add = active[source.index];
         active.splice(source.index, 1);
      } else {
         add = complete[source.index];
         complete.splice(source.index, 1);
      }
      handleDone(add);

      if (destination.droppableId === 'TodoList') {
         active.splice(destination.index, 0, add);
      } else {
         complete.splice(destination.index, 0, add);
      }
      setCompletedTodos(complete);
      setTodos(active);
   };
   return (
      <DragDropContext onDragEnd={onDragEnd}>
         {loading ? (
            <h1 className="loading">Loading...</h1>
         ) : (
            <div className="app">
               <span className="heading">
                  <i>TASKS</i>
                  <section className="head_side">
                     <label className="switch">
                        <input type="checkbox" checked={toggle} onChange={() => setToggle(!toggle)} />
                        <span className="slider round"></span>
                     </label>
                     <span className="switch_label">{toggle ? 'Personal' : 'Work'} </span>
                  </section>
                  <Link to="/login">
                     <MdLogout className="logout" />
                  </Link>
               </span>
               <Input todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
               <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
            </div>
         )}
      </DragDropContext>
   );
};

export default Home;

import React, { useRef } from 'react';
import './styles.css';

interface props {
   todo: string;
   setTodo: React.Dispatch<React.SetStateAction<string>>;
   handleAdd: (e: React.FormEvent) => void;
}

const Input = ({ todo, setTodo, handleAdd }: props) => {
   const inputRef = useRef<HTMLInputElement>(null);
   return (
      <form
         className="input"
         onSubmit={(e) => {
            handleAdd(e);
            inputRef.current?.blur();
         }}
      >
         <input
            ref={inputRef}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="input"
            placeholder="Enter a task"
            className="input_box"
         />
         <button className="input_button" type="submit">
            Add
         </button>
      </form>
   );
};

export default Input;

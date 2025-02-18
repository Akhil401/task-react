import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Todo } from './model';

interface TodoContextProps {
   todos: Todo[];
   completedTodos: Todo[];
   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
   setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
   fetchTodos: () => void;
}

interface TodoProviderProps {
   children: ReactNode;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
   const [todos, setTodos] = useState<Todo[]>([]);
   const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

   const fetchTodos = async () => {
      await axios.get(import.meta.env.VITE_API_URL as string).then((response) => {
         var mainItems = response.data.tasks;
         if (response.data.tasks.length > 1) {
            var items: Todo[] = [];
            mainItems = mainItems.filter((item: Todo) => {
               if (item.completed == true) {
                  items.push(item);
                  return false;
               }
               return true;
            });
            setTodos(mainItems);
            setCompletedTodos(items);
         }
      });
   };

   useEffect(() => {
      fetchTodos();
   }, []);

   return (
      <TodoContext.Provider value={{ todos, completedTodos, setTodos, setCompletedTodos, fetchTodos }}>
         {children}
      </TodoContext.Provider>
   );
};

export const useTodos = () => {
   const context = useContext(TodoContext);
   if (context === undefined) {
      throw new Error('useTodos must be used within a TodoProvider');
   }
   return context;
};

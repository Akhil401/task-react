import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TodoProvider } from './TodoContext';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
   <React.StrictMode>
      <TodoProvider>
         <App />
      </TodoProvider>
   </React.StrictMode>
);

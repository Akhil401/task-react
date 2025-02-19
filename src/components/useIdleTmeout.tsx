import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useIdleTimeout = (timeout: number) => {
   const navigate = useNavigate();
   let timer: number;

   const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
         navigate('/login');
         localStorage.removeItem('user');
      }, timeout);
   };

   useEffect(() => {
      const events = ['mousemove', 'keydown', 'click', 'scroll'];
      const handleUserActivity = () => {
         resetTimer();
      };
      events.forEach((event) => window.addEventListener(event, handleUserActivity));
      resetTimer();
      return () => {
         events.forEach((event) => window.removeEventListener(event, handleUserActivity));
         clearTimeout(timer);
      };
   }, []);
};

export default useIdleTimeout;

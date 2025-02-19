import { useState } from 'react';
import './styles.css';
import { AuthFormData, Message } from '../model';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
   const [formData, setFormData] = useState<AuthFormData>({ email: '', password: '' });
   const [message, setMessage] = useState<Message | null>(null);
   const navigate = useNavigate();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // Simulating API call

      setMessage({ text: 'Signup successful! ✅', type: 'success' });
      setFormData({ email: '', password: '' });
   };

   return (
      <>
         <div className="container-app">
            <h1>Welcome!</h1>
         </div>

         <div className="auth-container">
            <h2>Signup</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
               <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
               <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
               />
               <button type="submit">Sign Up</button>
            </form>
            <nav className="nav-form">
               <span>Already registered?</span>
               <Link to="/login">Login</Link>
            </nav>
            {message && <p className={`message ${message.type}`}>{message.text}</p>}
         </div>
      </>
   );
};

export default Signup;

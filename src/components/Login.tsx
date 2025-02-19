import { useState } from 'react';
import './styles.css';
import { AuthFormData, Message } from '../model';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
   const [formData, setFormData] = useState<AuthFormData>({ email: '', password: '' });
   const [message, setMessage] = useState<Message | null>(null);
   const navigate = useNavigate();

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // Simulating API call

      setMessage({ text: 'Login successful! ✅', type: 'success' });
      setFormData({ email: '', password: '' });
      navigate('/home');
   };

   return (
      <>
         <div className="container-app">
            <h1>Welcome!</h1>
         </div>
         <div className="auth-container">
            <h2>Login</h2>
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
               <button type="submit">Login</button>
            </form>
            <nav className="nav-form">
               <span>Not yet registered?</span>
               <Link to="/signup">Signup</Link>
            </nav>

            {message && <p className={`message ${message.type}`}>{message.text}</p>}
         </div>
      </>
   );
};

export default Login;

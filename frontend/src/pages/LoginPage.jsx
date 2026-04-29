import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, userInfo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');
  const redirect = redirectParam ? (redirectParam.startsWith('/') ? redirectParam : `/${redirectParam}`) : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-[80vh] px-4 py-12 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 md:p-12 rounded-3xl w-full max-w-md border border-white/10 space-y-8 relative z-10"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-red-600 mb-4 shadow-lg shadow-primary-900/20">
            <span className="text-2xl font-black text-white italic">V</span>
          </div>
          <h1 className="text-3xl font-black text-white">¡Hola de nuevo!</h1>
          <p className="text-slate-400">Entra para gestionar tus pedidos en Helados Vicky</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm text-center">{error}</div>}

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary-500 transition-colors text-white"
              placeholder="portilla...@gmail.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary-500 transition-colors text-white"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-primary-600 to-red-600 hover:from-primary-500 hover:to-red-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-primary-900/20 transform hover:scale-[1.02]"
          >
            Entrar a la Heladería
          </button>
        </form>

        <div className="text-center text-sm text-slate-500">
          ¿Eres nuevo en la heladería?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-primary-400 hover:underline font-bold">
            Crea tu cuenta aquí
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

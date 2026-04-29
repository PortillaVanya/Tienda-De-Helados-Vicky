import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { register, userInfo } = useAuth();
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
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      await register(name, email, password);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 md:p-12 rounded-3xl w-full max-w-md border border-white/10 space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-white">Crear Cuenta</h1>
          <p className="text-slate-400">Únete a nuestra comunidad hoy mismo</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm">{error}</div>}

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Nombre Completo</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary-500 transition-colors text-white"
              placeholder="Juan Pérez"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary-500 transition-colors text-white"
              placeholder="nombre@ejemplo.com"
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Confirmar Contraseña</label>
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-primary-500 transition-colors text-white"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-primary-900/20"
          >
            Registrarse
          </button>
        </form>

        <div className="text-center text-sm text-slate-500">
          ¿Ya tienes una cuenta?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-primary-400 hover:underline">
            Inicia sesión aquí
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Card } from '../components/UI/Card';
import { Loader } from '../components/UI/Loader';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, user, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');
  const redirect = redirectParam ? (redirectParam.startsWith('/') ? redirectParam : `/${redirectParam}`) : '/';

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
    clearError();
  }, [navigate, user, redirect, clearError]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch {
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-[80vh] px-4 py-12">
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <Card className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-red-600 mb-4">
            <span className="text-2xl font-black text-white italic">V</span>
          </div>
          <h1 className="text-3xl font-black text-gray-800">¡Hola de nuevo!</h1>
          <p className="text-gray-600">Entra para gestionar tus pedidos en Helados Vicky</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-6">
          <Input
            label="Correo Electrónico"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="portilla...@gmail.com"
          />

          <Input
            label="Contraseña"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <Button 
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Entrar a la Heladería
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          ¿Eres nuevo en la heladería?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-pink-500 hover:underline font-bold">
            Crea tu cuenta aquí
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;

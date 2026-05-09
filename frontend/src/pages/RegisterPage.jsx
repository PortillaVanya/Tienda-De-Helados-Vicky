import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Card } from '../components/UI/Card';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const { register, user, isLoading, error, clearError } = useAuthStore();
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
    setLocalError('');
  }, [navigate, user, redirect, clearError]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setLocalError('Las contraseñas no coinciden');
      return;
    }
    setLocalError('');
    try {
      await register(name, email, password);
    } catch {
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 py-12">
      <Card className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-gray-800">Crear Cuenta</h1>
          <p className="text-gray-600">Únete a nuestra comunidad hoy mismo</p>
        </div>

        {(error || localError) && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
            {localError || error}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-6">
          <Input
            label="Nombre Completo"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Pérez"
          />

          <Input
            label="Correo Electrónico"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@ejemplo.com"
          />

          <Input
            label="Contraseña"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <Input
            label="Confirmar Contraseña"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />

          <Button 
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Registrarse
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-pink-500 hover:underline">
            Inicia sesión aquí
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;

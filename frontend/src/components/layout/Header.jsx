import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 glass-dark border-b border-white/10">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-600 bg-clip-text text-transparent">
          HELADOS VICKY
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-primary-400 transition-colors">Inicio</Link>
          <Link to="/products" className="hover:text-primary-400 transition-colors">Productos</Link>
          <Link to="/cart" className="relative hover:text-primary-400 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
          {userInfo ? (
            <div className="flex items-center space-x-4">
              <Link to="/admin/dashboard" className="flex items-center space-x-2 hover:text-primary-400 transition-colors">
                <User className="w-5 h-5" />
                <span>{userInfo.name}</span>
              </Link>
              <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-full transition-all duration-300 font-medium text-white">
              Iniciar Sesión
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass-dark border-b border-white/10 p-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <Link to="/" className="block py-2 hover:text-primary-400" onClick={() => setIsOpen(false)}>Inicio</Link>
          <Link to="/products" className="block py-2 hover:text-primary-400" onClick={() => setIsOpen(false)}>Productos</Link>
          <Link to="/cart" className="flex items-center space-x-2 py-2 hover:text-primary-400" onClick={() => setIsOpen(false)}>
            <ShoppingCart className="w-5 h-5" />
            <span>Carrito ({cartItemsCount})</span>
          </Link>
          {userInfo ? (
            <>
              <Link to="/admin/dashboard" className="block py-2 hover:text-primary-400" onClick={() => setIsOpen(false)}>
                Perfil ({userInfo.name})
              </Link>
              <button onClick={handleLogout} className="block w-full text-left py-2 text-red-400">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="block py-2 text-primary-400" onClick={() => setIsOpen(false)}>
              Iniciar Sesión
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

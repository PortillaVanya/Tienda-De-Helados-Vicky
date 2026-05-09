import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useCartStore } from '../../stores/useCartStore';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-600 bg-clip-text text-transparent">
          HELADOS VICKY
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-pink-500 transition-colors">Inicio</Link>
          <Link to="/products" className="text-gray-700 hover:text-pink-500 transition-colors">Productos</Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-pink-500 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/admin/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-pink-500 transition-colors">
                <User className="w-5 h-5" />
                <span>{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="text-gray-700 hover:text-red-500 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-6 py-2 bg-pink-500 hover:bg-pink-600 rounded-full transition-all duration-300 font-medium text-white">
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
        <div className="md:hidden bg-white border-b p-4 space-y-4">
          <Link to="/" className="block py-2 text-gray-700 hover:text-pink-500" onClick={() => setIsOpen(false)}>Inicio</Link>
          <Link to="/products" className="block py-2 text-gray-700 hover:text-pink-500" onClick={() => setIsOpen(false)}>Productos</Link>
          <Link to="/cart" className="flex items-center space-x-2 py-2 text-gray-700 hover:text-pink-500" onClick={() => setIsOpen(false)}>
            <ShoppingCart className="w-5 h-5" />
            <span>Carrito ({cartItemsCount})</span>
          </Link>
          {user ? (
            <>
              <Link to="/admin/dashboard" className="block py-2 text-gray-700 hover:text-pink-500" onClick={() => setIsOpen(false)}>
                Perfil ({user.name})
              </Link>
              <button onClick={handleLogout} className="block w-full text-left py-2 text-red-500">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="block py-2 text-pink-500" onClick={() => setIsOpen(false)}>
              Iniciar Sesión
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

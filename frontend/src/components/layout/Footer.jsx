import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Send } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Aquí se conectaría con el backend en el futuro
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-950/50 border-t border-white/5 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-slate-400">
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">Helados Vicky</h3>
          <p className="text-sm leading-relaxed">
            Una experiencia dulce y artesanal para refrescar tu día. Calidad y sabor hechos con amor.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Tienda</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-primary-400 transition-colors">Productos</Link></li>
            <li><Link to="/products" className="hover:text-primary-400 transition-colors">Categorías</Link></li>
            <li><Link to="/products" className="hover:text-primary-400 transition-colors">Novedades</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Soporte y Contacto</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-primary-400" />
              <div className="flex flex-col">
                <a href="tel:3146196792" className="hover:text-white transition-colors">314 619 6792</a>
                <a href="tel:3106423957" className="hover:text-white transition-colors">310 642 3957</a>
              </div>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-primary-400" />
              <a href="mailto:portillajustobernardo@gmail.com" className="hover:text-white transition-colors text-[11px] sm:text-sm">
                portillajustobernardo@gmail.com
              </a>
            </li>
            <li className="text-xs">
              <p className="text-slate-400 font-bold">Mocoa, Putumayo</p>
              <p>Barrio Miraflores</p>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Boletín</h4>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="flex">
              <input 
                type="email" 
                required
                placeholder="Tu correo" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-l-xl px-4 py-2 w-full focus:outline-none focus:border-primary-500 transition-colors text-white text-sm"
              />
              <button 
                type="submit"
                className="bg-primary-600 text-white px-4 py-2 rounded-r-xl hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <span>Unirse</span>
              </button>
            </div>
            {subscribed && (
              <p className="text-green-400 text-xs animate-in fade-in slide-in-from-top-1">
                ¡Gracias por unirte a nuestro boletín!
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-xs text-white">
        <p>&copy; {new Date().getFullYear()} Helados Vicky. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

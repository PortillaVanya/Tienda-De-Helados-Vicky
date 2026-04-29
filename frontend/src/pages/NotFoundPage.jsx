import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <h1 className="text-9xl font-black text-white/10">404</h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">Página no encontrada</h2>
          <p className="text-slate-400">La página que buscas no existe o ha sido movida.</p>
        </div>
        <Link 
          to="/" 
          className="inline-block px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all duration-300"
        >
          Volver al Inicio
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;

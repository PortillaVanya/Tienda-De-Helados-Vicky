import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/UI/Loader';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollToProducts = () => {
    const section = document.getElementById('productos');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-3xl overflow-hidden flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-primary-950 opacity-90 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?q=80&w=1350&auto=format&fit=crop" 
          alt="Helados Vicky Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <span className="inline-block px-4 py-1 bg-primary-600/80 backdrop-blur-md text-white rounded-full text-sm font-bold tracking-widest uppercase">
              Mocoa, Putumayo • Barrio Miraflores
            </span>
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold text-white leading-tight"
            >
              Helados Caseros <span className="bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent text-shadow-lg">Artesanales</span>
            </motion.h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-medium drop-shadow-md">
              Refresca tu vida con el sabor artesanal de Helados Vicky. <br />
              <span className="text-3xl font-black text-primary-400">¡Solo $2,000!</span>
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
              <span className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-bold">
                Ventas al por mayor
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button 
              onClick={scrollToProducts}
              className="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-primary-900/40 text-lg transform hover:scale-105"
            >
              Comprar Ahora
            </button>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="productos" className="space-y-8 scroll-mt-20">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Nuestros Helados</h2>
          <Link to="/products" className="text-primary-400 hover:text-primary-300 transition-colors flex items-center">
            Ver Todo <span className="ml-1">&rarr;</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

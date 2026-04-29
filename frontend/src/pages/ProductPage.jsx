import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/UI/Loader';
import { useCart } from '../context/CartContext';
import { Star, ChevronLeft, ShoppingCart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div className="text-center py-20 text-red-500">Producto no encontrado</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-slate-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Volver a productos
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-3xl overflow-hidden aspect-square border border-white/5"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <span className="text-primary-400 font-bold tracking-widest uppercase text-sm">{product.category}</span>
            <h1 className="text-4xl font-black text-white">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current mr-1" />
                <span className="font-bold">{product.rating}</span>
              </div>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">{product.numReviews} reseñas</span>
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-baseline space-x-4">
            <span className="text-5xl font-black text-white">${product.price.toLocaleString()}</span>
            <span className={product.countInStock > 0 ? 'text-green-400' : 'text-red-400'}>
              {product.countInStock > 0 ? 'En Stock' : 'Agotado'}
            </span>
          </div>

          {product.countInStock > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-slate-400">Cantidad:</span>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500 text-white"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1} className="bg-slate-900 text-white">
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                onClick={() => {
                  addToCart(product, qty);
                  navigate('/cart');
                }}
                className="w-full flex items-center justify-center space-x-3 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-primary-900/20"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>Añadir al Carrito</span>
              </button>
            </div>
          )}

          <div className="pt-8 border-t border-white/5 flex items-center space-x-2 text-slate-500 text-sm">
            <ShieldCheck className="w-5 h-5 text-green-500/50" />
            <span>Pago seguro y garantía de devolución de 30 días</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;

import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../../stores/useCartStore';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl overflow-hidden group border border-white/5"
    >
      <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-400">{product.category}</span>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold text-slate-300">{product.rating}</span>
          </div>
        </div>

        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-black text-white">${product.price.toLocaleString()}</span>
          <button 
            onClick={() => {
              addToCart(product, 1);
              navigate('/cart');
            }}
            disabled={product.countInStock === 0}
            className="p-3 bg-white/5 hover:bg-primary-600 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-5 h-5 text-primary-400 group-hover:text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

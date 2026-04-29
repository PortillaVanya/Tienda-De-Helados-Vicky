import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, itemsPrice, shippingPrice, taxPrice, totalPrice } = useCart();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="p-8 bg-white/5 rounded-full">
          <ShoppingBag className="w-16 h-16 text-slate-600" />
        </div>
        <h2 className="text-2xl font-bold">Tu carrito está vacío</h2>
        <Link to="/" className="px-8 py-3 bg-primary-600 hover:bg-primary-500 rounded-full font-bold transition-all text-white">
          Empezar a comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-black">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <motion.div 
              key={item.product}
              layout
              className="glass p-4 rounded-2xl flex items-center gap-4 group"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-grow">
                <Link to={`/product/${item.product}`} className="font-bold hover:text-primary-400 transition-colors text-white">
                  {item.name}
                </Link>
                <div className="text-sm text-slate-500 uppercase tracking-widest mt-1">${item.price.toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-4">
                <select 
                  value={item.qty} 
                  onChange={(e) => addToCart({ _id: item.product, ...item }, Number(e.target.value))}
                  className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 focus:outline-none text-white"
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1} className="bg-slate-900">
                      {x + 1}
                    </option>
                  ))}
                </select>
                <button 
                  onClick={() => removeFromCart(item.product)}
                  className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl space-y-6 border border-white/10">
            <h2 className="text-xl font-bold border-b border-white/5 pb-4 text-white">Resumen del Pedido</h2>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} productos)</span>
                <span className="text-white font-medium">${itemsPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Envío</span>
                <span className="text-white font-medium">${shippingPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Impuestos estimados</span>
                <span className="text-white font-medium">${taxPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-white/5 text-lg font-black">
                <span className="text-white">Total</span>
                <span className="text-primary-400">${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={checkoutHandler}
              className="w-full flex items-center justify-center space-x-2 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all duration-300 group"
            >
              <span>Pagar pedido</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

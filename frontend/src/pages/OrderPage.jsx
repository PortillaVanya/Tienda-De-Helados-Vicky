import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import Loader from '../components/UI/Loader';
import { CheckCircle, Clock, Truck, CreditCard, ChevronLeft, ExternalLink, Smartphone } from 'lucide-react';

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return (
    <div className="container mx-auto px-4 py-20 text-center space-y-4">
      <h2 className="text-2xl font-bold text-red-500">Error</h2>
      <p className="text-slate-400">{error}</p>
      <Link to="/" className="text-primary-400 hover:underline">Volver al inicio</Link>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8 animate-in fade-in duration-500">
      <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
        <ChevronLeft className="w-5 h-5 mr-1" />
        Volver a la tienda
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white italic">Pedido #{order._id.slice(-6).toUpperCase()}</h1>
          <p className="text-slate-400 text-sm">Realizado el {new Date(order.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-2">
          {order.isPaid ? (
            <span className="px-4 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold border border-green-500/20 flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" /> Pagado
            </span>
          ) : (
            <span className="px-4 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs font-bold border border-yellow-500/20 flex items-center">
              <Clock className="w-3 h-3 mr-1" /> Pendiente de pago
            </span>
          )}
          {order.isDelivered ? (
            <span className="px-4 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-bold border border-blue-500/20 flex items-center">
              <Truck className="w-3 h-3 mr-1" /> Entregado
            </span>
          ) : (
            <span className="px-4 py-1 bg-slate-500/10 text-slate-400 rounded-full text-xs font-bold border border-slate-500/20 flex items-center">
              <Clock className="w-3 h-3 mr-1" /> En camino
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="glass p-6 rounded-3xl border border-white/10 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-white/5 pb-4">Productos</h2>
            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                  <div className="flex-grow">
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-slate-400 text-sm">{item.qty} x ${item.price.toLocaleString()}</p>
                  </div>
                  <p className="font-bold text-white">${(item.qty * item.price).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping and Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary-400" /> Envío
              </h3>
              <div className="text-sm text-slate-400 space-y-1">
                <p className="text-white font-medium">{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, Colombia</p>
              </div>
            </div>
            <div className="glass p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary-400" /> Pago
              </h3>
              <div className="text-sm text-slate-400 space-y-1">
                <p className="text-white font-medium uppercase">{order.paymentMethod === 'entrega' ? 'Contra entrega' : order.paymentMethod}</p>
                <p>{order.isPaid ? `Pagado el ${new Date(order.paidAt).toLocaleDateString()}` : 'Pendiente'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/10 space-y-6 sticky top-24">
            <h2 className="text-xl font-bold text-white">Resumen</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Productos</span>
                <span className="text-white">${order.itemsPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Envío</span>
                <span className="text-white">${order.shippingPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-white/5 text-xl font-black">
                <span className="text-white">Total</span>
                <span className="text-primary-400">${order.totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {!order.isPaid && (order.paymentMethod === 'online' || order.paymentMethod === 'pse') && (
              <div className="pt-6">
                <a 
                  href={`https://wa.me/573106423957?text=Hola Vicky, estoy viendo mi pedido #${order._id.slice(-6).toUpperCase()} y quiero enviar el comprobante de pago.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Reportar Pago</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

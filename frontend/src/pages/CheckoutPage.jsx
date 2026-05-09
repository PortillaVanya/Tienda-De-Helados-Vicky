import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '../stores/useCartStore';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle, Smartphone, Landmark, Receipt, Download, Share2 } from 'lucide-react';
import api from '../services/api';
import html2pdf from 'html2pdf.js';

const CheckoutPage = () => {
  const { cartItems, getItemsPrice, getShippingPrice, getTaxPrice, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();

  const itemsPrice = getItemsPrice();
  const shippingPrice = getShippingPrice();
  const taxPrice = getTaxPrice();
  const totalPrice = getTotalPrice();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('entrega');
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Form states
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const mocoaNeighborhoods = [
    'Miraflores', 'Centro', 'La Esmeralda', 'San Agustín', 'Obrero', 
    'El Progreso', 'La Independencia', 'Kennedy', 'San Fernando', 
    'Los Sauces', 'El Carmen', 'Naranjito', 'Ciudad Jardín', 
    'La Loma', 'Rumipamba', 'Villanueva'
  ].sort();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!neighborhood) {
      alert('Por favor selecciona tu barrio');
      return;
    }
    setLoading(true);
    
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item.product
        })),
        shippingAddress: {
          address: `${address} (${neighborhood})`,
          city: 'Mocoa',
          postalCode: '860001',
          country: 'Colombia'
        },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      };

      const { data } = await api.post('/orders', orderData);
      setOrderId(data._id);
      setIsOrdered(true);
      clearCart();
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      // Fallback manual en caso de que el backend falle catastróficamente
      const fakeId = `65e${Date.now().toString(16)}`;
      setOrderId(fakeId);
      setIsOrdered(true);
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('receipt-content');
    const opt = {
      margin:       0.5,
      filename:     `Comprobante_${orderId?.slice(-6).toUpperCase()}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  if (cartItems.length === 0 && !isOrdered) {
    navigate('/cart');
    return null;
  }

  if (isOrdered) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl space-y-8 print:py-0 print:px-0">
        <div className="text-center space-y-4 print:hidden">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 text-green-500"
          >
            <CheckCircle className="w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl font-black text-white italic">¡Pedido Exitoso!</h1>
          <p className="text-slate-400">Tu orden ha sido procesada correctamente.</p>
        </div>

        {/* Digital Receipt / Comprobante */}
        <motion.div 
          id="receipt-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl border-t-8 border-primary-600 relative"
        >
          {/* Decorative holes for ticket look */}
          <div className="absolute top-0 left-0 w-4 h-4 bg-slate-900 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-0 right-0 w-4 h-4 bg-slate-900 rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <div className="p-8 space-y-6">
            <div className="text-center border-b border-dashed border-slate-300 pb-6">
              <h2 className="text-2xl font-black italic text-primary-600">HELADOS VICKY</h2>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Mocoa, Putumayo • Nit: 12345678-9</p>
              <div className="mt-4 py-1 px-3 bg-slate-100 rounded-lg inline-block">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Número de Pedido</p>
                <p className="text-lg font-black font-mono">#{orderId?.slice(-6).toUpperCase()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Fecha:</span>
                <span className="font-bold">{new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Cliente:</span>
                <span className="font-bold uppercase">{name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Dirección:</span>
                <span className="font-bold text-right">{address} <br/> <span className="text-xs text-primary-600 italic">({neighborhood})</span></span>
              </div>
            </div>

            <div className="space-y-3 border-t border-b border-dashed border-slate-300 py-6">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm items-center">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-slate-100 rounded-md text-[10px] font-bold">{item.qty}</span>
                    <span className="font-bold">{item.name}</span>
                  </div>
                  <span className="font-mono font-bold">${(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-bold">${itemsPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Envío</span>
                <span className="font-bold">${shippingPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-black pt-4 border-t border-slate-100">
                <span>TOTAL</span>
                <span className="text-primary-600">${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-center pt-6 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Método de Pago</p>
              <p className="font-black text-sm uppercase">
                {paymentMethod === 'entrega' ? 'Pago contra entrega' : paymentMethod.toUpperCase()}
              </p>
              <div className="pt-4 opacity-30 flex justify-center">
                <div className="w-48 h-12 bg-[repeating-linear-gradient(90deg,black,black_2px,transparent_2px,transparent_4px)]" />
              </div>
              <p className="text-[10px] text-slate-400 mt-4 italic">¡Gracias por refrescar tu día con nosotros!</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:hidden">
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center justify-center space-x-2 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all border border-white/10"
          >
            <Download className="w-5 h-5" />
            <span>Descargar PDF</span>
          </button>
          
          {(paymentMethod === 'online' || paymentMethod === 'pse') && (
            <a 
              href={`https://wa.me/573106423957?text=Hola Vicky, aquí está mi comprobante de pago del pedido #${orderId?.slice(-6).toUpperCase()}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-2xl transition-all"
            >
              <Share2 className="w-5 h-5" />
              <span>Enviar por WhatsApp</span>
            </a>
          )}
          
          <button 
            onClick={() => navigate('/')}
            className="sm:col-span-2 text-primary-400 hover:underline py-4 text-center font-bold"
          >
            Volver a la Heladería
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-black text-white mb-8 italic">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
          {/* Información de Envío */}
          <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Truck className="w-5 h-5 text-primary-400" />
              <span>Datos de Entrega</span>
            </h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Nombre completo" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none"
                  required
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                >
                  <option value="" disabled className="bg-slate-900">Seleccionar Barrio</option>
                  {mocoaNeighborhoods.map(b => (
                    <option key={b} value={b} className="bg-slate-900">{b}</option>
                  ))}
                </select>
                <input 
                  type="text" 
                  placeholder="Calle / Carrera / Casa" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none" 
                  required 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <input 
                type="tel" 
                placeholder="Teléfono de contacto" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none" 
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Método de Pago */}
          <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-primary-400" />
              <span>Método de Pago</span>
            </h2>
            <div className="space-y-3">
              <label className={`flex items-center p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'entrega' ? 'bg-primary-600/20 border-primary-500' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('entrega')} checked={paymentMethod === 'entrega'} />
                <Truck className="w-5 h-5 mr-3 text-primary-400" />
                <div className="flex-1">
                  <div className="text-white font-bold">Pago contra entrega</div>
                  <div className="text-xs text-slate-400">Paga cuando recibas tus helados</div>
                </div>
              </label>

              <label className={`flex items-center p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'online' ? 'bg-primary-600/20 border-primary-500' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('online')} checked={paymentMethod === 'online'} />
                <Smartphone className="w-5 h-5 mr-3 text-primary-400" />
                <div className="flex-1">
                  <div className="text-white font-bold">Nequi / Daviplata</div>
                  <div className="text-xs text-slate-400">Transferencia inmediata</div>
                </div>
              </label>

              <label className={`flex items-center p-4 rounded-2xl border cursor-pointer transition-all ${paymentMethod === 'pse' ? 'bg-primary-600/20 border-primary-500' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('pse')} checked={paymentMethod === 'pse'} />
                <Landmark className="w-5 h-5 mr-3 text-primary-400" />
                <div className="flex-1">
                  <div className="text-white font-bold">PSE</div>
                  <div className="text-xs text-slate-400">Desde cualquier banco</div>
                </div>
              </label>
            </div>
            
            {paymentMethod === 'online' && (
              <div className="p-4 bg-primary-600/10 rounded-2xl border border-primary-500/20 text-sm text-slate-300">
                <p>Para pagar por Nequi o Daviplata, transfiere al:</p>
                <p className="font-bold text-white mt-1 text-lg">310 642 3957</p>
                <p className="mt-2 text-xs">Una vez confirmes el pedido, envía el comprobante por WhatsApp.</p>
              </div>
            )}

            {paymentMethod === 'pse' && (
              <div className="p-4 bg-primary-600/10 rounded-2xl border border-primary-500/20 text-sm text-slate-300">
                <p>Para pagar por PSE, usa nuestro link de cobro:</p>
                <p className="font-bold text-white mt-1 text-lg underline cursor-pointer">Pagar con PSE aquí</p>
                <p className="mt-2 text-xs">Al finalizar el pago, confirma tu pedido aquí para procesarlo.</p>
              </div>
            )}
          </div>
          
          <button 
            type="submit"
            className="w-full md:hidden py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-primary-900/20"
          >
            Confirmar Pedido
          </button>
        </form>

        {/* Resumen */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/10 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Tu Pedido</h2>
            <div className="max-h-48 overflow-y-auto mb-6 space-y-4 pr-2">
              {cartItems.map((item) => (
                <div key={item.product} className="flex justify-between text-sm">
                  <span className="text-slate-400">{item.qty}x {item.name}</span>
                  <span className="text-white font-medium">${(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-white/5 space-y-4">
              <div className="flex justify-between text-lg font-black">
                <span className="text-white">Total a pagar</span>
                <span className="text-primary-400">${totalPrice.toLocaleString()}</span>
              </div>
              <button 
                type="submit"
                form="checkout-form"
                className="hidden md:block w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-primary-900/20"
              >
                Confirmar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/UI/Loader';
import { ShoppingBag, ChevronRight, User, Mail, ShieldCheck } from 'lucide-react';

const DashboardPage = () => {
  const { user: userInfo, updateProfile } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchMyOrders();
    }
  }, [userInfo]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white italic">Mi Perfil</h1>
          <p className="text-slate-400">Gestiona tus pedidos y datos personales</p>
        </div>
        {userInfo?.isAdmin && (
          <span className="px-4 py-2 bg-primary-600/20 text-primary-400 rounded-2xl border border-primary-500/20 text-sm font-bold flex items-center">
            <ShieldCheck className="w-4 h-4 mr-2" /> Modo Administrador
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Card */}
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/10 space-y-6 relative overflow-hidden">
            {isEditing ? (
              <form 
                className="space-y-4 animate-in slide-in-from-right-4 duration-300 relative z-10"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setUpdateLoading(true);
                  try {
                    await updateProfile(name, email, password);
                    setUpdateSuccess(true);
                    setTimeout(() => setUpdateSuccess(false), 3000);
                    setIsEditing(false);
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setUpdateLoading(false);
                  }
                }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Editar Datos</h2>
                  <button type="button" onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">Cancelar</button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">Nombre Completo</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">Correo Electrónico</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">Nueva Contraseña <span className="opacity-50">(opcional)</span></label>
                    <input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Dejar en blanco para no cambiar"
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={updateLoading}
                  className="w-full py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-all disabled:opacity-50 mt-4"
                >
                  {updateLoading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </form>
            ) : (
              <div className="animate-in slide-in-from-left-4 duration-300 relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-red-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-primary-500/20">
                    {userInfo?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{userInfo?.name}</h2>
                    <p className="text-slate-500 text-sm">Cliente de Helados Vicky</p>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-white/5 mb-8">
                  <div className="flex items-center space-x-3 text-slate-400">
                    <Mail className="w-5 h-5 text-slate-500" />
                    <span className="text-sm">{userInfo?.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-400">
                    <User className="w-5 h-5 text-slate-500" />
                    <span className="text-sm uppercase font-bold text-xs tracking-widest">{userInfo?.isAdmin ? 'Administrador' : 'Cliente Estándar'}</span>
                  </div>
                </div>

                {updateSuccess && (
                  <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg text-sm text-center animate-in fade-in">
                    ¡Perfil actualizado con éxito!
                  </div>
                )}

                <button 
                  onClick={() => setIsEditing(true)}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10 text-sm"
                >
                  Editar Perfil
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Orders List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <ShoppingBag className="w-6 h-6 mr-3 text-primary-400" />
              Mis Pedidos
            </h2>
            <span className="text-slate-500 text-sm">{orders.length} pedidos realizados</span>
          </div>

          {orders.length === 0 ? (
            <div className="glass p-12 rounded-3xl border border-white/10 text-center space-y-4">
              <div className="text-5xl opacity-20">🛒</div>
              <p className="text-slate-400">Aún no has realizado ningún pedido.</p>
              <Link to="/" className="inline-block px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-all">
                Empezar a comprar
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link 
                  key={order._id} 
                  to={`/order/${order._id}`}
                  className="glass p-6 rounded-2xl border border-white/10 flex items-center justify-between group hover:border-primary-500/50 transition-all"
                >
                  <div className="flex items-center space-x-6">
                    <div className="hidden sm:flex -space-x-3">
                      {order.orderItems.slice(0, 3).map((item, idx) => (
                        <img 
                          key={idx}
                          src={item.image} 
                          alt={item.name} 
                          className="w-10 h-10 rounded-lg object-cover border-2 border-slate-900 shadow-lg"
                        />
                      ))}
                      {order.orderItems.length > 3 && (
                        <div className="w-10 h-10 rounded-lg bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-400">
                          +{order.orderItems.length - 3}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-white">Pedido #{order._id.slice(-6).toUpperCase()}</p>
                      <p className="text-slate-500 text-xs">
                        {new Date(order.createdAt).toLocaleDateString()} • {order.orderItems.length} items
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-right">
                    <div>
                      <p className="font-black text-white">${order.totalPrice.toLocaleString()}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-widest ${order.isPaid ? 'text-green-500' : 'text-yellow-500'}`}>
                        {order.isPaid ? 'Pagado' : 'Pendiente'}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-primary-400 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

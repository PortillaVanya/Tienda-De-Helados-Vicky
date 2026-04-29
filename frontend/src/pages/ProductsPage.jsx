import { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/UI/Loader';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white italic">Nuestros Helados</h1>
          <p className="text-slate-400 text-lg">Explora todos los sabores artesanales que tenemos para ti</p>
        </div>

        <div className="relative group max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar tu sabor favorito..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:border-primary-500 transition-all text-white"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl">🍦</div>
          <h3 className="text-xl font-bold text-white">No encontramos ese sabor...</h3>
          <p className="text-slate-500">Intenta buscar con otra palabra clave.</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="text-primary-400 hover:underline font-bold"
          >
            Ver todos los helados
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

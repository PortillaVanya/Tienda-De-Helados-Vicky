const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const ADMIN_ID = new mongoose.Types.ObjectId();

const users = [
  {
    _id: ADMIN_ID,
    name: 'Bernardo Portilla',
    email: 'portillajustobernardo@gmail.com',
    password: bcrypt.hashSync('admin123', 10),
    isAdmin: true,
  },
  {
    name: 'Cliente Demo',
    email: 'cliente@heladosvicky.com',
    password: bcrypt.hashSync('cliente123', 10),
    isAdmin: false,
  },
];

const products = [
  {
    user: ADMIN_ID,
    name: 'Maracuyá',
    slug: 'maracuya',
    image: 'https://images.unsplash.com/photo-1629385701021-fcd568a743b9?q=80&w=800&auto=format&fit=crop',
    brand: 'Helados Vicky',
    category: 'Frutas Tropicales',
    description: 'Helado casero refrescante con pulpa natural de maracuyá. 100% artesanal y sin conservantes.',
    rating: 4.9,
    numReviews: 45,
    price: 2000,
    countInStock: 20,
    stockMinimo: 5,
    ubicacion: 'Vitrina',
  },
  {
    user: ADMIN_ID,
    name: 'Mora Silvestre',
    slug: 'mora-silvestre',
    image: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?q=80&w=800&auto=format&fit=crop',
    brand: 'Helados Vicky',
    category: 'Frutas del Bosque',
    description: 'Delicioso helado artesanal de mora silvestre con trozos de fruta real. Único sabor del Putumayo.',
    rating: 4.8,
    numReviews: 32,
    price: 2000,
    countInStock: 50,
    stockMinimo: 10,
    ubicacion: 'Vitrina',
  },
  {
    user: ADMIN_ID,
    name: 'Fresa Natural',
    slug: 'fresa-natural',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=800&auto=format&fit=crop',
    brand: 'Helados Vicky',
    category: 'Clásicos',
    description: 'Clásico helado de fresa natural hecho en casa con leche cremosa y fresas frescas.',
    rating: 4.7,
    numReviews: 60,
    price: 2000,
    countInStock: 15,
    stockMinimo: 5,
    ubicacion: 'Estante',
  },
  {
    user: ADMIN_ID,
    name: 'Limón Helado',
    slug: 'limon-helado',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=800&auto=format&fit=crop',
    brand: 'Helados Vicky',
    category: 'Cítricos',
    description: 'Refrescante helado cítrico de limón con toque de sal marina, perfecto para los días de sol.',
    rating: 4.9,
    numReviews: 25,
    price: 2000,
    countInStock: 30,
    stockMinimo: 5,
    ubicacion: 'Vitrina',
  },
  {
    user: ADMIN_ID,
    name: 'Chicle Azul',
    slug: 'chicle-azul',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=800&auto=format&fit=crop',
    brand: 'Helados Vicky',
    category: 'Especiales',
    description: 'Divertido helado color azul vibrante con sabor intenso a chicle. El favorito de los niños.',
    rating: 4.6,
    numReviews: 18,
    price: 2000,
    countInStock: 25,
    stockMinimo: 5,
    ubicacion: 'Estante',
  },
  {
    user: ADMIN_ID,
    name: 'Coco Cremoso',
    slug: 'coco-cremoso',
    image: 'https://images.unsplash.com/photo-1604880240013-ce22de8f53f7?q=80&w=800&auto=format&fit=crop',
    brand: 'Helados Vicky',
    category: 'Cremosos',
    description: 'Cremoso helado de coco natural con ralladura de coco real y leche condensada. Irresistible.',
    rating: 5.0,
    numReviews: 40,
    price: 2000,
    countInStock: 10,
    stockMinimo: 3,
    ubicacion: 'Vitrina',
  },
  {
    user: ADMIN_ID,
    name: 'Guanábana',
    slug: 'guanabana',
    image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=800&auto=format&fit=crop',
    brand: 'Helados Vicky',
    category: 'Frutas Tropicales',
    description: 'Exótico helado de guanábana, fruta tropical del Putumayo con propiedades naturales únicas.',
    rating: 4.8,
    numReviews: 22,
    price: 2000,
    countInStock: 18,
    stockMinimo: 5,
    ubicacion: 'Bodega A',
  },
  {
    user: ADMIN_ID,
    name: 'Chocolate Oscuro',
    slug: 'chocolate-oscuro',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
    brand: 'Helados Vicky',
    category: 'Cremosos',
    description: 'Intenso helado de chocolate oscuro 70% cacao, cremoso y para los verdaderos amantes del chocolate.',
    rating: 4.9,
    numReviews: 55,
    price: 2000,
    countInStock: 35,
    stockMinimo: 8,
    ubicacion: 'Vitrina',
  },
  {
    user: ADMIN_ID,
    name: 'Mango Biche',
    slug: 'mango-biche',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800&auto=format&fit=crop',
    brand: 'Helados Vicky',
    category: 'Frutas Tropicales',
    description: 'Unique helado agridulce de mango biche con toque de sal y chile. Un sabor colombiano auténtico.',
    rating: 4.7,
    numReviews: 29,
    price: 2000,
    countInStock: 22,
    stockMinimo: 5,
    ubicacion: 'Estante',
  },
  {
    user: ADMIN_ID,
    name: 'Vainilla Premium',
    slug: 'vainilla-premium',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=800&auto=format&fit=crop',
    brand: 'Helados Vicky',
    category: 'Clásicos',
    description: 'El clásico inigualable. Vainilla artesanal con extracto natural de vainilla de Madagascar.',
    rating: 4.8,
    numReviews: 70,
    price: 2000,
    countInStock: 40,
    stockMinimo: 10,
    ubicacion: 'Vitrina',
  },
  {
    user: ADMIN_ID,
    name: 'Piña Colada',
    slug: 'pina-colada',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?q=80&w=800&auto=format&fit=crop',
    brand: 'Helados Vicky',
    category: 'Frutas Tropicales',
    description: 'Tropical mezcla de piña natural y coco cremoso. Te transportará a la playa con cada bocado.',
    rating: 4.6,
    numReviews: 31,
    price: 2000,
    countInStock: 16,
    stockMinimo: 4,
    ubicacion: 'Estante',
  },
  {
    user: ADMIN_ID,
    name: 'Arándano',
    slug: 'arandano',
    image: 'https://images.unsplash.com/photo-1526081347589-7151b26bd76a?q=80&w=800&auto=format&fit=crop',
    brand: 'Helados Vicky',
    category: 'Frutas del Bosque',
    description: 'Helado de arándanos frescos, rico en antioxidantes y con un sabor ligeramente ácido y dulce.',
    rating: 4.7,
    numReviews: 19,
    price: 2000,
    countInStock: 12,
    stockMinimo: 3,
    ubicacion: 'Bodega A',
  },
];

const importData = async () => {
  await connectDB();
  try {
    await User.deleteMany();
    await Product.deleteMany();
    console.log('✓ Datos anteriores eliminados');

    await User.insertMany(users);
    console.log('✓ Usuarios creados');

    await Product.insertMany(products);
    console.log(`✓ ${products.length} productos de Helados Vicky insertados`);

    console.log('\n🍦 ¡Base de datos poblada correctamente!\n');
    console.log('Credenciales de prueba:');
    console.log('  Admin: portillajustobernardo@gmail.com / admin123');
    console.log('  Admin rápido: admin@example.com / admin123');
    console.log('  Cliente: cliente@heladosvicky.com / cliente123\n');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  await connectDB();
  try {
    await User.deleteMany();
    await Product.deleteMany();
    console.log('✓ Todos los datos eliminados');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

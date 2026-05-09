# 🍦 Helados Vicky - Tienda Virtual

E-commerce artesanal de helados ubicado en Mocoa, Putumayo (Colombia). Construido con React + Zustand + Express + MongoDB.

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19, Vite, Tailwind CSS, Zustand, React Router v7 |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Despliegue | Vercel (frontend) + Render (backend) + MongoDB Atlas |

## 📂 Estructura del Proyecto

```
Tienda Virtual/
├── frontend/         # React App (Vite)
│   ├── src/
│   │   ├── pages/    # Páginas principales
│   │   ├── components/
│   │   ├── stores/   # Zustand stores (auth, cart, products)
│   │   └── services/ # Axios API client
│   └── vercel.json   # Configuración de despliegue
├── backend/          # Express API REST
│   ├── controllers/
│   ├── models/       # Mongoose schemas
│   ├── routes/
│   ├── middleware/
│   ├── seeder.js     # Script para poblar la BD
│   └── server.js
├── docker-compose.yml # MongoDB + MySQL local
└── DOCUMENTACION.md
```

## ⚙️ Configuración Local

### 1. Pre-requisitos
- Node.js v18+
- MongoDB corriendo (local o Docker)

### 2. Variables de Entorno (backend/.env)

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/tienda-virtual
JWT_SECRET=tu_clave_secreta_muy_larga_y_segura
```

### 3. Instalar dependencias

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 4. Poblar la base de datos

```bash
cd backend
npm run seed
```

### 5. Iniciar el proyecto

```bash
# Terminal 1 — Backend (puerto 5000)
cd backend && npm run dev

# Terminal 2 — Frontend (puerto 5173)
cd frontend && npm run dev
```

Abre `http://localhost:5173` en tu navegador.

## 🔑 Credenciales de Prueba

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Administrador | admin@example.com | admin123 |
| Administrador | portillajustobernardo@gmail.com | admin123 |
| Cliente | cliente@heladosvicky.com | cliente123 |

## 🌐 Despliegue en Producción

### Frontend → Vercel
1. Sube el proyecto a GitHub
2. Importa el repositorio en [vercel.com](https://vercel.com)
3. Configura **Root Directory** = `frontend`
4. Agrega la variable de entorno: `VITE_API_URL=https://tu-backend.onrender.com/api`

### Backend → Render
1. Crea un nuevo **Web Service** en [render.com](https://render.com)
2. Conecta tu repositorio de GitHub
3. Configura:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Agrega las variables de entorno:
   - `MONGO_URI` = (tu URI de MongoDB Atlas)
   - `JWT_SECRET` = (cadena aleatoria segura)
   - `NODE_ENV` = `production`

### Base de Datos → MongoDB Atlas
1. Crea una cuenta en [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Crea un **Free Cluster** (M0 Sandbox)
3. Crea un usuario y obtén la URI de conexión
4. Configura el acceso de red desde `0.0.0.0/0`

## 👥 Equipo

| Nombre | Rol |
|--------|-----|
| Bernardo Portilla | Líder / Backend Dev |
| Vanya Portilla | Frontend Dev |

## 📍 Contacto
- 📍 Mocoa, Putumayo - Barrio Miraflores
- 📞 314 619 6792 / 310 642 3957
- ✉️ portillajustobernardo@gmail.com

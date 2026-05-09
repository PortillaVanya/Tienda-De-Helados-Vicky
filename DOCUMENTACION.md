# Documentación y Arquitectura - Tienda Virtual (Helados Vicky)

## Justificación de Cambio de Arquitectura

**De:** Gestor de Tareas (MongoDB / Express)
**A:** Tienda Virtual y Gestor de Inventario (MySQL / NestJS)

### ¿Por qué se realizó la migración?

La transición hacia una plataforma E-commerce con Gestión de Inventario basada en **NestJS** y **MySQL** responde a la necesidad de construir un sistema altamente escalable, estructurado y confiable para administrar tanto las ventas al cliente final como el stock interno de la heladería.

#### 1. Integridad Referencial (MySQL vs MongoDB)
Mientras que MongoDB es excelente para prototipado rápido, una **Tienda Virtual** requiere relaciones estrictas (Ej. Usuario -> Pedido -> Producto -> Movimientos de Stock). 
El uso de una base de datos relacional (SQL) como **MySQL** garantiza la **integridad referencial**, evitando pedidos huérfanos y asegurando consistencia a través de transacciones ACID. Es crucial saber que si se elimina un producto o categoría, los historiales de pedidos de los clientes permanezcan intactos y precisos, y que el descuento de stock al realizar una venta sea exacto a nivel de base de datos.

#### 2. Escalabilidad y Arquitectura Empresarial (NestJS vs Express)
Express.js ofrece mucha libertad, pero esa misma falta de estructura predefinida a menudo conduce a código difícil de mantener a medida que la tienda crece.
**NestJS** impone una arquitectura sólida, utilizando Inyección de Dependencias (DI), módulos, decoradores y un tipado estricto gracias a TypeScript. Esto ofrece grandes beneficios:
*   **Modularidad:** Permite escalar la tienda añadiendo módulos independientes (AuthModule, ProductsModule, OrdersModule, CartModule) sin afectar el código existente.
*   **Mantenibilidad:** Estandariza la forma en que el equipo escribe código (Controllers, Services, Repositories).
*   **Seguridad Integrada:** El uso de Guards (`@UseGuards(JwtAuthGuard)`) para proteger rutas (como el perfil del cliente o el panel de administración) simplifica enormemente la implementación de seguridad en comparación con los middlewares manuales de Express.

Esta evolución tecnológica asegura que la Tienda Virtual no sea solo un prototipo académico, sino una aplicación de e-commerce robusta preparada para producción, fácil de auditar, desplegar (mediante Docker) y lista para manejar transacciones reales.

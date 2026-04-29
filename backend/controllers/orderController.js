const Order = require('../models/Order');

// Almacén temporal en memoria para cuando no hay base de datos
let mockOrders = [];

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    res.json({ message: 'No hay productos en el pedido' });
    return;
  }

  try {
    const order = new Order({
      orderItems,
      user: req.user?._id || '65e7d8f2b3e9a41234567890', // ID de usuario mock válido
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    // Fallback: Si no hay base de datos, guardamos en memoria
    console.log('Error al guardar en DB, usando fallback en memoria:', error.message);
    const mockOrder = {
      _id: `65e${Date.now().toString(16)}`, // Formato similar a ObjectId
      orderItems,
      user: req.user?._id || '65e7d8f2b3e9a41234567890',
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: false,
      isDelivered: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockOrders.push(mockOrder);
    res.status(201).json(mockOrder);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (order) {
      res.json(order);
    } else {
      // Buscar en mockOrders si no está en DB
      const mockOrder = mockOrders.find(o => o._id === req.params.id);
      if (mockOrder) {
        res.json(mockOrder);
      } else {
        res.status(404);
        res.json({ message: 'Pedido no encontrado' });
      }
    }
  } catch (error) {
    const mockOrder = mockOrders.find(o => o._id === req.params.id);
    if (mockOrder) {
      res.json(mockOrder);
    } else {
      res.status(404);
      res.json({ message: 'Pedido no encontrado' });
    }
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      const mockOrderIndex = mockOrders.findIndex(o => o._id === req.params.id);
      if (mockOrderIndex !== -1) {
        mockOrders[mockOrderIndex].isPaid = true;
        mockOrders[mockOrderIndex].paidAt = new Date().toISOString();
        res.json(mockOrders[mockOrderIndex]);
      } else {
        res.status(404);
        res.json({ message: 'Pedido no encontrado' });
      }
    }
  } catch (error) {
    const mockOrderIndex = mockOrders.findIndex(o => o._id === req.params.id);
    if (mockOrderIndex !== -1) {
      mockOrders[mockOrderIndex].isPaid = true;
      mockOrders[mockOrderIndex].paidAt = new Date().toISOString();
      res.json(mockOrders[mockOrderIndex]);
    } else {
      res.status(404);
      res.json({ message: 'Pedido no encontrado' });
    }
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      const mockOrderIndex = mockOrders.findIndex(o => o._id === req.params.id);
      if (mockOrderIndex !== -1) {
        mockOrders[mockOrderIndex].isDelivered = true;
        mockOrders[mockOrderIndex].deliveredAt = new Date().toISOString();
        res.json(mockOrders[mockOrderIndex]);
      } else {
        res.status(404);
        res.json({ message: 'Pedido no encontrado' });
      }
    }
  } catch (error) {
    const mockOrderIndex = mockOrders.findIndex(o => o._id === req.params.id);
    if (mockOrderIndex !== -1) {
      mockOrders[mockOrderIndex].isDelivered = true;
      mockOrders[mockOrderIndex].deliveredAt = new Date().toISOString();
      res.json(mockOrders[mockOrderIndex]);
    } else {
      res.status(404);
      res.json({ message: 'Pedido no encontrado' });
    }
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    const userOrders = mockOrders.filter(o => o.user === req.user?._id || o.user === 'mock-user-id');
    res.json(userOrders);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    res.json(mockOrders);
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};

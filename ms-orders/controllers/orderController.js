import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import SendEmailToQueue from '../utils/SendMessageToQueue.js';
import UpdateProduct from '../utils/UpdateProduct.js';
import mongoose from 'mongoose';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
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
    throw new Error('No hay productos en la orden.');
  }

  const order = new Order({
    orderItems,
    user: req.user,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();

  SendEmailToQueue({
    variant: "order",
    user: req.body.fullName,
    email: req.body.email,
    subject: "Confirmación de orden de La Troja Cervecería Artesanal",
    totalPrice: totalPrice,
    orderId: String(createdOrder.id).padStart(6, 0),
    date: new Date(),
    paymentMethod: paymentMethod,
    shippingAddress: shippingAddress
  });

  SendEmailToQueue({
    variant: "AdminNewOrder",
    user: req.body.fullName,
    email: "mercadeo@latrojacr.net",
    subject: "Se ha recibido una nueva orden.",
    totalPrice: totalPrice,
    orderId: String(createdOrder.id).padStart(6, 0),
    date: new Date(),
    paymentMethod: paymentMethod,
    shippingAddress: shippingAddress
  });

  UpdateProduct(orderItems);

  res.status(201).json(createdOrder);
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.aggregate([
    {
      $match: { "_id": mongoose.Types.ObjectId(req.params.id) },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: "$user"
    },
    {
      $project: {
        id: 1,
        createdAt: 1,
        updatedAt: 1,
        orderItems: 1,
        shippingAddress: 1,
        paymentMethod: 1,
        taxPrice: 1,
        shippingPrice: 1,
        totalPrice: 1,
        isDelivered: 1,
        isPaid: 1,
        "user.email": 1,
        "user.name": 1,
        "user.lastname": 1,
      }
    }
  ]);

  if (!order) {
    res.status(404);
    throw new Error('Orden no encontrada');
  };

  res.json(order[0]);
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Orden no encontrada')
  };

  order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();

  res.json(updatedOrder);
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Orden no encontrada')
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();

  res.json(updatedOrder);
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user });
  res.json(orders);
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: "$user"
    },
    {
      $project: {
        id: 1,
        createdAt: 1,
        updatedAt: 1,
        orderItems: 1,
        shippingAddress: 1,
        paymentMethod: 1,
        taxPrice: 1,
        shippingPrice: 1,
        totalPrice: 1,
        isDelivered: 1,
        isPaid: 1,
        "user.email": 1,
        "user.name": 1,
        "user.lastname": 1,
      }
    }
  ]);

  if (!orders) {
    res.status(404);
    throw new Error('No hay ordenes');
  }

  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrdersCountByDate = asyncHandler(async (req, res) => {
  const month = req.body.month + 1 || new Date().getMonth() + 1;
  
  const orders = await Order.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: "$createdAt" }, month]
        }
      }
    },
    {
      $group: {
        _id: {
          "year": { "$year": "$createdAt" },
          "month": { "$month": "$createdAt" },
          "day": { "$dayOfMonth": "$createdAt" }
        },
        count: { $sum: { $cond: [{ $eq: ["$_id", "none"] }, 0, 1] } }
      }
    },
    {
      $sort: {
        "_id": 1
      }
    },
  ]);

  if (!orders) {
    res.status(404);
    throw new Error('No hay ordenes');
  }

  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getOrdersCountByDate
};
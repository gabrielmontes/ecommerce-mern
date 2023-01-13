import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import crypto from "crypto";
import Token from '../models/userToken.js';
import SendEmailToQueue from '../utils/SendEmailToQueue.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || user && !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('El correo electrónico o la contraseña no son válidos')
  }

  res.json({
    _id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken({ id: user._id, admin: user.isAdmin }),
  });
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, lastname, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('El usuario o correo ya existe')
  };

  const user = await User.create({ name, lastname, email, password });

  if (!user) {
    res.status(400)
    throw new Error('Datos incorrectos')
  };

  SendEmailToQueue({
    variant: "new",
    user: `${name} ${lastname}`,
    email: email,
    subject: "Te damos la bienvenida a La Troja Cervecería"
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken({ id: user._id, admin: user.isAdmin }),
  });
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user)

  if (!user) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }

  res.json({
    _id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    isAdmin: user.isAdmin,
  });
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);
  user.name = req.body.name || user.name;
  user.lastname = req.body.lastname || user.lastname;
  user.email = req.body.email || user.email;

  if (!user) {
    res.status(404);
    throw new Error('El usuario no ha sido encontrado');
  };

  if (req.body.password) {
    user.password = req.body.password
  };

  const updatedUser = await user.save();

  if (!updatedUser) {
    res.status(404);
    throw new Error('El usuario no se ha actualizado');
  }

  res.json({
    _id: updatedUser.id,
    name: updatedUser.name,
    lastname: updatedUser.lastname,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken({ id: updatedUser._id, admin: updatedUser.isAdmin }),
  });
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }

  const userDelete = await user.remove();

  if (!userDelete) {
    res.status(404);
    throw new Error('Usuario no se ha eliminado');
  }

  res.json({ message: 'El usuario se ha eliminado' });
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (!user) {
    res.status(404)
    throw new Error('Usuario no encontrado')
  };

  res.json(user);
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error('Usuario no encontrado');
  };

  user.name = req.body.name || user.name;
  user.lastname = req.body.lastname || user.lastname;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin;

  if (req.body.password) {
    user.password = req.body.password
  };

  const updatedUser = await user.save();

  if (!updatedUser) {
    res.status(404)
    throw new Error('Usuario no encontrado');
  };

  res.json({ message: "El usuario se ha actualizado" });
});

// @desc    New user
// @route   POST /api/users/new
// @access  Private/Admin
const newUser = asyncHandler(async (req, res) => {
  const { name, lastname, email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('El usuario o correo ya existe');
  }

  const user = await User.create({ name, lastname, email, password, isAdmin });

  if (!user) {
    res.status(400);
    throw new Error('Datos incorrectos');
  };

  SendEmailToQueue({
    variant: "new",
    user: `${name} ${lastname}`,
    email: email,
    subject: "Te damos la bienvenida a La Troja Cervecería"
  });

  res.status(201).json("El usuario ha sido creado");
});

// @desc    Reset user password.
// @route   POST /api/users/reset
// @access  Public
const setUserPasswordToken = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user){
      res.status(400);
      throw new Error('Datos incorrectos');
    }

    const token = await Token.findOne({ user: user });

    if (!token) {
      token = await new Token({
        user: user,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    SendEmailToQueue({
      variant: "reset",
      user: user.name,
      email: req.body.email,
      subject: "Restablecer la contraseña.",
      url: `${process.env.RESET_ENDPOINT}/${user._id}/${token.token}`
    });


    res.status(200).json({ message: "Se ha enviado un correo." })
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error('No se envio el correo.');
  }
});

// @desc    Check user password token.
// @route   POST /api/users/reset
// @access  Public
const getUserPasswordToken = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.body.id);

    if (!user) {
      res.status(400);
      throw new Error('Enlace inválido o caducado');
    };

    const token = await Token.findOne({
      userId: user._id,
      token: req.body.token,
    });

    if (!token) {
      res.status(400);
      throw new Error('Enlace inválido o caducado');
    };

    user.password = req.body.password;
    await user.save();
    await token.delete();

    res.status(201).json({
      message: "Se recupero su cuenta.",
    });
  } catch (error) {
    res.status(400);
    throw new Error('Ocurrio un error.');
  }
});

// @desc Check user url token.
// @route GET /api/users/valid
// @access Public
const getUrlValidToken = asyncHandler(async (req, res) => {
  try {
    const token = await Token.findOne({
      user: req.params.user,
      token: req.params.token,
    });


    if (!token) {
      res.status(401);
      throw new Error('Enlace inválido o caducado');
    };

    res.status(200).json({ message: "Token válido" });
  } catch (error) {
    res.status(400);
    throw new Error('Ocurrio un error.');
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  setUserPasswordToken,
  getUserPasswordToken,
  getUrlValidToken,
  newUser
};
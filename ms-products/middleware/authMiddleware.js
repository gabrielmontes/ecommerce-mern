import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.data.id;
      req.isAdmin = decoded.data.admin;

      next();
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('No autorizado, el token fallo')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('No autorizado, no hay token')
  }
})

const admin = (req, res, next) => {
  if (!req.user || req.user && !req.isAdmin) {
    res.status(401)
    throw new Error('No autorizado como administrador')
  }

  next();
};

export { protect, admin };
import jwt from 'jsonwebtoken';
import * as db from '../utils/db.js';

export const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await db.findUserById(decoded.id);
    if (!user) {
       req.user = null;
    } else {
       req.user = user;
       req.user.id = user._id || user.id; // Ensure id is flattened for consistency
    }
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

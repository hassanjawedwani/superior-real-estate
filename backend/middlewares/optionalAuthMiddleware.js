import jwt from 'jsonwebtoken';
export const optionalAuthMiddleware = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const { userId } = decoded;
    req.userId = userId;
    next();
  } catch (err) {
    console.log(err.message)
    return next();
  }
}
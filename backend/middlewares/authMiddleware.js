import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.json({ sucess: false,  message: "Please login first before continue!" });
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const { userId } = decoded;
    req.userId = userId;
    next();
  } catch (err) {
    console.log(err.message)
    return res.json({ success: false, message: "User is unauthorized!"});
  }
}
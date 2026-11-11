import JWT from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Unathorized",
      });
    }

    const user = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: `${error.name} | ${error.message}`,
    });
  }
};

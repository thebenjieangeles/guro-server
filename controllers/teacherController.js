import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Error with token" });
      } else {
        if (decoded.role === "admin") {
          next();
        } else {
          return res.status(403).json({ error: "Not a teacher" });
        }
      }
    });
  }
};

export const teacherPage = (req, res) => {
  res.json({ message: "Success" });
};

export default teacherPage;

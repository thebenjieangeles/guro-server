import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const register = (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ name, email, password: hash })
        .then((user) => res.json({ message: "Success" }))
        .catch((err) => res.status(400).json({ error: err }));
    })
    .catch((err) => res.status(500).json({ error: err }));
};

const login = (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, role: user.role },
            "jwt-secret-key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ status: "Success", role: user.role });
        } else {
          return res.status(401).json({ error: "The password is incorrect" });
        }
      });
    } else {
      return res.status(404).json({ error: "No user exists. Please register" });
    }
  });
};

export { register, login };

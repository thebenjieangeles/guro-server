import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "Student",
  },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;

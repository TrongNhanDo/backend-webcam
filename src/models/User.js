import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    roleId: {
      type: Number,
      default: 1,
    },
    accessToken: {
      type: String,
      require: false,
      default: "",
    },
    refreshToken: {
      type: String,
      require: false,
      default: "",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

const UserModel = mongoose.model("user", userSchema);

export default UserModel;

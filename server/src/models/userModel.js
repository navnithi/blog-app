const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: [4, "minimum length is 4 characters"],
      maxlength: [31, "minimum length is 30 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email id is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "mimimum length of the password should be 8"],
    },

    image: {
      type: String,
      default: "../../public/images/users/Nithya.jpg",
    },

    phone: {
      type: String,
      required: [true, "phone number is required"],
      
    },

    is_Admin: {
      type: Boolean,
      default: 0,
    },
    //is_verified: {
    // type: Number,
    //default: 0,
    //},
    

    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("Users", userSchema);

module.exports = User;

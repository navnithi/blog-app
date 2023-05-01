const { registerUser, verifyEmail, loginUser, getUserProfile, logoutUser, getRefreshToken } = require("../controllers/userController");
const { isLoggedIn } = require("../middleware/auth");
const upload = require("../middleware/fileUpload");


const userRouter = require("express").Router();

userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post("/activate", verifyEmail);
userRouter.post("/login", loginUser);
userRouter.get("/profile/:id", isLoggedIn,getUserProfile);
userRouter.post("/logout",isLoggedIn, logoutUser);
userRouter.get("/refresh-token",  getRefreshToken);
/*
userRouter.get("/:id", findUser);
*/

userRouter.get("*", (req, res) => {
  res.status(404).json({
    message: "404 not found the route",
  });
});

module.exports = userRouter;

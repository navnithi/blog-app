const upload = require("../middleware/fileUpload");


const userRouter = require("express").Router();

userRouter.post("/register", upload.single("image"), registerUser);
/*userRouter.post("/login", loginUser);
userRouter.get("/:id", findUser);
userRouter.post("/verify-user", verifyUser);*/

userRouter.get("*", (req, res) => {
  res.status(404).json({
    message: "404 not found",
  });
});

module.exports = userRouter;

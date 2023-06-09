const express = require ("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const dev = require("./config");
const connnectDB = require("./config/db");
const blogRouter = require("./routes/blogroute");
const userRouter = require("./routes/userRoute");

const app = express();

const port = dev.app.serverPort;
app.listen(port, async() => {
    console.log(`server is running at http://localhost:${port}`)
    await connnectDB();
});

app.get("/test-api", (req, res) => {
    res.send("api is working")
});

app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/public", express.static("public"));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter);

//client error
app.use((req, res, next)=> {
    next(createError(404, "Route not found"));
})

app.use((err, req, res, next) => {
    const statusCode = err.status;
  res.status(err.status || 500).json({
    error: {
      statusCode: statusCode || 500,
      message: err.message,
    },
  });
});
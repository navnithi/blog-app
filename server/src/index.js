const express = require ("express");
const morgan = require("morgan");
const createError = require("http-errors");
const dev = require("./config");
const connnectDB = require("./config/db");
const blogRouter = require("./routes/blogroute");

const app = express();

const port = dev.app.serverPort;
app.listen(port, async() => {
    console.log(`server is running at http://localhost:${port}`)
    await connnectDB();
});

app.get("/test-api", (req, res) => {
    res.send("api is working")
})

app.use(morgan("dev"))
app.use(morgan("dev"));

app.use("/api/blogs", blogRouter)

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
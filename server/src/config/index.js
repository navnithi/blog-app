require("dotenv").config();

const dev = {
  app: {
    serverPort: process.env.SERVER_PORT || 8080,
  },

  db: {
    mongodbUrl: process.env.MONGODB_URL || "  ",
  },
};

module.exports = dev;
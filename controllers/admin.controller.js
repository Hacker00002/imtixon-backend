const { read, write } = require("../model/model");

const admin = {
  GET: (req, res) => {
    const data = read("admin");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  },

  POST: async (req, res) => {
    const user = read("admin");
    let { username, password } = await req.body;
    try {
      // password = crypto.createHash("sha256").update(password).digest("hex");
      let users = user.find(
        (user) => user.username == username && user.password == password
      );
      if (!users) {
        throw new Error("Wrong admin is not difined!");
      }
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: 201,
          message: "Welcome to Abdulbasit Login successfully",
        })
      );
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: 400, message: error.message }));
    }
  },
};

module.exports = admin;

const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: "fer34242213ws2e2dd893ev213",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/customer/auth/*", function auth(req, res, next) {
  // debugging the code

  if (!req.session.authorization) {
    return res
      .status(401)
      .json({ message: "Unauthorized Please Try Again Later " });
  }
  const accessToken = req.session.authorization["accessToken"];

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized Please Try Again Later " });
  }

  try {
    const decoded = jwt.verify(accessToken, "fer34242213ws2e2dd893ev213");

    const { data: user } = decoded;
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized Please Try Again Later " });
  }
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));

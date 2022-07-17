var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
var swaggerJSDoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user");
var contatoRouter = require("./routes/contato");
var db = require("./config/db.config");

var app = express();

// config dotenv and sequelize
dotenv.config();
db.sync();

const { HOST } = process.env;

// swagger set up
var swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Contacts API",
    version: "2.0",
    description:
      "Esta é uma aplicação de API REST feita com Express. " +
      "Ela utiliza dados de uma agenda de contatos.",
    license: {
      name: "Licenciado sob GPL.",
      url: "https://github.com/ifpb-cz-ads/pw2-2021-2-mp01-team-ricardo",
    },
    contact: {
      name: "José Ricardo",
      url: "https://github.com/ricardobgx",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
    {
      url: HOST,
      description: "Production server",
    },
  ],
};
var options = {
  swaggerDefinition,
  apis: ["./routes/user.js", "./routes/contato.js"],
};
var swaggerSpec = swaggerJSDoc(options);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/contatos", contatoRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Express" });
});

module.exports = app;

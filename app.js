const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(
  session({
    secret: "Sapphire2025",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next(); // User is authenticated, continue to next middleware
  } else {
    res.redirect("/login"); // User is not authenticated, redirect to login page
  }
};

// Routes will go here
app.get("/", requireAuth, function (req, res) {
  res.redirect("/login");
});

//Login page
const loginRoute = require("./router/login");
app.use("/login", loginRoute);

//Dashboard page
const dashboardRoute = require("./router/dashboard");
app.use("/dashboard", dashboardRoute);

//KIV page
const kivRoute = require("./router/kiv");
app.use("/kiv", kivRoute);

//latelatif page
const lateLatifRoute = require("./router/latelatif");
app.use("/latelatif", lateLatifRoute);

//Namelist page
const namelistRoute = require("./router/namelist");
app.use("/namelist", namelistRoute);

//Profile page
const profileRoute = require("./router/profile");
app.use("/profile", profileRoute);

//Settings page
const settingsRoute = require("./router/settings");
app.use("/settings", settingsRoute);

//User methods
const userRoute = require("./router/user");
app.use("/user", userRoute);

app.listen(port, "0.0.0.0");
console.log("Server started at http://localhost:" + port);

const express = require("express");
const router = express.Router();
const authm = require("../lib/authmanager");

const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next(); // User is authenticated, continue to next middleware
  } else {
    res.redirect("/login"); // User is not authenticated, redirect to login page
  }
};

router.get("/", function (req, res) {
  if (req.session.userId) {
    res.redirect("/dashboard");
  } else {
    res.render("login");
  }
});

router.post("/", async function (req, res) {
  const result = await authm.login(req);
  res.send(result);
});

router.post("/createAccount",async function (req, res) {
  const result = await authm.signup(req);
  res.send(result);
});

router.get("/forgot", function (req, res) {
  res.render("forgot");
});

router.get("/logout", requireAuth, function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const userm = require("../lib/usermanager");

const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next(); // User is authenticated, continue to next middleware
  } else {
    res.redirect("/login"); // User is not authenticated, redirect to login page
  }
};

router.get("/", requireAuth, function (req, res) {
  res.render("dashboard", { title: "Dashboard", user: req.session.userId });
});

router.post("/getCounts", requireAuth, async function (req, res) {
  const uid = req.session.userId.uid;
  const result = await userm.getCounts(uid);
  res.send(result);
});

module.exports = router;

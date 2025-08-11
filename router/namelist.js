const express = require("express");
const router = express.Router();
const nlm = require("../lib/nlmanager");
const userm = require("../lib/usermanager");


const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next(); // User is authenticated, continue to next middleware
  } else {
    res.redirect("/login"); // User is not authenticated, redirect to login page
  }
};

router.get("/", requireAuth, function (req, res) {
  res.render("namelist", { title: "Namelist", user: req.session.userId });
});

router.post("/getData", requireAuth, async function (req, res) {
  const uid = req.session.userId.uid;
  const nl = await nlm.getData(uid);
  res.send(nl);
});

router.post("/addProspect", requireAuth, function (req, res) {
  const { prospect } = req.body;
  const uid = req.session.userId.uid;
  nlm.addProspect(uid, prospect);
  res.send(prospect.name + " added successfully!");
});

router.post("/removeProspect", requireAuth, function (req, res) {
  const { id } = req.body;
  const uid = req.session.userId.uid;
  nlm.removeProspect(uid, id);
  res.send("Prospect removed successfully!");
});

router.post("/updateProspect", requireAuth, function (req, res) {
  const { id, fieldName, value, type } = req.body;
  const uid = req.session.userId.uid;
  nlm.updateProspect(uid, id, fieldName, value, type);
  res.send(`${id} - ${fieldName} updated successfully!`);
});

router.post("/transferToKIV", requireAuth, function (req, res) {
  const { id } = req.body;
  const uid = req.session.userId.uid;
  nlm.transfer(uid, id, "namelist", "kiv");
  res.send("Prospect transferred successfully!");
});

router.post("/transferToLL", requireAuth, function (req, res) {
  const { id } = req.body;
  const uid = req.session.userId.uid;
  nlm.transfer(uid, id, "namelist", "ll");
  res.send("Prospect transferred successfully!");
});

module.exports = router;

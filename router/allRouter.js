const express = require("express");
const genImage = require("../controler/genImage");
const handleLogin = require("../controler/HandleLogin");
const handleSignUp = require("../controler/handleSignUp");
const handleRefresh = require("../controler/handleRefresh");
const handleLogout = require("../controler/handleLogout");
const handleStripe = require("../controler/handleStripe");
const createClientSecret = require("../controler/CreateClientsecret");
const handleGetUser = require("../controler/handlegetUser");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/image", genImage);

router.post("/user", handleGetUser);

router.post("/secret", createClientSecret);

router.post("/stripe", handleStripe);

router.post("/logout", handleLogout);

router.post("/refresh", handleRefresh);

router.post("/login", handleLogin);

router.post("/signup", handleSignUp);

module.exports = router;

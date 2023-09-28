const User = require("../schema/User");

const handleLogout = (req, res) => {
  const refreshtoken = req.cookies.jwt;
  User.findOneAndUpdate({ refreshtoken: refreshtoken }, { refreshtoken: "" })
    .then(() => {
      res.clearCookie("jwt", refreshtoken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        path: "/",
      });

      res.sendStatus(208);
    })
    .catch((err) => {
      if (err) {
        res.sendStatus(400);
      }
    });
};

module.exports = handleLogout;

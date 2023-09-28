const User = require("../schema/User");

const handleGetUser = (req, res) => {
  const refreshtoken = req.cookies.jwt;

  User.findOne({ refreshtoken })
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch(() => res.sendStatus(400));
};

module.exports = handleGetUser;

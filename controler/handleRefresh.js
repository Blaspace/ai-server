const jwt = require("jsonwebtoken");

const handleRefresh = async (req, res) => {
  const cookie = req.cookies.jwt;
  if (!cookie) return res.sendStatus(401);

  jwt.verify(cookie, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(401);

    const newAccessToken = jwt.sign(
      { email: decoded.email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
    res.json({ accesstoken: newAccessToken });
  });
};

module.exports = handleRefresh;

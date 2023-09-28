const User = require("../schema/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  //checking for the user in db
  const curentUser = await User.findOne({ email });
  if (!curentUser) return res.sendStatus(401);

  //checking if the users password is accurate
  const match = await bcrypt.compare(req.body.password, curentUser.password);
  if (!match) return res.sendStatus(401);

  //sending jwt tokens
  try {
    const accesstoken = jwt.sign(
      { email: curentUser.email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" }
    );

    const refreshtoken = jwt.sign(
      { email: curentUser.email },
      process.env.REFRESH_TOKEN,
      { expiresIn: "15d" }
    );
    //saving accesstoken in db
    User.findOneAndUpdate(
      { email: req.body.email },
      { refreshtoken: refreshtoken }
    ).catch((err) => console.log(err));

    res.cookie("jwt", refreshtoken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24 * 15,
      secure: true,
      path: "/",
    });
    res.json({ accesstoken });
  } catch (err) {
    res.sendStatus(403);
    console.log(err);
  }
};

module.exports = handleLogin;

const User = require("../schema/User");
const bcrypt = require("bcrypt");

const handleSignUp = async (req, res) => {
  const { fullname, email, phone, password } = req.body;
  if (!fullname || !email || !phone || !password) return res.sendStatus(400);

  const duplicate = await User.findOne({ email });
  if (duplicate) return res.sendStatus(403);
  try {
    let salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      password: hashedPassword,
      email,
      fullname,
      phone,
    });

    newUser
      .save()
      .then((data) => res.send(data))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

module.exports = handleSignUp;

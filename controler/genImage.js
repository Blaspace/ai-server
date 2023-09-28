require("dotenv").config();

const genImage = async (req, res) => {
  const { prompt, num, size } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          n: num,
          size,
        }),
      }
    );
    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = genImage;

import express from "express";
import * as dotenv from "dotenv";
import Replicate from "replicate";

dotenv.config();

const router = express.Router();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

router.route("/").get((req, res) => {
  res.send("Hello from IMG-E-FORGE!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          prompt,
        },
      }
    );

    const image = aiResponse;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
});

export default router;

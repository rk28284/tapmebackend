const express = require("express");
const coinModel = require("../model/coin.model");

const coinRouter = express.Router();

// GET user by telegramId
coinRouter.get("/:telegramId", async (req, res) => {
  try {
    const { telegramId } = req.params;
    const user = await coinModel.findOne({ telegramId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST create a new user
coinRouter.post("/newuser", async (req, res) => {
  try {
    const { telegramId, coins = 0 } = req.body;
    const newUser = new coinModel({ telegramId, coins });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update the coin balance 
coinRouter.put("/update/:telegramId", async (req, res) => {
  try {
    const { telegramId } = req.params;
    const { coins } = req.body;

    const user = await coinModel.findOneAndUpdate(
      { telegramId },
      { coins },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE user by telegramId 
coinRouter.delete("/delete/:telegramId", async (req, res) => {
  try {
    const { telegramId } = req.params;

    const user = await coinModel.findOneAndDelete({ telegramId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = coinRouter;

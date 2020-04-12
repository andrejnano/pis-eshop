const mongoose = require("mongoose");

const configurationSchema = new mongoose.Schema({
  os: {
    type: String,
    enum: [
      "Ubuntu 18.04",
      "Ubuntu 19.10",
      "CentOS",
      "RHEL",
      "CS:GO",
      "Minecraft",
      "TeamSpeak3"
    ],
    default: "Ubuntu 18.04"
  },
  memory: {
    type: Number,
    enum: [2, 4, 8, 16, 32, 64, 128],
    default: 4
  },
  cpu: {
    type: Number,
    enum: [1, 2, 4, 6, 8, 16, 32],
    default: 2
  },
  hdd: {
    type: Number,
    enum: [128, 256, 512, 1024, 2048, 4096, 8192],
    default: 512
  },
  hddType: {
    type: String,
    enum: ["HDD", "SSD"],
    default: "HDD"
  },
  ipCount: {
    type: Number,
    min: 1,
    max: 255
  }
});

module.exports = mongoose.model("Configuration", configurationSchema);

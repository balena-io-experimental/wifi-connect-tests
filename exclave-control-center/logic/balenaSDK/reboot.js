const { getSdk } = require('balena-sdk');
const os = require("os")
// const {deviceFinder} = require("./devicefinder")

const balena = getSdk({
  apiUrl: "https://api.balena-cloud.com/",
  dataDirectory: os.userInfo().homedir + "/.balena"
});

const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

// This is called an IIFE - Immediately-Invoked Function Expression
(async () => {
  console.log("Rebooting the DUT")
  await balena.models.device.reboot(process.env.DUT_UUID, function (error) {
    if (error) throw error;
    return 1
  });
  await wait(5000)
  // deviceFinder(process.argv[2])
  return 0
})()

const { getSdk } = require('balena-sdk');
const os = require("os")

// Initalise balenaSDK 
const balena = getSdk({
  apiUrl: "https://api.balena-cloud.com/",
  dataDirectory: os.userInfo().homedir + "/.balena"
});

// Sleep implementation to wait and space out balenaSDK calls
const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

// Function to locate the first device online in the balenaCloud application provided 
const deviceFinder = async (appName = "socks-device") => {
  console.log(`Looking for online devices in ${appName}`)
  for (let step = 0; step < 24; step++) {
    const appsData = await balena.models.application.getAllWithDeviceServiceDetails()
    for (const appNumber in appsData) {
      if (appsData[appNumber]["app_name"] === appName) {
        for (const device in appsData[appNumber]["owns__device"]) {
          let deviceName = appsData[appNumber]["owns__device"][device]["device_name"]
          let status = appsData[appNumber]["owns__device"][device]["is_online"] || appsData[appNumber]["owns__device"][device]["is_connected_to_vpn"]
          let OS = appsData[appNumber]["owns__device"][device]["os_version"]

          if (status === true) {
            await require('fs').promises.writeFile("/root/.bashrc", `export DUT_UUID=${appsData[appNumber]["owns__device"][device]["uuid"]}`)
            console.log(`Found an online device named ${deviceName} running ${OS}`)
            return 0
          }
        }
      }
    }
    console.log("Waiting 10 seconds for it to show up ...")
    await wait(10000)
  }
  console.log("Can't find any online devices. Exiting ...")
}

module.exports = {deviceFinder}

try {
  deviceFinder(process.argv[2])
  return 1
} catch (err) {
  console.log(`Test unsuccessful: ${err}`)
  return 1
}


// await require('fs').promises.writeFile("/root/.bashrc", `export DUT_UUID=${appsData[appNumber]["owns__device"][device]["uuid"]} \n export SHORT_DUT_UUID=${appsData[appNumber]["owns__device"][device]["uuid"].substring(0, 7)}.local`)

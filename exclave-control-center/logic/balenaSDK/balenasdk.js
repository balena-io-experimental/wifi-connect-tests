const { getSdk } = require('balena-sdk');
const os = require('os')

const balena = getSdk({
	apiUrl: "https://api.balena-cloud.com/",
	dataDirectory: os.userInfo().homedir + "/.balena"
});

try {
	while (true) {
		(async () => {
			const appsData = await balena.models.application.getAllWithDeviceServiceDetails()
			for (const appNumber in appsData) {
				if (appsData[appNumber]["app_name"] === "wifi-connect") {
					const deviceName = appsData[appNumber]["owns__device"][0]["device_name"]
					const status = appsData[appNumber]["owns__device"][0]["api_heartbeat_state"]
					const os = appsData[appNumber]["owns__device"][0]["os_version"]
					
					if (status === "online") {
						console.log(`Found an ${status} device named ${deviceName} running ${os}`)
						process.exit(0)
					}
				}
			}
		})()
	}
} catch (err) {
	console.log(`Test unsuccessful: ${err}`)
	process.exit(0)
}

const { getSdk } = require('balena-sdk');

const balena = getSdk({
	apiUrl: "https://api.balena-cloud.com/",
	dataDirectory: "NEED TO FIND WHERE THE TOKEN IS"
});

try {
	while (true) {
		async () => {
			const appsData = await sdk.models.application.getAllWithDeviceServiceDetails()
			for (const appNumber in appsData) {
				if (appsData[appNumber]["app_name"] === "wifi-connect") {
					const deviceName = appsData[appNumber]["owns__device"][0]["device_name"]
					const status = appsData[appNumber]["owns__device"][0]["api_heartbeat_state"]
					const os = appsData[appNumber]["owns__device"][0]["os_version"]
					
					if (status === "online") {
						console.log(`Found an ${status} device named ${deviceName} running ${os}`)
						return 0
					}
				}
			}
		}
	}
} catch (err) {
	console.log(`Test unsuccessful: ${err}`)
	return 1
}

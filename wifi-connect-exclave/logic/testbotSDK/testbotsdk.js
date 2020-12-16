// Two approaches
// 1. Create testbotSDK object here and flash the image
// 2. Use Ryan's server.

//  Do both.

// Provision (flash) and Power on DUT (testbot-sdk)

const { RaspberryPi, TestBotHat } = require('@balena/testbot')


const testbotHat = new TestBotHat();
const deviceInteractor = new RaspberryPi(testbotHat);

console.log("running");
try {
	(async () => {
		console.log(`Setting up DUT`);
		await testbotHat.setup()

		console.log(`Flashing the DUT`);
		await deviceInteractor.flashFromFile("/tmp/raspberrypi3.img");

		console.log(`Powering up DUT`)
		await deviceInteractor.powerOn();

		console.log(`Test successful`)
		//await testbotHat.teardown(true)
		return 0
	})()
} catch(err) {
	console.log(`Test Unsuccessful: ${err}`)
	return 1
}

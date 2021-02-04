const express = require('express')
const { RaspberryPi, TestBotHat } = require('@balena/testbot')
const asyncHandler = require('express-async-handler')

// Initialize Express, SDK among other things.
const testbot = new TestBotHat((msg) => console.log(`testbot: ${msg}`));
const deviceInteractor = new RaspberryPi(testbot);
const app = express()
const SERVER_PORT = 5001
let flashStatus = ""


app.get('/', (req, res) => {
  console.log(`Testblockbot listening at testblockbot:${SERVER_PORT}`);
  return res.status(200).send('OK \n');
});

app.get('/ping', (req, res) => {
  console.log(`Testblockbot listening at testblockbot:${SERVER_PORT}`);
  return res.status(200).send('OK \n');
});

app.listen(SERVER_PORT, asyncHandler(async () => {
  await testbot.setup()
  console.log(`Testblockbot listening at testblockbot:${SERVER_PORT}`);
}));

app.get('/on', asyncHandler(async (req, res) => {
  await deviceInteractor.powerOn()
  return res.status(200).send("Powering on DUT now \n")
}))

app.get('/setup', asyncHandler(async (req, res) => {
  await testbot.setup()
  return res.status(200).send("Setting up the DUT \n")
}))

app.get('/teardown', asyncHandler(async (req, res) => {
  await testbot.teardown()
  return res.status(200).send("Completed resetting the hub \n")
}))

app.get('/off', asyncHandler(async (req, res) => {
  await deviceInteractor.powerOff()
  return res.status(200).send("Powering off DUT now \n")
}))

app.get('/flash', asyncHandler(async (req, res) => {
  if (!req.query.path) {
    res.status(400).send(`BAD REQUEST, path of the image missing maybe. Please specify the path for example: testblockbot:5001/flash?path=/images/raspberrypi3.img \n`)
  }
  res.status(200).send(`Flashing ${req.query.path} \n`)
  await deviceInteractor.flashFromFile(req.query.path)
  flashStatus = "Flashing Completed"
  return flashStatus
}))

app.get('/flash-progress', (req, res) => {
  if (flashStatus === "Flashing Completed") {
    res.status(200).send(flashStatus)
    flashStatus = ""
    return flashStatus
  }
  res.end()
})

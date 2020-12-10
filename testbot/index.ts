//import fs from 'mz';
//import createGunzip from 'zlib'
import * as express from "express";
import * as bodyParser from "body-parser";
import {
    createAccessPoint,
    connectToWifi,
    //getWiFiDevices,
  } from "./lib/nm";
  

import { TestBotHat } from './lib/hat';

(async () => {

console.log("Starting testbot service...")

// Create testbotHat instance
const hatBoard = new TestBotHat();
hatBoard.setup();
console.log("Testbot ready...");


// Get wifi device ready
const AP_SSID = "finAP"
const AP_PASSWORD = "password"
const iface = "wlan0"

//const _DUT_SSID = "WiFi Connect"


const app = express()
app.use(bodyParser.json());

const port = 8080
console.log("Server ready...");

app.get('/poweron', async (_req, res) => {
  console.log('Powering on DUT!')
  await powerOn(hatBoard);
  res.send('Ok')
})

app.get('/poweroff', async (_req, res) => {
    console.log('Powering Off DUT!')
    await powerOff(hatBoard);
    res.send('Ok')
})

app.get('/flash', async (_req, res) => {
    console.log('Flashing!')
    res.send('Ok')
})

app.get('/createAp', async (_req, res) => {
    console.log('Creating Access Point!')
    console.log(`Creating WiFi AP on ${iface} with SSID "${AP_SSID}" and password "${AP_PASSWORD}"...`);
    await createAccessPoint({ iface: iface, ssid: AP_SSID, password: AP_PASSWORD });
    res.send('Ok')
})

app.post('/connectAp', async (req, res) => {
    console.log('Connecting to Access Point!')
    console.log(req.body.ssid)
    if(req.body.ssid != null){
        if(req.body.password != null){
            await connectToWifi({ iface: iface, ssid: req.body.ssid, password: req.body.password});
            res.send('Ok')
        }
    }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

})();


async function powerOn(hat: TestBotHat){
    await hat.setVout(5);
	await hat.powerOnDUT();
	console.log('Vout=', await hat.readVout());
}

async function powerOff(hatBoard: TestBotHat){
    await hatBoard.powerOffDUT();
}

/*async function flash(){
    const filePath = '/volumes/image.gz'
    if (filePath.endsWith('.zip')) {
        throw new Error('zip files are not supported');
    }

    let src = await fs.createReadStream(filePath);
    if (filePath.endsWith('.gz')) {
        src = src.pipe(createGunzip());
    }
    await this.hatBoard.flash(src);
}*/
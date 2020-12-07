//import fs from 'mz';
//import createGunzip from 'zlib'
import * as express from "express";


import { TestBotHat } from './lib/hat';

console.log("starting")

// Create testbotHat instance
const hatBoard = new TestBotHat();
hatBoard.setup();
console.log("Testbot ready...");


const app = express()
const port = 8080

app.get('/poweron', async (_req, res) => {
  console.log('Powering on DUT!')
  await powerOn()
  res.send('Success')
})

app.get('/poweroff', async (_req, res) => {
    console.log('Powering Off DUT!')
    await powerOff()
    res.send('Success')
})

app.get('/flash', (_req, res) => {
    console.log('Flashing!')
    res.send('Success')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




async function powerOn(){
    await hatBoard.setVout(5);
	await hatBoard.powerOnDUT();
	console.log('Vout=', await hatBoard.readVout());
}

async function powerOff(){
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
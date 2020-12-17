// Steps
// click SSID box to list available connections 
// Choose the home network
// Click passpharase box to enter password
// Enter password
// Click button 
// End test gracefully returning 0 if no errors for exclave to get closure and move on. LOL.

Feature('Wifi connect UI automation');
Scenario('Testing Wifi Connect captive portal', ({ I }) => {
	I.amOnPage('http://192.168.42.1/')
	I.see("Hi! Please choose your WiFi from the list")
	pause()
	I.click("#root_ssid")
	I.see("internetx3000")
	I.click("internetx3000")
	I.click("#root_passphrase")
	I.fillField("#root_passphrase", "thunderfloor50")
	I.see("Connect")
	I.click("Connect")
	process.exit(0)
});

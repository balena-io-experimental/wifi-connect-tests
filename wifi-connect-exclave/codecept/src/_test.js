Feature('Wifi connect UI automation');

Scenario('test something', ({ I }) => {
	// I.amOnPage('http://192.168.29.197')
	I.amOnPage('http://192.168.42.1/')
	I.see("Hi! Please choose your WiFi from the list")
	
	// Steps
	// click SSID box to list available connections 
	// Choose the home network
	// Click passpharase box to enter password
	// Enter password
	// Click button 
	// End test gracefully returning 0 if no errors for exclave to get closure and move on. LOL.
});

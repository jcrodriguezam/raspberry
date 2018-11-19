
var awsIot = require('aws-iot-device-sdk');
var Gpio = require('onoff').Gpio;

var PIN = 18;

const LED = new Gpio(PIN, 'out');

var device = awsIot.device({
	keyPath: 'certs/d64015abd5-private.pem.key',
	certPath: 'certs/d64015abd5-certificate.pem.crt',
	caPath: 'certs/root-CA.crt',
	region: 'us-east-1',
	clientId: 'sdk-nodejs-128cb846-7b05-450a-87ef-86de0fa031d0',
	//clientId: 'mything',
	host: 'a1io5eo0eh1c6a-ats.iot.us-east-1.amazonaws.com'
});

device.on('connect', function() {
	device.subscribe('LED');
	console.log('Subscribed');
});

device.on('message', function(topic, payload){
	data = JSON.parse(payload);

	if(data.hasOwnProperty('light')){
		console.log(data.light);

		if(topic == 'LED'){
			if(data.light == 'on'){
				LED.writeSync(1);
				console.log('led on');
			} else{
				LED.writeSync(0);
				console.log('led off');
			}
		}
	}
});

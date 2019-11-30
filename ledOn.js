
var awsIot = require('aws-iot-device-sdk');
var Gpio = require('onoff').Gpio;

var PIN = 18;

const LED = new Gpio(PIN, 'out');

var iv = setInterval(function(){
    led.writeSync(led.readSync() === 0 ? 1 : 0)
}, 500);

// Stop blinking the LED and turn it off after 5 seconds.
setTimeout(function() {
    clearInterval(iv); // Stop blinking
    led.writeSync(0);  // Turn LED off.
    led.unexport();    // Unexport GPIO and free resources
}, 60000);
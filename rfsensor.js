var events = require('events');
var rcswitch = require('rcswitch');

module.exports = RFSensor;

function RFSensor() {
    var emitter = this;
    events.EventEmitter.call(this);

    this.receive = function(pin) {
        if(rcswitch.enableReceive(pin)) {
            emitter.emit('receiveEnabled', pin);

            setInterval(function(){
                if (rcswitch.available()) {
                    data = rcswitch.getReceivedValue();
                    rcswitch.resetAvailable();
                    emitter.emit('dataAvailable', data);
                }
            }, 1000);
        }
    };
}

RFSensor.super_ = events.EventEmitter;
RFSensor.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: RFSensor,
        enumerable: false
    }
});

var fs = require('fs');
var Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory("homebridge-temperature-humidity-sensor-file", "TemperatureFile", TemperatureFileAccessory);
  homebridge.registerAccessory("homebridge-temperature-humidity-sensor-file", "HumidityFile", HumidityFileAccessory);
}

function TemperatureFileAccessory(log, config) {
  this.log = log;
  this.name = config["name"];
  this.filePath = config["file_path"];

  this.service = new Service.TemperatureSensor(this.name);

  this.service
    .getCharacteristic(Characteristic.CurrentTemperature)
    .setProps({
      minValue: -100,
      maxValue: 100,
      minStep: 0.01,
    })
    .on('get', this.getState.bind(this));
}

TemperatureFileAccessory.prototype.getState = function(callback) {
  fs.readFile(this.filePath, 'utf8', function(err, data) {
    if (err) {
      callback(err);
      return
    }

    callback(null, parseFloat(data))
  })
}

TemperatureFileAccessory.prototype.getServices = function() {
  return [this.service];
}


function HumidityFileAccessory(log, config) {
  this.log = log;
  this.name = config["name"];
  this.filePath = config["file_path"];

  this.service = new Service.HumiditySensor(this.name);

  this.service
    .getCharacteristic(Characteristic.CurrentRelativeHumidity)
    .on('get', this.getState.bind(this));
}

HumidityFileAccessory.prototype.getState = function(callback) {
  fs.readFile(this.filePath, 'utf8', function(err, data) {
    if (err) {
      callback(err);
      return
    }

    callback(null, parseFloat(data))
  })
}

HumidityFileAccessory.prototype.getServices = function() {
  return [this.service];
}
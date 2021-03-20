# homebridge-temperature-humidity-sensor-file

This is a plugin for [homebridge](https://github.com/NikDevx/homebridge-temperature-humidity-sensor-file) which makes it possible to create a temperature and humidity
sensor in HomeKit via file.

## Why via file?

When you have a DHT-sensor, you need `sudo` to read from it. I don't want to run homebridge as `sudo`, so I'm having a `cronjob`,
which writes every n seconds to a file and read from it from homebridge.

## Example config

```json
{
  "accessory": "TemperatureFile",
  "name": "Temperature-sensor",
  "description": "The temparature sensor in the bedroom",
  "file_path": "/home/pi/dht/temp.txt"
},
{
  "accessory": "HumidityFile",
  "name": "Humidity-sensor",
  "description": "The humidity sensor in the bedroom",
  "file_path": "/home/pi/dht/hum.txt"
}
```

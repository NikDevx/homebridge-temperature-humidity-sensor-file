import re
import subprocess
import json

# get temperature
get_temp = proc = subprocess.Popen("airctrl --ipaddr 192.168.0.10 --protocol coap | grep -i 'temp'",
                                   stdout=subprocess.PIPE, shell=True)
out_get_temp = proc.communicate()
result_get_temp = re.sub("\D", "", str(out_get_temp))

# get humidity
get_humidity = proc = subprocess.Popen("airctrl --ipaddr 192.168.0.10 --protocol coap | grep -i 'rh'",
                                       stdout=subprocess.PIPE, shell=True)
out_get_humidity = proc.communicate()
result_get_humidity = re.sub("\D", "", str(out_get_humidity))
result_get_humidity = result_get_humidity[2:]

# results = json.dumps({'temperature': result_get_temp, 'humidity': result_get_humidity})
# print(results)

f_temp = open("/usr/lib/node_modules/homebridge-temperature-humidity-sensor-file/temp.txt", "w")
f_temp.write(result_get_temp)
f_temp.close()

f_hum = open("/usr/lib/node_modules/homebridge-temperature-humidity-sensor-file/hum.txt", "w")
f_hum.write(result_get_humidity)
f_hum.close()
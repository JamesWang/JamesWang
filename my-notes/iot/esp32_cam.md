### Upload sketch with proper wires
* Board: AI-Thinker Esp32 Cam
* IDE: Arduino IDE
* connection & power: FTDI USB
* ESP32-CAM	FTDI Cable
  * Board    ----   FTDI
  * GND         <--- GND
  * 5V	        <--- VCC (5V)
  * U0RX/GPIO3	<--- TX
  * U0TX/GPIO1	<--- RX
  * GPIO0	      <--- GND
#### Note: 
* When run example **CameraWebServer**, make sure connect IO0 to GND when upload, otherwise you will see errors:
```
      Esp32 Cam A fatal error occurred: Failed to connect to ESP32: No serial data received
```
* Properly setup in the sketch to use the right board settings.
  for example, for AI -Thinker ESP32 Cam, 
```
      #define CAMERA_MODEL_AI_THINKER // Has PSRAM
```
otherwise will possiblly get error:       
```
camera init failed with error 0x105 esp32
```
### SmartSwitch
- wemo
 - install python-wemo
```
import pywemo

devices = pywemo.discover_devices()
print(devices)
print(devices[0].get_state())
print(devices[0].model)

#wemo = pywemo.discover_devices() 
#print(wemo)
#wemo[0].toggle()
#devices[0].toggle()
```
- Kasa
 - install python-kasa
```
import asyncio
from kasa import Discover
from kasa import SmartDimmer


async def main():
    devices: dict[str, SmartDimmer] = await Discover.discover(
        discovery_timeout=5
    )

    # device.update()
    print(devices)
    for (ip, info) in devices.items():
        dimmer: SmartDimmer = info
        print(f"{ip} -- {dimmer.alias} isOn:{dimmer.is_on}")
        if dimmer.is_on:
            await dimmer.turn_off()
            print(f"{ip} isOn:{dimmer.is_on}")


if __name__ == "__main__":
    asyncio.run(main())
```

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
  

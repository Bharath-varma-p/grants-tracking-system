Imense JavaScript PDF417 reader SDK.

For local debugging:

localhost is a secure host server.

On a Mac 
open System Preferences/Networking,
put localhost and 127.0.0.1 in /networking/advanced/proxies.

The following line should appear in the comment box:

*.local, localhost, 127.0.0.1, 169.254/16


serve local host directory with the following command in a shell from
directory ~\PDF417_JS_sdk\

~\PDF417_JS_sdk\>       php -S localhost:8080
(other local servers are possible, eg python...).

load in chrome with:

http://localhost:8080/USBcam_PDF417_demo.html

accept camera use.

USB camera access in HTML5 requires the source URL to be https except
for localhost.

also see:
https://developers.google.com/web/fundamentals/native-hardware/capturing-images/

to run Chrome Developer Tools on Mac click View>Developer>Devepoler Tools.

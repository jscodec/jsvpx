# jsvpx

jsvpx is a full implementation of libvpx in Javascript. In contrast to other crosscompiled decoders, jsvpx is fully written in Javascript.
  
The reason for a full reimplementation as opposed to a simple cross compile, is because video decoding computation is very repetative, and as of now, cross compiled modules can only be single threaded. The project is still in early stages, but now ready to expore multithreading options including WebWorkers or WebGL, possible SIMD, even though it may only work for FireFox (at least for the near future).

## Project Status
Vp8 is now working! Still in experimental stages. Output hashes finally match the vp8 test vectors.
Now working on figuring out a few speed issues. 

Works best in Safari.

Check out a running demo on ogv.js:
http://jscodec.com/ogv-example/#file=Curiosity's_Seven_Minutes_of_Terror.ogv&size=360p.webm

Based of code from John Koleszar's dixie libvpx branch : https://github.com/webmproject/libvpx/tree/dixie/vpx ,
and Dominik Homberger's : https://github.com/dominikhlbg/vp8-webm-javascript-decoder.


Currently moving towards the direction of the main branch.

Looking to try some interesting things with webworkers, or perhaps some GPU.

### ChangeLog
* v0.0.2
  * Added browser unit tests in test folder : http://jscodec.com/jsvpx-tests/
  * Added comprehensive benchmark tool : http://jscodec.com/jsvpx-benchmark/
  * Various Bug Fixes
  * Better memory handling
  * Improved dequantization

### Current TODO
* Figure out whats causing the slow parts, (Probably splitmode prediction)
* Start testing out some webworkers
* Lots of code cleaning to do

### Future Planned Work
* Frame corruption/interpolation for missing frames
* Vp9
* Finish filling this out...

## Usage

### Installation
Make sure to have npm, and git installed. Clone repository, then use:

For npm modules:
```
npm install
```

To pull all git modules:
``` git submodule update --init ```

To Build simply use:
``` npm run-script build ```



### Validation
To validate, use 

`npm run-script test`


### API
The main api is written to closely resemble the C style api of the original libvpx library. In the build-templates folder, you can find various templates for other API's and builds.

#### jsvpx api
This is the simplest most, most user friendly api. It's usage is more like the traditional javascript api.
```javascript
var decoder = new jsvpx();
var rawFrame = decoder.decode(compressedFrame);

if(rawFrame){
    //do something with it
}
```

##### jsvpx api demos:
Running on Dominik's **vp8-webm-javascript-decoder:**

Link to source using jsvpx:

https://github.com/brianxautumn/vp8-webm-javascript-decoder/tree/JsVpx

Link to live demo:

http://jscodec.com/vp8-webm-javascript-decoder/vpxdec.html



#### ogv.js

* To try with ogv, simply copy ogv-decoder-video-vp8 out of the builds directory and paste it over the generated one.
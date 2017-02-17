# jsvpx

A Javascript libvpx implementation.

## Project Status
Vp8 is now working! Still in experimental stages. Output hashes finally match the vp8 test vectors.
Now working on figuring out a few speed issues. 

Works best in Safari.

Based of code from John Koleszar's dixie libvpx branch : https://github.com/webmproject/libvpx/tree/dixie/vpx ,
and Dominik Homberger's : https://github.com/dominikhlbg/vp8-webm-javascript-decoder.

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
```
var decoder = new jsvpx();
var rawFrame = decoder.decode(compressedFrame);

if(rawFrame){
    //do something with it
}
```



#### ogv.js

* To try with ogv, simply copy ogv-decoder-video-vp8 out of the builds directory and paste it over the generated one.
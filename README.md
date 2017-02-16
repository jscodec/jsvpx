#jsvpx

A Javascript libvpx implementation.

## Project Status
Vp8 is now working! Still in experimental stages. Output hashes finally match the vp8 test vectors.
Now working on figuring out a few speed issues. The project was originally modeled after the dixie branch, but
now being modeled after the main libvpx branch.

### Future Planned Work
Frame corruption/interpolation for missing frames , Vp9, finish filling this out...

## Usage

### Installation
Make sure to have npm, and git installed. Clone repository, then use:

`
npm install
`
To pull all npm modules, and

` git submodule init `

To pull the vp8 test vectors

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
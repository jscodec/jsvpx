'use strict';

var bitreader = require('../../vpx_dsp/bitreader.js');
var vpx_read = bitreader.vpx_read;


function vp8_treed_read(r, t, p, p_off) {
    
    var i = 0;


        while ((i = t[ i + vpx_read(r, p[p_off + (i >> 1)])]) > 0) {
       }




    return (-i) | 0;
}

module.exports = vp8_treed_read;
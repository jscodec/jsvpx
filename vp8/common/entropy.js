'use strict';
var default_coef_probs = require('./default_coef_probs.js');
var default_coef_probs_32 = default_coef_probs.data_32;
var default_coef_probs_64 = default_coef_probs.data_64;

function vp8_default_coef_probs(pc) {

    //for (var i = 0; i < 1056; i++)
    //pc.entropy_hdr.coeff_probs[i] = default_coef_probs[i];

/*
    var to = pc.entropy_hdr.coeff_probs.data_32;
    for (var i = 0; i < 264; i++)
        to[i] = default_coef_probs_32[i];
     */
    pc.entropy_hdr.coeff_probs.data_64.set(default_coef_probs_64);
    /*
    var to = pc.entropy_hdr.coeff_probs.data_64;
    for (var i = 0; i < 132; i++)
        to[i] = default_coef_probs_64[i];
      */
}

module.exports = {
    vp8_default_coef_probs : vp8_default_coef_probs
};
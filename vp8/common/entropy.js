'use strict';
var default_coef_probs = require('./default_coef_probs.js');

function vp8_default_coef_probs(pc) {
    for (var i = 0; i < 1056; i++)
        pc.entropy_hdr.coeff_probs[i] = default_coef_probs[i];
}

module.exports = {
    vp8_default_coef_probs : vp8_default_coef_probs
};
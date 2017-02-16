'use strict';


//k_mv_entropy_update_probs
var vp8_mv_update_probs =
        [
            new Uint8Array([
                237,
                246,
                253, 253, 254, 254, 254, 254, 254,
                254, 254, 254, 254, 254, 250, 250, 252, 254, 254
            ]),
            new Uint8Array([
                231,
                243,
                245, 253, 254, 254, 254, 254, 254,
                254, 254, 254, 254, 254, 251, 251, 254, 254, 254
            ])
        ];


//k_default_mv_probs
var vp8_default_mv_context =
        [
            new Uint8Array([// row
                162, // is short
                128, // sign
                225, 146, 172, 147, 214, 39, 156, // short tree
                128, 129, 132, 75, 145, 178, 206, 239, 254, 254 // long bits
            ]),
            new Uint8Array([
                164,
                128,
                204, 170, 119, 235, 140, 230, 228,
                128, 130, 130, 74, 148, 180, 203, 236, 254, 254

            ])
        ];



module.exports = {};
module.exports.vp8_mv_update_probs = vp8_mv_update_probs;
module.exports.vp8_default_mv_context = vp8_default_mv_context;

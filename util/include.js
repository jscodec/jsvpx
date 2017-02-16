'use strict';


function include(scope, files) {
    
    for (var i = 1; i < arguments.length; i++) {
        
        var file = arguments[i];
        
        var required = require(file);
        
        for (var key in required) {
            //console.log(key);
            
            scope[key] = required[key];
        }

    }

}

module.exports = include;
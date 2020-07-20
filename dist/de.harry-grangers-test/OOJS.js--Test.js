define('wikia.extension',['require', 'exports', 'module' ],function(require, exports, module) {
    'use strict';
    
    var Extension = function() {};
    Extension.prototype.hello = function() {
        console.log('Hello world!');
    }

    exports.Extension = Extension;

    return Extension;
});

require('wikia.extension', function(Extension) {
    var extension = new Extension();
    extension.hello();
});
importScriptURI('http://nerdamer.com/js/nerdamer.core.js')
nerdamer.register([{
    name: 'rand',
    visible: true,
    numargs: 2,
    build: function() {
        return randomInt;
    }
}]);

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
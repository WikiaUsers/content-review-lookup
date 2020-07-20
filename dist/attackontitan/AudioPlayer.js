/***************************************/
/*            Audio Player             */
/***************************************/
/**
* @author: Manuel de la Fuente (https://manuelfte.com)
* @version: 1.0.2
* @license: CC-BY-SA 3.0
* @description: Simple HTML5 audio player

Usage:

<div class="audioplayer" data-file="<URL to file>"></div>

Optional:

data-preload - 'auto' or 'metadata'. Default is 'none'.
data-options - 'autoplay', 'loop' or 'muted'. Accepts multiple choices separated with commas.
*/
console.log('Audio Player v1.0.2')

var divs = document.getElementsByClassName('audioplayer')

for (var i = 0; i < divs.length; i++) {
  var file = divs[i].dataset.file
  var format = file.split('.').pop()
  var preload = divs[i].dataset.preload
  var options = divs[i].dataset.options
  var parsedOptions = ''

  if (preload !== 'auto' || preload !== 'metadata') {
    preload = 'none'
  }
  if (options) {
    var optionsArr = options.split(',')
    var validOptions = ['autoplay', 'loop', 'muted']
    var filteredOptions = optionsArr.filter(function (el) {
      return validOptions.indexOf(el) > -1
    })
    parsedOptions = filteredOptions.join(' ')
  }

  $(divs[i]).removeAttr('data-file data-preload data-options').html('<audio preload="' + preload + '" controls ' + parsedOptions + ' controlsList="nodownload"><source src="' + file + '" type="audio/' + format + '"></audio>')
}
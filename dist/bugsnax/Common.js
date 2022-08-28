/* audio button */
var oggPlayerButtonOnly = false;
						var audio = $(this).find('audio');
						if(audio.prop('play')) {
							OggPlayer.stopAllButtons();
							audio.trigger('play');
						} else {
							audio.trigger('play');
						}
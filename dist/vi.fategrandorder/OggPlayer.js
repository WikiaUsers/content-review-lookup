.audio-button {
    display: inline-block;
    vertical-align: text-top;
    width: 1em;
    height: 1em;
    overflow: hidden;
    border-radius: 3px;
    background-color: #006cb0;
    transition: background-color .2s;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('https://vignette.wikia.nocookie.net/dev/images/d/d6/OggPlayer_play.svg');
}
.audio-button-parent {
    cursor: pointer;
}
.audio-button.now-playing,
.audio-button:hover,
.audio-button-parent:hover > .click-parent {
    background-color: #b30000;
}
.audio-button.now-playing {
    background-image: url('https://vignette.wikia.nocookie.net/dev/images/a/a9/OggPlayer_stop.svg');
}
.audio-button.no-audio {
    cursor: help;
    background-color: #b30000;
    background-image: url('https://vignette.wikia.nocookie.net/dev/images/a/ae/OggPlayer_mute.svg');
}
.ogg-player audio,
.ogg-player video {
    display: inline-block;
}
.ogg-player .info-icon {
    display: none;
    position: absolute;
    z-index: 2;
    background-color: transparent;
    background-image: url('https://images.wikia.nocookie.net/common/skins/shared/images/sprite.png');
    background-repeat: no-repeat;
    background-position: -1228px 0;
    height: 18px;
    width: 18px;
}
.ogg-audio-player .info-icon {
    background-color: rgba(0, 0, 0, .5);
    margin: -5px 0 0 -5px;
    border-radius: 100%;
}
.ogg-video-player .info-icon {
    margin: 2px 0 0 -20px;
}
.ogg-player:hover .info-icon {
    display: inline-block;
}
function AvatarBorder(nickname) {
    var IncludingCode = "<div style=\'position: absolute; bottom: 0px; right: 0px; width: 120px; height: 72px; background: url(https://vignette.wikia.nocookie.net/shadowofmordor/images/6/60/A-Border.png/revision/latest?cb=20141218144741&path-prefix=ru) no-repeat bottom right;\'></div>";
    if (wgTitle == nickname) {
        $('.masthead-avatar').append(IncludingCode);
    }
}

//AvatarBorder('Ramdim');
//AvatarBorder('Plizirim');
//AvatarBorder('Aztekium');
//AvatarBorder('Lelu02');
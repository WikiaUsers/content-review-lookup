function AvatarBorder(nickname) {
    var IncludingCode = "<div style=\'position: absolute; bottom: -10px; right: -20px; width: 120px; height: 72px; background: url(https://images.wikia.nocookie.net/__cb20140219182849/fable/ru/images/c/ce/Avatar-Border.png) no-repeat bottom right;\'></div>";
    if (wgTitle == nickname) {
        $('.masthead-avatar').append(IncludingCode);
    }
}

AvatarBorder('KORNiUX');
AvatarBorder('Plizirim');
AvatarBorder('Карн');
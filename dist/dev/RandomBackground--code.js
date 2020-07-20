// The base code is courtesy of BranDaniMB
// Updated by Saektide
 
if (typeof bgrandom_nightmode != 'undefined' && bgrandom_nightmode === true && typeof bgrandom_nightmode_list != 'undefined' && typeof bgrandom_list != 'undefined') {
 
    // Night mode & Day mode
 
    var t = new Date();
 
    if (t.getHours() >= 20 || t.getHours() <= 7) { //Night mode
        //Select a random background from night-mode
        var bg = bgrandom_nightmode_list[Math.floor(Math.random() * bgrandom_nightmode_list.length)];
 
    } else { //Day mode
        //Select a random background from day-mode
        var bg = bgrandom_list[Math.floor(Math.random() * bgrandom_list.length)];
    }
    //Customize CSS
    $('.mediawiki').css({'background-image' : 'url("'+bg+'")'});
 
} else { // Normal mode
    //Check if bgrandom_list is undefined or not
    if (typeof bgrandom_list == 'undefined') {
 
        console.error('No list of backgrounds for BGRandom found!');
 
    } else {
        //Select a random background
        var bg = bgrandom_list[Math.floor(Math.random() * bgrandom_list.length)];
        //Customize CSS
        $('.mediawiki').css({'background-image' : 'url("'+bg+'")'});
 
    }
}
 
// Check extra settings
    //Background-color
if (typeof bg_color != 'undefined') {
    var bg_color = bg_color;
} else {
    var bg_color = '#000';
}
 
    //Background-size
if (typeof bg_size != 'undefined' && typeof bg_size === 'string') {
    var bg_size = bg_size;
} else {
    var bg_size = 'cover';
}
 
    //Background-attachment
if (typeof bg_attachment != 'undefined' && typeof bg_attachment === 'string') {
    var bg_attachment = bg_attachment;
} else {
    var bg_attachment = 'fixed';
}
 
    //Background-repeat
if (typeof bg_repeat != 'undefined' && typeof bg_repeat === 'string') {
    var bg_repeat = bg_repeat;
} else {
    var bg_repeat = 'no-repeat';
}
 
//design configuration
$('.mediawiki').css({
    'background-color' : bg_color,
    'background-size' : bg_size,
    'background-attachment' : bg_attachment,
    'background-repeat' : bg_repeat,
});
importScriptPage('ChatTags/code.js', 'dev');

$(document).ready(function() {
    var regexp = new Array();
      regexp[0] = new RegExp("skank", "gi");
      regexp[1] = new RegExp("whore", "gi");
      regexp[2] = new RegExp("bitch", "gi");
      regexp[3] = new RegExp("cunt", "gi");
      regexp[4] = new RegExp("slut", "gi");
      regexp[5] = new RegExp("kike", "gi");
      regexp[6] = new RegExp("chink", "gi");
      regexp[7] = new RegExp("nigger", "gi");
      regexp[8] = new RegExp("nigot", "gi");
      regexp[9] = new RegExp("nigra", "gi");
      regexp[10] = new RegExp("nigar", "gi");
      regexp[11] = new RegExp("niggur", "gi");
      regexp[12] = new RegExp("nigga", "gi");
      regexp[13] = new RegExp("nigguh", "gi");
      regexp[14] = new RegExp("niggress", "gi");
      regexp[15] = new RegExp("nigette", "gi");
      regexp[16] = new RegExp("niglet", "gi");
      regexp[17] = new RegExp("faggot", "gi");
      regexp[18] = new RegExp("flit", "gi");
      regexp[19] = new RegExp("gaysian", "gi");
      regexp[20] = new RegExp("dyke", "gi");
      regexp[21] = new RegExp("dike", "gi");
      regexp[22] = new RegExp("fuck", "gi");
      regexp[23] = new RegExp("cock", "gi");
      regexp[24] = new RegExp("dick", "gi");
      regexp[25] = new RegExp("cum", "gi");
      regexp[26] = new RegExp("shit", "gi");
      regexp[27] = new RegExp("chinc", "gi");
      regexp[28] = new RegExp("fellatio", "gi");
      regexp[29] = new RegExp("tit", "gi");
      regexp[30] = new RegExp("twat", "gi");
      regexp[31] = new RegExp("porn", "gi");
      regexp[32] = new RegExp("wank", "gi");
      regexp[33] = new RegExp("dildo", "gi");
        
      
    $('[name="message"]').keypress(function (e) {
        if (e.which == 34) {
            for (var i = 0; i < regexp.length; i++) {
                this.value = this.value.replace(regexp[i], "");
            }
        }
    });
});
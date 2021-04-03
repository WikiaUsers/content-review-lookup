/** <nowiki>
 * 
 * @module          Spoiler
 * @description     Spoiling text (inspired by Discord)
 * @author          Parkour2906
 * @version         1.0
 * @license         CC-BY-SA 3.0
 *  
 */
(function() {
    $(".spoiler").css({"background-color": "black", "color": "black"});
    var state = "spoiled";
    if (state === "spoiled") {
         $(".spoiler").click(function() {
            $(".spoiler").css({"background-color": "rgba(0, 0, 0, 0.8)", "color": "inherit"});
         });
         state = "unspoiled";
    }
    else {
        $(".spoiler").click(function() {
            $(".spoiler").css({"background-color": "black", "color": "black"});
        });
        state = "spoiled";
    }
});
/** </nowiki> **/
!function($) {
    var i = Math.floor( ( Math.random() * 10 ) );
    var anim = {};
    var categories = mw.config.get("wgCategories");
    for (var c = 0; c < categories.length; c++) {
        if (categories[c] == "Chipper & Sons Lumber Co.") {
            anim = {
                // Мини-брюс
                '1': [
                    'https://vignette.wikia.nocookie.net/chipper-and-sons-lumber/images/0/07/MiniBruceLeft.gif/revision/latest?cb=20160219212816', 
              'bottom: -2%; right: -10%;', 
                    {right: '110%'},
                    {right: '110%'}, 
                    'style = ""',
                    5000
                ],
            }
            break;
        }
    }
}
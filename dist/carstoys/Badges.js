(function ($, mw) {
    $(function makeInput() {
        //Put code to add the input box here
    });

    function processAndAdd() {
        var code = parseInt(document.getElementById('code-input').value);
        var badge;
        switch (code) {
        case 335822:
            badge = 1; //Array position of image
            break;

        case 741832:
            badge = 2; //Array position of image
            break;

        case 173683:
            badge = 3; //Array position of image
            break;

        case 462738:
            badge = 4; //Array position of image
            break;

        case 234565:
            badge = 5; //Array position of image
            break;

        case 83464:
            badge = 6; //Array position of image
            break;

        case 12348:
            badge = 7; //Array position of image
            break;

        case 945343:
            badge = 8; //Array position of image
            break;

        case 257358:
            badge = 9; //Array position of image
            break;

        case 58269:
            badge = 10; //Array position of image
            break;
        default:
            alert('Invalid code!');
        }
        var badge_images = [
            "File:Badge1.png",
            "File:Badge2.png",
            "File:Badge3.png",
            "File:Badge4.png",
            "File:Badge5.png",
            "File:Badge6.png",
            "File:Badge7.png",
            "File:Badge8.png",
            "File:Badge9.png",
            "File:Badge10.png",
        ];
        var badge_assembly = '[[' + badge_images[badge] + ']]';
    }

}(jQuery, mediaWiki));
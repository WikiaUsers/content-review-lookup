/* Any JavaScript here will be loaded for all users on every page load. */
$(window).load(function() {
    var newModule = '<section class="module newModule"></section>';
    $('#WikiaRail').append(newModule);
    $.getJSON('/api.php?action=parse&text={{Module}}&format=json', function(n) {
        var addContent = n.parse.text['*'];
        $('.newModule').append(addContent);
    });
});

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
        speedTip: "Redirect",
        tagOpen: "#REDIRECT [[",
        tagClose: "]]",
        sampleText: "Insert text"
    };

mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png",
        speedTip: "Insert character template",
        tagOpen: "\{\{Character\r| MainImage                   = ",
        tagClose: "\r| ThumbImage                  = \r| CharName                    = \r| Type                        = \r| CharDescription             = \r\r| Number                      = \r| Class                       = \r| Class2                      = \r| Rarity                      = \r\r| MaxLevel                    = \r| Cost                        = \r| EXP                         = \r| Sockets                     = \r\r| HP                          = \r| Attack                      = \r| RCVmax                      = \r| Combo                       = \r\r| SkillName                   = \r| SkillDesc                   = \r| MaxTurns                    = \r| MinTurns                    = \r| ManualLocation              = \r\r| CaptainAbilityName          = \r| CaptainAbilityDesc          = \r\r| Tandem                      = \r| EvolutionChain              = \r| EvolutionMaterials          = \r| Obtain                      = \r\}\}",
        sampleText: ""
    };
    
mwCustomEditButtons[mwCustomEditButtons.length] = {
        imageFile: "https://images.wikia.nocookie.net/marveldatabase/images/2/2c/Race_Button.png",
        speedTip: "Insert Event template",
        tagOpen: "\{\{Event Build\r| Banner                   = ",
        tagClose: "\r\r| Quest1                   = \r| Boss1                    = \r| Stamina1                 = \r| Battles1                 = \r| Difficulty1              = \r| Conditions1              = \r\r| Quest2                   = \r| Boss2                    = \r| Stamina2                 = \r| Battles2                 = \r| Difficulty2              = \r| Conditions2              = \r\r| Quest3                   = \r| Boss3                    = \r| Stamina3                 = \r| Battles3                 = \r| Difficulty3              = \r| Conditions3              = \r\r| Quest4                   = \r| Boss4                    = \r| Stamina4                 = \r| Battles4                 = \r| Difficulty4              = \r| Conditions4              = \r\r| Manuals                  = \r\r\}\}",
        sampleText: ""
    };

};

// Nakama Network Integration by User:RoboCafaz
//     See: 'MediaWiki:NakamaNetwork/NakamaNetwork.js'
//          'MediaWiki:NakamaNetwork/NakamaNetwork.css'

importArticle({
    type: 'script',
    article: 'MediaWiki:NakamaNetwork/NakamaNetwork.js'
});
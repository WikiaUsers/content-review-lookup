  //****************************\\
 //*Цветные комментарии и прочие*\\
//********************************\\ 
(function() {

 
    var Admin = Style({
        'background-color': "rgba(216, 180, 88, 0.85) ",
        'background-image': "url('https://images.wikia.nocookie.net/__cb20140625215453/lotrminecraftmod/images/0/03/Admin1_120.png')",
        'background-position': 'top center',
        'background-repeat': 'no-repeat',
        'border': "6px double "
    });
 
 
    var rightUsers = {
        "Dwarf warrior GIMLI SON OF GlOIN": new Admin("Dwarf warrior GIMLI SON OF GlOIN").inc('border', '#DAA520'),
        
    };
 
    /*******************************************/
 
    var headStyles = '';
    for (var nick in rightUsers) {
        var $bubbleMessage = $('.speech-bubble-avatar img[alt="' + nick + '"]').parent().parent().parent().children('.speech-bubble-message');
        if ($bubbleMessage.length) {
            headStyles += rightUsers[nick].getStyle();
            console.log(rightUsers[nick].getStyle());
            $bubbleMessage.attr('id', rightUsers[nick].getId);
        }
    }
    if (headStyles.length) $('head').append("<style>" + headStyles + "</style>");
 
    function Style(styles) {
        function NewStyle (id) {
            this.styles = styles;
            this.Id = id;
            this.getId = 'color-usertalk-post-' + this.Id;
        }
 
        NewStyle.prototype.getStyle = function() {
            var _styles = "{";
            for (var k in this.styles) {
                _styles += k + ':' + this.styles[k] + ';';
            }
            return '#color-usertalk-post-' + this.Id + _styles + '}';
        };
 
        NewStyle.prototype.inc = function(property, value) {
            if (typeof this.styles[property] !== 'undefined')
                this.styles[property] += value;
            else
                this.styles[property] = value;
            return this;
        };
 
        return NewStyle;
    }
})();
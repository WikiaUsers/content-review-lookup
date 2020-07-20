(function() {
    
    var Creator = Style({
        'background-color': "rgba(218, 165, 32, 1)",
        'background-image': "url('https://vignette.wikia.nocookie.net/genstructures/images/7/7e/Generalissimus.png/revision/latest?cb=20171031103756&path-prefix=ru')",
        'background-position': 'top center',
        'background-repeat': 'no-repeat',
        'border': "3px solid "
    });
 
    var rightUsers = {
        "Александр III": new Creator("Александр III").inc('border', '#006400')
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
$(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        mw.util.addCSS(
            '.Write [name="message"] {' +
                'width: calc(100% - 70px);' +
            '}' +
            '#ChatBinaryButton {' +
                'position: absolute;' +
                'bottom: 25px;' +
                'right: 50px;' +
            '}' +
            'input + #ChatBinaryButton:last-child {' +
                'bottom: 12px;' +
                'right: 12px;' +
            '}'
        );
 
        var binaryValue;
        var binaryButton = $('<span class="button" id="ChatBinaryButton">Binary!</span>');
 
        function binary() {
            var input = $('#Write textarea').val();
            var inputArray = input.split("");
            var inputBinary = inputArray.map(mapArray);
            binaryValue = inputBinary.join(" ");
        }
 
        function mapArray(a) {
            var b;
            for (var i = 0; i < a.length; i++) {
                b = a.charCodeAt(i).toString(2);
            }
            return b.length == 8 ? b : "0" + b;
        }
 
        binaryButton.click(function(){
            var iteration = $(this).data('iteration') || 1;
            switch (iteration) {
                case 1:
                    binary();
                    $('#Write textarea').val('');
                    $('#Write textarea').val(binaryValue);
                    break;
                case 2:
                    $('#Write textarea').val('');
                    mainRoom.socket.send(new models.ChatEntry({roomId:this.roomId,name:wgUserName,text:binaryValue}).xport());
                    break;
            }
            iteration++;
            if (iteration > 2) {
                iteration = 1;
            }
            $(this).data('iteration', iteration);
        });
        $('.Write').append(binaryButton);
    }
});
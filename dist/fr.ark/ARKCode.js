// Used by [[Template:ARKCode]]
$(function(){
    if(document.getElementsByClassName('ARKCode-container').length == 0){return;} //early return

    var ARKCodeImages = ['https://ark.gamepedia.com/media/ark.gamepedia.com/6/6f/ARKCode0.png?version=c212e9ef2629073ca482172f12731f11',
        'https://ark.gamepedia.com/media/ark.gamepedia.com/b/b3/ARKCode1.png?version=bdf880a929f586253368d413dc6bbf33',
        'https://ark.gamepedia.com/media/ark.gamepedia.com/a/aa/ARKCode2.png?version=5ba1a8ec9f47306eb4c6c7de2590d23c',
        'https://ark.gamepedia.com/media/ark.gamepedia.com/4/40/ARKCode3.png?version=446ed7503fe0b358446d149fe6b1d90b'];
    function ARKCodeDecode(input) {
        var code = input.children[0].children[1].value;
        var codeRep = input.children[1].children[1];
        var outputEl = input.children[2].children[1];

        codeRep.innerHTML = '';

        code = code.replace(/[^wasd \n]/g, '');
        var output = '';
        var codeRepOutput = '';
        var ii = 0;
        var c = 0;
        for (var i = 0; i < code.length; i++) {
            if (code[i] == ' ' || code[i] == '\n') {
                output += ' ';
                ii = 0;
                if (code[i] == '\n') {
                    codeRepOutput += '<br/>';
                }
                continue;
            }
            var add = 0;
            switch (code[i]) {
                case 'd':
                    add = 1;
                    break;
                case 's':
                    add = 2;
                    break;
                case 'w':
                    add = 3;
                    break;
            }
            c = c * 4 + add;

            codeRepOutput += '<img alt="' + add + '" src="' + ARKCodeImages[add] + '" width="46" height="24">';

            if (ii == 3 || i == code.length - 1) {
                ii = 0;
                if (c > 31 && c < 127) {
                    output += String.fromCharCode(c);
                }
                c = 0;
            } else {
                ii++;
            }
        }
        outputEl.innerHTML = output;
        codeRep.innerHTML = codeRepOutput;
    }

    // replace the textarea div(s) with an actual textarea
    for(var textDiv of document.getElementsByClassName('ARKCode-textarea')){
        var newNode = document.createElement('textarea');
        console.log(textDiv.style);
        newNode.setAttribute('style', textDiv.getAttribute('style'));
        console.log(newNode.style);
        newNode.value = textDiv.textContent;
        newNode.classList = textDiv.classList;
        textDiv.parentElement.appendChild(newNode);
        newNode.addEventListener('input', function(){ARKCodeDecode(newNode.parentElement.parentElement)});
        textDiv.remove();
    }

	// replace the button div(s) with an actual button
    for(var buttonDiv of document.getElementsByClassName('ARKCode-button')){
        var newNode = document.createElement('input');
        newNode.type = 'button';
        newNode.classList = buttonDiv.classList;
        newNode.value = buttonDiv.textContent;
        buttonDiv.parentElement.appendChild(newNode);
        addEventListener('click', function(){ARKCodeDecode(newNode.parentElement.parentElement)});
        buttonDiv.remove();
    }
});
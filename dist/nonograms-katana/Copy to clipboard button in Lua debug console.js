/*
	This code adds a "Copy to clipboard" button next to the "Clear" button
	in the Lua debug console, which copies the output of the module to
	clipboard.
*/

mw.hook('wikipage.editform').add(()=>{
    if (![ 'edit', 'submit' ].includes(mw.config.get('wgAction')) || mw.config.get('wgNamespaceNumber') !== 828) return;
    let copy_button = $('<input>', {
        value: 'COPY TO CLIPBOARD',
        type: 'button',
        style: 'margin-left: 10px;',
        click: () => {
            // Get the output text from the Lua module.
            var lua_res = document.querySelector(".mw-scribunto-normalOutput:last-child");
            if (!lua_res) return;
            var copy_text = lua_res.innerText;
    
            // Copy the output text.
            var copyEl = document.createElement('textarea');
            copyEl.value = copy_text;
            document.body.appendChild(copyEl);
            copyEl.select();
            document.execCommand('copy');
            document.body.removeChild(copyEl);
            document.execCommand('copy');
        }
    });
    $('input[value=Clear]').after(copy_button);    
});
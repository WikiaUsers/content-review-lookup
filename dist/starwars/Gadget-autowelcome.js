// autowelcome button, developed by Booply. for opt-in user gadget

mw.loader.using('user').then(function () {
    const userTalkEditRedlinkRegex = /^https:\/\/starwars\.fandom\.com\/wiki\//;

    if (userTalkEditRedlinkRegex.test(window.location.href)) {
        const portletlink = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = 'Send subst:w';
        portletlink.appendChild(link);

        link.addEventListener('click', function (e) {
            e.preventDefault();

            const editableDiv = document.querySelector('.cm-content[contenteditable="true"]');

            if (editableDiv) {
                // Simulate typing the string "subst:w"
                simulateTyping(editableDiv, '{', 10);
                setTimeout(() => {
                    simulateTyping(editableDiv, '{subst:w}}', 10);
                }, 20); // Delay before typing the second part

                // Trigger save after a short delay
                setTimeout(() => {
                    const saveButton = document.getElementById('wpSave');
                    if (saveButton) {
                        saveButton.click();
                    } else {
                        console.log("Save button not found.");
                    }
                }, 1500); // Delay to ensure content is updated before save

            } else {
                alert("Editable div not found.");
            }
        });

        const myToolsMenu = document.querySelector('#my-tools-menu');
        if (myToolsMenu) {
            myToolsMenu.appendChild(portletlink);
        } else {
            console.log('My Tools menu not found.');
        }
    } else {
        console.log('Page URL does not match required pattern. Button not added.');
    }
});

// Simulate typing into a contenteditable div
function simulateTyping(element, text, interval = 100) {
    let index = 0;
    const typeNextChar = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeNextChar, interval);
        }
    };
    typeNextChar();
}
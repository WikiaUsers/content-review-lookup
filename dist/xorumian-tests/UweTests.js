// The css used for this feature can be found in MediaWiki:UweInactivityWindow.css

let timeout;

function createPrompt() {
    let modal = document.createElement('div');
    modal.id = 'inactivityModal';
    modal.style.display = 'flex';

    let prompt = document.createElement('div');
    prompt.id = 'inactivityPrompt';

    let img = document.createElement('img');
    img.src = 'https://static.wikia.nocookie.net/xorumian-things/images/2/22/Heinrych.png/revision/latest/scale-to-width-down/1000?cb=20241007193623&path-prefix=de';

    let text1 = document.createElement('span');
    text1.className = 'text-line1';
    text1.innerText = 'You haven\'t moved your mouse for at least five minutes. That got us wondering:';

    let text2 = document.createElement('span');
    text2.className = 'text-line2';
    text2.innerText = 'Are you still alive?';

    let buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainer';

    let yesButton = document.createElement('button');
    yesButton.innerText = 'Yes';
    yesButton.onclick = hidePrompt;

    let noButton = document.createElement('button');
    noButton.innerText = 'No';

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);

    prompt.appendChild(img);
    prompt.appendChild(text1);
    prompt.appendChild(document.createElement('br')); // Line break
    prompt.appendChild(text2);
    prompt.appendChild(document.createElement('br')); // Line break
    prompt.appendChild(buttonContainer);
    modal.appendChild(prompt);
    document.body.appendChild(modal);
    
    // Add ::before pseudo-element 
    let style = document.createElement('style');
    style.innerHTML = `
        #inactivityModal::before {
        content: "";
        }
    `;
    document.head.appendChild(style);
}

function showPrompt() {
    let modal = document.getElementById('inactivityModal');
    if (!modal) {
        createPrompt();
    } else {
        modal.style.display = 'flex';
    }
}

function hidePrompt() {
    let modal = document.getElementById('inactivityModal');
    if (modal) {
        modal.style.display = 'none';
    }
    resetTimer();
}

function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(showPrompt, 300000); // 5 minutes till summoning of Heinrych
}

document.onmousemove = resetTimer; // Reset timer on mouse movement

document.onkeydown = function(event) {
    if (event.key === 'ø') { // Window also appears if key 'ø' is pushed
        showPrompt();
    }
};

resetTimer(); // Start timer when site loads
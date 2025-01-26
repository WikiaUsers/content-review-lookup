mw.loader.using('mediawiki.util').then(function () {
    var inputBarHTML = '<div class="custom-input-bar">' +
        '<div class="custom-input-field" contenteditable="true">Type your message...</div>' +
        '<div class="wds-button custom-comments">Send</div>' +
        '</div>';


    var target = document.getElementById('mw-content-text');
    if (target && !target.querySelector('.custom-input-bar')) {
        target.insertAdjacentHTML('beforeend', inputBarHTML);
    }

    function setupInputField(inputField) {
        inputField.addEventListener('focus', function () {
            if (inputField.innerText.trim() === "Type your message...") {
                inputField.innerText = "";
            }
            inputField.classList.add('__focused');
        });

        inputField.addEventListener('focusout', function () {
            if (inputField.innerText.trim() === "") {
                inputField.innerText = "Type your message...";
            }
            inputField.classList.remove('__focused');
        });
    }

    function setupSendButton(sendButton, inputField) {
        sendButton.addEventListener('click', function () {
            var inputText = inputField.innerText.trim();
            if (inputText !== "" && inputText !== "Type your message...") {
                fetch('https://superpowersportal.fandom.com/api.php?action=query&meta=userinfo&format=json')
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        if (data.query.userinfo.hasOwnProperty('anon')) {
                            alert("Please log in");
                        } else {
                            var userId = data.query.userinfo.id;
                            var userName = data.query.userinfo.name;
                            var commentContent = '<div id="custom-comments-' + userId + '" class="custom__comments" data-uid="' + userId + '">' +
                                '<div class="custom-comments__author">[[User:' + userName + '|' + userName + ']]</div>' +
                                '<div class="custom-comments__text">' + inputText + '</div>' +
                                '<div class="custom-comments__icon">:</div>' +
                                '</div>';
                            fetch('https://superpowersportal.fandom.com/api.php?action=query&meta=tokens&format=json')
                                .then(function (response) {
                                    return response.json();
                                })
                                .then(function (data) {
                                    var csrfToken = data.query.tokens.csrftoken;
                                    var editData = {
                                        action: 'edit',
                                        title: 'Rarity/ArticleComments',
                                        section: 'new',
                                        text: commentContent,
                                        token: csrfToken,
                                        format: 'json'
                                    };
                                    fetch('https://superpowersportal.fandom.com/api.php', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        },
                                        body: Object.keys(editData).map(function (key) {
                                            return encodeURIComponent(key) + '=' + encodeURIComponent(editData[key]);
                                        }).join('&')
                                    })
                                        .then(function (response) {
                                            return response.json();
                                        })
                                        .then(function (data) {
                                            console.log('Edit successful:', data);
                                        })
                                        .catch(function (error) {
                                            console.error('Error editing page:', error);
                                        });
                                })
                                .catch(function (error) {
                                    console.error('Error fetching CSRF token:', error);
                                });
                        }
                    })
                    .catch(function (error) {
                        console.error('Error fetching user info:', error);
                    });
            } else {
                alert("Please enter content to comment.");
            }
        });
    }

    Array.prototype.forEach.call(document.querySelectorAll('.custom-input-bar'), function (inputBar) {
        var inputField = inputBar.querySelector('.custom-input-field');
        var sendButton = inputBar.querySelector('.custom-comments');
        setupInputField(inputField);
        setupSendButton(sendButton, inputField);
    });
});
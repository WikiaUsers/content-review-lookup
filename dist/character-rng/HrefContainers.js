// Function to apply click and hover functionality to character, item, key, staff, and gamepass containers
document.querySelectorAll('.character-container, .item-container, .key-container, .staff-container, .gamepass-container, .badge-container').forEach(function(container) {
    var link;
    var isHoldingLeft = false;
    var isHoldingMiddle = false;

    // Determine the link based on the container type
    if (container.classList.contains('character-container')) {
        var characterLinkElement = container.querySelector('.character-body a');
        if (characterLinkElement) {
            link = characterLinkElement.getAttribute('href') || 'https://character-rng.fandom.com/wiki/Category:Characters';
        }
    } else if (container.classList.contains('item-container')) {
        var itemLinkElement = container.querySelector('.item-body a');
        if (itemLinkElement) {
            link = itemLinkElement.getAttribute('href') || 'https://character-rng.fandom.com/wiki/Category:Items';
        }
    } else if (container.classList.contains('key-container')) {
        var keyLinkElement = container.querySelector('.key-body a');
        if (keyLinkElement) {
            link = keyLinkElement.getAttribute('href') || 'https://character-rng.fandom.com/wiki/Category:Keys';
        }
    } else if (container.classList.contains('staff-container')) {
        var userId = container.getAttribute('data-userid');
        if (userId) {
            link = 'https://www.roblox.com/users/' + userId + '/profile';
        }
    } else if (container.classList.contains('gamepass-container')) {
        var gamepassID = container.getAttribute('data-gamepassid');
        if (gamepassID) {
            link = 'https://www.roblox.com/game-pass/' + gamepassID;
        }
    } else if (container.classList.contains('badge-container')) {
        var badgeID = container.getAttribute('data-badgeid');
        if (badgeID) {
            link = 'https://www.roblox.com/badges/' + badgeID;
        }
    }

    // If a link is found, apply the necessary functionality
    if (link) {
        container.style.cursor = 'pointer';

        // On mousedown: start tracking both left and middle mouse button hold
        container.addEventListener('mousedown', function(event) {
            if (event.button === 0) {
                isHoldingLeft = true;
            } else if (event.button === 1) {
                event.preventDefault();
                isHoldingMiddle = true;
            }
        });

        // On mouseup: navigate based on which button was held and released
        container.addEventListener('mouseup', function(event) {
            if (isHoldingLeft && event.button === 0) {
                window.location.href = link;
            } else if (isHoldingMiddle && event.button === 1) {
                window.open(link, '_blank');
            }
            isHoldingLeft = false;
            isHoldingMiddle = false;
        });

        // On mouseleave: cancel the hold if the mouse leaves the container
        container.addEventListener('mouseleave', function() {
            isHoldingLeft = false;
            isHoldingMiddle = false;
        });
    }
});
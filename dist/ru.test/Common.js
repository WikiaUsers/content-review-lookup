/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

// Calculate the diff - Modified by Eladkse
    if ((diff % 60) == 1) {
        left = (diff % 60) + ' секунды';
    } else {
        left = (diff % 60) + ' секунда';
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 60) == 1) {
            left = (diff % 60) + ' минута, и ' + left;
        } else {
            left = (diff % 60) + ' минут, и ' + left;
        }
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 24) == 1) {
            left = (diff % 24) + ' час, ' + left;
        } else {
            left = (diff % 24) + ' часов, ' + left;
        }
    }
    diff = Math.floor(diff / 24);
    if (diff > 0) {
        if (diff == 1) {
            left = diff + ' день, ' + left;
        } else {
            left = diff + ' дней, ' + left;
        }
    }
    timers[i].firstChild.nodeValue = tpm + left;
 
    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}


});
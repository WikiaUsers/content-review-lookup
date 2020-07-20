window.onload = function () {
    var spoilers = [];
    var spoilersNumbers = [];
    var buttons = [];
 
    {
        var oldSpoilers = $('.spoiler').toArray();
        var removeSpoilers = [];
        for (var si in oldSpoilers) {
            var s = oldSpoilers[si];
            for (var clsi = 0; clsi < s.classList.length; clsi++) {
                var cls = s.classList[clsi];
                if (cls.startsWith('spoilerNr')) {
                    var number = parseInt(cls.substring('spoilerNr'.length));
                    if (!isNaN(number)) {
                        if (spoilersNumbers.indexOf(number) < 0) {
                            removeSpoilers.push(s);
                            spoilers[number - 1] = $(s);
                            spoilersNumbers[number - 1] = number;
                        } else {
                            $(s).removeClass(cls);
                        }
                    }
                }
            }
        }
 
        for (var si in removeSpoilers) {
            oldSpoilers.splice(oldSpoilers.indexOf(removeSpoilers[si]), 1);
        }
 
        var curSpoilerNumber = 1;
        for (var si in oldSpoilers) {
            var s = oldSpoilers[si];
            while (spoilersNumbers.indexOf(curSpoilerNumber) >= 0) {
                curSpoilerNumber++;
            }
            s = $(s).addClass('spoilerNr' + curSpoilerNumber)[0];
            spoilers[curSpoilerNumber - 1] = $(s);
            spoilersNumbers[curSpoilerNumber - 1] = curSpoilerNumber;
        }
    }
 
    for (var si in spoilers) {
        var s = spoilers[si];
        s.addClass('collapse');
        var btn = s.find('.spoilerButton');
        buttons.push(btn[0]);
        var content = s.find('.spoilerContent');
        updateButtonTextPerSpoiler(s[0]);
        s.removeClass('notInit');
        content.hide(0, function() {
            btn.click(function () {
                var fromSpoiler = $(this).parent('.spoiler');
                var collapse = toggleSpoiler($(this).parent('.spoiler')[0]);
                toggleSpoilerNrs(this, collapse, fromSpoiler[0]);
            });
        });
    }
 
    {
        var buttonX = $('.spoilerButton[class*="spoilerNr"]').toArray();
        for (var btni in buttonX) {
            var btn = buttonX[btni];
            if (buttons.indexOf(btn) < 0) {
                buttons.push(btn);
                $(btn).click(function () {
                    $(this).toggleClass('collapse');
                    updateButtonText(this);
                    toggleSpoilerNrs(this, $(this).hasClass('collapse'), null);
                });
            }
        }
    }
 
    function toggleSpoilerNrs(button, collapse, fromSpoiler) {
        var ss = findAllSpoilers(button);
        for (var si in ss) {
            var s = ss[si];
            if (fromSpoiler !== s && collapse !== $(s).hasClass('collapse')) {
                toggleSpoiler(s);
            }
        }
    }
 
    function findAllSpoilers(button) {
        var spoilers = [];
        for (var clsi = 0; clsi < button.classList.length; clsi++) {
            var cls = button.classList[clsi];
            if (cls.startsWith('spoilerNr')) {
                var number = parseInt(cls.substring('spoilerNr'.length));
                if (!isNaN(number)) {
                    spoilers.push($('.spoiler.' + cls)[0]);
                }
            }
        }
        return spoilers;
    }
 
    function findAllSpoilerButtonsOutsideSpoiler(spoiler) {
        var buttons = [];
        var buttonsInSpoilers = $('.spoiler .spoilerButton').toArray();
        for (var clsi = 0; clsi < spoiler.classList.length; clsi++) {
            var cls = spoiler.classList[clsi];
            if (cls.startsWith('spoilerNr')) {
                var number = parseInt(cls.substring('spoilerNr'.length));
                if (!isNaN(number)) {
                    $('.spoilerButton.' + cls).each(function (i, e) {
                        if (buttonsInSpoilers.indexOf(e) < 0) {
                            buttons.push(e);
                        }
                    });
                }
            }
        }
        return buttons;
    }
 
    function anySpoilerCollapse(button) {
        var spoilers = findAllSpoilers(button);
        for (var si in spoilers) {
            var s = spoilers[si];
            if ($(s).hasClass('collapse')) {
                return true;
            }
        }
        return false;
    }
 
    function toggleSpoiler(spoiler) {
        spoiler = $(spoiler);
        var content = spoiler.find('.spoilerContent');
        var animationSpeed = Math.sqrt(content.height() * 10) * 25;
        spoiler.toggleClass('collapse');
        updateButtonTextPerSpoiler(spoiler[0]);
        var collapse = spoiler.hasClass('collapse');
        if (collapse) {
            content.hide(animationSpeed);
        } else {
            content.show(animationSpeed);
        }
        var buttons = findAllSpoilerButtonsOutsideSpoiler(spoiler[0]);
        for (var bi in buttons) {
            var b = buttons[bi];
            if (anySpoilerCollapse(b)) {
                $(b).addClass('collapse');
            } else {
                $(b).removeClass('collapse');
            }
            updateButtonText(b);
        }
        return collapse;
    }
 
    function updateButtonTextPerSpoiler(spoiler) {
        spoiler = $(spoiler);
        var btn = spoiler.find('.spoilerButton');
        if (spoiler.hasClass('collapse')) {
            btn.find('.spoilerButtonText').html(btn.attr('data-showText'));
        } else {
            btn.find('.spoilerButtonText').html(btn.attr('data-hideText'));
        }
    }
 
    function updateButtonText(button) {
        button = $(button);
        if (button.hasClass('collapse')) {
            button.find('.spoilerButtonText').html(button.attr('data-showText'));
        } else {
            button.find('.spoilerButtonText').html(button.attr('data-hideText'));
        }
    }
 
};
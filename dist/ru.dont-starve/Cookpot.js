function timer() {
    for (var i = 4; i > 1; i = i - 1) {
        $('<span style="font-weight:bold;" id="chance' + i + '"></span>').prependTo('#cookpotWorkSpace');
        $('<span style="position: relative;"><img class="hiddeningredientcookpot" id="result' + i + '"></span>').prependTo('#cookpotWorkSpace');
    }

    $('<span style="font-weight:bold;" id="chance1"></span>').prependTo('#cookpotWorkSpace');
    $('<span style="position: relative;"><img class="result-cell-cookpot" id="result1"></span>').prependTo('#cookpotWorkSpace');
    $('<span style="position: relative;"><img id="arrowcookpot" class="cookpotarrow" src="https://vignette.wikia.nocookie.net/dont-starve/images/d/d2/Crock_Pot.png/revision/latest?cb=20130110150334&path-prefix=ru"></span>').prependTo('#cookpotWorkSpace');
    $('<span style="position: relative;"><img class="ingredientcookpot" id="cookpot4" onclick="cookpotDelete(3)"></span>').prependTo('#cookpotWorkSpace');
    $('<span style="position: relative;"><img class="ingredientcookpot" id="cookpot3" onclick="cookpotDelete(2)"></span>').prependTo('#cookpotWorkSpace');
    $('<span style="position: relative;"><img class="ingredientcookpot" id="cookpot2" onclick="cookpotDelete(1)"></span>').prependTo('#cookpotWorkSpace');
    $('<span style="position: relative;"><img class="ingredientcookpot" id="cookpot1" onclick="cookpotDelete(0)"></span>').prependTo('#cookpotWorkSpace');

    $('#cpclear').attr('onclick', 'cookpotDeleteAll()');
    $(".cookpot .inglist a").each(function() {
        var src = $(this).children('img').attr('data-src');
        var title = $(this).attr('title');
        var name = $(this).children('img').attr('data-image-name');
        name = name.replace('.png', '');
        $(this).attr('title', name);
        $(this).removeAttr('href');
        $(this).removeClass('image-thumbnail image');
        $(this).attr('onclick', 'cookpotAdd("' + title + '","' + src + '")');
    });
    $(".cookpot .cookpoting a").each(function() {
        $(this).removeAttr('href');
        $(this).removeClass('image-thumbnail image');
    });
    $("#foods a").each(function() {
        var id = $(this).attr('title');
        $(this).attr('id', id);
        $(this).removeAttr('href');
        $(this).removeClass('image-thumbnail image');
    });
    $('#description > a, #description2 > a, #description3 > a, #description4 > a').each(function() {
        var src = $(this).children('img').attr('data-src');
        $(this).children('img').attr('src', src);
    });

    $('#buttonds').click(function sortds() {
        $(".ds").css({
            "display": ""
        });
        $(".rog, .sw, .h, .dst, .warlydst").css({
            "display": "none"
        });
        $("#buttonds").addClass("buttoncb");
        $("#buttonrog, #buttonsw, #buttonh, #buttondst").removeClass("buttoncb");
        cookpotDeleteAll();
        dlc = 'DS';
    });

    $('.result-cell-cookpot').click(function _() {
        if (event.ctrlKey == true) {
            var href = $(this).attr('href');
            if (href != undefined) {
                window.open(href, '_blank');
            }
        }
    });

    $('.cookpot-name-label').click(function _() {
        var href = $(this).attr('href');
        if (href != undefined) {
            window.open(href, '_blank');
        }
    });

    $('#buttonrog').click(function sortrog() {
        $(".rog").css({
            "display": ""
        });
        $(".ds, .sw, .h, .dst, .warlydst").css({
            "display": "none"
        });
        $("#buttonrog").addClass("buttoncb");
        $("#buttonds, #buttonsw, #buttonh, #buttondst").removeClass("buttoncb");
        cookpotDeleteAll();
        dlc = 'RoG';
    });
    $('#buttonsw').click(function sortsw() {
        $(".sw").css({
            "display": ""
        });
        $(".ds, .rog, .h, .dst, .warlydst").css({
            "display": "none"
        });
        $("#buttonsw").addClass("buttoncb");
        $("#buttonds, #buttonrog, #buttonh, #buttondst").removeClass("buttoncb");
        cookpotDeleteAll();
        dlc = 'SW';
    });
    $('#buttonh').click(function sorth() {
        $(".h").css({
            "display": ""
        });
        $(".ds, .rog, .sw, .dst, .warlydst").css({
            "display": "none"
        });
        $("#buttonh").addClass("buttoncb");
        $("#buttonds, #buttonrog, #buttonsw, #buttondst").removeClass("buttoncb");
        cookpotDeleteAll();
        dlc = 'H';
    });
    $('#buttondst').click(function sortdst() {
        $(".dst").css({
            "display": ""
        });
        $(".ds, .sw, .h, .rog, .warlydst").css({
            "display": "none"
        });
        $("#buttondst").addClass("buttoncb");
        $("#buttonds, #buttonsw, #buttonh, #buttonrog").removeClass("buttoncb");
        cookpotDeleteAll();
        dlc = 'DST';
        if ($('#buttonwarly').hasClass('buttonwarly')) {
            $(".warly, .warlydst").css({
                "display": ""
            });
        }
    });

    $('#buttonwarly').click(function sortwarly() {
        cookpotDeleteAll();
        if (!$(this).hasClass('buttonwarly')) {
            $(".warly, .warlydst").css({
                "display": ""
            });
            $("#buttonwarly").addClass("buttonwarly");
            warly = true;
        } else {
            $(".warly, .warlydst").css({
                "display": "none"
            });
            $(".buttonwarly").removeClass("buttonwarly");
            warly = false;
        }
    });

    $('#bmeat').click(function meat() {
        $(".meat, .meatfish").addClass("light");
        $(".veggie, .fish, .fruit, .other").removeClass("light");
        $("#bmeat").css({
            "background-color": "#88684c82"
        });
        $("#bveggie, #bfish, #bfruit, #bother").css({
            "background-color": "transparent"
        });
    });

    $('#bfish').click(function fish() {
        $(".fish, .meatfish").addClass("light");
        $(".veggie, .meat, .fruit, .other").removeClass("light");
        $("#bfish").css({
            "background-color": "#88684c82"
        });
        $("#bveggie, #bmeat, #bfruit, #bother").css({
            "background-color": "transparent"
        });
    });

    $('#bveggie').click(function veggie() {
        $(".veggie").addClass("light");
        $(".meat, .fish, .meatfish, .fruit, .other").removeClass("light");
        $("#bveggie").css({
            "background-color": "#88684c82"
        });
        $("#bmeat, #bfish, #bfruit, #bother").css({
            "background-color": "transparent"
        });
    });

    $('#bfruit').click(function fruit() {
        $(".fruit").addClass("light");
        $(".veggie, .meat, .meatfish, .fish, .other").removeClass("light");
        $("#bfruit").css({
            "background-color": "#88684c82"
        });
        $("#bveggie, #bfish, #bmeat, #bother").css({
            "background-color": "transparent"
        });
    });

    $('#bother').click(function other() {
        $(".other").addClass("light");
        $(".veggie, .meat, .fruit, .fish, .meatfish").removeClass("light");
        $("#bother").css({
            "background-color": "#88684c82"
        });
        $("#bveggie, #bmeat, #bfruit, #bfish").css({
            "background-color": "transparent"
        });
    });

    $('#bclear').click(function clear() {
        $(".veggie, .meat, .fruit, .fish, .meatfish, .other").removeClass("light");
        $("#bveggie, #bmeat, #bfruit, #bfish, #bother").css({
            "background-color": "transparent"
        });
    });

    $('#buttonds, #buttonrog, #buttonsw, #buttonh, #buttondst, #buttonwarly').click(function() {
        $(function() {
            $(".cookpot img.lzy, .cookpotbutton img.lzy").each(function() {
                var dataSrc = $(this).attr('data-src');
                if (dataSrc) {
                    $(this).attr('src', dataSrc);
                }
            });
        });
    });

    $('.cookpot > div > p > span > span > a > img').on('click', function() {
        if (event.ctrlKey == true) {
            var href = $(this).attr('data-image-name').replace('.png', '');
            window.open(href, '_blank').focus();
        }
    });
}

var dlc = "DS";
var warly = false;
var api;
var cookpot = new Array(4);
setTimeout(timer, 1000);

mw.hook('wikipage.content').add(function() {
    console.log("Api loaded!");
    api = new mw.Api();
});

window.cookpotDeleteResult = function() {
    if (cookpotIsFull(cookpot)) {
        api.abort();
        if (navigator.userAgent.includes('Firefox')) {
            $('#result1').removeAttr('src');
        } else {
            $('#result1').attr('src', ' ');
        }
        $('#result1').removeAttr('href');
        $('#arrowcookpot').attr('src', "https://vignette.wikia.nocookie.net/dont-starve/images/d/d2/Crock_Pot.png/revision/latest?cb=20130110150334&path-prefix=ru");
        $('#chance1').text(' ');
        $('#description1').css({
            "display": "none"
        });
        for (var i = 4; i > 1; --i) {
            if (($('#result' + i).css('display')) !== 'none') {
                $('#chance' + i).text(' ');
                $('#description' + i).css({
                    "display": "none"
                });
                $('#result' + i).removeClass('result-cell-cookpot');
                $('#result' + i).addClass('hiddeningredientcookpot');
                $('#result' + i).attr('src', ' ');
            }
        }
    }
};

window.cookpotDelete = function(i) {
    cookpotDeleteResult();
    delete cookpot[i];
    if (navigator.userAgent.includes('Firefox')) {
        $('#cookpot' + (i + 1)).removeAttr('src');
    } else {
        $('#cookpot' + (i + 1)).attr('src', ' ');
    }
};

window.cookpotDeleteAll = function() {
    cookpotDeleteResult();
    for (var i = 0; i < 4; i++) {
        delete cookpot[i];
        if (navigator.userAgent.includes('Firefox')) {
            $('#cookpot' + (i + 1)).removeAttr('src');
        } else {
            $('#cookpot' + (i + 1)).attr('src', ' ');
        }
    }
};

window.cookpotIsFull = function(cookpot) {
    for (var cookpotIndex = 0; cookpotIndex < 4; cookpotIndex++) {
        if (cookpot[cookpotIndex] === undefined) {
            return false;
        }
    }
    return true;
};

window.cookpotAdd = function(title, src) { //Добавляет ингридиент в казан, если слот пустой то он добавляет в него, если слот был удалён, также добавляет в него
    if (event.ctrlKey !== true) {
        for (var cookpotSlotIndex = 0; cookpotSlotIndex < 4; cookpotSlotIndex++) {
            if (cookpot[cookpotSlotIndex] === undefined) {
                cookpot[cookpotSlotIndex] = title;
                var cookpotHTMLId = "#cookpot" + (cookpotSlotIndex + 1);
                $(cookpotHTMLId).attr('src', src);
                break;
            }
        }
        if (cookpotIsFull(cookpot)) {
            api.abort();
            api.get({
                action: 'expandtemplates',
                text: '{{#invoke:Cookpot|cookpotCalculate|' + dlc + '|' + warly + '|' + cookpot[0] + '|' + cookpot[1] + '|' + cookpot[2] + '|' + cookpot[3] + '}}',
                smaxage: 600,
                maxage: 600
            }).done(updateResult);
            if (($('#result1').attr('src') == ' ') || ($('#result1').attr('src') === undefined)) {
                src = $('#cookpotatwork').children('img').attr('data-src');
                $('#arrowcookpot').attr('src', src);
            }
        }
    }
};

window.updateResult = function(data) {
    console.log(data.expandtemplates['*']);
    cookpotResult = JSON.parse(data.expandtemplates['*']);
	
    for (var resultIndex = 0; resultIndex < cookpotResult.length; resultIndex++) {
        var resultInfo = cookpotResult[resultIndex];
        var src = $('#' + resultInfo['prefab']).children('img').attr('data-src');
        var id = resultIndex + 1;
        $('#result' + id).attr('src', src);
        $('#result' + id).attr('href', resultInfo['ru-name']);
        $("#name" + id).attr('href', resultInfo['ru-name']);
        if (resultIndex !== 0) {
            $('#result' + id).removeClass('hiddeningredientcookpot');
            $('#result' + id).addClass('result-cell-cookpot');
        }
        $('#arrowcookpot').attr('src', "https://vignette.wikia.nocookie.net/dont-starve/images/d/d2/Crock_Pot.png/revision/latest?cb=20130110150334&path-prefix=ru");
        $('#name' + id).text(resultInfo['ru-name']);
        $('#health' + id).text(' ' + resultInfo['health'] + ' ');
        $('#hunger' + id).text(' ' + resultInfo['hunger'] + ' ');
        $('#sanity' + id).text(' ' + resultInfo['sanity'] + ' ');
        $('#description' + id).css({
            "display": ""
        });
    }


    if (cookpotResult.length == 4) {
        $('#chance1, #chance2, #chance3, #chance4').text('25%');
    } else if (cookpotResult.length == 3) {
        $('#chance1, #chance2, #chance3').text('33%');
    } else if (cookpotResult.length == 2) {
        $('#chance1, #chance2').text('50%');
    }

};
/*
<source lang=javascript>
*/

var $n = $('table.AidesTable').length;
var roundness = '6px';

for (i = 0; i < $n; i++) {
    if ($('table.AidesTable:eq(' + i + ') tr:first-child th:first-child').length)
        $('table.AidesTable:eq(' + i + ')').css('border-top-left-radius', roundness);

    if ($('table.AidesTable:eq(' + i + ') tr:first-child th:last-child').length)
        $('table.AidesTable:eq(' + i + ')').css('border-top-right-radius', roundness);

    if ($('table.AidesTable:eq(' + i + ') tr:last-child th:first-child').length)
        $('table.AidesTable:eq(' + i + ')').css('border-bottom-left-radius', roundness);

    if ($('table.AidesTable:eq(' + i + ') tr:last-child th:last-child').length)
        $('table.AidesTable:eq(' + i + ')').css('border-bottom-right-radius', roundness);
}

$('.aidskl').live({
    'mouseover': showaidetip,
    'mouseout': hideaidetip,
    'mousemove': moveaidetip
});

if ($('div.Aides-UI').length) {
    var ver = 'UWO Aides Search UI v0rc.2.10';
    var nfo = '<span style="font-size:10px; font-weight:bold; float:right; clear:right;">' + ver + '</span><br/>';
    var form = '' +
        '<form id="form1-search-aides" style="float:right; vertical-align:middle; clear:right;">' +
            '<span style="font-size:11px; font-weight:bold; vertical-align:middle;">' +
                'Search in: ' +
                '<label><input type="checkbox" name="search-in" checked="checked" value="aides" style="position:relative; bottom:-3px;" />Aides</label> ' +
                '<label><input type="checkbox" name="search-in" checked="checked" value="skills" style="position:relative; bottom:-3px;" />Skills</label>' +
            '</span><br/>' +
            '<div class="ui-widget" style="position:relative;">' +
                '<img id="search-sign" src="http://slot2.images.wikia.nocookie.net/__cb59082/common/skins/common/images/ajax.gif" style="display:none; position:absolute; left:-25px; top:3px;" />' +
                '<input id="search-aides" placeholder="search aides" style="width:250px; vertical-align:middle;" /> ' +
                '<a id="search-aides" class="wikia-button" onclick="AidesInfo(\'searchaides\')" style="font-size:11px; font-weight:bold; vertical-align:middle;">search</a>' +
            '</div>' +
            '<span style="font-size:10px; vertical-align:middle; position:relative; top:-5px;">' +
                'Search method: ' +
                '<label><input type="radio" name="search-method" checked="checked" value="and" style="position:relative; bottom:-3px;" />And</label> ' +
                '<label><input type="radio" name="search-method" value="or" style="position:relative; bottom:-3px;" />Or</label>' +
            '</span>' +
        '</form>';
    var resetbutt = '' +
        '<button id"resetbutt" style="width:30px; height:30px; float:left;" title="Reset Table" onclick="resettable()">' +
            '<img src="http://images.wikia.com/unchartedwaters/images/6/69/Reset.png" width="15px" height="15px" />' +
        '</button>';
    var aidescheck = '' +
        '<div style="position:relative;">' +
            '<form id="form2-aides-class" style="margin:0px 10px; vertical-align:middle; text-align:center;">' +
                '<label class="check-class"><input class="check-class" type="checkbox" name="filteraides-av-0" checked="checked" />' +
                    '<img src="http://images.wikia.com/unchartedwaters/images/6/6b/Type_adventure.png" title="Adventure Aides" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                '<label class="check-class"><input class="check-class" type="checkbox" name="filteraides-td-1" checked="checked" />' +
                    '<img src="http://images.wikia.com/unchartedwaters/images/0/01/Type_trade.png" title="Trade Aides" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                '<label class="check-class"><input class="check-class" type="checkbox" name="filteraides-bt-2" checked="checked" />' +
                    '<img src="http://images.wikia.com/unchartedwaters/images/e/ea/Type_battle.png" title="Battle Aides" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                '<label class="check-class"><input class="check-class" type="checkbox" name="filteraides-nc-3" checked="checked" />' +
                    '<img src="http://images.wikia.com/unchartedwaters/images/b/b1/Ic_nc.gif" title="NC Aides" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
            '</form>' +
            '<img title="Reset Class only" src="http://images.wikia.com/unchartedwaters/images/6/69/Reset.png" width="10px" height="10px" style="position:absolute; top:0px; right:0px; cursor:pointer;" onclick="resetclass()">' +
        '</div>';
    var skillscheck = '' +
        '<div style="position:relative;">' +
            '<form id="form3-aides-traits" style="vertical-align:middle; text-align:center;">' +
                '<label class="check-trait"><input class="check-trait" type="checkbox" name="filterskills-lg-0" checked="checked" />' +
                    '<img src="http://images.wikia.com/unchartedwaters/images/b/b5/Type_language.png" title="Languages" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                '<label class="check-trait"><input class="check-trait" type="checkbox" name="filterskills-nv-1" checked="checked" />' +
                    '<img src="http://images.wikia.com/unchartedwaters/images/8/85/Traits_navigator.png" title="Navigator" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                '<label class="check-trait"><input class="check-trait" type="checkbox" name="filterskills-lo-2" checked="checked" />' +
                    '<img src="http://images.wikia.com/unchartedwaters/images/2/2e/Traits_lookout.png" title="Lookout" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                '<label class="check-trait"><input class="check-trait" type="checkbox" name="filterskills-py-3" checked="checked" />' +
                    '<img src="http://images.wikia.com/unchartedwaters/images/0/0a/Traits_paymaster.png" title="Paymaster" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                '<label class="check-trait"><input class="check-trait" type="checkbox" name="filterskills-sk-4" checked="checked" />' +
                    '<img src="http://images.wikia.com/unchartedwaters/images/4/4f/Traits_store_keeper.png" title="Store Keeper" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                '<label class="check-trait"><input class="check-trait" type="checkbox" name="filterskills-lt-5" checked="checked" />' +
                    '<img src="http://images.wikia.com/unchartedwaters/images/3/3e/Traits_lieutenant.png" title="Lieutenant" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                '<label class="check-trait"><input class="check-trait" type="checkbox" name="filterskills-sg-6" checked="checked" />' +
                    '<img src="http://images.wikia.com/unchartedwaters/images/c/c8/Traits_surgeon.png" title="Surgeon" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
            '</form>' +
            '<img title="Reset Skills only" src="http://images.wikia.com/unchartedwaters/images/6/69/Reset.png" width="10px" height="10px" style="position:absolute; top:0px; right:0px; cursor:pointer;" onclick="resetskill()">' +
        '</div>';

    $('div.Aides-UI').replaceWith(nfo + form);
    $('td#class').html(aidescheck);
    $('td#traits').html(skillscheck);
    $('div#resetbutt').replaceWith(resetbutt);

    ver = nfo = form = resetbutt = aidescheck = skillscheck = null;

    bGrouped = bSkilllGrouped = bFiltered = false;
    var aidesID = {
        language: '',
        navigator: '',
        lookout: '',
        paymaster: '',
        storekeeper: '',
        lieutenant: '',
        surgeon: '',
        aide: '',
        adventure: '',
        trade: '',
        battle: '',
        1: 'lg', 2: 'nv', 3: 'lo', 4: 'py', 5: 'sk', 6: 'lt', 7: 'sg',
        8: 'ad', 9: 'av', 10: 'td', 11: 'bt'
    }
    var j = 1;
    for (i in aidesID) {
        aidesID[i] = aidesID[j];
        j++;
        if (j == 11) break;
    }

    //SkillGrouping() variables;
    grpelmt = 'div';

    classCheck = 'input.check-class';
    traitCheck = 'input.check-trait';

    availableInputs = [
        'sail handling', 'surveying',
        'salvage', 'haul',
        'rescue', 'survival', 'provisions',
        'wining and dining', 'persuasion',
        'windbreak', 'breakwater', 'detour',
        'search', 'recognition', 'ecological research',
        'collection', 'procurement', 'fishing',
        'survival', 'marching', 'unlock', 'throwing', 'trap',
        'mine detection', 'steering', 'evasion', 'lookout',
        'reconnaissance', 'ambush',
        'accounts', 'frugality', 'sociability',
        'cooking', 'sewing', 'casting', 'handicrafts', 'storage', 'alchemy', 'linguistics', 'shipbuilding',
        'arms', 'management skill', 'navigation',
        'archaeology', 'theology', 'biology', 'art', 'appraisal', 'geography',
        'spice trading', 'metal trading', 'art trading', 'crafts trading', 'fabric trading', 'jewellry trading', 'perfume trading',
        'food trading', 'livestock trading', 'alcohol trading', 'seasoning trading',
        'textile trading', 'dyes trading', 'medicine trading', 'luxuries trading',
        'wares trading', 'mineral trading', 'weapons trading', 'firearms trading', 'sundries trading',
        'merchandise knowledge',
        'body language', 'celtic', 'latin', 'hebrew', 'ancient egyptian',
        'cleaning', 'fire prevention', 'cargo organisation', 'cat breeding',
        'gunnery', 'ballistics', 'reloading', 'accuracy',
        'swordplay', 'guard', 'assault', 'gunfire', 'tactics',
        'sniping', 'sword mastery',
        'restriction', 'obstruction', 'seize cargo',
        'repair', 'first aid', 'surgery', 'leadership', 'fire fighting',
        'plunder', 'mine laying',
        'steering', 'rowing', 'caution',
        'entertainment', 'shouting', 'dietetics', 'prevention', 'sound sleep', 'persuasion (aide)', 'arbitration',
        'tow',
        'england correspondence', 'netherlands correspondence', 'spain correspondence', 'portugal correspondence', 'venice correspondence', 'france correspondence', 'ottoman empire correspondence',
        'cooking assistance', 'storage assistance', 'casting assistance', 'handicrafts assistance', 'sewing assistance',
        'cooking task', 'storage task', 'casting task', 'handicrafts task', 'sewing task',
        'normal shot defence', 'double-shot defence', 'flame shot defence', 'smoke screen defence', 'chain shot defence',
        'enhanced grape shot', 'enhanced flame shot', 'enhanced chain shot', 'enhanced smoke bomb',
        'Aisha', 'Alfonso', 'Claude', 'Cornelia', 'Davide', 'Duarte', 'Durgil', 'Edgar', 'Enver',
        'Ezra', 'Federico', 'Fernando', 'Fiore', 'Helman', 'Isaac', 'Ivan', 'Juliana', 'Karen',
        'Laurencio', 'Lewis', 'Lisa', 'Litzen', 'Lucio', 'Mercerino', 'Paul', 'Philip', 'Philman',
        'Pierre', 'Rashid', 'Sonia', 'Vincent',
        'Annette', 'Aslan', 'Beatrice', 'Bernhardt', 'Caldina', 'Carla', 'Charlotte', 'Christopher',
        'Claudia', 'Duncan', 'Emma', 'Erda', 'Francine', 'Garcia', 'Gilbert', 'Hans', 'Hassan', 'Horatio',
        'Joseph', 'Julio', 'Kicker', 'Nicola', 'Pietro', 'Shirin', 'Sylvia', 'Urbain', 'Uriel', 'Vallerie',
        'Alicia', 'Chester', 'Ecbar', 'Esmarelda', 'George', 'Gerome', 'Gilberd', 'Godfrey', 'Hernan',
        'Holfina', 'Howard', 'Igor', 'Io', 'Jafar', 'Kemal', 'Lacelot', 'Luciano', 'Mauricio', 'Michel',
        'Natascha', 'Nazario', 'Nina', 'Osbald', 'Ricardo', 'Sigfried', 'Tufan', 'Victor', 'Vincent (Battle Aides)',
        'Wolfgang',
    ]

    function split(val) {
        return val.split(/,\s*/);
    }

    function extractLast(term) {
        return split(term).pop();
    }

    setTimeout(function () {
        $('input#search-aides')
        // don't navigate away from the field on tab when selecting an item
            .bind('keydown', function (e) {
                if (e.keyCode === $.ui.keyCode.TAB && $(this).data('autocomplete').menu.active) {
                    e.preventDefault();
                } else if (e.which == 13) {
                    e.preventDefault();
                    AidesInfo('searchaides');
                }
            })
            .autocomplete({
                minLength: 0,
                source: function (request, response) {
                    // delegate back to autocomplete, but extract the last term
                    response($.ui.autocomplete.filter(
		            availableInputs, extractLast(request.term)));
                },
                focus: function () {
                    // prevent value inserted on focus
                    return false;
                },
                select: function (event, ui) {
                    var terms = split(this.value);
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push(ui.item.value);
                    // add placeholder to get the comma-and-space at the end
                    terms.push("");
                    this.value = terms.join(", ");
                    return false;
                }
            });

        $tdl = $('td.aideskills').length;
        for (i = 0; i < $tdl; i++) {
            $tdi = $('td.aideskills:eq(' + i + ')');
            $aidelink = $tdi.parent('tr').attr('id');
            $tdi.load('/index.php?title=' + $aidelink + '&action=render div#aidsklnfo');
        }

        $srcsgn = $('img#search-sign');
        searchsign = function (v) {
            //alert('sign action');
            switch (v) {
                case 'show':
                    $srcsgn.fadeIn(100);
                    break;
                case 'hide':
                    $srcsgn.fadeOut(1000);
                    break;
            }
        }

        AidesInfo = function (f, c, n) {
            searchsign('show');
            switch (f) {
                case 'searchaides':
                    searchaides();
                    break;
                case 'filteraides':
                    if (bCtrlKey) {
                        $(classCheck).each(function (indx, ths) {
                            var $chkval = ($(ths).attr('name') == $chknm)
                                                ? $chkd
                                                : ($chkd) ? null
                                                          : 'checked';
                            $(ths).attr('checked', $chkval);
                            var $l = $(ths).attr('name').split('-');
                            filterAides($l[1], $l[2]);
                        });
                    } else {
                        filterAides(c, n);
                    }
                    break;
                case 'filterskills':
                    if (bCtrlKey) {
                        $(traitCheck).each(function (indx, ths) {
                            var $chkval = ($(ths).attr('name') == $chknm)
                                                ? $chkd
                                                : ($chkd) ? null
                                                          : 'checked';
                            $(ths).attr('checked', $chkval);
                            var $l = $(ths).attr('name').split('-');
                            filterSkills($l[1], $l[2]);
                        });
                    } else {
                        filterSkills(c, n);
                    }
                    break;
                case 'skillgrouping':
                    skillGrouping();
                    break;
            }
            searchsign('hide');
        }
    }, 1000);

    $('span#grouping-check, span#check-grouping').click(function () {
        AidesInfo('skillgrouping');
    });

    $('label.check-class, label.check-trait').click(function (e) {
        $tinpt = $(this).children('input');
        $chknm = $tinpt.attr('name');

        bCtrlKey = e.ctrlKey;
        if (bCtrlKey) $chkd = $tinpt.attr('checked');

        var $l = $chknm.split('-');
        AidesInfo($l[0], $l[1], $l[2], bCtrlKey);
    });
}


function searchaides() {
    needles = document.getElementById('form1-search-aides').elements[2].value;
    if (needles != '') {
        aidesrc = document.getElementById('form1-search-aides').elements[0].checked;
        skillsrc = document.getElementById('form1-search-aides').elements[1].checked;
        bAnd = document.getElementById('form1-search-aides').elements[3].checked;
        bOr = document.getElementById('form1-search-aides').elements[4].checked;

        needle = needles.toLowerCase().replace(/, /g, ',').replace(/ ,/g, ',').split(',');
        ndl = needle.length;
        vndl = 0;
        for (ni = 0; ni < ndl; ni++) {
            vndl += (needle[ni] != '') ? 1 : 0;
        }

        tr = 'table.AidesTable tr.AidesInfo';
        $n1 = $(tr).length;

        for (trj = 0; trj < $n1; trj++) {
            tri = tr + ':eq(' + trj + ')';
            $aidename = $(tri).attr('id');
            if ($(tri).hasClass('nodisplay')) continue;
            find = 0;

            var $haystack1 = (aidesrc) ? $(tri + ' > td:first span.hidnfo').text() : null;
            var $haystack2 = (skillsrc) ? $(tri + ' > td:last span.hidnfo').text() : null;
            var $haystacks = $haystack1 + $haystack2;

            for (ni = 0; ni < vndl; ni++) {
                searchresult = $haystacks.toLowerCase().search(needle[ni]);
                find += (searchresult != -1) ? 1 : 0;
            }

            bFound = (bAnd) ? (find >= vndl) ? true : false
                            : (find != 0) ? true : false;

            if (bFound) {
                $(tri).addClass('filtered');
                bFiltered = true;
            } else {
                $(tri).addClass('nodisplay');
            }
        }

        $haystack1 = $haystack2 = $haystacks = null;
    }
}

function skillGrouping() {
    if (!bSkilllGrouped) {
        //create group div
        $tdr = $('td.aideskills');
        //alert('There was no groups div.\nThere are ' + $n1 + ' skills row.');
        for (i = 0; i < $tdr.length; i++) {
            $tdri = $tdr.eq(i);
            for (j = 1; j <= 7; j++) {
                $skri = $tdri.children('div#aidsklnfo');
                $skt = $skri.children('div.aidskl.' + aidesID[j]);
                //alert('There are ' + $skt.length + ' skills in group \'' + aidesID[j] + '\' traits');
                if ($skt.length) {
                    grpdiv = '<' + grpelmt + ' class="sklgrp imglink ' + aidesID[j] + '"></' + grpelmt + '>';
                    $tdri.append(grpdiv);
                    //alert('Creating group div: \'' + aidesID[j]) + '\'';
                    $gt = $tdri.children(grpelmt + '.sklgrp.' + aidesID[j]);

                    $skt.appendTo($gt);
                }
            }
            $skri.remove();
        }
        $g = $(grpelmt + '.sklgrp');
        bSkilllGrouped = true;
        $skr = $skri = $skt = grpdiv = $gt = null;
    }

    $('span#grouping-check').stop();
    if (bGrouped) {
        $('span#grouping-check').animate({
            width: '10px', height: '10px',
            background: 'rgb(111, 202, 236)',
            borderRadius: '4px',
            boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            left: '4px'
        }, 500);
    } else {
        $('span#grouping-check').animate({
            width: '40px', height: '14px',
            background: 'rgba(111, 202, 236, 0.8)',
            borderRadius: '6px',
            boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
            left: '-33px'
        }, 500);
    }
    bGrouped = (bGrouped) ? false : true;
    $g.stop();
    if (bGrouped) {
        $g.animate({ padding: '0px 10px' }, 500);
    } else {
        $g.animate({ padding: '0px' }, 500);
    }
}

function resettable() {
    bFiltered = false;
    $(classCheck).each(function (indx, ths) {
        $(ths).attr('checked', 'checked');
    });

    $('table.AidesTable tr.AidesInfo.nodisplay').removeClass('nodisplay').removeClass('filtered');
}

function resetclass() {
    $(classCheck).each(function (indx, ths) {
        $(ths).attr('checked', 'checked');
        var $l = $(ths).attr('name').split('-');
        filterAides($l[1], $l[2]);
    });
}

function filterAides(c, n) {
    $t = (bFiltered) ? $('table.AidesTable tr.AidesInfo.filtered.' + c)
                     : $('table.AidesTable tr.AidesInfo.' + c);

    bChecked = $(classCheck).eq(n).attr('checked');
    if (bChecked) {
        $t.removeClass('nodisplay');
    } else {
        $t.addClass('nodisplay');
    }
}

function resetskill() {
    $(traitCheck).each(function (indx, ths) {
        $(ths).attr('checked', 'checked');
    });

    $('div.aidskl.nodisplay').removeClass('nodisplay').addClass('imglink');
}

function filterSkills(c, n) {
    $t = $('div.aidskl.' + c);

    bChecked = $(traitCheck).eq(n).attr('checked');
    if (bChecked) {
        $t.removeClass('nodisplay').addClass('imglink');
    } else {
        $t.addClass('nodisplay').removeClass('imglink');
    }
}

function showaidetip() {
    $t = $(this);
    $ttnfo = $t.children('div.ttnfo');

    if ($ttnfo.hasClass('AJAXload')) {
        $skllink = $t.children('a').attr('href');
        $skilllink = $skllink.slice($skllink.lastIndexOf('/wiki/') + 6);

        $sklnfo = $ttnfo.children('div.sklnfo');

        $sklnfo.load('/index.php?title=' + $skilllink + '&action=render td.attribnfo', function () {
            $ttnfo.removeClass('AJAXload');
            if ($sklnfo.html() == '') $sklnfo.html('Skill page hasn\'t created.');
        });

        $t.children('a').removeAttr('title');
    }

    $ttnfo.show('fast');
}

function hideaidetip() {
    $ttnfo.hide('slow');
}

function moveaidetip(e) {
    var newTop = e.clientY + 20;
    var newLeft = e.clientX + 20;
    $ttnfo.css({
        'top': newTop + 'px',
        'left': newLeft + 'px'
    });
}


/*
</source>
{{BioSign|00:01, January 10, 2013 (UTC)}}
[[Category:Templates/BioBrain|{{PAGENAME}}]]
*/
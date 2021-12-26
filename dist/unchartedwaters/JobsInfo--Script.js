/*
<source lang=javascript>
*/

console.log("loading JobsInfo script");
console.log("jQuery version", jQuery.fn.jquery);

// may need to switch jQuery UI to OOUI, see https://dev.fandom.com/wiki/UCP_JavaScript_changes#OOUI
//console.log("switched to OOUI for autocomplete, did not work");


// this allows page elements to be loaded before the rest of the script is executed
//$(function() {
// mw.loader.using( 'oojs-ui-core' ).done( function () {
$(document).ready( function() {


if ($('div.Jobs-UI').length) {
    var ver = 'UWO Jobs Search UI v0rc.4.46';
    console.log('Work in Progress - ' + ver);
    var nfo = '<span style="font-size:10px; font-weight:bold; float:right; clear:right;">' + ver + '</span><br/>';
    var form = '' +
            '<form id="form1-search-jobs" style="float:right; vertical-align:middle; clear:right;">' +
                '<span style="font-size:11px; font-weight:bold; vertical-align:middle;">' +
                    'Search in: ' +
                    '<label><input id="jobs-checkbox" type="checkbox" name="search-in" checked="checked" value="jobs" style="position:relative; bottom:-3px;" />Jobs</label> ' +
                    '<label><input id="skills-checkbox" type="checkbox" name="search-in" checked="checked" value="skills" style="position:relative; bottom:-3px;" />Skills</label>' +
                    '<label><input id="expert-checkbox" type="checkbox" name="search-in" value="expert" style="position:relative; bottom:-3px;" />Expert only</label>' +
                '</span><br/>' +
                '<div class="ui-widget" style="position:relative;">' +
                    '<img id="search-sign" src="http://slot2.images.wikia.nocookie.net/__cb59082/common/skins/common/images/ajax.gif" style="display:none; position:absolute; left:-25px; top:3px;" />' +
                    '<div class="ooui-textbox"></div>' +
                    '<input id="search-jobs" placeholder="search jobs" style="width:250px; vertical-align:middle;" /> ' +
                    '<a id="search-jobs" class="wikia-button" onclick="JobsInfo(\'searchjobs\')" style="font-size:11px; font-weight:bold; vertical-align:middle;">search</a>' +
                '</div>' +
                '<span style="font-size:10px; vertical-align:middle; position:relative; top:-5px;">' +
                    'Search method: ' +
                    '<label><input type="radio" name="search-method" checked="checked" value="and" style="position:relative; bottom:-3px;" />And</label> ' +
                    '<label><input type="radio" name="search-method" value="or" style="position:relative; bottom:-3px;" />Or</label>' +
                '</span>' +
            '</form>';
    var resetbutt = '' +
            '<button id"resetbutt" style="width:30px; height:30px; float:left;" title="Reset Table" onclick="resetJobsTable()">' +
                '<img src="http://images.wikia.com/unchartedwaters/images/6/69/Reset.png" width="15px" height="15px" />' +
            '</button>';
    var jobscheck = '' +
            '<div style="position:relative;">' +
                '<form id="form2-jobs-class" style="margin:0px 10px; vertical-align:middle; text-align:center;">' +
                    '<label class="check-job"><input class="check-job" type="checkbox" name="filterjobs-av-0" checked="checked" />' +
                        '<img src="http://images.wikia.com/unchartedwaters/images/6/6b/Type_adventure.png" title="Adventure Jobs" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                    '<label class="check-job"><input class="check-job" type="checkbox" name="filterjobs-td-1" checked="checked" />' +
                        '<img src="http://images.wikia.com/unchartedwaters/images/0/01/Type_trade.png" title="Trade Jobs" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                    '<label class="check-job"><input class="check-job" type="checkbox" name="filterjobs-bt-2" checked="checked" />' +
                        '<img src="http://images.wikia.com/unchartedwaters/images/e/ea/Type_battle.png" title="Battle Jobs" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                '</form>' +
                '<form id="form3-jobs-level" style="margin:0px 10px; vertical-align:middle; text-align:center;">' +
                    '<label class="check-level"><input class="check-level" type="checkbox" name="filterlvl-bgn-0" checked="checked" />' +
                        '<img src="http://images2.wikia.nocookie.net/__cb20130107160243/unchartedwaters/images/thumb/a/a1/Type_beginner_job.png/16px-Type_beginner_job.png" title="Beginner jobs" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                    '<label class="check-level"><input class="check-level" type="checkbox" name="filterlvl-int-1" checked="checked" />' +
                        '<img src="http://images3.wikia.nocookie.net/__cb20130106162960/unchartedwaters/images/thumb/9/93/Type_intermediate_job.png/16px-Type_intermediate_job.png" title="Intermediate jobs" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                    '<label class="check-level"><input class="check-level" type="checkbox" name="filterlvl-mst-2" checked="checked" />' +
                        '<img src="http://images1.wikia.nocookie.net/__cb20130107160244/unchartedwaters/images/thumb/5/5f/Type_master_job.png/16px-Type_master_job.png" title="Master jobs" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                '</form>' +
                '<img title="Reset Class only" src="http://images.wikia.com/unchartedwaters/images/6/69/Reset.png" width="10px" height="10px" style="position:absolute; top:0px; right:0px; cursor:pointer;" onclick="resetJobs()">' +
            '</div>';
    var skillscheck = '' +
            '<div style="position:relative;">' +
                '<form id="form4-jobs-skills" style="vertical-align:middle; text-align:center;">' +
                    '<label class="check-skill"><input class="check-skill" type="checkbox" name="filterskills-lg-0" checked="checked" />' +
                        '<img src="http://images.wikia.com/unchartedwaters/images/b/b5/Type_language.png" title="Languages" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                    '<label class="check-skill"><input class="check-skill" type="checkbox" name="filterskills-av-1" checked="checked" />' +
                        '<img src="http://images.wikia.com/unchartedwaters/images/6/6b/Type_adventure.png" title="Adventure" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                    '<label class="check-skill"><input class="check-skill" type="checkbox" name="filterskills-td-2" checked="checked" />' +
                        '<img src="http://images.wikia.com/unchartedwaters/images/0/01/Type_trade.png" title="Trade" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                    '<label class="check-skill"><input class="check-skill" type="checkbox" name="filterskills-bt-3" checked="checked" />' +
                        '<img src="http://images.wikia.com/unchartedwaters/images/e/ea/Type_battle.png" title="Battle" style="margin-right:7px; position:relative; top:-3px;" /></label>' +
                '</form>' +
                '<img title="Reset Skills only" src="http://images.wikia.com/unchartedwaters/images/6/69/Reset.png" width="10px" height="10px" style="position:absolute; top:0px; right:0px; cursor:pointer;" onclick="resetJobsSkill()">' +
            '</div>';

    $('div.Jobs-UI').replaceWith(nfo + form);
    $('td#jobs').html(jobscheck);
    $('td#skills').html(skillscheck);
    $('div#resetbutt').replaceWith(resetbutt);

    ver = nfo = form = resetbutt = jobscheck = skillscheck = null;

    bGrouped = bSkilllGrouped = bFiltered = false;
    var jobsID = {
        language: '',
        adventure: '',
        trade: '',
        battle: '',
        1: 'lg', 2: 'av', 3: 'td', 4: 'bt'
    }
    var j = 1;
    for (i in jobsID) {
        jobsID[i] = jobsID[j];
        j++;
        if (j == 4) break;
    }

    //jobsSkillGrouping() variables;
    grpelmt = 'div';

    jobsCheck = 'input.check-job';
    levelCheck = 'input.check-level';
    skillsCheck = 'input.check-skill';

    availableJobsInput = [
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
            'pathology', 'plunder', 'mine laying',
            'steering', 'rowing', 'caution',
            'adventure learner', 'explorer', 'surveyor', 'biologist', 'fisher', 'excavator', 'helmperson',
            'missionary', 'historian', 'cartographer', 'hunter',
            'treasure hunter', 'ocean explorer', 'archaeologist', 'thief', 'priest', 'naturalist', 'ranger', 'artist', 'guerilla', 'interpreter', 'salvager', 'folklorist', 'adventure mentor', 'ruin explorer',
            'trade learner', 'foods dealer', 'yarn dealer', 'accountant', 'chandler', 'mineral trader', 'medicine trader', 'animal trader',
            'chef', 'trade merchant',
            'art dealer', 'money trader', 'jeweller', 'arms dealer', 'spice trader', 'patissier', 'tailor', 'blacksmith', 'artisan', 'alchemist', 'sommelier', 'artificer', 'political merchant', 'caravanner', 'merchant mentor', 'master alchemist', 'millionaire',
            'military learner', 'mercenary', 'bodyguard', 'brigand', 'jr. officer',
            'naval officer', 'privateer', 'bounty hunter', 'surgeon',
            'shipwright', 'senior officer', 'tactician', 'cannoneer', 'pirate', 'swordfighter', 'scout', 'supply corps', 'sword master', 'musketeer', 'filibuster', 'guardian', 'maritime mentor'
        ]

    function split(val) {
        return val.split(/,\s*/);
    }

    function extractLast(term) {
        return split(term).pop();
    }

    setTimeout(function () {
        mw.loader.using('jquery.ui.autocomplete').then(function() {
            $('input#search-jobs')
            // don't navigate away from the field on tab when selecting an item
                .on('keydown', function (e) {
                    if (e.keyCode === $.ui.keyCode.TAB && $(this).data('autocomplete').menu.active) {
                        e.preventDefault();
                    } else if (e.which == 13) {
                        e.preventDefault();
                        JobsInfo('searchjobs');
                    }
                })
                .autocomplete({
                    minLength: 0,
                    source: function (request, response) {
                        // delegate back to autocomplete, but extract the last term
                        response($.ui.autocomplete.filter(
		                availableJobsInput, extractLast(request.term)));
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
            });
                

        $tdl = $('td.jobskills').length;
        for (i = 0; i < $tdl; i++) {
            $tdi = $('td.jobskills:eq(' + i + ')');
            $joblink = $tdi.parent('tr').attr('id');
            $tdi.load('/index.php?title=' + $joblink + '&action=render div#jobsklnfo');
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

        JobsInfo = function (f, c, n) {
            searchsign('show');
            switch (f) {
                case 'searchjobs':
                    searchJobs();
                    break;
                case 'filterjobs':
                    if (bCtrlKey) {
                        $(jobsCheck).each(function (indx, ths) {
                            var $chkval = ($(ths).attr('name') == $chknm)
                                                    ? $chkd
                                                    : ($chkd) ? null
                                                              : 'checked';
                            $(ths).attr('checked', $chkval);
                            var $l = $(ths).attr('name').split('-');
                            filterJobs($l[1], $l[2]);
                        });
                    } else {
                        filterJobs(c, n);
                    }
                    break;
                case 'filterlvl':
                    if (bCtrlKey) {
                        $(levelCheck).each(function (indx, ths) {
                            var $chkval = ($(ths).attr('name') == $chknm)
                                                    ? $chkd
                                                    : ($chkd) ? null
                                                              : 'checked';
                            $(ths).attr('checked', $chkval);
                            var $l = $(ths).attr('name').split('-');
                            filterJobs($l[1], $l[2]);
                        });
                    } else {
                        filterJobs(c, n);
                    }
                    break;
                case 'filterskills':
                    if (bCtrlKey) {
                        $(skillsCheck).each(function (indx, ths) {
                            var $chkval = ($(ths).attr('name') == $chknm)
                                                    ? $chkd
                                                    : ($chkd) ? null
                                                              : 'checked';
                            $(ths).attr('checked', $chkval);
                            var $l = $(ths).attr('name').split('-');
                            filterJobsSkills($l[1], $l[2]);
                        });
                    } else {
                        filterJobsSkills(c, n);
                    }
                    break;
                case 'skillgrouping':
                    jobsSkillGrouping();
                    break;
            }
            searchsign('hide');
        }

    }, 1000);

    $('span#grouping-check, span#check-grouping').click(function () {
        JobsInfo('skillgrouping');
    });

    $('label.check-job, label.check-level, label.check-skill').click(function (e) {
        $tinpt = $(this).children('input');
        $chknm = $tinpt.attr('name');

        bCtrlKey = e.ctrlKey;
        if (bCtrlKey) $chkd = $tinpt.attr('checked');

        var $l = $chknm.split('-');
        JobsInfo($l[0], $l[1], $l[2]);
    });

    $('input#skills-checkbox').click(function () {
        var $ti = 'input#expert-checkbox';
        if ($(this).attr('checked') == 'checked') {
            $($ti).attr('disabled', false);
        } else {
            $($ti).attr('disabled', true);
            $($ti).attr('checked', null);
        }
    });
}
});


function searchJobs() {
    needles = document.getElementById('form1-search-jobs').elements[3].value;
    if (needles != '') {
        jobsrc = document.getElementById('form1-search-jobs').elements[0].checked;
        skillsrc = document.getElementById('form1-search-jobs').elements[1].checked;
        expertsrc = document.getElementById('form1-search-jobs').elements[2].checked;
        //alert('expertsrc: ' + expertsrc);
        bAnd = document.getElementById('form1-search-jobs').elements[4].checked;
        bOr = document.getElementById('form1-search-jobs').elements[5].checked;

        needle = needles.toLowerCase().replace(/, /g, ',').replace(/ ,/g, ',').split(',');
        ndl = needle.length;
        vndl = 0;
        for (ni = 0; ni < ndl; ni++) {
            vndl += (needle[ni] != '') ? 1 : 0;
        }

        tr = 'table.AidesTable tr.JobsInfo';

        for (trj = 0; trj < $(tr).length; trj++) {
            tri = tr + ':eq(' + trj + ')';
            if ($(tri).hasClass('nodisplay')) continue;
            find = 0;

            var $haystack1 = (jobsrc) ? $(tri + ' > td:first span.hidnfo').text() : null;
            var $haystack2 = (skillsrc) ? (expertsrc)
                                            ? $(tri + ' td.jobskills div.jobskl.expert span.hidnfo').text()
                                            : $(tri + ' td.jobskills span.hidnfo').text()
                                        : null;
            var $haystacks = $haystack1 + $haystack2;

            for (ni = 0; ni < vndl; ni++) {
                searchresult = $haystacks.toLowerCase().search(needle[ni]);
                //alert('Skill Expert:\n' +
                //      $haystacks.toLowerCase() +
                //      '\nexpertsrc: ' + expertsrc +
                //      '\nsearchresult: ' + searchresult);
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

function jobsSkillGrouping() {
    if (!bSkilllGrouped) {
        //create group div
        $tdr = $('td.jobskills');
        //alert('There was no groups div.\nThere are ' + $n1 + ' skills row.');
        for (i = 0; i < $tdr.length; i++) {
            $tdri = $tdr.eq(i);
            for (j = 1; j <= 4; j++) {
                $skri = $tdri.children('div#jobsklnfo');
                $skt = $skri.children('div.jobskl.' + jobsID[j]);
                //alert('There are ' + $skt.length + ' skills in group \'' + jobsID[j] + '\' traits');
                if ($skt.length) {
                    grpdiv = '<' + grpelmt + ' class="sklgrp imglink ' + jobsID[j] + '"></' + grpelmt + '>';
                    $tdri.append(grpdiv);
                    //alert('Creating group div: \'' + jobsID[j]) + '\'';
                    $gt = $tdri.children(grpelmt + '.sklgrp.' + jobsID[j]);

                    $skt.appendTo($gt);
                }
            }
            $skri.remove();
        }
        $g = $(grpelmt + '.sklgrp');
        bSkilllGrouped = true;
        $skr = $skri = $skt = grpdiv = $gt = null;
    }

    //animate grouping
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

function resetJobsTable() {
    bFiltered = false;
    $(jobsCheck + ',' + levelCheck).each(function (indx, ths) {
        $(ths).attr('checked', 'checked');
    });

    $('table.AidesTable tr.JobsInfo.nodisplay').removeClass('nodisplay');
    $('table.AidesTable tr.JobsInfo.filtered').removeClass('filtered');
}

function resetJobs() {
    $(jobsCheck + ',' + levelCheck).each(function (indx, ths) {
        $(ths).attr('checked', 'checked');
        var $l = $(ths).attr('name').split('-');
        filterJobs($l[1], $l[2]);
    });
}

function filterJobs(c, n) {
    switch (c) {
        case 'av':
        case 'td':
        case 'bt':
            tCheck1 = levelCheck;
            tCheck2 = jobsCheck;
            break;
        case 'bgn':
        case 'int':
        case 'mst':
            tCheck1 = jobsCheck;
            tCheck2 = levelCheck;
            break;
    }

    $(tCheck1).each(function (indx, ths) {
        if ($chkval = $(ths).attr('checked') == 'checked') {
            var $l = $(ths).attr('name').split('-');
            c2 = '.' + $l[1];
        } else {
            c2 = null;
        }

        $t = (bFiltered) ? $('table.AidesTable tr.JobsInfo.filtered.' + c + c2)
                         : $('table.AidesTable tr.JobsInfo.' + c + c2);

        bChecked = $(tCheck2).eq(n).attr('checked');
        if (bChecked) {
            $t.removeClass('nodisplay');
        } else {
            $t.addClass('nodisplay');
        }
    });
}

function resetJobsSkill() {
    $(skillsCheck).each(function (indx, ths) {
        $(ths).attr('checked', 'checked');
    });

    $('div.jobskl.nodisplay').removeClass('nodisplay').addClass('imglink');
}

function filterJobsSkills(c, n) {
    $t = $('div.jobskl.' + c);

    bChecked = $(skillsCheck).eq(n).attr('checked');
    if (bChecked) {
        $t.removeClass('nodisplay').addClass('imglink');
    } else {
        $t.addClass('nodisplay').removeClass('imglink');
    }
}


/*
</source>
{{BioSign|00:17, February 22, 2015 (UTC)}}
[[Category:Templates/BioBrain|{{PAGENAME}}]]
*/
/* 此處的JavaScript將加載於所有用戶每一個頁面。 */
//Onload functions
$(function(){
        eventTimeLeft();
        showCurrentUrgentEvent(); 
        moveModule();
        showCharaLevelSelector();
        hideMinorEnemies();
        //showUnitRanks();
        if(top.location != location) {
            $('a, form').each(function() {
                if(!this.target) {
                    this.target = '_top';
                }
            });
        }
        if ("function"===typeof pageFn) { pageFn(); }
});
var eTimeout;
function eventTimeLeft(){
	$("#currentEvents .eStart").each(function(){
		var start=$(this).text();
		var end=$(this).next(".eEnd").text();
		var rows=$(this).attr("rowspan");
		var s=start.match(/(\d+)月(\d+)日(\d+)[時]/);
		var e=end.match(/(\d+)月(\d+)日(\d+)[時]/);
		var now=new Date();
		if (s && e){
            var startDate,endDate;
			if (now.getMonth()==11 && parseInt(s[1],10)==1){
				startDate=new Date((now.getFullYear()+1)+"-"+d2(s[1])+"-"+d2(s[2])+"T"+d2(s[3])+":00:00+08:00");
			}else{
				startDate=new Date(now.getFullYear()+"-"+d2(s[1])+"-"+d2(s[2])+"T"+d2(s[3])+":00:00+08:00");
			}
			if (now.getMonth()==11 && parseInt(e[1],10)==1){
				endDate=new Date((now.getFullYear()+1)+"-"+d2(e[1])+"-"+d2(e[2])+"T"+d2(e[3])+":00:00+08:00");
			}else{
				endDate=new Date(now.getFullYear()+"-"+d2(e[1])+"-"+d2(e[2])+"T"+d2(e[3])+":00:00+08:00");
			}
			var timeLeft=(startDate.getTime()-now.getTime())/1000;
			if (timeLeft>0){
				if (timeLeft<3600) timeLeft=Math.ceil(timeLeft/60)+"分鐘 <font color=#FFFF4D>後開始</font>";
				else if (timeLeft<86400) timeLeft=Math.floor(timeLeft/3600)+"小時"+Math.ceil(timeLeft%3600/60)+"分鐘 <font color=#FFFF4D>後開始</font>";
				else timeLeft=Math.floor(timeLeft/86400)+"天"+Math.floor(timeLeft%86400/3600)+"小時 <font color=#FFFF4D>後開始</font>";
			}else{
				timeLeft=(endDate.getTime()-now.getTime())/1000;
				if (timeLeft>0){
					if (timeLeft<3600) timeLeft="<font color=#F00>尚餘</font> "+Math.ceil(timeLeft/60)+"分鐘";
					else if (timeLeft<86400) timeLeft="<font color=#d796f6>尚餘</font> "+Math.floor(timeLeft/3600)+"小時"+Math.ceil(timeLeft%3600/60)+"分鐘";
					else timeLeft="<font color=#7400A1>尚餘</font> "+Math.floor(timeLeft/86400)+"天"+Math.floor(timeLeft%86400/3600)+"小時";
				}else{
					timeLeft="<font color=red>已過期</font>";
				}
			}
			$(this).before("<td colspan=2 align=center style='display:none' class='eLeft' "+(rows!==""?"rowspan="+rows:"")+">"+timeLeft+"</td>");
		}else{
			$(this).next(".eEnd").removeClass("eEnd");
			$(this).removeClass("eStart");
		}
	});
	startEventShow();
}
function startEventShow(){
	clearTimeout(eTimeout);
	eTimeout=setTimeout(function(){
		$("#currentEvents .eStart, #currentEvents .eEnd").hide();
		$("#currentEvents .eLeft").fadeIn();
		setTimeout(function(){
			$("#currentEvents .eLeft").hide();
			$("#currentEvents .eStart, #currentEvents .eEnd").fadeIn();
			startEventShow();
		}, 5000);
	}, 5000);
}
function d2(n){
	if (parseInt(n,10)<10) return '0'+String(parseInt(n,10)); else return n;
}

function formatTimeDifference(msecs) {
    var hours = (msecs / 36e5) | 0;
    var minutes = ((msecs - hours * 36e5) / 6e4) | 0;
    if (hours > 0) {
        return hours + '時' + minutes + '分';
    } else {
        return minutes + '分鐘';
    }
}

function showCurrentUrgentEvent() {
    var today = new Date();
    today.setUTCHours(today.getUTCHours() + 7);
    $('.daily-event-table th').each(function() {
        var $this = $(this);
        var m = $this.text().match(/(\d+)月(\d+)日/);
        if (m) {
            var month = m[1]|0;
            var day = m[2]|0;
            if (month == today.getUTCMonth()+1 && day == today.getUTCDate()) {
                var swapFrom = $this.closest('table')[0];
                var swapTo = $('.daily-event-table:first')[0];
                if (swapFrom !== swapTo) {
                    var fromParent = swapFrom.parentNode;
                    var fromSibling = swapFrom.nextSibling === swapTo ? swapFrom : swapFrom.nextSibling;
                    swapTo.parentNode.insertBefore(swapFrom, swapTo);
                    fromParent.insertBefore(swapTo, fromSibling);
                }
                return false;
            }
        }
    });

    var curHour = ((Date.now() % 864e5) / 36e5) | 0;
    curHour = (curHour + 7) % 24 + 1;
    $('.daily-event-table:first tr').each(function() {
        var $this = $(this);
        var m = $('td:first-child', $this).text().match(/(\d+)時～(?:(翌日)?(\d+)時)?/);
        if (m) {
            var startHour = m[1]|0;
            var endHour = ((m[3]|0) + (m[2]?24:0)) || Infinity;
            if (startHour <= curHour && curHour < endHour) {
                $this.css('background', '#303');
            } else if (curHour >= endHour) {
                $this.hide();
            } else if (curHour < startHour) {
                $this.addClass("future-urgent-event").hide();
            }
        }
    });
    $('.daily-event-table:first th').prepend(
        $('<span style="float:right">[<a href="#">完整日程</a>]</span>').click(
            function(e) {
                $('.future-urgent-event').toggle();
                e.preventDefault();
            }
        )
    );
    $('.daily-event-table:first td:first-child').hover(
        function() {
            var $this = $(this);
            var oldText = $this.text();
            $this.data('oldText', oldText);
            var m = oldText.match(/(\d+)時～(翌日)?(\d+)時/);
            if (m) {
                var startTime = (m[1]|0) * 36e5;
                var endTime = ((m[3]|0) + (m[2]?24:0)) * 36e5;
                var now = Date.now() % 864e5;
                now = (now + 252e5) % 864e5 + 36e5;
                if (now < startTime) {
                    $this.html(formatTimeDifference(startTime - now) + ' <span style="color:#ff5">後開始</span>');
                } else if (startTime <= now && now < endTime && endTime != 864e5) {
                    $this.html('<span style="color:#d9f">尚餘</span> ' + formatTimeDifference(endTime - now));
                } else if (now >= endTime) {
                    $this.html('<span style="color:red">已過期</span>');
                }
            }
        },
        function() {
            var $this = $(this);
            $this.text($this.data('oldText'));
        }
    );
}
function moveModule(){
    if ($('.page-Divine_Gate_维基').length === 0) {
    $("#WikiaRail>:first-child").before($(".move"));
    $(".move").show();
    $(".move:hidden").remove();
    } else {
    $(".move").show();
    }
}
function showCharaLevelSelector() {
  var charaLevelSelector = $('#chara-level-selector');
  if (charaLevelSelector.length > 0) {
    var specificUnitInfo = $.secureEvalJSON($('#specific-unit-info').text());
    var unit;
    for (var k in specificUnitInfo.unit) {
        if (specificUnitInfo.unit.hasOwnProperty(k)) {
            unit = specificUnitInfo.unit[k];
            break;
        }
    }
    unit.expmin = 0;

    var valueAt = function (lv, attr) {
        var min = unit[attr + 'min'];
        var max = unit[attr + 'max'];
        var curve = unit[attr + 'pow'];
        var diff = max - min;
        var ratio = Math.pow((lv - 1) / (unit.lvmax - 1), curve);
        return Math.floor(min + diff * ratio + 1e-7);
    };

    var charaLevelSelHtml = ['<select id=chara-level-selector-2 style="width:4em">'];
    for (var i = 1; i <= unit.lvmax; ++ i) {
        charaLevelSelHtml.push('<option>', i);
    }
    charaLevelSelHtml.push('</select>');
    charaLevelSelector.html(charaLevelSelHtml.join(''));

    $('#chara-level-selector-2').change(function () {
        var lv = +this.value;
        var values = {hpmin:0, atkmin:0, blendmin:0, salesmin:0, expmax:0};
        $.each(values, function (attr) {
            var value = valueAt(lv, attr.substr(0, attr.length-3));
            values[attr] = value;
            $('#chara-' + attr).text(value);
        });
        $('.chara-level').text('Lv ' + lv);
        $('.chara-atk-dep').text(function() { 
            return ' (' + Math.round($(this).data('atk-factor') * values.atkmin) + ')';
        });
    });
  }
}
function computeNsDifficulty(condition, rates) {
    /* condition: a string like '火火火光' */
    /* rates: a dictionary like {'火': 0.14, '光': 0.30, ...} */

    var elementBases = {
        '火': 0x00001,
        '水': 0x00008,
        '風': 0x00040,
        '光': 0x00200,
        '闇': 0x01000,
        '無': 0x08000,
        '心': 0x40000,
    };

    /* Step 1: Convert the condition string into bag. */
    var bag = 0;
    for (var i = condition.length-1; i >= 0; -- i) {
        var elem = condition.charAt(i);
        if (rates[elem] <= 0) {
            return [Infinity, Infinity];
        }
        bag += elementBases[elem];
    }

    /* Step 2: Create the graph of bags. */
    var graph = {};
    var addEdge = function (src, dest, val) {
        if (!(src in graph)) graph[src] = {};
        graph[src][dest] = val;
    };

    var createEdges = function (destBag) {
        $.each(elementBases, function (l, base) {
            if (destBag & (base * 7)) {
                var srcBag = destBag - base;
                var val = rates[l];
                addEdge(srcBag, destBag, val);
                createEdges(srcBag);
            }
        });
    };
    createEdges(bag);

    /* Step 3: Run the Markov chain. */
    var vector = {0: 1};
    var stepVector = function (oldVector) {
        var newVector = {};
        var addProb = function (dest, prob) {
            if (dest in newVector) newVector[dest] += prob;
            else newVector[dest] = prob;
        };

        $.each(oldVector, function (src, oldProb) {
            var remainingProb = oldProb;
            if (src in graph) {
                $.each(graph[src], function (dest, val) {
                    var prob = val * oldProb;
                    addProb(dest, prob);
                    remainingProb -= prob;
                });
            }
            addProb(src, remainingProb);
        });

        return newVector;
    };

    var vector = {0: 1};
    vector[bag] = 0;
    var achieved99 = false;
    var value99 = 0;
    var totalValue = 0;
    for (var i = 1; i <= 2000; ++ i) {
        var newVector = stepVector(vector);
        var diff = newVector[bag] - vector[bag];
        totalValue += diff * i;
        if (!achieved99) {
            if (newVector[bag] >= 0.99) {
                achieved99 = true;
                value99 = i;
            }
        }
        vector = newVector;
    }

    return [totalValue, value99];
}
function showUnitRanks() {
  if ($('#unit-system-rank,#specific-unit-info').length < 2) return;
  var specificUnitInfo = $.secureEvalJSON($('#specific-unit-info').text());
  $.ajax({url:'/load.php?mode=articles&only=scripts&articles=local:MediaWiki:UnitScore.js&debug=true', dataType:'script', cache:false, success:function () {
    var score = $.computeScore(specificUnitInfo);
    $('#offense-power').text(score[0]|0);
    $('#defense-power').text(score[1]|0);
    $('#unit-system-rank').text(score[2]);
  }});
}
function hideMinorEnemies() {
    $('.new-enemy-table').each(function() {
        var unimportantRows = $('tr[class^=plain-row] td:first-child:not(:contains(!)):not(:contains(Boss))', this).parent();
        if (unimportantRows.length > 5) {
            unimportantRows.first().before($('<tr><td colspan=7>(<span class=texttip>按此顯示所有小怪 — show all minor enemies</span>)</td></tr>').click(
                function() { unimportantRows.toggle(); }
            ));
            unimportantRows.hide();
        }
    });
}
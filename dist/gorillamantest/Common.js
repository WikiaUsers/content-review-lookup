/* Any JavaScript here will be loaded for all users on every page load. */
function timeStamp_Common_js() {
  return "2013.11.03 23:27 (UTC-8)";
}

/*Format:
     [[Name,Target,Attack Type,Range,Training Time,Movement Speed,Barracks,Housing,Preferred Target,Description],
      [DPS values],
      [HP values],
      [Training Cost values],
      [Research Cost values],     (Define N/A as 0)
      [Laboratory Level values],  (Define N/A as 0)
      [Research Time values]]     (Define N/A as 0)
*/
 
/*Define troops*/
function createTroopData(rageMult) {
	if(document.getElementById('_troop-define')==null) return;
	var troops = getTroopData();
	var troopList = troopInfo('list');
	var id = document.getElementById('_troop-define').innerHTML;
	if(id.toLowerCase()=='wallbreaker') id = 'Wall Breaker';
	var troop = troops[troopList.indexOf(id)];
	if(!troop) return;

	var recalc = false;
	if (arguments.length > 0)
		recalc = true;
	else
		rageMult = 1;

	for(var i=0;i<troop.length;i++){
		for(var x=0;x<troop[i].length;x++){
			if(i==1) {
				document.getElementById('_troop_table-line' + x).style.display = '';
				var btn = document.getElementById('_troop-level-' + x);
				btn.style.display = 'block';
				btn.setAttribute('onClick', 'btnClick(' + x + ');');
			}
			if(i!=0){
				if(checkT(''+i+x+0)) {
					var d = document.getElementById('_troop-'+i+x+0);
					if(i==1) {
						d.innerHTML=tFormat(troop[i][x]*rageMult,i,x);
						if(rageMult>1)
							d.className='_troop_rage-increased';
						else
							d.className='';
					}else d.innerHTML=tFormat(troop[i][x],i,x);
				}
			}else{
				if(checkT(''+i+x)) {
					var d = document.getElementById('_troop-'+i+x);
					if(x==5) {
						d.innerHTML=tFormat(troop[i][x]*rageMult,i,x);
						if(rageMult>1)
							d.className='_troop_rage-increased';
						else
							d.className='';
					}else d.innerHTML=tFormat(troop[i][x],i,x);
				}
			}
		}
	}

	if (recalc) return;

	// Select level 1
	btnClick(0);

	// Configure rage spell buttons
	var rageLevels = spellInfo('rage', 'levels');

	for (i = 0; i <= rageLevels; i ++) {
		var spanElem = document.getElementById("_troop_rage-level-" + i);
		spanElem.setAttribute('onClick', 'rageClick(' + i + ');');
		spanElem.style.display = 'block';
	}

	// Select no rage spell
	rageClick(0, true);

	function tFormat(tData,i,x){
		if (!isNaN(tData)) tData=Math.round(tData*100)/100;
		if(i==0) tData=extract(tData,x);
		else if(i==6) tData=extractS(tData);
		if (tData==0) tData='N/A';
		else if (tData>=1000) tData=comma(tData);
		return tData;
	}
	function extract(data,x){
		switch(x){
			case 3:
				if(data==1) return data+' tile';
				else return data+' tiles';
			case 4:
				if(data>=60){
					if(data>=3600){
						if(data==3600) return (data/3600)+' hour';
						return (data/3600)+' hours';
					}else{
						if(data==60) return (data/60)+' minute';
						return (data/60)+' minutes';
					}
				}else{
					if(data==1) return data+' second';
					return data+' seconds';
				}
			case 6:
				return 'Level '+data;
		}
		return data;
	}
	function extractS(data){
		if(data==0) return 0;
		if(data>=24){
			if(data==24) return (data/24)+' day';
			return (data/24)+' days';
		}else{
			if(data==1) return data+' hour';
			return data+' hours';
		}
	}
	function comma(data){
		data=data.toString();
		var x=0;
		var gen='';
		for(var i=data.length-1;i>=0;i--){
			x++;
			if(x%3==0) gen=','+data.substr(i,1)+gen;
			else gen=data.substr(i,1)+gen;
		}
		if(data.length%3==0) gen=gen.substr(1);
		return gen;
	}
	function checkT(id){
		if(document.getElementById('_troop-'+id)) return true;
		return false;
	}
}

function setTroopImage(troopLevel, imgData) {
   var troop   = document.getElementById('_troop-define').innerHTML;
   var imgElem = document.getElementById('_troop-datahold');

   if (!imgData) {
      console.log('setTroopImage: Selecting ' + troop + ' level ' + troopLevel);
      imgData = imgElem.getAttribute('data-imgarray');
   }

   if (!imgData) {
      $.get("/wiki/TableTest").done(function(data) {
         console.log('setTroopImage: Retrieving image data from table'); 
         data = data.split('data-tag="_troop-img-definet"');
         data = data[(data.length > 3 ? 5 : 1)];
         data = data.split('<td data-id="' + troop + '"')[1];
         data = data.split('</tr>')[0];
         data = data.split('</td>');
         var links = [];

         for (var i = 0; i < data.length; i ++) {
            if (data[i].substr(0, 20) != '<td><a href="http://')
               continue;

            var url = data[i].split('"')[1];
            var parts = url.split('/');
            var end = parts.pop();
            end = parts.pop() + '/' + end;
            end = parts.pop() + '/' + end;
            links.push('https://images.wikia.nocookie.net/gorillamantest/images/' + end);
         }

         imgData = links.join('(**)');
         var imgElem = document.getElementById('_troop-datahold');
         imgElem.setAttribute('data-imgarray', imgData);
         console.log('setTroopImage: Attribute = ' +
            imgElem.getAttribute('data-imgarray'));
         return setTroopImage(troopLevel, imgData);
      });
   }
   else {
      var links = imgData.split('(**)');
      var src = links[troopLevel - 1];
      var d = document.getElementById('_troop-image');
      var p = d.getElementsByTagName('img')[0];
      p.setAttribute('src', src);
      d.style.display = '';
   }
}

function btnClick(idx) {
   var currSelected = document.getElementsByClassName('_troop-button-click');
   var currLine;

   if (currSelected.length > 0) {
      var i = 0;

      currSelected = currSelected[0];
      currSelected.setAttribute('class', '_troop-button');

      while (-(i + 1) < currSelected.id.length &&
         !isNaN(currSelected.id.substr(i - 1,1)))
         i --;

      var oldIdx = parseInt(currSelected.id.substr(i));
      currLine   = document.getElementById('_troop_table-line' + oldIdx);
      currLine.setAttribute('class', '');
   }

   currSelected = document.getElementById('_troop-level-' + idx);
   currSelected.setAttribute('class', '_troop-button-click');

   currLine = document.getElementById('_troop_table-line' + idx);
   currLine.setAttribute('class', '_troop_table-rowhighlight');

   setTroopImage(idx + 1);
}

function rageClick(idx, noRecalc) {
   console.log('rageClick: idx = ' + idx);
   var currSelected = document.getElementsByClassName('_troop_rage-button-click');

   if (currSelected.length > 0) {
      currSelected = currSelected[0];
      currSelected.setAttribute('class', '_troop_rage-button');
   }

   currSelected = document.getElementById('_troop_rage-level-' + idx);
   currSelected.setAttribute('class', '_troop_rage-button-click');

   if (!noRecalc) {
      var rageMult = spellInfo('rage', 'damage boost', idx);
      if (!rageMult) rageMult = 1;
      createTroopData(rageMult);
   }
}

function displayCont() {
    if(l('_troop-mark') == null) return;
    var xxx = l('_troop-mark');
    var troop = xxx.getAttribute('data-troop');
    var cont = k('center');
    var span = k('span');
    span.style.display = 'none';
    span.id = '_troop-define';
    span.appendChild(textN(troop));
    cont.appendChild(span);
    span = k('span');
    span.id = '_troop-datahold';
    span.style.display = 'none';
    cont.appendChild(span);
    var div = k('div');
    var df = div.style;
    df.marginTop = '10px';
    df.marginBottom = '10px';
    df.border = '0px ridge Green';
    df.padding = '10px 10px 1px 10px';
    df.fontSize = '100%';
    df.MozBorderRadius = '15px';
    df.WebkitBorderRadius = '15px';
    df.borderRadius = '15px';
    df.borderColor = 'silver';
    df.color = 'black';
    df.backgroundColor = 'gainsboro';
    var dvv = k('div');
    df = dvv.style;
    df.marginTop = '0px';
    df.marginBottom = '0px';
    df.border = '0px ridge Green';
    df.padding = '10px';
    df.fontSize = '100%';
    df.MozBorderRadius = '15px';
    df.WebkitBorderRadius = '15px';
    df.borderRadius = '15px';
    df.borderColor = 'silver';
    df.color = 'black';
    df.backgroundColor = '#c3c3c3';
    df.width = '100px';
    df.cssFloat = 'left';
    df.height = '300px';
    df.position = 'relative';
    span = k('span');
    dvv.appendChild(format(textN('Targets:'), '\'\''));
    dvv.appendChild(br());
    span.id = '_troop-01';
    dvv.appendChild(format(span, '\'\'\''));
    dvv.appendChild(br());
    dvv.appendChild(br());
    dvv.appendChild(format(textN('Damage Type:'), '\'\''));
    dvv.appendChild(br());
    span = k('span');
    span.id = '_troop-02';
    dvv.appendChild(format(span, '\'\'\''));
    dvv.appendChild(br());
    dvv.appendChild(br());
    dvv.appendChild(format(textN('Range:'), '\'\''));
    dvv.appendChild(br());
    span = k('span');
    span.id = '_troop-03';
    dvv.appendChild(format(span, '\'\'\''));
    dvv.appendChild(br());
    dvv.appendChild(br());
    dvv.appendChild(format(textN('Preferred Target:'), '\'\''));
    dvv.appendChild(br());
    span = k('span');
    span.id = '_troop-08';
    dvv.appendChild(format(span, '\'\'\''));
    div.appendChild(dvv);
    dvv = k('div');
    df = dvv.style;
    df.marginTop = '0px';
    df.marginBottom = '10px';
    df.border = '0px ridge Green';
    df.padding = '10px';
    df.fontSize = '100%';
    df.MozBorderRadius = '15px';
    df.WebkitBorderRadius = '15px';
    df.borderRadius = '15px';
    df.borderColor = 'silver';
    df.color = 'black';
    df.backgroundColor = '#c3c3c3';
    df.width = '100px';
    df.cssFloat = 'right';
    df.height = '300px';
    df.position = 'relative';
    dvv.appendChild(format(textN('Training Time:'), '\'\''));
    dvv.appendChild(br());
    span = k('span');
    span.id = '_troop-04';
    dvv.appendChild(format(span, '\'\'\''));
    dvv.appendChild(br());
    dvv.appendChild(br());
    dvv.appendChild(format(textN('Movement Speed:'), '\'\''));
    dvv.appendChild(br());
    span = k('span');
    span.id = '_troop-05';
    dvv.appendChild(format(span, '\'\'\''));
    dvv.appendChild(br());
    dvv.appendChild(br());
    dvv.appendChild(format(textN('Barracks Required:'), '\'\''));
    dvv.appendChild(br());
    span = k('span');
    span.id = '_troop-06';
    dvv.appendChild(format(span, '\'\'\''));
    dvv.appendChild(br());
    dvv.appendChild(br());
    dvv.appendChild(format(textN('Housing Space:'), '\'\''));
    dvv.appendChild(br());
    span = k('span');
    span.id = '_troop-07';
    dvv.appendChild(format(span, '\'\'\''));
    div.appendChild(dvv);
    dvv = k('div');
    df = dvv.style;
    df.position = 'relative';
    df.top = '0px';
    df.cssFloat = 'center';
    df.marginTop = '10px';
    df.backgroundColor = '#FFFFFF';
    df.MozBorderRadius = '15px';
    df.WebkitBorderRadius = '15px';
    df.borderRadius = '15px';
    df.width = '300px';
    df.overflow = 'hidden';
    dvv.id = '_troop-image';
    var img = k('img');
    img.src = 'https://images.wikia.nocookie.net/__cb20131103000615/gorillamantest/images/thumb/7/71/Loading_spin.gif/300px-Loading_spin.gif';
    img.width = '300';
    img.height = '300';
    img.setAttribute('data-image-name', 'Loading spin.gif');
    img.setAttribute('data-image-key', 'Loading_spin.gif');
    dvv.appendChild(img);
    div.appendChild(dvv);
    dvv = k('div');
    df = dvv.style;
    df.marginTop = '0px';
    df.marginBottom = '10px';
    df.border = '0px ridge Green';
    df.padding = '10px';
    df.fontSize = '100%';
    df.MozBorderRadius = '15px';
    df.WebkitBorderRadius = '15px';
    df.borderRadius = '15px';
    df.borderColor = 'silver';
    df.color = 'black';
    df.backgroundColor = '#c3c3c3';
    df.width = '630px';
    df.clear = 'both';
    span = k('span');
    span.id = '_troop-09';
    dvv.appendChild(format(textN('"'), '\'\'\'\'\''));
    dvv.appendChild(format(span, '\'\'\'\'\''));
    dvv.appendChild(format(textN('"'), '\'\'\'\'\''));
    div.appendChild(dvv);
    cont.appendChild(div);
    div = k('div');
    df = div.style;
    df.marginTop = '0px';
    df.marginBottom = '0px';
    df.border = '0px ridge Green';
    df.padding = '10px 10px 35px 10px';
    df.fontSize = '100%';
    df.MozBorderRadius = '15px';
    df.WebkitBorderRadius = '15px';
    df.borderRadius = '15px';
    df.borderColor = 'silver';
    df.color = 'black';
    df.backgroundColor = 'gainsboro';
    span = k('span');
    span.id = '_troop-level-0';
    span.className = '_troop-button';
    span.innerHTML = 'Level 1';
    div.appendChild(span);
    span = k('span');
    span.id = '_troop-level-1';
    span.className = '_troop-button';
    span.innerHTML = 'Level 2';
    div.appendChild(span);
    span = k('span');
    span.id = '_troop-level-2';
    span.className = '_troop-button';
    span.innerHTML = 'Level 3';
    div.appendChild(span);
    span = k('span');
    span.id = '_troop-level-3';
    span.className = '_troop-button';
    span.innerHTML = 'Level 4';
    div.appendChild(span);
    span = k('span');
    span.id = '_troop-level-4';
    span.className = '_troop-button';
    span.innerHTML = 'Level 5';
    div.appendChild(span);
    span = k('span');
    span.id = '_troop-level-5';
    span.className = '_troop-button';
    span.innerHTML = 'Level 6';
    div.appendChild(span);
    span = k('span');
    span.id = '_troop-level-6';
    span.className = '_troop-button';
    span.innerHTML = 'Level 7';
    div.appendChild(span);
    span = k('span');
    span.id = '_troop-level-7';
    span.className = '_troop-button';
    span.innerHTML = 'Level 8';
    div.appendChild(span);
    span = k('span');
    span.id = '_troop-level-8';
    span.className = '_troop-button';
    span.innerHTML = 'Level 9';
    div.appendChild(span);
    span = k('span');
    span.id = '_troop-level-9';
    span.className = '_troop-button';
    span.innerHTML = 'Level 10';
    div.appendChild(span);
    span = k('span');
    span.id = '_troop-level-10';
    span.className = '_troop-button';
    span.innerHTML = 'Level 11';
    div.appendChild(span);
    span = k('span');
    span.id = '_troop-level-11';
    span.className = '_troop-button';
    span.innerHTML = 'Level 12';
    div.appendChild(span);
    span = k('span');
    span.id = '_troop-level-12';
    span.className = '_troop-button';
    span.innerHTML = 'Level 13';
    div.appendChild(span);
    span = k('span');
    span.id = '_troop-level-13';
    span.className = '_troop-button';
    span.innerHTML = 'Level 14';
    div.appendChild(span);
    span = k('span');
    span.id = '_troop-level-14';
    span.className = '_troop-button';
    span.innerHTML = 'Level 15';
    div.appendChild(span);
    div.appendChild(crTAB(troop));
    dvv = k('div');
    dvv.id = '_troop_rage-spell';
    df = dvv.style;
    df.cssFloat = 'right';
    df.border = '0px solid Green';
    df.borderColor = '#eee #666 #333 #ccc';
    df.MozBorderRadius = '5px';
    df.WebkitBorderRadius = '5px';
    df.borderRadius = '5px';
    df.backgroundColor = '#ddd';
    df.padding = '0px 5px';
    span = k('span');
    span.id = '_troop_rage-level-10';
    span.className = '_troop_rage-button';
    span.innerHTML = '10';
    dvv.appendChild(span);
    span = k('span');
    span.id = '_troop_rage-level-9';
    span.className = '_troop_rage-button';
    span.innerHTML = '9';
    dvv.appendChild(span);
    span = k('span');
    span.id = '_troop_rage-level-8';
    span.className = '_troop_rage-button';
    span.innerHTML = '8';
    dvv.appendChild(span);
    span = k('span');
    span.id = '_troop_rage-level-7';
    span.className = '_troop_rage-button';
    span.innerHTML = '7';
    dvv.appendChild(span);
    span = k('span');
    span.id = '_troop_rage-level-6';
    span.className = '_troop_rage-button';
    span.innerHTML = '6';
    dvv.appendChild(span);
    span = k('span');
    span.id = '_troop_rage-level-5';
    span.className = '_troop_rage-button';
    span.innerHTML = '5';
    dvv.appendChild(span);
    span = k('span');
    span.id = '_troop_rage-level-4';
    span.className = '_troop_rage-button';
    span.innerHTML = '4';
    dvv.appendChild(span);
    span = k('span');
    span.id = '_troop_rage-level-3';
    span.className = '_troop_rage-button';
    span.innerHTML = '3';
    dvv.appendChild(span);
    span = k('span');
    span.id = '_troop_rage-level-2';
    span.className = '_troop_rage-button';
    span.innerHTML = '2';
    dvv.appendChild(span);
    span = k('span');
    span.id = '_troop_rage-level-1';
    span.className = '_troop_rage-button';
    span.innerHTML = '1';
    dvv.appendChild(span);
    span = k('span');
    span.id = '_troop_rage-level-0';
    span.className = '_troop_rage-button';
    span.innerHTML = 'None';
    dvv.appendChild(span);
    span = k('span');
    span.id = '_troop_rage-text';
    span.style.cssFloat = 'right';
    span.style.position = 'relative';
    span.style.top = '-6px';
    span.innerHTML = 'Rage Spell effect level&nbsp;';
    dvv.appendChild(span);
    div.appendChild(dvv);
    cont.appendChild(div);
    xxx.appendChild(cont);

    function l(e) {
        return document.getElementById(e);
    }

    function k(e) {
        return document.createElement(e);
    }

    function br() {
        return k('br');
    }

    function textN(e) {
        return document.createTextNode(e);
    }

    function format(e, f) {
        var v = [k('b'), k('i')];
        v[(f == '\'\'' ? 1 : 0)].appendChild(e);
        if (f == '\'\'\'\'\'') v[1].appendChild(v[0]);
        if (f == '\'\'\'') return v[0];
        return v[1];
    }

    function crTAB(t) {
        var table = k('table');
        table.border = '0';
        table.cellpadding = '1';
        table.cellspacing = '1';
        table.className = 'wikitable';
        table.style.width = '650px';
        var th;
        var tr = k('tr');
        var ARR = ['Level', (t == 'Healer' ? 'Heal' : 'Damage') + ' per Second', 'Hitpoints', 'Training Cost', 'Research Cost', 'Laboratory Level Required', 'Research Time'];
        for (var i = 0; i < 7; i++) {
            th = k('th');
            th.scope = 'col';
            th.style.textAlign = 'center';
            th.innerHTML = ARR[i];
            tr.appendChild(th);
        }
        table.appendChild(tr);
        var span;
        for (var v = 0; v < 15; v++) {
            tr = k('tr');
            tr.id = '_troop_table-line' + v;
            tr.className = '_troop-info-table-row';
            tr.style.display = 'none';
            var td = k('td');
            td.style.textAlign = 'center';
            td.innerHTML = v + 1;
            tr.appendChild(td);
            for (var g = 0; g < 6; g++) {
                td = k('td');
                td.style.textAlign = 'center';
                span = k('span');
                span.id = '_troop-' + (g + 1) + v + '0';
                td.appendChild(span);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        return table;
    }
    createTroopData();
}
addOnloadHook(displayCont);

/*
 * Function to get troop data from central repository on CoC Wiki
 */
function getTroopData() {
   var tData = [];
   var tList = troopInfo('list');

   for (var i = 0; i < tList.length; i ++) {
      var tElem = [];
      tElem[0]  = [];

      // Name
      tElem[0][0] = tList[i];

      // Target type (single target or splash)
      tElem[0][1] = (troopInfo(tList[i], 'splash radius') < 0 ?
         'Single Target' : 'Area&nbsp;Splash ' +
         troopInfo(tList[i], 'splash radius') + '&nbsp;tile' +
         (troopInfo(tList[i], 'splash radius') == 1 ? '' : 's'));

      // Attack type
      tElem[0][2] = (troopInfo(tList[i], 'range') <= 1 ? 'Melee' : 'Ranged');

      if (troopInfo(tList[i], 'ground attack') &&
          troopInfo(tList[i], 'air attack'))
         tElem[0][2] += ' (Ground&nbsp;' + '&' + '&nbsp;Air)';
      else if (troopInfo(tList[i], 'air attack'))
         tElem[0][2] += ' (Air&nbsp;Only)';
      else
         tElem[0][2] += ' (Ground&nbsp;Only)';

      // Range
      tElem[0][3] = troopInfo(tList[i], 'range');

      // Training time
      tElem[0][4] = troopInfo(tList[i], 'training time');

      // Movement speed
      tElem[0][5] = troopInfo(tList[i], 'movement speed');

      // Barracks level
      tElem[0][6] = troopInfo(tList[i], 'barracks level');

      // Housing space
      tElem[0][7] = troopInfo(tList[i], 'housing space');

      // Preferred target
      tElem[0][8] = troopInfo(tList[i], 'preferred target') +
         (troopInfo(tList[i], 'multiplier') == 1 ? '' : ' (Damage&nbsp;x' +
         troopInfo(tList[i], 'multiplier') + ')');

      // Description
      tElem[0][9] = troopInfo(tList[i], 'description');

      // DPS (note healer HPS is already handled in the template)
      if (tList[i] == 'Healer')
         tElem[1] = troopInfo(tList[i], 'hps');
      else
         tElem[1] = troopInfo(tList[i], 'dps');

      // HP
      tElem[2] = troopInfo(tList[i], 'hitpoints');

      // Training cost
      tElem[3] = troopInfo(tList[i], 'training cost');

      // Research cost
      tElem[4] = troopInfo(tList[i], 'research cost');

      // Laboratory levels
      tElem[5] = troopInfo(tList[i], 'laboratory level');

      // Research time
      tElem[6] = troopInfo(tList[i], 'research time');

      // Add to tData array
      tData[i] = tElem;
   }

   return tData;
}

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

(function ($, mw, store) {
    "use strict";
    var articles;
 
    if (store && store.getItem("commonjs")) {
        console.log("You have chosen to disable site-wide JavaScript in MediaWiki:Common.js. Please remove \"commonjs\" from localStorage to re-enable site-wide JavaScript.");
        return;
    }
 
    window.UserTagsJS = {
	modules: {},
	tags: {}
    };
    UserTagsJS.modules.inactive = 30;
    UserTagsJS.modules.newuser = true;
    UserTagsJS.modules.autoconfirmed = true;
 
    UserTagsJS.modules.mwGroups = ["bureaucrat", "chatmoderator", "patroller", "rollback", "sysop", "bannedfromchat", "bot", "bot-global"];
    UserTagsJS.modules.metafilter = {
	sysop: ["bureaucrat", "founder"],
	bureaucrat: ["founder"],
	chatmoderator: ["sysop", "bureaucrat"],
        rollback: ["sysop", "bureaucrat"]
    };
 
    articles = [
        "MediaWiki:Common.js/Quiz.js",
        "MediaWiki:Common.js/Version.js",
        "w:c:clashofclans:MediaWiki:Common.js/TroopInfo.js",
        "w:c:dev:Countdown/code.js",
        "w:c:dev:UserTags/code.js",
        "MediaWiki:Common.js/Loot.js"];
    // Use Wikia"s importArticles() function to load JavaScript files
    window.importArticles({
        type: "script",
        articles: articles
    });
    console.log("Site-wide JavaScript in MediaWiki:Common.js will load the following JavaScript files:", articles);
}(jQuery, mediaWiki, window.localStorage));
 
function hasClassTest(element, className) {
   return element.className.indexOf(className) != -1;
}
 
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable( tableIndex ) {
        var Button = document.getElementById( "collapseButton" + tableIndex );
        var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
        if ( !Table || !Button ) {
                return false;
        }
 
        var Rows = Table.rows;
 
        if ( Button.firstChild.data == collapseCaption ) {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = "none";
                }
                Button.firstChild.data = expandCaption;
        } else {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = Rows[0].style.display;
                }
                Button.firstChild.data = collapseCaption;
        }
}
 
function createCollapseButtons() {
        var tableIndex = 0;
        var NavigationBoxes = new Object();
        var Tables = document.getElementsByTagName( "table" );
 
        for ( var i = 0; i < Tables.length; i++ ) {
                if ( hasClass( Tables[i], "collapsible" ) ) {
 
                        /* only add button and increment count if there is a header row to work with */
                        var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
                        if ( !HeaderRow ) {
                                continue;
                        }
                        var Header = HeaderRow.getElementsByTagName( "th" )[0];
                        if ( !Header ) {
                                continue;
                        }
 
                        NavigationBoxes[tableIndex] = Tables[i];
                        Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
                        var Button = document.createElement( "span" );
                        var ButtonLink = document.createElement( "a" );
                        var ButtonText = document.createTextNode( collapseCaption );
 
                        Button.className = "collapseButton"; // Styles are declared in [[MediaWiki:Common.css]]
 
                        ButtonLink.style.color = Header.style.color;
                        ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
                        ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
                        ButtonLink.appendChild( ButtonText );
 
                        Button.appendChild( document.createTextNode( "[" ) );
                        Button.appendChild( ButtonLink );
                        Button.appendChild( document.createTextNode( "]" ) );
 
                        Header.insertBefore( Button, Header.childNodes[0] );
                        tableIndex++;
                }
        }
 
        for ( var i = 0;  i < tableIndex; i++ ) {
                if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
                        collapseTable( i );
                } else if ( hasClass( NavigationBoxes[i], "innercollapse" ) ) {
                        var element = NavigationBoxes[i];
                        while ( element = element.parentNode ) {
                                if ( hasClass( element, "outercollapse" ) ) {
                                        collapseTable( i );
                                        break;
                                }
                        }
                }
        }
}
 
addOnloadHook( createCollapseButtons );

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = ( function() {
        var reCache = {};
        return function( element, className ) {
                return ( reCache[className] ? reCache[className] : ( reCache[className] = new RegExp( "(?:\\s|^)" + className + "(?:\\s|$)" ) ) ).test( element.className );
        };
})();

/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

/*GorillaMan*/

SpoilerAlert = {
    question: "Chief! This page contains sneak peeks. Are you sure you want to enter?",
    yes: "Yes, please",
    no: "No, let it be a surprise",
    isSpoiler: function () {
        return Boolean($(".spoiler").length);
    }
};
importScriptPage("SpoilerAlert/code.js", "dev");
 
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

/* Experience Calculator - GorillaMan */
 
/* Level to Experience necessary for that level */
 
function doExperience (Level) {
 
   if (isNaN(Level)) return("???");
 
   if (Level < 0) return("???");
   else if (Level == 0) return(0);
   else return(((Level * 50) - 50));
 
   return("???");
}
 
 
function calcExperience (index) {
   var Level = parseInt(document.getElementById("lev_input_" + index).value);
 
   var result = doExperience(Level);
 
   if (result != 1)
      document.getElementById("ex_result_" + index).innerHTML = " = " + result + " Experience";
   else
      document.getElementById("ex_result_" + index).innerHTML = " = " + result + " Experience";    
 
   return false;
}
 
function createExperience() {
   var paras = document.getElementsByTagName("p");
   var offset = 0;
 
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "calc-ex")) {
         var form = document.createElement("form");
         var input1 = document.createElement("input");
         var input2 = document.createElement("input");
         var span = document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcExperience(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "lev_input_" + offset);
 
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Calculate Experience");
         input2.setAttribute("onclick", "javascript:calcExperience(" + offset + ");");
 
         span.setAttribute("id", "ex_result_" + offset);
         span.innerHTML = " = 0 Experience";
 
         form.appendChild(document.createTextNode("Level: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset++;
      }
   }     
}
 
addOnloadHook(createExperience);
 
/* Level to Experience until the level */
 
function doExperience2 (Lev) {
 
   if (isNaN(Lev)) return("???");
 
   if (Lev < 0) return("???");
   else if (Lev == 0) return(0);
   else return((((Lev * (Lev - 1)) / 2) * 50));
 
   return("???");
}
 
 
function calcExperience2 (index) {
   var Lev = parseInt(document.getElementById("lev_input2_" + index).value);
 
   var result = doExperience2(Lev);
 
   if (result != 1)
      document.getElementById("ex_result2_" + index).innerHTML = " = " + result + " Experience";
   else
      document.getElementById("ex_result2_" + index).innerHTML = " = " + result + " Experience";    
 
   return false;
}
 
function createExperience2() {
   var paras = document.getElementsByTagName("p");
   var offset = 0;
 
   for (var index = 0; index < paras.length; index++) {
      if (hasClassTest(paras[index], "calc-lev")) {
         var form = document.createElement("form");
         var input1 = document.createElement("input");
         var input2 = document.createElement("input");
         var span = document.createElement("span");
 
         form.setAttribute("onSubmit", "return calcExperience2(" + offset + ");");
         input1.setAttribute("size", "10");
         input1.setAttribute("value", "0");
         input1.setAttribute("id", "lev_input2_" + offset);
 
         input2.setAttribute("type", "button");
         input2.setAttribute("value", "Calculate Experience");
         input2.setAttribute("onclick", "javascript:calcExperience2(" + offset + ");");
 
         span.setAttribute("id", "ex_result2_" + offset);
         span.innerHTML = " = 0 Experience";
 
         form.appendChild(document.createTextNode("Level: "));
         form.appendChild(input1);
         form.appendChild(input2);
         form.appendChild(span);
 
         paras[index].appendChild(form);
         offset++;
      }
   }     
}
 
addOnloadHook(createExperience2);
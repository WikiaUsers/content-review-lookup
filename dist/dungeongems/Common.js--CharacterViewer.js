/*
 * Dungeon Gems Character/Team Viewer
 *
 * Author: I like Serena
 */

// Include TableSorter
/* 
 * TableSorter 2.0 - Client-side table sorting with ease!
 * Version 2.0.5b
 * @requires jQuery v1.2.3
 */
(function($){$.extend({tablesorter:new
function(){var parsers=[],widgets=[];this.defaults={cssHeader:"header",cssAsc:"headerSortUp",cssDesc:"headerSortDown",cssChildRow:"expand-child",sortInitialOrder:"asc",sortMultiSortKey:"shiftKey",sortForce:null,sortAppend:null,sortLocaleCompare:true,textExtraction:"simple",parsers:{},widgets:[],widgetZebra:{css:["even","odd"]},headers:{},widthFixed:false,cancelSelection:true,sortList:[],headerList:[],dateFormat:"us",decimal:'/\.|\,/g',onRenderHeader:null,selectorHeaders:'thead th',debug:false};function benchmark(s,d){log(s+","+(new Date().getTime()-d.getTime())+"ms");}this.benchmark=benchmark;function log(s){if(typeof console!="undefined"&&typeof console.debug!="undefined"){console.log(s);}else{alert(s);}}function buildParserCache(table,$headers){if(table.config.debug){var parsersDebug="";}if(table.tBodies.length==0)return;var rows=table.tBodies[0].rows;if(rows[0]){var list=[],cells=rows[0].cells,l=cells.length;for(var i=0;i<l;i++){var p=false;if($.metadata&&($($headers[i]).metadata()&&$($headers[i]).metadata().sorter)){p=getParserById($($headers[i]).metadata().sorter);}else if((table.config.headers[i]&&table.config.headers[i].sorter)){p=getParserById(table.config.headers[i].sorter);}if(!p){p=detectParserForColumn(table,rows,-1,i);}if(table.config.debug){parsersDebug+="column:"+i+" parser:"+p.id+"\n";}list.push(p);}}if(table.config.debug){log(parsersDebug);}return list;};function detectParserForColumn(table,rows,rowIndex,cellIndex){var l=parsers.length,node=false,nodeValue=false,keepLooking=true;while(nodeValue==''&&keepLooking){rowIndex++;if(rows[rowIndex]){node=getNodeFromRowAndCellIndex(rows,rowIndex,cellIndex);nodeValue=trimAndGetNodeText(table.config,node);if(table.config.debug){log('Checking if value was empty on row:'+rowIndex);}}else{keepLooking=false;}}for(var i=1;i<l;i++){if(parsers[i].is(nodeValue,table,node)){return parsers[i];}}return parsers[0];}function getNodeFromRowAndCellIndex(rows,rowIndex,cellIndex){return rows[rowIndex].cells[cellIndex];}function trimAndGetNodeText(config,node){return $.trim(getElementText(config,node));}function getParserById(name){var l=parsers.length;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==name.toLowerCase()){return parsers[i];}}return false;}function buildCache(table){if(table.config.debug){var cacheTime=new Date();}var totalRows=(table.tBodies[0]&&table.tBodies[0].rows.length)||0,totalCells=(table.tBodies[0].rows[0]&&table.tBodies[0].rows[0].cells.length)||0,parsers=table.config.parsers,cache={row:[],normalized:[]};for(var i=0;i<totalRows;++i){var c=$(table.tBodies[0].rows[i]),cols=[];if(c.hasClass(table.config.cssChildRow)){cache.row[cache.row.length-1]=cache.row[cache.row.length-1].add(c);continue;}cache.row.push(c);for(var j=0;j<totalCells;++j){cols.push(parsers[j].format(getElementText(table.config,c[0].cells[j]),table,c[0].cells[j]));}cols.push(cache.normalized.length);cache.normalized.push(cols);cols=null;};if(table.config.debug){benchmark("Building cache for "+totalRows+" rows:",cacheTime);}return cache;};function getElementText(config,node){var text="";if(!node)return"";if(!config.supportsTextContent)config.supportsTextContent=node.textContent||false;if(config.textExtraction=="simple"){if(config.supportsTextContent){text=node.textContent;}else{if(node.childNodes[0]&&node.childNodes[0].hasChildNodes()){text=node.childNodes[0].innerHTML;}else{text=node.innerHTML;}}}else{if(typeof(config.textExtraction)=="function"){text=config.textExtraction(node);}else{text=$(node).text();}}return text;}function appendToTable(table,cache){if(table.config.debug){var appendTime=new Date()}var c=cache,r=c.row,n=c.normalized,totalRows=n.length,checkCell=(n[0].length-1),tableBody=$(table.tBodies[0]),rows=[];for(var i=0;i<totalRows;i++){var pos=n[i][checkCell];rows.push(r[pos]);if(!table.config.appender){var l=r[pos].length;for(var j=0;j<l;j++){tableBody[0].appendChild(r[pos][j]);}}}if(table.config.appender){table.config.appender(table,rows);}rows=null;if(table.config.debug){benchmark("Rebuilt table:",appendTime);}applyWidget(table);setTimeout(function(){$(table).trigger("sortEnd");},0);};function buildHeaders(table){if(table.config.debug){var time=new Date();}var meta=($.metadata)?true:false;var header_index=computeTableHeaderCellIndexes(table);$tableHeaders=$(table.config.selectorHeaders,table).each(function(index){this.column=header_index[this.parentNode.rowIndex+"-"+this.cellIndex];this.order=formatSortingOrder(table.config.sortInitialOrder);this.count=this.order;if(checkHeaderMetadata(this)||checkHeaderOptions(table,index))this.sortDisabled=true;if(checkHeaderOptionsSortingLocked(table,index))this.order=this.lockedOrder=checkHeaderOptionsSortingLocked(table,index);if(!this.sortDisabled){var $th=$(this).addClass(table.config.cssHeader);if(table.config.onRenderHeader)table.config.onRenderHeader.apply($th);}table.config.headerList[index]=this;});if(table.config.debug){benchmark("Built headers:",time);log($tableHeaders);}return $tableHeaders;};function computeTableHeaderCellIndexes(t){var matrix=[];var lookup={};var thead=t.getElementsByTagName('THEAD')[0];var trs=thead.getElementsByTagName('TR');for(var i=0;i<trs.length;i++){var cells=trs[i].cells;for(var j=0;j<cells.length;j++){var c=cells[j];var rowIndex=c.parentNode.rowIndex;var cellId=rowIndex+"-"+c.cellIndex;var rowSpan=c.rowSpan||1;var colSpan=c.colSpan||1
var firstAvailCol;if(typeof(matrix[rowIndex])=="undefined"){matrix[rowIndex]=[];}for(var k=0;k<matrix[rowIndex].length+1;k++){if(typeof(matrix[rowIndex][k])=="undefined"){firstAvailCol=k;break;}}lookup[cellId]=firstAvailCol;for(var k=rowIndex;k<rowIndex+rowSpan;k++){if(typeof(matrix[k])=="undefined"){matrix[k]=[];}var matrixrow=matrix[k];for(var l=firstAvailCol;l<firstAvailCol+colSpan;l++){matrixrow[l]="x";}}}}return lookup;}function checkCellColSpan(table,rows,row){var arr=[],r=table.tHead.rows,c=r[row].cells;for(var i=0;i<c.length;i++){var cell=c[i];if(cell.colSpan>1){arr=arr.concat(checkCellColSpan(table,headerArr,row++));}else{if(table.tHead.length==1||(cell.rowSpan>1||!r[row+1])){arr.push(cell);}}}return arr;};function checkHeaderMetadata(cell){if(($.metadata)&&($(cell).metadata().sorter===false)){return true;};return false;}function checkHeaderOptions(table,i){if((table.config.headers[i])&&(table.config.headers[i].sorter===false)){return true;};return false;}function checkHeaderOptionsSortingLocked(table,i){if((table.config.headers[i])&&(table.config.headers[i].lockedOrder))return table.config.headers[i].lockedOrder;return false;}function applyWidget(table){var c=table.config.widgets;var l=c.length;for(var i=0;i<l;i++){getWidgetById(c[i]).format(table);}}function getWidgetById(name){var l=widgets.length;for(var i=0;i<l;i++){if(widgets[i].id.toLowerCase()==name.toLowerCase()){return widgets[i];}}};function formatSortingOrder(v){if(typeof(v)!="Number"){return(v.toLowerCase()=="desc")?1:0;}else{return(v==1)?1:0;}}function isValueInArray(v,a){var l=a.length;for(var i=0;i<l;i++){if(a[i][0]==v){return true;}}return false;}function setHeadersCss(table,$headers,list,css){$headers.removeClass(css[0]).removeClass(css[1]);var h=[];$headers.each(function(offset){if(!this.sortDisabled){h[this.column]=$(this);}});var l=list.length;for(var i=0;i<l;i++){h[list[i][0]].addClass(css[list[i][1]]);}}function fixColumnWidth(table,$headers){var c=table.config;if(c.widthFixed){var colgroup=$('<colgroup>');$("tr:first td",table.tBodies[0]).each(function(){colgroup.append($('<col>').css('width',$(this).width()));});$(table).prepend(colgroup);};}function updateHeaderSortCount(table,sortList){var c=table.config,l=sortList.length;for(var i=0;i<l;i++){var s=sortList[i],o=c.headerList[s[0]];o.count=s[1];o.count++;}}function multisort(table,sortList,cache){if(table.config.debug){var sortTime=new Date();}var dynamicExp="var sortWrapper = function(a,b) {",l=sortList.length;for(var i=0;i<l;i++){var c=sortList[i][0];var order=sortList[i][1];var s=(table.config.parsers[c].type=="text")?((order==0)?makeSortFunction("text","asc",c):makeSortFunction("text","desc",c)):((order==0)?makeSortFunction("numeric","asc",c):makeSortFunction("numeric","desc",c));var e="e"+i;dynamicExp+="var "+e+" = "+s;dynamicExp+="if("+e+") { return "+e+"; } ";dynamicExp+="else { ";}var orgOrderCol=cache.normalized[0].length-1;dynamicExp+="return a["+orgOrderCol+"]-b["+orgOrderCol+"];";for(var i=0;i<l;i++){dynamicExp+="}; ";}dynamicExp+="return 0; ";dynamicExp+="}; ";if(table.config.debug){benchmark("Evaling expression:"+dynamicExp,new Date());}eval(dynamicExp);cache.normalized.sort(sortWrapper);if(table.config.debug){benchmark("Sorting on "+sortList.toString()+" and dir "+order+" time:",sortTime);}return cache;};function makeSortFunction(type,direction,index){var a="a["+index+"]",b="b["+index+"]";if(type=='text'&&direction=='asc'){return"("+a+" == "+b+" ? 0 : ("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : ("+a+" < "+b+") ? -1 : 1 )));";}else if(type=='text'&&direction=='desc'){return"("+a+" == "+b+" ? 0 : ("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : ("+b+" < "+a+") ? -1 : 1 )));";}else if(type=='numeric'&&direction=='asc'){return"("+a+" === null && "+b+" === null) ? 0 :("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : "+a+" - "+b+"));";}else if(type=='numeric'&&direction=='desc'){return"("+a+" === null && "+b+" === null) ? 0 :("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : "+b+" - "+a+"));";}};function makeSortText(i){return"((a["+i+"] < b["+i+"]) ? -1 : ((a["+i+"] > b["+i+"]) ? 1 : 0));";};function makeSortTextDesc(i){return"((b["+i+"] < a["+i+"]) ? -1 : ((b["+i+"] > a["+i+"]) ? 1 : 0));";};function makeSortNumeric(i){return"a["+i+"]-b["+i+"];";};function makeSortNumericDesc(i){return"b["+i+"]-a["+i+"];";};function sortText(a,b){if(table.config.sortLocaleCompare)return a.localeCompare(b);return((a<b)?-1:((a>b)?1:0));};function sortTextDesc(a,b){if(table.config.sortLocaleCompare)return b.localeCompare(a);return((b<a)?-1:((b>a)?1:0));};function sortNumeric(a,b){return a-b;};function sortNumericDesc(a,b){return b-a;};function getCachedSortType(parsers,i){return parsers[i].type;};this.construct=function(settings){return this.each(function(){if(!this.tHead||!this.tBodies)return;var $this,$document,$headers,cache,config,shiftDown=0,sortOrder;this.config={};config=$.extend(this.config,$.tablesorter.defaults,settings);$this=$(this);$.data(this,"tablesorter",config);$headers=buildHeaders(this);this.config.parsers=buildParserCache(this,$headers);cache=buildCache(this);var sortCSS=[config.cssDesc,config.cssAsc];fixColumnWidth(this);$headers.click(function(e){var totalRows=($this[0].tBodies[0]&&$this[0].tBodies[0].rows.length)||0;if(!this.sortDisabled&&totalRows>0){$this.trigger("sortStart");var $cell=$(this);var i=this.column;this.order=this.count++%2;if(this.lockedOrder)this.order=this.lockedOrder;if(!e[config.sortMultiSortKey]){config.sortList=[];if(config.sortForce!=null){var a=config.sortForce;for(var j=0;j<a.length;j++){if(a[j][0]!=i){config.sortList.push(a[j]);}}}config.sortList.push([i,this.order]);}else{if(isValueInArray(i,config.sortList)){for(var j=0;j<config.sortList.length;j++){var s=config.sortList[j],o=config.headerList[s[0]];if(s[0]==i){o.count=s[1];o.count++;s[1]=o.count%2;}}}else{config.sortList.push([i,this.order]);}};setTimeout(function(){setHeadersCss($this[0],$headers,config.sortList,sortCSS);appendToTable($this[0],multisort($this[0],config.sortList,cache));},1);return false;}}).mousedown(function(){if(config.cancelSelection){this.onselectstart=function(){return false};return false;}});$this.bind("update",function(){var me=this;setTimeout(function(){me.config.parsers=buildParserCache(me,$headers);cache=buildCache(me);},1);}).bind("updateCell",function(e,cell){var config=this.config;var pos=[(cell.parentNode.rowIndex-1),cell.cellIndex];cache.normalized[pos[0]][pos[1]]=config.parsers[pos[1]].format(getElementText(config,cell),cell);}).bind("sorton",function(e,list){$(this).trigger("sortStart");config.sortList=list;var sortList=config.sortList;updateHeaderSortCount(this,sortList);setHeadersCss(this,$headers,sortList,sortCSS);appendToTable(this,multisort(this,sortList,cache));}).bind("appendCache",function(){appendToTable(this,cache);}).bind("applyWidgetId",function(e,id){getWidgetById(id).format(this);}).bind("applyWidgets",function(){applyWidget(this);});if($.metadata&&($(this).metadata()&&$(this).metadata().sortlist)){config.sortList=$(this).metadata().sortlist;}if(config.sortList.length>0){$this.trigger("sorton",[config.sortList]);}applyWidget(this);});};this.addParser=function(parser){var l=parsers.length,a=true;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==parser.id.toLowerCase()){a=false;}}if(a){parsers.push(parser);};};this.addWidget=function(widget){widgets.push(widget);};this.formatFloat=function(s){var i=parseFloat(s);return(isNaN(i))?0:i;};this.formatInt=function(s){var i=parseInt(s);return(isNaN(i))?0:i;};this.isDigit=function(s,config){return/^[-+]?\d*$/.test($.trim(s.replace(/[,.']/g,'')));};this.clearTableBody=function(table){if($.browser.msie){function empty(){while(this.firstChild)this.removeChild(this.firstChild);}empty.apply(table.tBodies[0]);}else{table.tBodies[0].innerHTML="";}};}});$.fn.extend({tablesorter:$.tablesorter.construct});var ts=$.tablesorter;ts.addParser({id:"text",is:function(s){return true;},format:function(s){return $.trim(s.toLocaleLowerCase());},type:"text"});ts.addParser({id:"digit",is:function(s,table){var c=table.config;return $.tablesorter.isDigit(s,c);},format:function(s){return $.tablesorter.formatFloat(s);},type:"numeric"});ts.addParser({id:"currency",is:function(s){return/^[£$€?.]/.test(s);},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/[£$€]/g),""));},type:"numeric"});ts.addParser({id:"ipAddress",is:function(s){return/^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);},format:function(s){var a=s.split("."),r="",l=a.length;for(var i=0;i<l;i++){var item=a[i];if(item.length==2){r+="0"+item;}else{r+=item;}}return $.tablesorter.formatFloat(r);},type:"numeric"});ts.addParser({id:"url",is:function(s){return/^(https?|ftp|file):\/\/$/.test(s);},format:function(s){return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//),''));},type:"text"});ts.addParser({id:"isoDate",is:function(s){return/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);},format:function(s){return $.tablesorter.formatFloat((s!="")?new Date(s.replace(new RegExp(/-/g),"/")).getTime():"0");},type:"numeric"});ts.addParser({id:"percent",is:function(s){return/\%$/.test($.trim(s));},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g),""));},type:"numeric"});ts.addParser({id:"usLongDate",is:function(s){return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));},format:function(s){return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"shortDate",is:function(s){return/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);},format:function(s,table){var c=table.config;s=s.replace(/\-/g,"/");if(c.dateFormat=="us"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$1/$2");}else if(c.dateFormat=="uk"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$2/$1");}else if(c.dateFormat=="dd/mm/yy"||c.dateFormat=="dd-mm-yy"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/,"$1/$2/$3");}return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"time",is:function(s){return/^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);},format:function(s){return $.tablesorter.formatFloat(new Date("2000/01/01 "+s).getTime());},type:"numeric"});ts.addParser({id:"metadata",is:function(s){return false;},format:function(s,table,cell){var c=table.config,p=(!c.parserMetadataName)?'sortValue':c.parserMetadataName;return $(cell).metadata()[p];},type:"numeric"});ts.addWidget({id:"zebra",format:function(table){if(table.config.debug){var time=new Date();}var $tr,row=-1,odd;$("tr:visible",table.tBodies[0]).each(function(i){$tr=$(this);if(!$tr.hasClass(table.config.cssChildRow))row++;odd=(row%2==0);$tr.removeClass(table.config.widgetZebra.css[odd?0:1]).addClass(table.config.widgetZebra.css[odd?1:0])});if(table.config.debug){$.tablesorter.benchmark("Applying Zebra widget",time);}}});})(jQuery);
/*
 * End TableSorter
 */

 // Set "use strict" AFTER TableSorter, because it won't compile in strict mode.
"use strict";

// Utility functions for Tables

function hereDoc(f) {
  return f.toString().
	  replace(/^[^\/]+\/\*!\r?\n?/, '').
	  replace(/\r?\n?\*\/[^\/]+$/, '');
}

// Heroes Table

var gHeroesText = hereDoc(function() {/*!
Nr	Name	Rarity	Element	Max Lv	HP Lv1	ATK Lv1	REC Lv1	HP Max	ATK Max	REC Max	Cost	APMaxLv	Class	Value	XP Enh Lv1	XP Enh Max	MaxFrac	Leader Type	Leader Name	Leader Effect	AP Type	AP Power	AP Name	AP Effect	AP Cost	Resource	Image	Family	ProperName	Evolution	Evolved	XP Lv1	XP Max	HP/Lv	ATK/Lv	REC/Lv	HP Eqv	ATK Eqv	AP Min	Pred	HP Pred	ATK Pred
36	Amazonia	3 ☆☆☆	Wood	30	238	126	10	702	967	39	8		DPS	26.474526	242	7260	0	Element Spirit	Spirit of the Wind	Raises the ATK of Wood heroes to x1.3.	Element Boost	7.2	Wood Enhancement III	Wood Runes that are successfully matched are 1.8 times stronger for 4 turns.	15	161	BC01_0161_B.png	#N/A	Amazonia	4	0	0	47922	+16.	+29.	+1.				#N/A	#N/A	#N/A
159	Amazonia +	4 ☆☆☆☆	Wood	80	541	275	22	1833	2510	101	16		DPS	464.68383	354	28320	0.64556962	Element Spirit	Spirit of the Wood	Raises the ATK of Wood heroes to x1.6	Element Boost	8.4	Wood Boost	Wood Runes that are successfully matched are 2.1 times stronger for 4 turns.	20	161	BC02_0161_B.png	#N/A	Amazonia	4	1	47922	624744	+16.35	+28.29	+1.	10	24		Amazonia	702	967
25	Ana of the Light	2 ☆☆	Light	15	263	40	32	627	180	74	4	2+	HEALER	8.35164	150	2250	0	None	None		Cure Immediate	15	Quick Healing II	Restores HP equal to 15 times the hero's REC.	10	121	BC01_0121_B.png	#N/A	Ana of the Light	3	0	0	7957	+26.	+10.	+3.				#N/A	#N/A	#N/A
149	Ana of the Light +	3 ☆☆☆	Light	70	505	100	61	2851	997	337	14		HEALER	957.904639	224	15680	0	None	None		Cure Immediate	30	Quick Healing III	Restores HP equal to 30 times the hero's REC.	15	121	BC02_0121_B.png	#N/A	Ana of the Light	3	1	7957	419840	+34.	+13.	+4.	4	6		Ana of the Light	627	180
	Angelic Forces	4 ☆☆☆☆	Light	45	544	126	66	1875	821	242	16		HEALER	372.52875			1.045454545	Healing	Healing Magic	The team recovers HP equal to 1.1 times of the leader's REC every turn.	Cobweb	1	Cobweb	Delay monsters' attack turn for 1 turns.	10	157	BC01_0157_B.png	#N/A	Angelic Forces	5	0	0	134655	+30.25	+15.8	+4.				#N/A	#N/A	#N/A
179	Angelic Forces +	5 ☆☆☆☆☆	Light	99	1141	217	137	3983	1589	529	22		HEALER	3348.034123			0	Healing	Healing Magic II	The team recovers HP equal to 1.5 times the leader's REC every turn.	Cobweb	2	Cobweb II	Delay monsters' attack turn for 2 turns.	15	157	BC02_0157_B.png	#N/A	Angelic Forces	5	1	134655	1121204	+29.	+14.	+4.	25	43		Angelic Forces	1875	821
108	Aria Rogue	1 ☆	Water	15	62	48	3	286	244	17	2	1	WARRIOR	1.186328	98	1470	0	None	None		Inflict ALL	5	Morning Dew	Inflicts Water damage equal to 5 times the hero's ATK on ALL targets.	5	69	BC01_0069_B.png	Rogue Sisters	Aria Rogue	2	0	0	7957	+16.	+14.	+1.			5	#N/A	#N/A	#N/A
223	Aria Rogue +	2 ☆☆	Water	55	186	68	8	898	730	62	6	2+	WARRIOR	40.64348			0.444444444	None	None		Inflict ALL	7	Black Ice	Inflicts Water damage equal to 7 times the hero's ATK on ALL targets.	10	69	BC02_0069_B.png	Rogue Sisters	Aria Rogue	2	1	7957	231877	+13.19	+12.26	+1.	8	14		Aria Rogue	286	244
106	Atum	5 ☆☆☆☆☆	Fire	65	800	393	48	2912	2889	176	26		GOD	1480.647168			0	Element Spirit	Spirit of the Flame	Raises the ATK of Fire heroes to x1.7.	Element Boost	4.8	Fire Enhancement II	Fire Runes that are successfully matched are 1.6 times stronger for 3 turns.	10	205	BC01_0205_B.png	#N/A	Atum	6	0	0	341598	+33.	+39.	+2.				#N/A	#N/A	#N/A
221	Atum +	6 ☆☆☆☆☆☆	Fire	110	1312	686	79	4146	4283	297	32		GOD	5273.923446			0	Element Spirit	Spirit of the Flame II	Raises the ATK of Fire heroes to x2.	Element Boost	7.2	Fire Enhancement III	Fire Runes that are successfully matched are 1.8 times stronger for 4 turns.	15	205	BC02_0205_B.png	#N/A	Atum	6	1	341598	1627617	+26.	+33.	+2.	62	67		Atum	2912	2889
81	Aurora Knight	4 ☆☆☆☆	Wood	45	430	218	18	1588	1329	62	16		WARRIOR	130.848024	306	13770	0.568181818	Element Favor	Favor of the Wind	Raises the ATK and REC of Wood heroes to x1.25.	Inflict ALL	15	Wind in the Trees II	Inflicts Wood damage equal to 15 times the hero's ATK on ALL targets.	20	175	BC01_0175_B.png	#N/A	Aurora Knight	5	0	0	134655	+26.32	+25.25	+1.				#N/A	#N/A	#N/A
197	Aurora Knight +	5 ☆☆☆☆☆	Wood	99	901	375	37	3253	2727	135	22		WARRIOR	1197.575685			0	Element Favor	Favor of the Wood	Raises the ATK and REC of Wood heroes to x1.30.	Inflict ALL	20	Windstorm	Inflicts Wood damage equal to 20 times the hero's ATK on ALL targets.	25	175	BC02_0175_B.png	#N/A	Aurora Knight	5	1	134655	1121204	+24.	+24.	+1.	29	40		Aurora Knight	1588	1329
269	Avenging Golem	5 ☆☆☆☆☆	Fire	65	873	386	53	3177	2882	181	28		GOD	1657.256634			0	Element Break	Fire Break	Raises Fire heroes' ATK by x2 when there are 4 Fire Runes linked.	Inflict One	40	Flame Strike	Inflicts Fire damage equal to 40 times the hero's ATK on one target.	25	513	BC01_0513_B.png	#N/A	Avenging Golem	6	0	0	341598	+36.	+39.	+2.				#N/A	#N/A	#N/A
270	Avenging Golem +	6 ☆☆☆☆☆☆	Fire	110	1409	664	85	4461	4043	303	34		GOD	5464.854369			0	Element Break	Fire Break II	Raises Fire heroes' ATK by x3 when there are 5 Fire Runes linked.	Inflict One	80	Flame Strike II	Inflicts Fire damage equal to 80 times the hero's ATK on one target.	30	513	BC02_0513_B.png	#N/A	Avenging Golem	6	1	341598	1627617	+28.	+31.	+2.	63	72		Avenging Golem	3177	2882
241	Axel Minotaur	4 ☆☆☆☆	Fire	45	476	194	5	1840	1030	49	16		TANK	92.8648			0	Wall Element	Fire Protection II	Reduces damage from Fire enemies by 30%.	Defensive Stance	75	Fortress Stance	Reduces all damage received by 25% for 3 turns.	10	148	Axel_Minotaur.png	#N/A	Axel Minotaur	5	0	0	134655	+31.	+19.	+1.				#N/A	#N/A	#N/A
	Axel Minotaur +	5 ☆☆☆☆☆	Fire	99	997	333	10	3839	2195	108	22		TANK	910.07334			0	Wall Element	Fire Protection III	Reduces damage from Fire enemies by 40%.	Defensive Stance	90	Defensive Stance II	Reduces all damage received by 30% for 3 turns.	15	148	Axel_Minotaur_+.png	#N/A	Axel Minotaur	5	1	134655	1121204	+29.	+19.	+1.	29	37		Axel Minotaur	1840	1030
290	Bacab	5 ☆☆☆☆☆	Light	65	920	301	40	3160	2221	168	28		GOD	1179.08448	774	50310	0	Element Hand	Hand of the Sun	Raises the HP of Light heroes to x1.8.	Defensive Stance	150	Defensive Stance III	Reduces all damage received by 50% for 3 turns.	25	523	Bacab.png	#N/A	Bacab	6	0	0	341598	+35.	+30.	+2.				#N/A	#N/A	#N/A
291	Bacab +	6 ☆☆☆☆☆☆	Light	110	1600	610	50	5633	4098	268	34		GOD	6186.521112			0	Element Hand	Hand of the Sun II	Raises the HP of Light heroes to x2.25.	Defensive Stance	225	Fortress Stance III	Reduces all damage received by 75% for 3 turns.	30	523	Bacab_+.png	#N/A	Bacab	6	1	341598	1627617	+37.	+32.	+2.	42	50		Bacab	3160	2221
	Barbarous Jonah	4 ☆☆☆☆	Wood	45	462	204	19	1298	1480	63	14		WARRIOR	121.02552			0	Unstoppable	Unstoppable Fury	Grants x1.4 ATK to all heroes below 20% HP.	Element Boost	8.4	Wood Boost	Wood Runes that are successfully matched are 2.1 times stronger for 4 turns.	20	96	Barbarous_Jonah.png	#N/A	Barbarous Jonah	5	0	0	134655	+19.	+29.	+1.				#N/A	#N/A	#N/A
	Barbarous Jonah +	5 ☆☆☆☆☆	Wood	99	967	350	39	2731	3094	137	20		DPS	1157.610818			0	Unstoppable	Unstoppable Rage	Grants x2 ATK to all heroes below 30% HP.	Element Boost	13.8	Wood Boost II	Wood Runes that are successfully matched are 2.3 times stronger for 6 turns.	25	96	Barbarous_Jonah_+.png	#N/A	Barbarous Jonah	5	1	134655	1121204	+18.	+28.	+1.	18	40		Barbarous Jonah	1298	1480
305	Candy Sailor	5 ☆☆☆☆☆	Light	65	786	458	67	2834	2506	195	28		GOD	1384.89078			0	Survivor	Warrior	Survives a deadly hit when HP is above 30%.	Poison Mist	400	Poison Mist V	Poisons all targets, reducing HP by 4 times of the hero's ATK every turn.	25	533	BC01_0533_B.png	#N/A	Candy Sailor	6	0	0	341598	+32.	+32.	+2.				#N/A	#N/A	#N/A
306	Candy Sailor +	6 ☆☆☆☆☆☆	Light	110	1426	724	74	4914	4212	292	34		GOD	6043.748256			0	Survivor	Warrior	Survives a deadly hit when HP is above 40%.	Poison Mist	600	Poison Mist VI	Poisons all targets, reducing HP by 6 times of the hero's ATK every turn.	30	533	Candy_Sailor_+.png	#N/A	Candy Sailor	6	1	341598	1627617	+32.	+32.	+2.	44	56		Candy Sailor	2834	2506
57	Canis Swashbuckler	3 ☆☆☆	Water	30	243	128	10	736	969	39	8		DPS	27.814176			0	Element Spirit	Spirit of the Ice	Raises the ATK of Water heroes to x1.3.	Transform	1	Waterproof	All Wood Runes turn into Water Runes.	25	177	BC01_0177_B.png	Wolves	Canis Swashbuckler	4	0	0	47922	+17.	+29.	+1.				#N/A	#N/A	#N/A
	Canis Swashbuckler +	4 ☆☆☆☆	Water	80	594	301	24	1937	2671	103	16		DPS	532.893881			0	Element Spirit	Spirit of the Chill	Raises the ATK of Water heroes to x1.6.	Transform	1	Waterproof	All Wood Runes turn into Water Runes.	25	177	BC02_0177_B.png	#N/A	Canis Swashbuckler	4	1	47922	624744	+17.	+30.	+1.	8	22		Canis Swashbuckler	736	969
34	Centaur Reborn	3 ☆☆☆	Light	30	316	68	38	1186	445	154	8		HEALER	81.27658	200	6000	0	Element Hand	Hand of Brightness	Raises the HP of Light heroes to x1.45.	Cure Immediate	30	Quick Healing III	Restores HP equal to 30 times the hero's REC.	15	119	BC01_0119_B.png	#N/A	Centaur Reborn	4	0	0	47922	+30.	+13.	+4.				#N/A	#N/A	#N/A
157	Centaur Reborn +	4 ☆☆☆☆	Light	80	719	149	87	3010	1097	324	16		HEALER	1069.83828			0	Element Hand	Hand of the Light	Raises the HP of Light heroes to x1.8.	Cure Immediate	35	Healing Force	Restores HP equal to 35 times the hero's REC.	20	119	BC02_0119_B.png	#N/A	Centaur Reborn	4	1	47922	624744	+29.	+12.	+3.	16	25		Centaur Reborn	1186	445
63	Champion of Darkness	4 ☆☆☆☆	Dark	45	574	159	6	2202	863	50	16		TANK	95.0163	322	14490	0	Survivor	Survivor II	Survives a deadly hit when HP is above 20%.	Defensive Stance	135	Fortress Stance II	Reduces all damage received by 45% for 3 turns.	20	108	BC01_0108_B.png	#N/A	Champion of Darkness	5	0	0	134655	+37.	+16.	+1.				#N/A	#N/A	#N/A
182	Champion of Darkness +	5 ☆☆☆☆☆	Dark	99	1205	272	13	4635	1742	111	24		TANK	896.23287	468	46332	0	Survivor	Survivor	Survives a deadly hit when HP is above 10%.	Defensive Stance	150	Defensive Stance III	Reduces all damage received by 50% for 3 turns.	25	108	BC02_0108_B.png	#N/A	Champion of Darkness	5	1	134655	1121204	+35.	+15.	+1.	28	39		Champion of Darkness	2202	863
6	Cougerus Gold	1 ☆	Light	15	75	28	9	341	154	37	2	1	HEALER	1.943018	84	1260	0	None	None		Cure Turns	18	Quick Cure	Restores HP equal to 9 times the hero's REC for 2 turns.	5	6	BC01_0006_B.png	Felinius	Cougerus Gold	2	0	0	7957	+19.	+9.	+2.			5	#N/A	#N/A	#N/A
124	Cougerus Gold +	2 ☆☆	Light	55	227	40	28	1078	433	136	6	2+	HEALER	63.481264	126	6930	1.037037037	None	None		Cure Turns	24	Quick Cure II	Restores HP equal to 12 times the hero's REC for 2 turns.	10	6	BC02_0006_B.png	Felinius	Cougerus Gold	2	1	7957	231877	+15.76	+7.28	+2.	7	16		Cougerus Gold	341	154
2	Crescent Moon	1 ☆	Water	1	14	11	1	15	12	1	9	-	MATERIAL	0.00018	100	100	#DIV/0!	Evolve	Evolve Material	Used for performing an evolve	None	0	None			2	BC01_0002_B.png	Essence	Crescent Moon	1	0	0	0							#N/A	#N/A	#N/A
79	Cyclonian Eye	4 ☆☆☆☆	Wood	1	55	24	1	112	50	1	9	-	MATERIAL	0.0056	164	164	#DIV/0!	Evolve	Evolve Material	Used for performing an evolve	None	0	None			167	BC01_0167_B.png	Essence	Cyclonian Eye	4	0	0	0							#N/A	#N/A	#N/A
68	Cyclonian Rebel	4 ☆☆☆☆	Fire	1	97	55	1	98	56	1	9	-	MATERIAL	0.005488	330	330	#DIV/0!	Evolve	Evolve Material	Used for performing an evolve	None	0	None			127	BC01_0127_B.png	Essence	Cyclonian Rebel	4	0	0	0							#N/A	#N/A	#N/A
64	Cyclonius Rex	4 ☆☆☆☆	Water	1	53	25	1	107	52	1	9	-	MATERIAL	0.005564	164	164	#DIV/0!	Evolve	Evolve Material	Used for performing an evolve	None	0	None			116	BC01_0116_B.png	Essence	Cyclonius Rex	4	0	0	0							#N/A	#N/A	#N/A
42	Cyclopian Assassin	3 ☆☆☆	Water	30	265	115	11	1019	724	40	8		WARRIOR	29.51024			0	Element Favor	Favor of the Ice	Raises the ATK and REC of Water heroes to x1.25.	Poison Mist	160	Poison Mist II	Poisons all targets, reducing HP by 160% times the hero's ATK every turn.	10	110	BC01_0110_B.png	#N/A	Cyclopian Assassin	4	0	0	47922	+26.	+21.	+1.				#N/A	#N/A	#N/A
161	Cyclopian Assassin +	4 ☆☆☆☆	Water	80	628	261	26	2667	1961	105	16		WARRIOR	549.148635			1.329113924	Element Favor	Favor of the Chill	Raises the ATK and REC of Water heroes to x1.30.	Poison Mist	240	Poison Mist III	Poisons all targets, reducing HP by 240% times the hero's ATK every turn.	15	110	BC02_0110_B.png	#N/A	Cyclopian Assassin	4	1	47922	624744	+25.81	+21.52	+1.	15	22		Cyclopian Assassin	1019	724
43	Cyclopian Grunt	3 ☆☆☆	Wood	30	239	127	10	935	794	39	8		WARRIOR	28.95321	250	7500	0	Element Favor	Favor of the Wind	Raises the ATK and REC of Wood heroes to x1.25.	Poison Mist	160	Poison Mist II	Poisons all targets, reducing HP by 160% times the hero's ATK every turn.	10	111	BC01_0111_B.png	#N/A	Cyclopian Grunt	4	0	0	47922	+24.	+23.	+1.				#N/A	#N/A	#N/A
162	Cyclopian Grunt +	4 ☆☆☆☆	Wood	80	567	287	23	2384	2104	102	16		WARRIOR	511.625472	368	29440	0	Element Favor	Favor of the Wood	Raises the ATK and REC of Wood heroes to x1.30.	Poison Mist	240	Poison Mist III	Poisons all targets, reducing HP by 240% times the hero's ATK every turn.	15	111	BC02_0111_B.png	#N/A	Cyclopian Grunt	4	1	47922	624744	+23.	+23.	+1.	16	22		Cyclopian Grunt	935	794
44	Cyclopian Riot	3 ☆☆☆	Fire	30	232	131	10	899	827	39	8		WARRIOR	28.995447	262	7860	0	Element Favor	Favor of the Heat	Raises the ATK and REC of Fire heroes to x1.25.	Poison Mist	160	Poison Mist II	Poisons all targets, reducing HP by 160% times the hero's ATK every turn.	10	112	BC01_0112_B.png	#N/A	Cyclopian Riot	4	0	0	47922	+23.	+24.	+1.				#N/A	#N/A	#N/A
163	Cyclopian Riot +	4 ☆☆☆☆	Fire	80	549	298	22	1175	1187	101	16		WARRIOR	140.867225			1.17721519	Element Favor	Favor of Fire	Raises the ATK and REC of Fire heroes to x1.30.	Poison Mist	240	Poison Mist III	Poisons all targets, reducing HP by 240% times the hero's ATK every turn.	15	112	BC02_0112_B.png	#N/A	Cyclopian Riot	4	1	47922	624744	+7.92	+11.25	+1.	44	47		Cyclopian Riot	899	827
33	Cyclopian Warrior	3 ☆☆☆	Wood	30	343	83	4	1416	460	33	8		TANK	21.49488	204	6120	0	Element Hand	Hand of the Earth	Raises the HP of Wood heroes to x1.8.	Inflict ALL	7	Wind in the Trees	Inflicts Wood damage equal to 7 times the hero's ATK on ALL targets.	10	101	BC01_0101_B.png	#N/A	Cyclopian Warrior	4	0	0	47922	+37.	+13.	+1.				#N/A	#N/A	#N/A
156	Cyclopian Warrior +	4 ☆☆☆☆	Wood	80	783	180	8	3548	1207	87	16		TANK	372.571932	300	24000	0	Element Hand	Hand of the Earth II	Raises the HP of Wood heroes to x2.25.	Inflict ALL	9	Light Wind II	Inflicts Wood damage equal to 9 times the hero's ATK on ALL targets.	15	101	BC02_0101_B.png	#N/A	Cyclopian Warrior	4	1	47922	624744	+35.	+13.	+1.	18	22		Cyclopian Warrior	1416	460
41	Dark Oracle	3 ☆☆☆	Dark	30	246	118	10	942	727	39	8		WARRIOR	26.708526	206	6180	0	Unstoppable	Unstoppable Fury	Grants x1.4 ATK to all heroes below 20% HP.	Transform	1	Darkproof	All Light Runes turn into Dark Runes.	25	109	BC01_0109_B.png	#N/A	Dark Oracle	5	0	0	47922	+24.	+21.	+1.				#N/A	#N/A	#N/A
160	Dark Oracle +	4 ☆☆☆☆	Dark	80	449	206	18	1634	1233	97	10		WARRIOR	195.428034			0	Unstoppable	Unstoppable Fury II	Grants x1.6 ATK to all heroes below 20% HP.	Transform	1	Darkproof	All Light Runes turn into Dark Runes.	25	109	BC02_0109_B.png	#N/A	Dark Oracle	5	1	47922	624744	+15.	+13.	+1.	33	40		Dark Oracle	942	727
233b	Dark Oracle ++	5 ☆☆☆☆☆	Dark	99	1473	167	177	5197	2617	275	28		WARRIOR	3740.150975			0	Unstoppable	Unstoppable Rage	Grants x2 ATK to all heroes below 30% HP.	Transform	2	Fully Darkproof	All Light Runes and Heart Runes turn into Dark Runes.	25	109	BC03_0109_B.png	#N/A	Dark Oracle	5	2	624744	1611293	+38.	+25.	+1.	4	43		Dark Oracle +	1634	1233
	Draconis Elder	3 ☆☆☆	Dark	30	244	121	10	767	956	39	8		DPS	28.596828			0.827586207	Element Favor	Favor of Darkness	Raises the ATK and REC of Dark heroes to x1.25.	Element Boost	7.2	Dark Enhancement III	Dark Runes that are successfully matched are 1.8 times stronger for 4 turns.	15	154	BC01_0154_B.png	#N/A	Draconis Elder	4	0	0	47922	+18.03	+28.79	+1.				#N/A	#N/A	#N/A
158	Draconis Elder +	4 ☆☆☆☆	Dark	80	555	265	23	1819	2398	102	14		DPS	444.920124	344	27520	0	Element Favor	Favor of the Black	Raises the ATK and REC of Dark heroes to x1.30.	Element Boost	8.4	Dark Boost	Dark Runes that are successfully matched are 2.1 times stronger for 4 turns.	20	154	BC02_0154_B.png	#N/A	Draconis Elder	4	1	47922	624744	+16.	+27.	+1.	13	26		Draconis Elder	767	956
294	Dragon's Prayer	5 ☆☆☆☆☆	Dark	65	800	350	50	2720	2526	178	28		GOD	1222.98816			0	Kinetic	Skilled Fighter	Reduces Active Skill cost by 2 AP.	Transform	1	Darkproof	All Light Runes turn into Dark Runes.	25	525	BC01_0525_B.png	#N/A	Dragon's Prayer	6	0	0	341598	+30.	+34.	+2.				#N/A	#N/A	#N/A
295	Dragon's Prayer +	6 ☆☆☆☆☆☆	Dark	110	1400	620	70	4888	4653	288	34		GOD	6550.232832			0	Kinetic	Talented Fighter	Reduces Active Skill cost by 3 AP.	Transform	2	Fully Darkproof	All Light Runes and Heart Runes turn into Dark Runes.	25	525	BC02_0525_B.png	#N/A	Dragon's Prayer	6	1	341598	1627617	+32.	+37.	+2.	41	52		Dragon's Prayer	2720	2526
	Dwarf Engineer	4 ☆☆☆☆	Dark	45	692	125	7				18		TANK	0			1.272727273	Wall Element	Dark Protection	Reduces damage from Dark enemies by 40%.	Poison Mist	400	Poison Mist V	Poisons all targets, reducing HP by 4 times of the hero's ATK every turn.	25	504	Dwarf_Engineer.png	#N/A	Dwarf Engineer	5	0	0	134655	-15.73	-2.84	-0.16				#N/A	#N/A	#N/A
	Dwarf Engineer +	5 ☆☆☆☆☆	Dark	99	1451	214	15	5567	1390	113	26		TANK	874.40869			0	Wall Element	Dark Barrier	Reduces damage from Dark enemies by 60%.	Poison Mist	600	Poison Mist VI	Poisons all targets, reducing HP by 6 times of the hero's ATK every turn.	30	504	BC02_0504_B.png	#N/A	Dwarf Engineer	5	1	134655	1121204	+42.	+12.	+1.	-35	-18		Dwarf Engineer	0	0
15	Dwarven Alchemist	2 ☆☆	Wood	15	214	38	3	564	150	17	2	1	TANK	1.4382	122	1830	0	Resilient	Resilient	2% of all damage inflicted by the hero is converted into HP.	Defensive Stance	30	Defensive Stance	Reduces all damage received by 10% for 3 turns.	5	9	BC01_0009_B.png	Dwarves	Dwarven Alchemist	3	0	0	7957	+25.	+8.	+1.			5	#N/A	#N/A	#N/A
137	Dwarven Alchemist +	3 ☆☆☆	Wood	70	414	97	5	2553	856	74	12		TANK	161.717232	184	12880	0	Resilient	Resilient II	3% of all damage inflicted by the hero is converted into HP.	Defensive Stance	75	Fortress Stance	Reduces all damage received by 25% for 3 turns.	10	9	BC02_0009_B.png	Dwarves	Dwarven Alchemist	3	1	7957	419840	+31.	+11.	+1.	5	5		Dwarven Alchemist	564	150
	Dwarven Warrior	3 ☆☆☆	Fire	30	346	60	42	1269	410	158	8		HEALER	82.20582			0.896551724	Healing	Healing Hands	The team recovers HP equal to 1.1 times of the leader's REC every turn.	Cure Turns	45	Quick Cure III	Restores HP equal to 15 times the hero's REC for 3 turns.	15	152	BC01_0152_B.png	#N/A	Dwarven Warrior	5	0	0	47922	+31.83	+12.07	+4.				#N/A	#N/A	#N/A
	Dwarven Warrior +	4 ☆☆☆☆	Fire	80	630	105	76	2108	699	234	10		HEALER	344.797128			1.227848101	Healing	Healing Magic	The team recovers HP equal to 1.1 times of the leader's REC every turn.	Cure Turns	54	Curing Force	Restores HP equal to 18 times the hero's REC for 3 turns.	20	152	BC02_0152_B.png	#N/A	Dwarven Warrior	5	1	47922	624744	+18.71	+7.52	+2.	34	41		Dwarven Warrior	1269	410
	Dwarven Warrior ++	5 ☆☆☆☆☆	Fire	99	1031	247	124	3736	3804	320	28		HEALER	4547.75808			0.897959184	Healing	Healing Magic II	The team recovers HP equal to 1.5 times the leader's REC every turn.	Cure Turns	63	Curing Force II	Restores HP equal to 21 times the hero's REC each turn for 3 turns.	25	152	BC03_0152_B.png	#N/A	Dwarven Warrior	5	2	624744	1611293	+27.6	+36.3	+2.	39	12		Dwarven Warrior +	2108	699
	Earth Whisperer	4 ☆☆☆☆	Wood	45	366	251	15	1026	1791	59	16		DPS	108.416394			0	Element Spirit	Spirit of the Wood	Raises the ATK of Wood heroes to x1.6	Element Boost	8.4	Wood Boost	Wood Runes that are successfully matched are 2.1 times stronger for 4 turns.	20	98	BC01_0098_B.png	#N/A	Earth Whisperer	5	0	0	134655	+15.	+35.	+1.				#N/A	#N/A	#N/A
181	Earth Whisperer +	5 ☆☆☆☆☆	Wood	99	766	430	31	2138	3762	129	22		DPS	1037.567124	398	39402	0	Element Spirit	Spirit of the Earth	Raises the ATK of Wood heroes to x1.7.	Element Boost	13.8	Wood Boost II	Wood Runes that are successfully matched are 2.3 times stronger for 6 turns.	25	98	BC02_0098_B.png	#N/A	Earth Whisperer	5	1	134655	1121204	+14.	+34.	+1.	19	40		Earth Whisperer	1026	1791
	Elven Herbalist	5 ☆☆☆☆☆	Wood	65	766	423	46	2814	3111	174	28		GOD	1523.257596			0	Healing	Healing Magic III	The team recovers HP equal to 2.5 times the leader's REC every turn.	Element Boost	12	Cure Enhancement II	Heart Runes that are successfully matched are 4 times stronger for 3 turns.	25	509	BC01_0509_B.png	#N/A	Elven Herbalist	6	0	0	341598	+32.	+42.	+2.				#N/A	#N/A	#N/A
266	Elven Herbalist +	6 ☆☆☆☆☆☆	Wood	110	1466	626	88	4736	3896	306	34		GOD	5646.145536			0	Healing	Healing Magic IV	The team recovers HP equal to 3 times the leader's REC every turn.	Element Boost	20	Cure Enhancement III	Heart Runes that are successfully matched are 5 times stronger for 4 turns.	30	509	BC02_0509_B.png	#N/A	Elven Herbalist	6	1	341598	1627617	+30.	+30.	+2.	45	83		Elven Herbalist	2814	3111
47	Elven Iceya	3 ☆☆☆	Water	30	361	59	44	1376	378	160	8		HEALER	83.22048	184	5520	0	Element Hand	Hand of the Ice	Raises the HP of Water heroes to x1.45.	Cure Immediate	30	Quick Healing III	Restores HP equal to 30 times the hero's REC.	15	123	BC01_0123_B.png	Elves	Elven Iceya	4	0	0	47922	+35.	+11.	+4.				#N/A	#N/A	#N/A
166	Elven Iceya +	4 ☆☆☆☆	Water	80	788	125	95	3316	915	411	16		HEALER	1247.03154	270	21600	0	Element Hand	Hand of the Chill	Raises the HP of Water heroes to x1.8.	Cure Immediate	35	Healing Force	Restores HP equal to 35 times the hero's REC.	20	123	BC02_0123_B.png	Elves	Elven Iceya	4	1	47922	624744	+32.	+10.	+4.	18	25		Elven Iceya	1376	378
50	Elven Saria	3 ☆☆☆	Wood	15	274	116	11	694	452	25	8		CRYPTIDS	7.8422	283?	#VALUE!	0	Element Fury	Fury of the Wind	Raises the ATK and HP of Wood heroes to x1.2.	Inflict ALL	9	Light Wind II	Inflicts Wood damage equal to 9 times the hero's ATK on ALL targets.	15	130	BC01_0130_B.png	Iron Ladies	Elven Saria	5	0	0	7957	+30.	+24.	+1.				#N/A	#N/A	#N/A
169	Elven Saria +	4 ☆☆☆☆	Wood	55	500	204	20	2282	1662	74	15		CRYPTIDS	280.658616	348	19140	0	Element Fury	Fury of the Wood	Raises the ATK and HP of Wood heroes to x1.35.	Inflict ALL	15	Wind in the Trees II	Inflicts Wood damage equal to 15 times the hero's ATK on ALL targets.	20	130	BC02_0130_B.png	Iron Ladies	Elven Saria	5	1	7957	231877	+33.	+27.	+1.	6	9		Elven Saria	694	452
231	Elven Saria ++	5 ☆☆☆☆☆	Wood	99	1060	374	43	4196	3118	141	26		CRYPTIDS	1844.721048			0	Element Fury	Fury of the Earth	Raises the ATK and HP of Wood heroes to x1.4.	Inflict ALL	20	Windstorm	Inflicts Wood damage equal to 20 times the hero's ATK on ALL targets.	25	130	BC03_0130_B.png	Iron Ladies	Elven Saria	5	2	231877	1218426	+32.	+28.	+1.	38	46		Elven Saria +	2282	1662
51	Elven Sharpe	3 ☆☆☆	Wood	30	226	134	10	690	1033	39	8		DPS	27.79803	248	7440	0	Element Fury	Fury of the Wind	Raises the ATK and HP of Wood heroes to x1.2.	Inflict One	18	Wind Blade	Inflicts Wood damage equal to 18 times the hero's ATK on one target.	15	132	BC01_0132_B.png	#N/A	Elven Sharpe	4	0	0	47922	+16.	+31.	+1.				#N/A	#N/A	#N/A
170	Elven Sharpe +	4 ☆☆☆☆	Wood	80	535	304	22	1799	2753	101	16		DPS	500.217347	364	29120	0	Element Fury	Fury of the Wood	Raises the ATK and HP of Wood heroes to x1.35.	Inflict One	30	Gale Blade	Inflicts Wood damage equal to 30 times the hero's ATK on one target.	20	132	BC02_0132_B.png	#N/A	Elven Sharpe	4	1	47922	624744	+16.	+31.	+1.	10	24		Elven Sharpe	690	1033
96	Enki	5 ☆☆☆☆☆	Water	65	751	346	46	2735	2586	174	26		GOD	1230.65154	528?	#VALUE!	0	Kinetic	Kinetic Hands	Restores 3 AP before every battle.	Multi-Target Element	5	Multi-Water II	Water Attacks become multi-target for 5 turns.	15	192	BC01_0192_B.png	#N/A	Enki	6	0	0	341598	+31.	+35.	+2.				#N/A	#N/A	#N/A
211	Enki +	6 ☆☆☆☆☆☆	Water	110	1290	633	78	4124	3903	296	30		GOD	4764.407712			0	Kinetic	Kinetic Magic	Restores 4 AP before every battle.	Multi-Target Element	6	Multi-Water III	Water Attacks become multi-target for 6 turns.	20	192	BC02_0192_B.png	#N/A	Enki	6	1	341598	1627617	+26.	+30.	+2.	56	65		Enki	2735	2586
8	Errol the Dwarf	2 ☆☆	Light	15	194	32	24	474	144	52	2	1	HEALER	3.549312	122	1830	0	None	None		Cure Immediate	10	Quick Healing	Restores HP equal to 10 times of the hero's REC.	5	12	BC01_0012_B.png	Dwarves	Errol the Dwarf	3	0	0	7957	+20.	+8.	+2.			5	#N/A	#N/A	#N/A
126	Errol the Dwarf +	3 ☆☆☆	Light	70	372	82	45	2097	841	252	10		HEALER	444.421404	184	12880	0	None	None		Cure Immediate	15	Quick Healing II	Restores HP equal to 15 times the hero's REC.	10	12	BC02_0012_B.png	Dwarves	Errol the Dwarf	3	1	7957	419840	+25.	+11.	+3.	4	6		Errol the Dwarf	474	144
11	Espiritus Petalia	1 ☆	Dark	15	92	28	12	414	154	54	2	1	HEALER	3.442824	108	1620	0	None	None		Cure Immediate	10	Quick Healing	Restores HP equal to 10 times of the hero's REC.	5	102	BC01_0102_B.png	#N/A	Espiritus Petalia	2	0	0	7957	+23.	+9.	+3.			5	#N/A	#N/A	#N/A
130	Espiritus Petalia +	2 ☆☆	Dark	55	305	44	37	1439	476	199	8	2+	HEALER	136.307836	162	8910	0	None	None		Cure Immediate	15	Quick Healing II	Restores HP equal to 15 times the hero's REC.	10	102	BC02_0102_B.png	#N/A	Espiritus Petalia	2	1	7957	231877	+21.	+8.	+3.	5	14		Espiritus Petalia	414	154
37	Essence Flametorn	3 ☆☆☆	Fire	1	54	31	1	54	33	1	9	-	MATERIAL	0.001782	220	220	#DIV/0!	Evolve	Evolve Material	Used for performing an evolve	None	0	None			53	BC01_0053_B.png	Essence	Essence Flametorn	3	0	0	0							#N/A	#N/A	#N/A
10	Eternal Flames	1 ☆	Fire	1	13	12	1	14	13	1	9	-	MATERIAL	0.000182	100	100	#DIV/0!	Evolve	Evolve Material	Used for performing an evolve	None	0	None			58	BC01_0058_B.png	Essence	Eternal Flames	1	0	0	0							#N/A	#N/A	#N/A
110	Experience Giver	4 ☆☆☆☆	Light	1	368	233	1	369	234	1	18	-	EXP SPECIAL	0.086346	4500	4500	#DIV/0!	XP Giver	XP Giver	Gives 4,500 XP to hero.	None	0	None			301	BC01_0301_B.png	Specials	Experience Giver	4	0	0	0							#N/A	#N/A	#N/A
116	Feline Mistress	5 ☆☆☆☆☆	Light	65	732	358	44	2716	2662	172	26		GOD	1243.558624			0	Healing	Healing Magic III	The team recovers HP equal to 2.5 times the leader's REC every turn.	Cure Percent	70	Percent Cure IV	Restores 70% Hp of the team's total HP.	40	162	BC01_0162_B.png	#N/A	Feline Mistress	6	0	0	341598	+31.	+36.	+2.				#N/A	#N/A	#N/A
226	Feline Mistress +	6 ☆☆☆☆☆☆	Light	110	1251	652	76	3976	4031	294	30		GOD	4712.013264			0	Healing	Healing Magic IV	The team recovers HP equal to 3 times the leader's REC every turn.	Cure Percent	100	Full Percent Cure	Restores 100% HP of the team's total HP.	45	162	BC02_0162_B.png	#N/A	Feline Mistress	6	1	341598	1627617	+25.	+31.	+2.	59	65		Feline Mistress	2716	2662
4	Felinius Blade	1 ☆	Water	15	53	55	3	193	349	17	2	1	DPS	1.145069	92	1380	0	None	None		Inflict ALL	5	Morning Dew	Inflicts Water damage equal to 5 times the hero's ATK on ALL targets.	5	4	BC01_0004_B.png	Felinius	Felinius Blade	2	0	0	7957	+10.	+21.	+1.			5	#N/A	#N/A	#N/A
122	Felinius Blade +	2 ☆☆	Water	55	160	79	7	592	997	61	6	2+	DPS	36.003664	138	7590	0	None	None		Inflict ALL	7	Black Ice	Inflicts Water damage equal to 7 times the hero's ATK on ALL targets.	10	4	BC02_0004_B.png	Felinius	Felinius Blade	2	1	7957	231877	+8.	+17.	+1.	4	16		Felinius Blade	193	349
5	Felinus Boulders	1 ☆	Wood	15	66	44	3	234	268	17	2	1	DPS	1.066104	90	1350	0	None	None		Inflict ALL	5	Light Wind	Inflicts Wood damage equal to 5 times the hero's ATK on ALL targets.	5	5	BC01_0005_B.png	Felinius	Felinus Boulders	2	0	0	7957	+12.	+16.	+1.			5	#N/A	#N/A	#N/A
123	Felinus Boulders +	2 ☆☆	Wood	55	199	63	8	739	819	62	6	2+	DPS	37.524942	134	7370	0	None	None		Inflict ALL	7	Wind in the Trees	Inflicts Wood damage equal to 7 times the hero's ATK on ALL targets.	10	5	BC02_0005_B.png	Felinius	Felinus Boulders	2	1	7957	231877	+10.	+14.	+1.	4	15		Felinus Boulders	234	268
3	Felio Strike	1 ☆	Fire	15	52	56	3	192	350	17	2	1	DPS	1.1424	98	1470	0	None	None		Inflict ALL	5	Warm Fire	Inflicts Fire damage equal to 5 times the hero's ATK on ALL targets.	5	3	BC01_0003_B.png	Felinius	Felio Strike	2	0	0	7957	+10.	+21.	+1.			5	#N/A	#N/A	#N/A
121	Felio Strike +	2 ☆☆	Fire	55	157	80	7	589	1052	61	6	7	DPS	37.797308	148	8140	0	None	None		Inflict ALL	7	Crackling Flames	Inflicts Fire damage equal to 7 times the hero's ATK on ALL targets.	10	3	BC02_0003_B.png	Felinius	Felio Strike	2	1	7957	231877	+8.	+18.	+1.	4	15	4	Felio Strike	192	350
103	Fire Wizard	5 ☆☆☆☆☆	Fire	65	730	357	44	2695	2690	172	26		GOD	1246.9226			1.15625	Element Fury	Fury of the Flame	Raises the ATK and HP of Fire heroes to x1.4.	Multi-Target Element	4	Multi-Fire	Fire Attacks become multi-target for 4 turns.	10	201	BC01_0201_B.png	#N/A	Fire Wizard	6	0	0	341598	+30.7	+36.45	+2.				#N/A	#N/A	#N/A
218	Fire Wizard +	6 ☆☆☆☆☆☆	Fire	110	1253	653	76	3978	4032	294	30		GOD	4715.553024			0	Element Fury	Fury of the Flame II	Raises the ATK and HP of Fire heroes to x1.6.	Multi-Target Element	5	Multi-Fire II	Fire Attacks become multi-target for 5 turns.	15	201	BC02_0201_B.png	#N/A	Fire Wizard	6	1	341598	1627617	+25.	+31.	+2.	58	66		Fire Wizard	2695	2690
13	Floral Goddess	1 ☆	Wood	15	89	30	11	411	156	53	2	1	HEALER	3.398148	106	1590	0	None	None		Cure Immediate	10	Quick Healing	Restores HP equal to 10 times of the hero's REC.	5	133	BC01_0133_B.png	#N/A	Floral Goddess	2	0	0	7957	+23.	+9.	+3.			5	#N/A	#N/A	#N/A
134	Floral Goddess +	2 ☆☆	Wood	55	294	46	36	1374	478	144	8	2+	HEALER	94.575168	160	8800	0	None	None		Cure Immediate	15	Quick Healing II	Restores HP equal to 15 times the hero's REC.	10	133	BC02_0133_B.png	#N/A	Floral Goddess	2	1	7957	231877	+20.	+8.	+2.	6	14		Floral Goddess	411	156
75	Foxen Sly	4 ☆☆☆☆	Fire	45	377	249	16	1345	1481	60	16		WARRIOR	119.5167	306	13770	0	Element Preparation	Fire Preparation	All Water Runes have a 50% chance to turn into Fire Runes.	Inflict One	30	Fire Strike II	Inflicts Fire damage equal to 30 times the hero's ATK on one target.	20	149	BC01_0149_B.png	#N/A	Foxen Sly	5	0	0	134655	+22.	+28.	+1.				#N/A	#N/A	#N/A
192	Foxen Sly +	5 ☆☆☆☆☆	Fire	99	790	428	32	2848	3074	130	22		WARRIOR	1138.11776			0	Element Preparation	Fire Preparation II	All Water Runes have a 75% chance to turn into Fire Runes.	Inflict One	40	Flame Strike	Inflicts Fire damage equal to 40 times the hero's ATK on one target.	25	149	BC02_0149_B.png	#N/A	Foxen Sly	5	1	134655	1121204	+21.	+27.	+1.	26	39		Foxen Sly	1345	1481
93	Freya	5 ☆☆☆☆☆	Wood	65	905	405	55	3403	3003	183	30		GOD	1870.115247			0.625	Element Break	Wood Break II	Raises Wood heroes' ATK by x3 when there are 5 Wood Runes linked.	Transform	4	Wood Art	All Runes will turn into Wood Runes, but HP will be reduced to 1.	40	188	BC01_0188_B.png	#N/A	Freya	6	0	0	341598	+39.03	+40.59	+2.				#N/A	#N/A	#N/A
209	Freya +	6 ☆☆☆☆☆☆	Wood	110	1484	709	90	4754	4415	308	34		GOD	6464.58428			0	Element Break	Wood Break III	Raises Wood heroes' ATK by x4 when there are 6 Wood Runes linked.	Transform	4	Wood Art	All Runes will turn into Wood Runes, but HP will be reduced to 1.	40	188	BC02_0188_B.png	#N/A	Freya	6	1	341598	1627617	+30.	+34.	+2.	64	67		Freya	3403	3003
70	Gaia the Conjurer	4 ☆☆☆☆	Dark	45	698	98	84	2458	582	304	18		HEALER	434.889024	338	15210	0	Element Refuge	Refuge of the Black	Raises the REC and HP of Dark heroes to x1.3.	Cure Immediate	15	Quick Healing II	Restores HP equal to 15 times the hero's REC.	10	129	BC01_0129_B.png	#N/A	Gaia the Conjurer	5	0	0	134655	+40.	+11.	+5.				#N/A	#N/A	#N/A
187	Gaia the Conjurer +	5 ☆☆☆☆☆	Dark	99	1464	168	176	5188	1246	666	26	7	HEALER	4305.189168	410	40590	0	Element Refuge	Refuge of the Night	Raises the REC and HP of Dark heroes to x1.35.	Cure Immediate	30	Quick Healing III	Restores HP equal to 30 times the hero's REC.	15	129	BC02_0129_B.png	#N/A	Gaia the Conjurer	5	1	134655	1121204	+38.	+11.	+5.	26	38	9	Gaia the Conjurer	2458	582
38	Genus Ice	3 ☆☆☆	Water	1	58	29	1	59	30	1	9	-	MATERIAL	0.00177	224	224	#DIV/0!	Evolve	Evolve Material	Used for performing an evolve	None	0	None			55	BC01_0055_B.png	Essence	Genus Ice	3	0	0	0							#N/A	#N/A	#N/A
32	Glinda Warden	3 ☆☆☆	Fire	30	213	140	9	822	894	38	8	7	WARRIOR	27.924984	234	7020	0	Element Fury	Fury of the Heat	Raises the ATK and HP of Fire heroes to x1.2.	Inflict ALL	7	Crackling Flames	Inflicts Fire damage equal to 7 times the hero's ATK on ALL targets.	10	156	BC01_0156_B.png	Wardens	Glinda Warden	4	0	0	47922	+21.	+26.	+1.			4	#N/A	#N/A	#N/A
155	Glinda Warden +	4 ☆☆☆☆	Fire	80	485	307	20	2065	2282	99	16		WARRIOR	466.52067			0	Element Fury	Fury of Fire	Raises the ATK and HP of Fire heroes to x1.35.	Inflict ALL	9	Warm Fire II	Inflicts Fire damage equal to 9 times the hero's ATK on ALL targets.	15	156	BC02_0156_B.png	Wardens	Glinda Warden	4	1	47922	624744	+20.	+25.	+1.	17	23		Glinda Warden	822	894
17	Glynwick the Dwarf	2 ☆☆	Dark	15	217	38	3	567	150	17	2	1	TANK	1.44585	130	1950	0	Resilient	Resilient	2% of all damage inflicted by the hero is converted into HP.	Defensive Stance	30	Defensive Stance	Reduces all damage received by 10% for 3 turns.	5	11	BC01_0011_B.png	Dwarves	Glynwick the Dwarf	3	0	0	7957	+25.	+8.	+1.			5	#N/A	#N/A	#N/A
141	Glynwick the Dwarf +	3 ☆☆☆	Dark	70	416	98	5	2555	857	74	12	7	TANK	162.03299	196	13720	0	Resilient	Resilient II	3% of all damage inflicted by the hero is converted into HP.	Defensive Stance	75	Fortress Stance	Reduces all damage received by 25% for 3 turns.	10	11	BC02_0011_B.png	Dwarves	Glynwick the Dwarf	3	1	7957	419840	+31.	+11.	+1.	5	5	4	Glynwick the Dwarf	567	150
	Goblin Demolisher	4 ☆☆☆☆	Fire	45	500	178	20				16		WARRIOR	0			2.136363636	Element Oath	Oath of the Heat	Raises the ATK, REC, and HP of Fire heroes to x1.1.	Element Boost	4.8	Fire Enhancement II	Fire Runes that are successfully matched are 1.6 times stronger for 3 turns.	10	503	Goblin_Demolisher.png	#N/A	Goblin Demolisher	5	0	0	134655	-11.36	-4.05	-0.45				#N/A	#N/A	#N/A
258	Goblin Demolisher +	5 ☆☆☆☆☆	Fire	99	1047	307	42	3791	2267	140	22		WARRIOR	1203.18758			0	Element Oath	Oath of Fire	Raises the ATK, REC, and HP of Fire heroes to x1.2.	Element Boost	7.2	Fire Enhancement III	Fire Runes that are successfully matched are 1.8 times stronger for 4 turns.	15	503	Goblin_Demolisher_+.png	#N/A	Goblin Demolisher	5	1	134655	1121204	+28.	+20.	+1.	-37	-15		Goblin Demolisher	0	0
	Golden King	5 ☆☆☆☆☆	Fire	1	680	320	680	681	321	680	34	-	COINS SPECIAL	148.64868			#DIV/0!	Coin Gift			None	0	None			305	BC01_0305_B.png	Specials	Golden King	5	0	0	0							#N/A	#N/A	#N/A
40	Golden Knight	3 ☆☆☆	Fire	1	214	128	214	215	129	214	20	-	COINS SPECIAL	5.93529	224	224	#DIV/0!	Coin Gift	Coin Gift	Trade for 8,000 COINS.	None	0	None			303	BC01_0303_B.png	Specials	Golden Knight	3	0	0	0							#N/A	#N/A	#N/A
112	Golden Prince	4 ☆☆☆☆	Fire	1	389	223	389	390	224	389	26	-	COINS SPECIAL	33.98304	330	330	#DIV/0!	Coin Gift	Coin Gift	Trade for 30,000 COINS.	None	0	None			304	BC01_0304_B.png	Specials	Golden Prince	4	0	0	0							#N/A	#N/A	#N/A
	Golem of Madness	5 ☆☆☆☆☆	Fire	65	747	403	45	2731	2963	173	28		GOD	1399.907869			0	Element Oath	Oath of the Flame	Raises the ATK, REC, and HP of Fire heroes to x1.3.	Multi-Target Element	4	Multi-Fire	Fire Attacks become multi-target for 4 turns.	10	173	BC01_0173_B.png	#N/A	Golem of Madness	6	0	0	341598	+31.	+40.	+2.				#N/A	#N/A	#N/A
	Golem of Madness +	6 ☆☆☆☆☆☆	Fire	110	1235	712	75	4079	4406	184	30		GOD	3306.861616			0.981651376	Element Oath	Oath of the Flame II	Raises the ATK, REC, and HP of Fire heroes to x1.4.	Multi-Target Element	5	Multi-Fire II	Fire Attacks become multi-target for 5 turns.	15	173	BC02_0173_B.png	#N/A	Golem of Madness	6	1	341598	1627617	+26.09	+33.89	+1.	57	66		Golem of Madness	2731	2963
77	Golem of the Lava	4 ☆☆☆☆	Fire	45	550	162	6	2090	866	50	16		TANK	90.497	270	12150	0	Wall	Steel Wall	Reduces all damage received by 20%.	Defensive Stance	135	Fortress Stance II	Reduces all damage received by 45% for 3 turns.	20	164	BC01_0164_B.png	#N/A	Golem of the Lava	5	0	0	134655	+35.	+16.	+1.				#N/A	#N/A	#N/A
194	Golem of the Lava +	5 ☆☆☆☆☆	Fire	99	1152	279	12	4386	1847	110	22		TANK	891.10362			0	Wall	Steel Wall II	Reduces all damage received by 30%.	Defensive Stance	150	Defensive Stance III	Reduces all damage received by 50% for 3 turns.	25	164	BC02_0164_B.png	#N/A	Golem of the Lava	5	1	134655	1121204	+33.	+16.	+1.	28	37		Golem of the Lava	2090	866
	Grim Macer	4 ☆☆☆☆	Water	45	447	211	18	1591	1267	62	16		WARRIOR	124.979414	174	7830	0	Element Fury	Fury of the Chill	Raises the ATK and HP of Water heroes to x1.35.	Inflict ALL	5	Morning Dew	Inflicts Water damage equal to 5 times the hero's ATK on ALL targets.	5	89	BC01_0089_B.png	#N/A	Grim Macer	5	0	0	134655	+26.	+24.	+1.				#N/A	#N/A	#N/A
251	Grim Macer +	5 ☆☆☆☆☆	Water	99	937	364	38	3387	2618	136	22		WARRIOR	1205.934576			0	Element Fury	Fury of the Blizzard	Raises the ATK and HP of Water heroes to x1.4.	Inflict ALL	7	Black Ice	Inflicts Water damage equal to 7 times the hero's ATK on ALL targets.	10	89	BC02_0089_B.png	#N/A	Grim Macer	5	1	134655	1121204	+25.	+23.	+1.	26	39		Grim Macer	1591	1267
72	Gronru the Avenger	4 ☆☆☆☆	Fire	45	362	258	15	1022	1886	59	16		DPS	113.722028			0	Unstoppable	Beastly Attack	Grants x1.6 ATK to all heroes above 80% HP.	Inflict ALL	15	Crackling Flames II	Inflicts Fire damage equal to 15 times the hero's ATK on ALL targets.	20	143	BC01_0143_B.png	#N/A	Gronru the Avenger	5	0	0	134655	+15.	+37.	+1.				#N/A	#N/A	#N/A
189	Gronru the Avenger +	5 ☆☆☆☆☆	Fire	99	759	445	31	2131	3875	129	22		DPS	1065.233625			0	Unstoppable	Beastly Attack II	Grants x2 ATK to all heroes above 80% HP.	Inflict ALL	20	Blazing Heat	Inflicts Fire damage equal to 20 times the hero's ATK on ALL targets.	25	143	BC02_0143_B.png	#N/A	Gronru the Avenger	5	1	134655	1121204	+14.	+35.	+1.	19	41		Gronru the Avenger	1022	1886
119	Gryndor Arch	2 ☆☆	Wood	15	138	63	6	264	343	20	2	1	DPS	1.81104	138	2070	0	None	None		Inflict One	10	Stone Blockade	Inflicts Wood damage equal to 10 times the hero's ATK on one target.	5	67	BC01_0067_B.png	Archers	Gryndor Arch	3	0	0	7957	+9.	+20.	+1.			5	#N/A	#N/A	#N/A
229	Gryndor Arch +	3 ☆☆☆	Wood	70	266	159	11	1163	1884	80	10		DPS	175.28736	206	14420	0	None	None		Inflict One	14	Granite Blockade	Inflicts Wood damage equal to 14 times the hero's ATK on one target.	10	67	BC02_0067_B.png	Archers	Gryndor Arch	3	1	7957	419840	+13.	+25.	+1.	0	7		Gryndor Arch	264	343
102	Hades Spirit	5 ☆☆☆☆☆	Fire	65	722	360	44	2642	2664	172	26		GOD	1210.585536			0	Element Oath	Oath of the Flame	Raises the ATK, REC, and HP of Fire heroes to x1.3.	Inflict One Hades	15	Fury Attack II	Inflicts Fire damage equal to 15 times the hero's current HP deficit on one target.	20	198	BC01_0198_B.png	#N/A	Hades Spirit	6	0	0	341598	+30.	+36.	+2.				#N/A	#N/A	#N/A
217	Hades Spirit +	6 ☆☆☆☆☆☆	Fire	110	1240	660	75	3965	4039	293	30		GOD	4692.288055			0	Element Oath	Oath of the Flame II	Raises the ATK, REC, and HP of Fire heroes to x1.4.	Inflict One Hades	20	Fury Attack III	Inflicts Fire damage equal to 20 times the hero's current HP deficit on one target.	30	198	BC02_0198_B.png	#N/A	Hades Spirit	6	1	341598	1627617	+25.	+31.	+2.	56	65		Hades Spirit	2642	2664
90	Hella the Conjurer	5 ☆☆☆☆☆	Light	65	739	348	45	2723	2588	173	26		GOD	1219.152452	456	29640	0	Protection	Protection of Stone	Reduces all damage received by 50% while at full HP.	Cure Fixed	50000	Huge Fix Cure	Restores 50000 HP.	25	185	BC01_0185_B.png	#N/A	Hella the Conjurer	6	0	0	341598	+31.	+35.	+2.				#N/A	#N/A	#N/A
206	Hella the Conjurer +	6 ☆☆☆☆☆☆	Light	110	1269	638	77	4103	3908	295	30		GOD	4730.18458	732	80520	0	Protection	Protection of Steel III	Reduces all damage received by 70% while at full HP.	Cure Fixed	75000	Huge Fix Cure	Restores 75000 HP.	30	185	BC02_0185_B.png	#N/A	Hella the Conjurer	6	1	341598	1627617	+26.	+30.	+2.	56	65		Hella the Conjurer	2723	2588
22	Henrick Arch	2 ☆☆	Fire	15	135	64	6	267	367	20	2	1	DPS	1.95978	144	2160	1.071428571	None	None		Inflict One	10	Heat Strike	Inflicts Fire damage equal to 10 times the hero's ATK on one target.	5	63	BC01_0063_B.png	Archers	Henrick Arch	3	0	0	7957	+9.43	+21.64	+1.			5	#N/A	#N/A	#N/A
146	Henrick Arch +	3 ☆☆☆	Fire	70	261	162	11	1158	1956	80	10		DPS	181.20384	218	15260	0	None	None		Inflict One	14	Fire Strike	Inflicts Fire damage equal to 14 times the hero's ATK on one target.	10	63	BC02_0063_B1.png	Archers	Henrick Arch	3	1	7957	419840	+13.	+26.	+1.	0	8		Henrick Arch	267	367
114	Holy Knight	5 ☆☆☆☆☆	Light	65	740	347	45	2724	2587	173	26		GOD	1219.128924	456	29640	0	Element Preparation	Light Preparation II	All Dark Runes have a 75% chance to turn into Light Runes.	Multi-Target Element	4	Multi-Light	Light Attacks become multi-target for 4 turns.	10	92	BC01_0092_B.png	#N/A	Holy Knight	6	0	0	341598	+31.	+35.	+2.				#N/A	#N/A	#N/A
224	Holy Knight +	6 ☆☆☆☆☆☆	Light	110	1270	637	77	4104	3907	295	30		GOD	4730.12676			0	Element Preparation	Light Preparation III	All Dark Runes have a 90% chance to turn into Light Runes.	Multi-Target Element	5	Multi-Light II	Light Attacks become multi-target for 5 turns.	15	92	BC02_0092_B.png	#N/A	Holy Knight	6	1	341598	1627617	+26.	+30.	+2.	56	65		Holy Knight	2724	2587
	Horned Druid	4 ☆☆☆☆	Light	45	399	170	48	1515	1046	180	14		HEALER	285.2442			1.272727273	Healing	Healing Magic	The team recovers HP equal to 1.1 times of the leader's REC every turn.	Cure Immediate	35	Healing Force	Restores HP equal to 35 times the hero's REC.	20	160	BC01_0160_B.png	#N/A	Horned Druid	5	0	0	134655	+25.36	+19.91	+3.				#N/A	#N/A	#N/A
	Horned Druid +	5 ☆☆☆☆☆	Light	99	836	293	101	2992	2155	395	20		HEALER	2546.8652			0	Healing	Healing Magic II	The team recovers HP equal to 1.5 times the leader's REC every turn.	Cure Immediate	60	Healing Force II	Restores HP equal to 60 times the hero's REC.	25	160	BC02_0160_B.png	#N/A	Horned Druid	5	1	134655	1121204	+22.	+19.	+3.	31	40		Horned Druid	1515	1046
88	Ice Axe	5 ☆☆☆☆☆	Water	65	833	314	50	3073	2298	178	26		GOD	1256.992212			0	Luck Fever	Lucky Fever	Linking 4 matched RUNES will have a 20% chance to generate a "FEVER RUNE."	Inflict One	40	Icy Breeze	Inflicts Water damage equal to 40 times the hero's ATK on one target.	25	183	BC01_0183_B.png	#N/A	Ice Axe	6	0	0	341598	+35.	+31.	+2.				#N/A	#N/A	#N/A
204	Ice Axe +	6 ☆☆☆☆☆☆	Water	110	1431	575	86	4592	3518	304	30		GOD	4911.015424			0	Luck Fever	Lucky Fever II	Linking 4 matched RUNES will have a 40% chance to generate a "FEVER RUNE."	Inflict One	80	Icy Breeze II	Inflicts Water damage equal to 80 times the hero's ATK on one target.	30	183	BC02_0183_B.png	#N/A	Ice Axe	6	1	341598	1627617	+29.	+27.	+2.	57	64		Ice Axe	3073	2298
95	Ice Master	5 ☆☆☆☆☆	Water	65	924	341	56	3420	2517	184	28		GOD	1583.89776	930	60450	0	Element Fury	Fury of the Blizzard	Raises the ATK and HP of Water heroes to x1.4.	Element Boost	4.5	Water Enhancement	Water Runes that are successfully matched are 1.5 times stronger for 3 turns.	5	190	BC01_0190_B.png	#N/A	Ice Master	6	0	0	341598	+39.	+34.	+2.				#N/A	#N/A	#N/A
210	Ice Master +	6 ☆☆☆☆☆☆	Water	110	1516	597	91	4895	3649	309	32		GOD	5519.313195	1492	164120	0	Element Fury	Fury of the Blizzard II	Raises the ATK and HP of Water heroes to x1.6.	Element Boost	4.8	Water Enhancement II	Water Runes that are successfully matched are 1.6 times stronger for 3 turns.	10	190	BC02_0190_B.png	#N/A	Ice Master	6	1	341598	1627617	+31.	+28.	+2.	61	69		Ice Master	3420	2517
27	Immortal Assassin	2 ☆☆	Dark	15	198	63	8	380	343	22	2	1	DPS	2.86748	172	2580	0	None	None		Poison Mist	100	Poison Mist	Poisons all targets, reducing HP by 100% of the hero's ATK every turn.	5	151	BC01_0151_B.png	#N/A	Immortal Assassin	3	0	0	7957	+13.	+20.	+1.			5	#N/A	#N/A	#N/A
151	Immortal Assassin +	3 ☆☆☆	Dark	70	381	159	16	1692	1884	85	12		DPS	270.95688	258	18060	0	None	None		Poison Mist	160	Poison Mist II	Poisons all targets, reducing HP by 160% times the hero's ATK every turn.	10	151	BC02_0151_B.png	#N/A	Immortal Assassin	3	1	7957	419840	+19.	+25.	+1.	0	7		Immortal Assassin	380	343
107	Katrina Rogue	1 ☆	Wood	15	59	49	3	283	245	17	2	1	WARRIOR	1.178695	94	1410	0	None	None		Inflict ALL	5	Light Wind	Inflicts Wood damage equal to 5 times the hero's ATK on ALL targets.	5	68	BC01_0068_B.png	Rogue Sisters	Katrina Rogue	2	0	0	7957	+16.	+14.	+1.			5	#N/A	#N/A	#N/A
222	Katrina Rogue +	2 ☆☆	Wood	55	180	70	8	882	718	62	6		WARRIOR	39.263112			0	None	None		Inflict ALL	7	Wind in the Trees	Inflicts Wood damage equal to 7 times the hero's ATK on ALL targets.	10	68	BC02_0068_B.png	Rogue Sisters	Katrina Rogue	2	1	7957	231877	+13.	+12.	+1.	8	15		Katrina Rogue	283	245
28	Keeper of the Knowledge	2 ☆☆	Wood	1	38	13	1	38	13	1	9	-	MATERIAL	0.000494	150	150	#DIV/0!	Evolve	Evolve Material	Used for performing an evolve	None	0	None			176	BC01_0176_B.png	Essence	Keeper of the Knowledge	2	0	0	0							#N/A	#N/A	#N/A
26	Kerian Rogue	2 ☆☆	Fire	15	183	81	8	449	361	22	2	1	WARRIOR	3.565958	192	2880	0	Unstoppable	Unstoppable Anger	Grants x1.15 ATK to all heroes below 10% HP.	Poison Mist	100	Poison Mist	Poisons all targets, reducing HP by 100% of the hero's ATK every turn.	5	135	BC01_0135_B.png	#N/A	Kerian Rogue	3	0	0	7957	+19.	+20.	+1.			5	#N/A	#N/A	#N/A
150	Kerian Rogue +	3 ☆☆☆	Fire	70	352	204	15	2008	1998	84	14		WARRIOR	337.006656	288	20160	0	Unstoppable	Unstoppable Anger II	Grants x1.3 ATK to all heroes below 10% HP.	Poison Mist	160	Poison Mist II	Poisons all targets, reducing HP by 160% times the hero's ATK every turn.	10	135	BC02_0135_B.png	#N/A	Kerian Rogue	3	1	7957	419840	+24.	+26.	+1.	4	6		Kerian Rogue	449	361
39	Lantern of the Earth	3 ☆☆☆	Wood	1	61	28	1	62	29	1	9	-	MATERIAL	0.001798	224	224	#DIV/0!	Evolve	Evolve Material	Used for performing an evolve	None	0	None			56	BC01_0056_B.png	Essence	Lantern of the Earth	3	0	0	0							#N/A	#N/A	#N/A
271	Last Savior	5 ☆☆☆☆☆	Light	65	737	450	45	2721	3330	173	28		GOD	1567.54089			0	Element Fury	Fury of the Sun	Raises the ATK and HP of Light heroes to x1.4.	Transform	2	Fully Lightproof	All Dark Runes and Heart Runes turn into Light Runes.	25	515	Last_Savior.png	#N/A	Last Savior	6	0	0	341598	+31.	+45.	+2.				#N/A	#N/A	#N/A
272	Last Savior +	6 ☆☆☆☆☆☆	Light	110	1190	774	72	3806	4807	181	34		GOD	3311.475002			0	Element Fury	Fury of the Sun II	Raises the ATK and HP of Light heroes to x1.6.	Transform	4	Light Art	All Runes will turn into Light Runes, but HP will be reduced to 1.	40	515	Last_Savior_+.png	#N/A	Last Savior	6	1	341598	1627617	+24.	+37.	+1.	64	69		Last Savior	2721	3330
273	Leo Knight	4 ☆☆☆☆	Fire	45	468	219	29	1788	1451	117	20		GOD	303.543396			0	Resilient	Impervious	5% of all damage inflicted by the hero is converted into HP.	Cobweb	3	Cobweb III	Delays demons' attacks for 3 turns.	20	516	Leo_Knight.png	#N/A	Leo Knight	6	0	0	134655	+30.	+28.	+2.				#N/A	#N/A	#N/A
274	Leo Knight +	5 ☆☆☆☆☆	Fire	99	1335	338	81	3687	2788	179	28		GOD	1840.004724			0	Resilient	Immortal	8% of all damage inflicted by the hero is converted into HP.	Cobweb	4	Cobweb IV	Delays demons' attacks for 4 turns.	25	516	BC02_0516_Bleo.png	#N/A	Leo Knight	6	1	134655	1121204	+24.	+25.	+1.	19	45		Leo Knight	1788	1451
275	Leo Knight ++	6 ☆☆☆☆☆☆	Fire	110	1656	553	100	5253	3387	318	34		GOD	5657.827698			0	Resilient	Immortal	8% of all damage inflicted by the hero is converted into HP.	Cobweb	5	Cobweb V	Delays demons' attacks for 5 turns.	30	516	Leo_Knight_++.png	#N/A	Leo Knight	6	2	1121204	2407223	+33.	+26.	+2.	62	86		Leo Knight +	3687	2788
111	Life Giver	5 ☆☆☆☆☆	Light	1	644	335	1	645	336	1	22	-	EXP SPECIAL	0.21672	10000	10000	#DIV/0!	XP Giver	XP Giver	Gives 10,000 XP to hero.	None	0	None			302	BC01_0302_B.png	Specials	Life Giver	5	0	0	0							#N/A	#N/A	#N/A
	Locki	5 ☆☆☆☆☆	Fire	65	715	364	43	2635	2668	171	26		GOD	1202.16078			0	Luck Fever	Lucky Fever II	Linking 4 matched RUNES will have a 40% chance to generate a "FEVER RUNE."	Transform	3	Element Trans I	All Runes will randomly turn into Fire, Wood or Water Runes.	25	196	BC01_0196_B.png	#N/A	Locki	6	0	0	341598	+30.	+36.	+2.				#N/A	#N/A	#N/A
215	Locki +	6 ☆☆☆☆☆☆	Fire	110	1227	666	74	3952	4154	183	30		GOD	3004.239264			0	Luck Fever	Lucky Fever III	Linking 3 matched RUNES will have a 55% chance to generate a "FEVER RUNE."	Transform	3	Element Trans I	All Runes will randomly turn into Fire, Wood or Water Runes.	25	196	BC02_0196_B.png	#N/A	Locki	6	1	341598	1627617	+25.	+32.	+1.	56	63		Locki	2635	2668
24	Mace Master	2 ☆☆	Dark	15	196	64	8	378	344	22	2	1	DPS	2.860704	174	2610	0	None	None		Element Boost	4.5	Dark Enhancement	Dark Runes that are successfully matched are 1.5 times stronger for 3 turns.	5	115	BC01_0115_B.png	#N/A	Mace Master	3	0	0	7957	+13.	+20.	+1.			5	#N/A	#N/A	#N/A
148	Mace Master +	3 ☆☆☆	Dark	70	378	161	16	1689	1955	85	12		DPS	280.669575	260	18200	0	None	None		Element Boost	4.8	Dark Enhancement II	Dark Runes that are successfully matched are 1.6 times stronger for 3 turns.	10	115	BC02_0115_B.png	#N/A	Mace Master	3	1	7957	419840	+19.	+26.	+1.	0	7		Mace Master	378	344
73	Mage of the Flames	4 ☆☆☆☆	Fire	45	389	242	16	1401	1430	60	16		WARRIOR	120.2058	316	14220	0	Element Fury	Fury of Fire	Raises the ATK and HP of Fire heroes to x1.35.	Poison Mist	240	Poison Mist III	Poisons all targets, reducing HP by 240% times the hero's ATK every turn.	15	144	BC01_0144_B.png	#N/A	Mage of the Flames	5	0	0	134655	+23.	+27.	+1.				#N/A	#N/A	#N/A
190	Mage of the Flames +	5 ☆☆☆☆☆	Fire	99	816	416	33	2972	3062	131	22		WARRIOR	1192.134584	460	45540	0	Element Fury	Fury of the Flame	Raises the ATK and HP of Fire heroes to x1.4.	Poison Mist	300	Poison Mist IV	Poisons all targets, reducing HP by 3 times of the hero's ATK every turn.	20	144	BC02_0144_B.png	#N/A	Mage of the Flames	5	1	134655	1121204	+22.	+27.	+1.	27	38		Mage of the Flames	1401	1430
45	Maria Elven	3 ☆☆☆	Wood	30	387	54	47	1460	344	163	8		HEALER	81.86512	174	5220	0	Element Hand	Hand of the Wind	Raises the HP of Wood heroes to x1.45.	Cure Immediate	30	Quick Healing III	Restores HP equal to 30 times the hero's REC.	15	113	BC01_0113_B.png	Elves	Maria Elven	4	0	0	47922	+37.	+10.	+4.				#N/A	#N/A	#N/A
164	Maria Elven +	4 ☆☆☆☆	Wood	80	846	114	102	3532	825	418	16		HEALER	1218.0102	256	20480	0	Element Hand	Hand of the Wood	Raises the HP of Wood heroes to x1.8.	Cure Immediate	35	Healing Force	Restores HP equal to 35 times the hero's REC.	20	113	BC02_0113_B.png	Elves	Maria Elven	4	1	47922	624744	+34.	+9.	+4.	18	26		Maria Elven	1460	344
115	Maya Sunchild	4 ☆☆☆☆	Fire	45	397	237	16	1409	1425	60	16		WARRIOR	120.4695	322	14490	0	Luck Fever	Lucky Fever	Linking 4 matched RUNES will have a 20% chance to generate a "FEVER RUNE."	Inflict ALL	15	Crackling Flames II	Inflicts Fire damage equal to 15 times the hero's ATK on ALL targets.	20	95	BC01_0095_B.png	#N/A	Maya Sunchild	5	0	0	134655	+23.	+27.	+1.				#N/A	#N/A	#N/A
225	Maya Sunchild +	5 ☆☆☆☆☆	Fire	99	833	408	34	2989	2956	132	22		WARRIOR	1166.283888			0	Luck Fever	Lucky Fever II	Linking 4 matched RUNES will have a 40% chance to generate a "FEVER RUNE."	Inflict ALL	20	Blazing Heat	Inflicts Fire damage equal to 20 times the hero's ATK on ALL targets.	25	95	BC02_0095_B.png	#N/A	Maya Sunchild	5	1	134655	1121204	+22.	+26.	+1.	26	39		Maya Sunchild	1409	1425
53	Mechanic Master	3 ☆☆☆	Water	30	259	120	11	1013	758	40	8		WARRIOR	30.71416	282	8460	0	Element Connect	Water Connect	Linking Water and Wood Runes will not cost AP.	Inflict One	18	Cool Breeze II	Inflicts Water damage equal to 18 times the hero's ATK on one target.	15	138	BC01_0138_B.png	#N/A	Mechanic Master	4	0	0	47922	+26.	+22.	+1.				#N/A	#N/A	#N/A
172	Mechanic Master +	4 ☆☆☆☆	Water	80	635	283	26	2689	2100	105	18		WARRIOR	592.9245			0	Element Connect	Water Connect	Linking Water and Wood Runes will not cost AP.	Inflict One	30	Chilly Breeze II	Inflicts Water damage equal to 30 times the hero's ATK on one target.	20	138	BC02_0138_B.png	#N/A	Mechanic Master	4	1	47922	624744	+26.	+23.	+1.	15	21		Mechanic Master	1013	758
80	Mind Leech	5 ☆☆☆☆☆	Dark	65	946	328	57	3506	2440	185	28		GOD	1582.6084			0	Element Fury	Fury of the Night	Raises the ATK and HP of Dark heroes to x1.4.	Inflict ALL Leech	35	Brain Life II	Inflicts x25 Dark Damage to all enemies, and recover 40% of that damage as HP.	25	172	BC01_0172_B.png	#N/A	Mind Leech	6	0	0	341598	+40.	+33.	+2.				#N/A	#N/A	#N/A
196	Mind Leech +	6 ☆☆☆☆☆☆	Dark	110	1552	575	94	4931	3518	312	32		GOD	5412.344496			0	Element Fury	Fury of the Night II	Raises the ATK and HP of Dark heroes to x1.6.	Inflict ALL Leech	90	Brain Life III	Inflicts x50 times Dark Damage to all enemies, and recover 80% of that damage as HP.	30	172	BC02_0172_B.png	#N/A	Mind Leech	6	1	341598	1627617	+31.	+27.	+2.	63	69		Mind Leech	3506	2440
104	Mist of the Stars	5 ☆☆☆☆☆	Light	65	729	353	44	2649	2593	172	26		GOD	1181.443404	462	30030	0	Protection	Protection of Stone	Reduces all damage received by 50% while at full HP.	Cure Percent	50	Percent Cure III	Restores 50% Hp of the team's total HP.	25	203	BC01_0203_B.png	#N/A	Mist of the Stars	6	0	0	341598	+30.	+35.	+2.				#N/A	#N/A	#N/A
219	Mist of the Stars +	6 ☆☆☆☆☆☆	Light	110	1252	647	76	3977	4026	294	30		GOD	4707.352188			0	Protection	Protection of Steel III	Reduces all damage received by 70% while at full HP.	Cure Percent	70	Percent Cure IV	Restores 70% Hp of the team's total HP.	40	203	BC02_0203_B.png	#N/A	Mist of the Stars	6	1	341598	1627617	+25.	+31.	+2.	56	63		Mist of the Stars	2649	2593
52	Mistress of the Freeze	3 ☆☆☆	Water	15	261	123	11	667	487	25	8		CRYPTIDS	8.120725			0	Element Fury	Fury of the Ice	Raises the ATK and HP of Water heroes to x1.2.	Inflict ALL	9	Morning Dew II	Inflicts Water damage equal to 9 times the hero's ATK on ALL targets.	15	134	BC01_0134_B.png	Iron Ladies	Mistress of the Freeze	5	0	0	7957	+29.	+26.	+1.				#N/A	#N/A	#N/A
171	Mistress of the Freeze +	4 ☆☆☆☆	Water	55	476	215	20	2150	1673	74	15		CRYPTIDS	266.1743	352	19360	0	Element Fury	Fury of the Chill	Raises the ATK and HP of Water heroes to x1.35.	Inflict ALL	15	Black Ice II	Inflicts Water damage equal to 15 times the hero's ATK on ALL targets.	20	134	BC02_0134_B.png	Iron Ladies	Mistress of the Freeze	5	1	7957	231877	+31.	+27.	+1.	6	10		Mistress of the Freeze	667	487
232b	Mistress of the Freeze ++	5 ☆☆☆☆☆	Water	99	1020	390	41	3960	3232	139	26		CRYPTIDS	1779.02208	521	51579	0	Element Fury	Fury of the Blizzard	Raises the ATK and HP of Water heroes to x1.4.	Inflict ALL	20	Hoarfrost	Inflicts Water damage equal to 20 times the hero's ATK on ALL targets.	25	134	BC03_0134_B.png	Iron Ladies	Mistress of the Freeze	5	2	231877	1218426	+30.	+29.	+1.	38	44		Mistress of the Freeze +	2150	1673
12	Misty Bouquet	1 ☆	Water	15	85	31	11	379	171	53	2	1	HEALER	3.434877	106	1590	0	None	None		Cure Turns	18	Quick Cure	Restores HP equal to 9 times the hero's REC for 2 turns.	5	131	BC01_0131_B.png	#N/A	Misty Bouquet	2	0	0	7957	+21.	+10.	+3.			5	#N/A	#N/A	#N/A
133	Misty Bouquet +	2 ☆☆	Water	55	280	49	34	1306	535	142	8	2+	HEALER	99.21682	160	8800	0	None	None		Cure Turns	24	Quick Cure II	Restores HP equal to 12 times the hero's REC for 2 turns.	10	131	BC02_0131_B.png	#N/A	Misty Bouquet	2	1	7957	231877	+19.	+9.	+2.	5	14		Misty Bouquet	379	171
296	Monkey Master	5 ☆☆☆☆☆	Fire	65	850	395	37	2706	2763	165	28		GOD	1233.65187	774	50310	0	Luck Fever	Lucky Fever III	Linking 3 matched RUNES will have a 55% chance to generate a "FEVER RUNE."	Inflict ALL	20	Blazing Heat	Inflicts Fire damage equal to 20 times the hero's ATK on ALL targets.	25	526	Monkey_Master.png	#N/A	Monkey Master	6	0	0	341598	+29.	+37.	+2.				#N/A	#N/A	#N/A
297	Monkey Master +	6 ☆☆☆☆☆☆	Fire	110	1500	614	42	4661	5083	260	34		GOD	6159.88438			0	Luck Fever	Lucky Fever IV	Linking 3 matched RUNES will have a ??% chance to generate a "FEVER RUNE."	Inflict ALL	40	Blazing Heat II	Inflicts Fire damage equal to 40 times the hero's ATK on ALL targets.	30	526	Monkey_Master_+.png	#N/A	Monkey Master	6	1	341598	1627617	+29.	+41.	+2.	42	52		Monkey Master	2706	2763
1	Nalia Rogue	1 ☆	Fire	15	55	52	3	265	276	17	2	1	WARRIOR	1.24338	98	1470	0	None	None		Inflict ALL	5	Warm Fire	Inflicts Fire damage equal to 5 times the hero's ATK on ALL targets.	5	1	BC01_0001_B.png	Rogue Sisters	Nalia Rogue	2	0	0	7957	+15.	+16.	+1.			5	#N/A	#N/A	#N/A
120	Nalia Rogue +	2 ☆☆	Fire	55	169	76	7	817	778	61	6	2+	WARRIOR	38.773186	148	8140	0	None	None		Inflict ALL	7	Crackling Flames	Inflicts Fire damage equal to 7 times the hero's ATK on ALL targets.	10	1	BC02_0001_B.png	Rogue Sisters	Nalia Rogue	2	1	7957	231877	+12.	+13.	+1.	8	15		Nalia Rogue	265	276
30	Natalia Warden	3 ☆☆☆	Water	30	241	125	10	937	792	39	8		WARRIOR	28.942056	242	7260	0	Element Fury	Fury of the Ice	Raises the ATK and HP of Water heroes to x1.2.	Inflict ALL	7	Black Ice	Inflicts Water damage equal to 7 times the hero's ATK on ALL targets.	10	153	BC01_0153_B.png	Wardens	Natalia Warden	4	0	0	47922	+24.	+23.	+1.				#N/A	#N/A	#N/A
153	Natalia Warden +	4 ☆☆☆☆	Water	80	549	273	22	2366	2011	101	16		WARRIOR	480.560626			0	Element Fury	Fury of the Chill	Raises the ATK and HP of Water heroes to x1.35.	Inflict ALL	9	Morning Dew II	Inflicts Water damage equal to 9 times the hero's ATK on ALL targets.	15	153	BC02_0153_B.png	Wardens	Natalia Warden	4	1	47922	624744	+23.	+22.	+1.	17	24		Natalia Warden	937	792
298	Nezha	5 ☆☆☆☆☆	Fire	65	642	355	42	2242	2979	170	28		GOD	1135.41606			0	Element Fury	Fury of the Flame	Raises the ATK and HP of Fire heroes to x1.4.	Transform	1	Fireproof	All Water Runes turn into Fire Runes.	25	527	BC01_0527_B.png	#N/A	Nezha	6	0	0	341598	+25.	+41.	+2.				#N/A	#N/A	#N/A
299	Nezha +	6 ☆☆☆☆☆☆	Fire	110	1235	641	61	4069	5328	279	34		GOD	6048.617328			0	Element Fury	Fury of the Flame II	Raises the ATK and HP of Fire heroes to x1.6.	Transform	2	Fully Fireproof	All Water Runes and Heart Runes turn into Fire Runes.	25	527	Nezha_+.png	#N/A	Nezha	6	1	341598	1627617	+26.	+43.	+2.	39	54		Nezha	2242	2979
55	Nordic Ally	3 ☆☆☆	Light	30	291	100	3	1190	564	32	8		TANK	21.47712	242	7260	0	Element Break	Light Break	Raises Light Heroes' ATK by x2 when there are 4 Light Runes linked.	Transform	1	Lightproof	All Dark Runes turn into Light Runes.	25	163	BC01_0163_B.png	#N/A	Nordic Ally	4	0	0	47922	+31.	+16.	+1.				#N/A	#N/A	#N/A
174	Nordic Ally +	4 ☆☆☆☆	Light	80	711	236	8	3169	1645	87	18		TANK	453.531435			0.949367089	Element Break	Light Break II	Raises Light Heroes' ATK by x3 when there are 5 Light Runes linked.	Transform	1	Lightproof	All Dark Runes turn into Light Runes.	25	163	BC02_0163_B.png	#N/A	Nordic Ally	4	1	47922	624744	+31.11	+17.84	+1.	15	18		Nordic Ally	1190	564
300	Nuwa	5 ☆☆☆☆☆	Water	65	712	412	75	2632	2076	331	28		GOD	1808.594592			0	Kinetic	Kinetic Magic	Restores 4 AP before every battle.	Cure Turns	63	Curing Force II	Restores HP equal to 21 times the hero's REC each turn for 3 turns.	25	528	BC01_0528_B.png	#N/A	Nuwa	6	0	0	341598	+30.	+26.	+4.				#N/A	#N/A	#N/A
301	Nuwa +	6 ☆☆☆☆☆☆	Water	110	1345	612	134	4615	3337	570	34		GOD	8778.14535			0	Kinetic	Kinetic Magic II	Restores 5 AP before every battle.	Cure Turns	84	Curing Force III	Restores HP equal to 28 times the hero's REC each turn for 3 turns.	30	528	BC02_0528_B.png	#N/A	Nuwa	6	1	341598	1627617	+30.	+25.	+4.	43	59		Nuwa	2632	2076
247	Odin's Heart	5 ☆☆☆☆☆	Water	65	1006	246	61	3694	1846	253	26		GOD	1725.238372			0	Element Oath	Oath of the Blizzard	Raises the ATK, REC, and HP of Water heroes to x1.3.	Inflict One	40	Icy Breeze	Inflicts Water damage equal to 40 times the hero's ATK on one target.	25	502	BC01_0502_B.png	#N/A	Odin's Heart	6	0	0	341598	+42.	+25.	+3.				#N/A	#N/A	#N/A
260	Odin's Heart +	6 ☆☆☆☆☆☆	Water	110	1728	450	104	5543	2739	322	32		GOD	4888.693194			0	Element Oath	Oath of the Blizzard II	Raises the ATK, REC, and HP of Water heroes to x1.4.	Inflict One	80	Icy Breeze II	Inflicts Water damage equal to 80 times the hero's ATK on one target.	30	502	BC02_0502_B.png	#N/A	Odin's Heart	6	1	341598	1627617	+35.	+21.	+2.	56	66		Odin's Heart	3694	1846
14	Ogar the Dwarf	2 ☆☆	Fire	15	189	44	2	497	170	16	2	1	TANK	1.35184	122	1830	0	Resilient	Resilient	2% of all damage inflicted by the hero is converted into HP.	Defensive Stance	30	Defensive Stance	Reduces all damage received by 10% for 3 turns.	5	8	BC01_0008_B.png	Dwarves	Ogar the Dwarf	3	0	0	7957	+22.	+9.	+1.			5	#N/A	#N/A	#N/A
136	Ogar the Dwarf +	3 ☆☆☆	Fire	70	364	110	4	2227	1007	73	12		TANK	163.708997	182	12740	0	Resilient	Resilient II	3% of all damage inflicted by the hero is converted into HP.	Defensive Stance	75	Fortress Stance	Reduces all damage received by 25% for 3 turns.	10	8	BC02_0008_B.png	Dwarves	Ogar the Dwarf	3	1	7957	419840	+27.	+13.	+1.	5	5		Ogar the Dwarf	497	170
66	Orc Flame Wielder	4 ☆☆☆☆	Fire	45	397	237	16	1409	1425	60	16		WARRIOR	120.4695	322	14490	0	Element Fury	Fury of Fire	Raises the ATK and HP of Fire heroes to x1.35.	Transform	2	Fully Fireproof	All Water Runes and Heart Runes turn into Fire Runes.	25	120	BC01_0120_B.png	#N/A	Orc Flame Wielder	5	0	0	134655	+23.	+27.	+1.				#N/A	#N/A	#N/A
184	Orc Flame Wielder +	5 ☆☆☆☆☆	Fire	99	816	408	33	2972	2956	131	22		WARRIOR	1150.865392			0	Element Fury	Fury of the Flame	Raises the ATK and HP of Fire heroes to x1.4.	Transform	2	Fully Fireproof	All Water Runes and Heart Runes turn into Fire Runes.	25	120	BC02_0120_B.png	#N/A	Orc Flame Wielder	5	1	134655	1121204	+22.	+26.	+1.	27	39		Orc Flame Wielder	1409	1425
58	Orcish Shaman	4 ☆☆☆☆	Wood	45	472	199	19	1704	1211	63	16		WARRIOR	130.003272	322	14490	0	Element Fury	Fury of the Wood	Raises the ATK and HP of Wood heroes to x1.35.	Transform	2	Fully Woodproof	All Fire Runes and Heart Runes turn into Wood Runes.	25	104	BC01_0104_B.png	#N/A	Orcish Shaman	5	0	0	134655	+28.	+23.	+1.				#N/A	#N/A	#N/A
177	Orcish Shaman +	5 ☆☆☆☆☆	Wood	99	988	343	40	3536	2499	138	22		WARRIOR	1219.432032	470	46530	0	Element Fury	Fury of the Earth	Raises the ATK and HP of Wood heroes to x1.4.	Transform	2	Fully Woodproof	All Fire Runes and Heart Runes turn into Wood Runes.	25	104	BC02_0104_B.png	#N/A	Orcish Shaman	5	1	134655	1121204	+26.	+22.	+1.	28	39		Orcish Shaman	1704	1211
59	Orcish Swindler	4 ☆☆☆☆	Water	45	380	243	16	1392	1431	60	16		WARRIOR	119.51712	282	12690	0	Element Fury	Fury of the Chill	Raises the ATK and HP of Water heroes to x1.35.	Transform	2	Fully Waterproof	All Wood Runes and Heart Runes turn into Water Runes.	25	117	BC01_0117_B.png	#N/A	Orcish Swindler	5	0	0	134655	+23.	+27.	+1.				#N/A	#N/A	#N/A
178	Orcish Swindler +	5 ☆☆☆☆☆	Water	99	798	418	32	2856	3064	130	22		WARRIOR	1137.60192	410	40590	0	Element Fury	Fury of the Blizzard	Raises the ATK and HP of Water heroes to x1.4.	Transform	2	Fully Waterproof	All Wood Runes and Heart Runes turn into Water Runes.	25	117	BC02_0117_B.png	#N/A	Orcish Swindler	5	1	134655	1121204	+21.	+27.	+1.	28	38		Orcish Swindler	1392	1431
78	Orson Shards	4 ☆☆☆☆	Water	45	608	146	7	2324	806	51	16		TANK	95.530344			0	Resilient	Impervious	5% of all damage inflicted by the hero is converted into HP.	Defensive Stance	135	Fortress Stance II	Reduces all damage received by 45% for 3 turns.	20	166	BC01_0166_B.png	#N/A	Orson Shards	5	0	0	134655	+39.	+15.	+1.				#N/A	#N/A	#N/A
195	Orson Shards +	5 ☆☆☆☆☆	Water	99	1274	252	13	4900	1624	111	24		TANK	883.2936			0	Resilient	Immortal	8% of all damage inflicted by the hero is converted into HP.	Defensive Stance	150	Defensive Stance III	Reduces all damage received by 50% for 3 turns.	25	166	BC02_0166_B.png	#N/A	Orson Shards	5	1	134655	1121204	+37.	+14.	+1.	28	40		Orson Shards	2324	806
302	Panda Master	4 ☆☆☆☆	Water	45	387	245	25	2147	2049	113	18		GOD	497.109939	774	34830	0	Protection	Protection of Steel II	Reduces all damage received by 40% while at full HP.	Inflict ALL	15	Black Ice II	Inflicts Water damage equal to 15 times the hero's ATK on ALL targets.	20	529	Panda_Master.png	#N/A	Panda Master	6	0	0	134655	+40.	+41.	+2.				#N/A	#N/A	#N/A
303	Panda Master +	5 ☆☆☆☆☆	Water	99	845	512	25	3687	3256	221	22		GOD	2653.076712			0	Protection	Protection of Stone	Reduces all damage received by 50% while at full HP.	Inflict ALL	20	Hoarfrost	Inflicts Water damage equal to 20 times the hero's ATK on ALL targets.	25	529	Panda_Master_+.png	#N/A	Panda Master	6	1	134655	1121204	+29.	+28.	+2.	45	55		Panda Master	2147	2049
304	Panda Master ++	6 ☆☆☆☆☆☆	Water	110	1245	715	45	5060	4530	263	34		GOD	6028.4334			0	Protection	Protection of Steel III	Reduces all damage received by 70% while at full HP.	Inflict ALL	40	Hoarfrost II	Inflicts Water damage equal to 40 times the hero's ATK on ALL targets.	30	529	Panda_Master_++.png	#N/A	Panda Master	6	2	1121204	2407223	+35.	+35.	+2.	70	73		Panda Master +	3687	3256
101	Poseidon's Essence	5 ☆☆☆☆☆	Water	65	1102	208	67	4046	1552	259	28		GOD	1626.362528	312	20280	0	Wall Element	Water Barrier	Reduces damage from Water enemies by 60%.	Element Boost	13.8	Water Boost II	Water Runes that are successfully matched are 2.3 times stronger for 6 turns.	25	197	Poseidon's_Essence.png	#N/A	Poseidon's Essence	6	0	0	341598	+46.	+21.	+3.				#N/A	#N/A	#N/A
216	Poseidon's Essence +	6 ☆☆☆☆☆☆	Water	110	1894	381	114	6036	2343	332	32		GOD	4695.259536			0	Wall Element	Water Barrier II	Reduces damage from Water enemies by 80%.	Element Boost	19.8	Water Boost III	Water Runes that are successfully matched are 3.3 times stronger for 6 turns.	30	197	BC02_0197_.png	#N/A	Poseidon's Essence	6	1	341598	1627617	+38.	+18.	+2.	57	65		Poseidon's Essence	4046	1552
267	Priest of Fate	5 ☆☆☆☆☆	Dark	65	602	450	37	2202	3330	165	28		GOD	1209.8889			0	Element Break	Dark Break	Raises Dark heroes' ATK by x2 when there are 4 Dark Runes linked.	Inflict One	40	Eternal Night	Inflicts Dark damage equal to 40 times the hero's ATK on one target.	25	511	BC01_0511_B.png	#N/A	Priest of Fate	6	0	0	341598	+25.	+45.	+2.				#N/A	#N/A	#N/A
268	Priest of Fate +	6 ☆☆☆☆☆☆	Dark	110	979	782	59	3159	4815	168	34		GOD	2555.37828			0	Element Break	Dark Break II	Raises Dark heroes' ATK by x3 when there are 5 Dark Runes linked.	Inflict One	80	Eternal Night II	Inflicts Dark damage equal to 80 times the hero's ATK on one target.	30	511	BC02_0511_B.png	#N/A	Priest of Fate	6	1	341598	1627617	+20.	+37.	+1.	61	69		Priest of Fate	2202	3330
263	Princess of the Trade	5 ☆☆☆☆☆	Fire	65	1007	294	41	3759	2214	169	28		CRYPTIDS	1406.489994			0	Unstoppable	Beastly Attack	Grants x1.6 ATK to all heroes above 80% HP.	Element Boost	13.8	Fire Boost II	Fire Runes that are successfully matched are 2.3 times stronger for 6 turns.	25	506	BC01_0506_B.png	#N/A	Princess of the Trade	6	0	0	341598	+43.	+30.	+2.				#N/A	#N/A	#N/A
264	Princess of the Trade +	6 ☆☆☆☆☆☆	Fire	110	1637	511	66	5343	3236	175	32		CRYPTIDS	3025.7409			0	Unstoppable	Beastly Attack II	Grants x2 ATK to all heroes above 80% HP.	Element Boost	19.8	Fire Boost III	Fire Runes that are successfully matched are 3.3 times stronger for 6 turns.	30	506	BC02_0506_B.png	#N/A	Princess of the Trade	6	1	341598	1627617	+34.	+25.	+1.	62	68		Princess of the Trade	3759	2214
74	Rafael Polaris	4 ☆☆☆☆	Water	45	462	204	19	1650	1216	63	16		WARRIOR	126.4032	316	14220	0	Element Preparation	Water Preparation	All Wood Runes have a 50% chance to turn into Water Runes.	Inflict One	30	Chilly Breeze II	Inflicts Water damage equal to 30 times the hero's ATK on one target.	20	93	BC01_0093_B.png	#N/A	Rafael Polaris	5	0	0	134655	+27.	+23.	+1.				#N/A	#N/A	#N/A
191	Rafael Polaris +	5 ☆☆☆☆☆	Water	99	970	351	39	3518	2507	137	22		WARRIOR	1208.288762	460	45540	0	Element Preparation	Water Preparation II	All Wood Runes have a 75% chance to turn into Water Runes.	Inflict One	40	Icy Breeze	Inflicts Water damage equal to 40 times the hero's ATK on one target.	25	93	BC02_0093_B.png	#N/A	Rafael Polaris	5	1	134655	1121204	+26.	+22.	+1.	26	39		Rafael Polaris	1650	1216
307	Raven	4 ☆☆☆☆	Dark	45	394	268	21	2198	2116	109	18		GOD	506.955512			0	Element Preparation	Dark Preparation	All Light Runes have a 50% chance to turn into Dark Runes.	Element Boost	8.4	Dark Boost	Dark Runes that are successfully matched are 2.1 times stronger for 4 turns.	25	524	BC01_0524_B.png	#N/A	Raven	6	0	0	134655	+41.	+42.	+2.				#N/A	#N/A	#N/A
308	Raven +	5 ☆☆☆☆☆	Dark	99	798	546	21	4032	3682	217	22		GOD	3221.543808	1242	122958	0	Element Preparation	Dark Preparation II	All Light Runes have a 75% chance to turn into Dark Runes.	Element Boost	13.8	Dark Boost II	Dark Runes that are successfully matched are 2.3 times stronger for 6 turns.	25	524	Raven_+.png	#N/A	Raven	6	1	134655	1121204	+33.	+32.	+2.	42	49		Raven	2198	2116
309	Raven ++	6 ☆☆☆☆☆☆	Dark	110	1345	745	41	4833	4560	259	34		GOD	5707.96632			0	Element Preparation	Dark Preparation III	All Light Runes have a 90% chance to turn into Dark Runes.	Element Boost	19.8	Dark Boost III	Dark Runes that are successfully matched are 3.3 times stronger for 6 turns.	30	524	Raven_++.png	#N/A	Raven	6	2	1121204	2407223	+32.	+35.	+2.	84	84		Raven +	4032	3682
92	Red King	5 ☆☆☆☆☆	Fire	65	774	336	47	2822	2512	175	26		GOD	1240.5512			0	Element Break	Fire Break II	Raises Fire heroes' ATK by x3 when there are 5 Fire Runes linked.	Secret Weapon	50	Secret Weapon III	Inflicts damage equal to 50% of the target's current HP on ALL targets.	95	187	BC01_0187_B.png	#N/A	Red King	6	0	0	341598	+32.	+34.	+2.				#N/A	#N/A	#N/A
208	Red King +	6 ☆☆☆☆☆☆	Fire	110	1330	615	80	4273	3776	298	30		GOD	4808.184704			0	Element Break	Fire Break III	Raises Fire heroes' ATK by x4 when there are 6 Fire Runes linked.	Secret Weapon	60	Secret Weapon IV	Inflicts damage equal to 60% of the target's current HP on ALL targets.	110	187	BC02_0187_B.png	#N/A	Red King	6	1	341598	1627617	+27.	+29.	+2.	55	65		Red King	2822	2512
94	Ribbon Enchantress	5 ☆☆☆☆☆	Light	1	161	83	1	161	83	1	9	-	MATERIAL	0.013363	480	480	#DIV/0!	Evolve	Evolve Material	Used for performing an evolve	None	0	None			189	BC01_0189_B.png	Essence	Ribbon Enchantress	5	0	0	0							#N/A	#N/A	#N/A
23	Rogue Revolver	2 ☆☆	Fire	15	161	66	7	399	290	21	2	1	WARRIOR	2.42991	154	2310	0	Unstoppable	Unstoppable Anger	Grants x1.15 ATK to all heroes below 10% HP.	Element Boost	4.5	Fire Enhancement	Fire Runes that are successfully matched are 1.5 times stronger for 3 turns.	5	105	BC01_0105_B.png	#N/A	Rogue Revolver	3	0	0	7957	+17.	+16.	+1.			5	#N/A	#N/A	#N/A
147	Rogue Revolver +	3 ☆☆☆	Fire	70	309	166	13	1763	1646	82	12		WARRIOR	237.955636			0.52173913	Unstoppable	Unstoppable Anger II	Grants x1.3 ATK to all heroes below 10% HP.	Element Boost	4.8	Fire Enhancement II	Fire Runes that are successfully matched are 1.6 times stronger for 3 turns.	10	105	BC02_0105_B.png	#N/A	Rogue Revolver	3	1	7957	419840	+21.07	+21.45	+1.	4	6		Rogue Revolver	399	290
117	Royal Cavalier	3 ☆☆☆	Fire	30	207	142	9	613	1070	38	8		DPS	24.92458	220	6600	0	Luck Fever	Lucky Fever	Linking 4 matched RUNES will have a 20% chance to generate a "FEVER RUNE."	Inflict One	30	Fire Strike II	Inflicts Fire damage equal to 30 times the hero's ATK on one target.	20	91	BC01_0091_B.png	#N/A	Royal Cavalier	4	0	0	47922	+14.	+32.	+1.				#N/A	#N/A	#N/A
227	Royal Cavalier +	4 ☆☆☆☆	Fire	80	452	298	19	1479	2668	98	14		DPS	386.705256	322	25760	0	Luck Fever	Lucky Fever II	Linking 4 matched RUNES will have a 40% chance to generate a "FEVER RUNE."	Inflict One	40	Flame Strike	Inflicts Fire damage equal to 40 times the hero's ATK on one target.	25	91	BC02_0091_B.png	#N/A	Royal Cavalier	4	1	47922	624744	+13.	+30.	+1.	12	26		Royal Cavalier	613	1070
49	Ruby Templar	3 ☆☆☆	Fire	15	242	131	10	620	509	24	8		CRYPTIDS	7.57392			0	Element Fury	Fury of the Heat	Raises the ATK and HP of Fire heroes to x1.2.	Inflict ALL	9	Warm Fire II	Inflicts Fire damage equal to 9 times the hero's ATK on ALL targets.	15	126	BC01_0126_B.png	Iron Ladies	Ruby Templar	5	0	0	7957	+27.	+27.	+1.				#N/A	#N/A	#N/A
168	Ruby Templar +	4 ☆☆☆☆	Fire	55	443	229	18	2009	1849	72	15		CRYPTIDS	267.454152	344	18920	0	Element Fury	Fury of Fire	Raises the ATK and HP of Fire heroes to x1.35.	Inflict ALL	15	Crackling Flames II	Inflicts Fire damage equal to 15 times the hero's ATK on ALL targets.	20	126	BC02_0126_B.png	Iron Ladies	Ruby Templar	5	1	7957	231877	+29.	+30.	+1.	6	9		Ruby Templar	620	509
230	Ruby Templar ++	5 ☆☆☆☆☆	Fire	99	930	426	38	3674	3562	136	26		CRYPTIDS	1779.803168			0	Element Fury	Fury of the Flame	Raises the ATK and HP of Fire heroes to x1.4.	Inflict ALL	20	Blazing Heat	Inflicts Fire damage equal to 20 times the hero's ATK on ALL targets.	25	126	BC03_0126_B.png	Iron Ladies	Ruby Templar	5	2	231877	1218426	+28.	+32.	+1.	39	44		Ruby Templar +	2009	1849
69	Ruler of the Roots	4 ☆☆☆☆	Wood	45	628	142	7	2388	758	51	18		TANK	92.315304	268	12060	0	Element Connect	Water Connect	Linking Water and Wood Runes will not cost AP.	Defensive Stance	135	Fortress Stance II	Reduces all damage received by 45% for 3 turns.	20	128	BC01_0128_B.png	#N/A	Ruler of the Roots	5	0	0	134655	+40.	+14.	+1.				#N/A	#N/A	#N/A
186	Ruler of the Roots +	5 ☆☆☆☆☆	Wood	99	1317	243	14	5041	1615	112	24		TANK	911.81608			0	Element Connect	Water Connect	Linking Water and Wood Runes will not cost AP.	Defensive Stance	150	Defensive Stance III	Reduces all damage received by 50% for 3 turns.	25	128	BC02_0128_B.png	#N/A	Ruler of the Roots	5	1	134655	1121204	+38.	+14.	+1.	28	37		Ruler of the Roots	2388	758
19	Scimitar Guardian	2 ☆☆	Water	15	220	46	3	570	186	17	2	2+	TANK	1.80234	140	2100	0	Protection	Protection of Iron	Reduces all damage received by 20% while at full HP.	Defensive Stance	75	Fortress Stance	Reduces all damage received by 25% for 3 turns.	10	52	BC01_0052_B.png	#N/A	Scimitar Guardian	3	0	0	7957	+25.	+10.	+1.				#N/A	#N/A	#N/A
143	Scimitar Guardian +	3 ☆☆☆	Water	70	422	117	5	2610	1047	74	12	7	TANK	202.21758	212	14840	1.188405797	Protection	Protection of Steel	Reduces all damage received by 30% while at full HP.	Defensive Stance	90	Defensive Stance II	Reduces all damage received by 30% for 3 turns.	15	52	BC02_0052_B.png	#N/A	Scimitar Guardian	3	1	7957	419840	+31.71	+13.48	+1.	5	5	9	Scimitar Guardian	570	186
20	Serpentian Rogue	2 ☆☆	Dark	15	177	70	8	345	378	22	2	1	DPS	2.86902	166	2490	0	None	None		Inflict One	10	Deep Fog	Inflicts Dark damage equal to 10 times the hero's ATK on one target.	5	54	BC01_0054_B.png	#N/A	Serpentian Rogue	3	0	0	7957	+12.	+22.	+1.			5	#N/A	#N/A	#N/A
144	Serpentian Rogue +	3 ☆☆☆	Dark	70	341	177	14	1514	2109	83	12	7	DPS	265.021158	250	17500	0	None	None		Inflict One	14	Eclipse	Inflicts Dark damage equal to 14 times the hero's ATK on one target.	10	54	BC02_0054_B.png	#N/A	Serpentian Rogue	3	1	7957	419840	+17.	+28.	+1.	0	7	4	Serpentian Rogue	345	378
99	Shiva	5 ☆☆☆☆☆	Wood	65	882	294	53	3250	2214	181	26		GOD	1302.3855	460	29900	0	Healing	Healing Magic III	The team recovers HP equal to 2.5 times the leader's REC every turn.	Cure Turns	63	Curing Force II	Restores HP equal to 21 times the hero's REC each turn for 3 turns.	25	195	BC01_0195_B.png	#N/A	Shiva	6	0	0	341598	+37.	+30.	+2.				#N/A	#N/A	#N/A
214	Shiva +	6 ☆☆☆☆☆☆	Wood	110	1516	540	91	4895	3374	309	30		GOD	5103.36057	738	81180	0	Healing	Healing Magic IV	The team recovers HP equal to 3 times the leader's REC every turn.	Cure Turns	84	Curing Force III	Restores HP equal to 28 times the hero's REC each turn for 3 turns.	30	195	BC02_0195_B.png	#N/A	Shiva	6	1	341598	1627617	+31.	+26.	+2.	56	64		Shiva	3250	2214
84	Skull Smasher	5 ☆☆☆☆☆	Dark	65	934	275	57	3430	2067	185	26		GOD	1311.61485			0	Unstoppable	Beastly Attack II	Grants x2 ATK to all heroes above 80% HP.	Element Boost	13.8	Dark Boost II	Dark Runes that are successfully matched are 2.3 times stronger for 6 turns.	25	206	BC01_0206_B.png	#N/A	Skull Smasher	6	0	0	341598	+39.	+28.	+2.				#N/A	#N/A	#N/A
200	Skull Smasher +	6 ☆☆☆☆☆☆	Dark	110	1604	504	97	5092	3120	315	30		GOD	5004.4176	736	80960	0	Unstoppable	Beastly Attack III	Grants x2 ATK to all heroes above 70% HP.	Element Boost	19.8	Dark Boost III	Dark Runes that are successfully matched are 3.3 times stronger for 6 turns.	30	206	BC02_0206_B.png	#N/A	Skull Smasher	6	1	341598	1627617	+32.	+24.	+2.	57	65		Skull Smasher	3430	2067
67	Snow Priestess	4 ☆☆☆☆	Water	45	422	223	17	1570	1338	61	16		WARRIOR	128.14026			0.431818182	Element Connect	Fire Connect	Linking Fire and Water Runes will not cost AP.	Poison Mist	240	Poison Mist III	Poisons all targets, reducing HP by 240% times the hero's ATK every turn.	15	122	BC01_0122_B.png	#N/A	Snow Priestess	5	0	0	134655	+26.09	+25.34	+1.				#N/A	#N/A	#N/A
185	Snow Priestess +	5 ☆☆☆☆☆	Water	99	886	384	36	3140	2834	134	22		WARRIOR	1192.43384			0	Element Connect	Fire Connect	Linking Fire and Water Runes will not cost AP.	Poison Mist	300	Poison Mist IV	Poisons all targets, reducing HP by 3 times of the hero's ATK every turn.	20	122	BC02_0122_B.png	#N/A	Snow Priestess	5	1	134655	1121204	+23.	+25.	+1.	30	38		Snow Priestess	1570	1338
46	Straya Elven	3 ☆☆☆	Fire	30	334	64	41	1262	412	157	8		HEALER	81.631208	180	5400	0	Element Refuge	Refuge of the Heat	Raises the REC and HP of Fire heroes to x1.25.	Cure Immediate	30	Quick Healing III	Restores HP equal to 30 times the hero's REC.	15	114	BC01_0114_B.png	Elves	Straya Elven	4	0	0	47922	+32.	+12.	+4.				#N/A	#N/A	#N/A
165	Straya Elven +	4 ☆☆☆☆	Fire	80	730	133	88	2929	1047	404	16		HEALER	1238.931852			1.405063291	Element Refuge	Refuge of the Fire	Raises the REC and HP of Fire heroes to x1.3.	Cure Immediate	35	Healing Force	Restores HP equal to 35 times the hero's REC.	20	114	BC02_0114_B.png	Elves	Straya Elven	4	1	47922	624744	+27.84	+11.57	+4.	19	24		Straya Elven	1262	412
18	Striped Crusader	2 ☆☆	Light	15	141	74	6	351	340	20	2	1	WARRIOR	2.3868	160	2400	0	Unstoppable	Unstoppable Anger	Grants x1.15 ATK to all heroes below 10% HP.	Element Boost	4.5	Light Enhancement	Light Runes that are successfully matched are 1.5 times stronger for 3 turns.	5	51	BC01_0051_B.png	#N/A	Striped Crusader	3	0	0	7957	+15.	+19.	+1.			5	#N/A	#N/A	#N/A
142	Striped Crusader +	3 ☆☆☆	Light	70	271	188	11	1582	1844	80	12		WARRIOR	233.37664	240	16800	0	Unstoppable	Unstoppable Anger II	Grants x1.3 ATK to all heroes below 10% HP.	Element Boost	4.8	Light Enhancement II	Light Runes that are successfully matched are 1.6 times stronger for 3 turns.	10	51	BC02_0051_B.png	#N/A	Striped Crusader	3	1	7957	419840	+19.	+24.	+1.	4	6		Striped Crusader	351	340
91	Stromfuror	5 ☆☆☆☆☆	Light	65	744	419	45	2728	3107	173	28		GOD	1466.330008			0	Element Break	Light Break II	Raises Light Heroes' ATK by x3 when there are 5 Light Runes linked.	Multi-Target ALL	4	Multi-Target	All Attacks become multi-target for 4 turns.	10	186	BC01_0186_B.png	#N/A	Stromfuror	6	0	0	341598	+31.	+42.	+2.				#N/A	#N/A	#N/A
207	Stromfuror +	6 ☆☆☆☆☆☆	Light	110	1219	732	74	3944	4547	183	32		GOD	3281.806344			0	Element Break	Light Break III	Raises Light Heroes' ATK by x4 when there are 6 Light Runes linked.	Multi-Target ALL	5	Multi-Target II	All Attacks become multi-target for 5 turns.	15	186	BC02_0186_B.png	#N/A	Stromfuror	6	1	341598	1627617	+25.	+35.	+1.	60	68		Stromfuror	2728	3107
9	Swamp Spirit	1 ☆	Wood	1	15	11	1	16	12	1	9	-	MATERIAL	0.000192	100	100	#DIV/0!	Evolve	Evolve Material	Used for performing an evolve	None	0	None			57	BC01_0057_B.png	Essence	Swamp Spirit	1	0	0	0							#N/A	#N/A	#N/A
89	Sythe Dragonus	5 ☆☆☆☆☆	Wood	65	944	321	57	3440	2369	185	28		GOD	1507.6316			0	Element Oath	Oath of the Earth	Raises the ATK, REC, and HP of Wood heroes to x1.3.	Element Boost	13.8	Wood Boost II	Wood Runes that are successfully matched are 2.3 times stronger for 6 turns.	25	184	BC01_0184_B.png	#N/A	Sythe Dragonus	6	0	0	341598	+39.	+32.	+2.				#N/A	#N/A	#N/A
205	Sythe Dragonus +	6 ☆☆☆☆☆☆	Wood	110	1560	567	94	4939	3510	312	32		GOD	5408.79768			0	Element Oath	Oath of the Earth II	Raises the ATK, REC, and HP of Wood heroes to x1.4.	Element Boost	19.8	Wood Boost III	Wood Runes that are successfully matched are 3.3 times stronger for 6 turns.	30	184	BC02_0184_B.png	#N/A	Sythe Dragonus	6	1	341598	1627617	+31.	+27.	+2.	61	67		Sythe Dragonus	3440	2369
76	Thanatos	4 ☆☆☆☆	Light	45	360	258	15	1284	1534	59	16		WARRIOR	116.209704	310	13950	0	Element Favor	Favor of the Light	Raises the ATK and REC of Light heroes to x1.30.	Transform	2	Fully Lightproof	All Dark Runes and Heart Runes turn into Light Runes.	25	158	BC01_0158_B.png	#N/A	Thanatos	5	0	0	134655	+21.	+29.	+1.				#N/A	#N/A	#N/A
193	Thanatos +	5 ☆☆☆☆☆	Light	99	756	443	31	2716	3187	129	22		WARRIOR	1116.610068			0	Element Favor	Favor of the Sun	Raises the ATK and REC of Light heroes to x1.35.	Transform	2	Fully Lightproof	All Dark Runes and Heart Runes turn into Light Runes.	25	158	BC02_0158_B.png	#N/A	Thanatos	5	1	134655	1121204	+20.	+28.	+1.	26	39		Thanatos	1284	1534
109	Time Giver	3 ☆☆☆	Light	1	202	134	1	203	135	1	12	-	EXP SPECIAL	0.027405	2000	2000	#DIV/0!	XP Giver	XP Giver	Gives 2,000 XP to hero.	None	0	None			300	BC01_0300_B.png	Specials	Time Giver	3	0	0	0							#N/A	#N/A	#N/A
	Time Guardian	5 ☆☆☆☆☆	Wood	65	898	337	54	3322	2541	182	28		GOD	1536.298764			1.3125	Element Spirit	Spirit of the Earth	Raises the ATK of Wood heroes to x1.7.	Element Boost	4.8	Wood Enhancement II	Wood Runes that are successfully matched are 1.6 times stronger for 3 turns.	10	194	BC01_0194_B.png	#N/A	Time Guardian	6	0	0	341598	+37.88	+34.44	+2.				#N/A	#N/A	#N/A
213	Time Guardian +	6 ☆☆☆☆☆☆	Wood	110	1454	596	88	4724	3648	306	32		GOD	5273.344512			0	Element Spirit	Spirit of the Earth II	Raises the ATK of Wood heroes to x2.	Element Boost	7.2	Wood Enhancement III	Wood Runes that are successfully matched are 1.8 times stronger for 4 turns.	15	194	BC02_0194_B.png	#N/A	Time Guardian	6	1	341598	1627617	+30.	+28.	+2.	62	69		Time Guardian	3322	2541
	Tingou	5 ☆☆☆☆☆	Fire	65	767	339	47	2825	2560	175	26		GOD	1265.6			0.859375	Element Spirit	Spirit of the Flame	Raises the ATK of Fire heroes to x1.7.	Inflict ALL Aurora	55555	Aurora	Inflicts 55555 Damage to all enemies, will ignore any element defense.	60	193	BC01_0193_B.png	#N/A	Tingou	6	0	0	341598	+32.16	+34.7	+2.				#N/A	#N/A	#N/A
212	Tingou +	6 ☆☆☆☆☆☆	Fire	110	1317	621	80	4260	3782	298	30		GOD	4801.17336			0	Element Spirit	Spirit of the Flame II	Raises the ATK of Fire heroes to x2.	Inflict ALL Aurora	55555	Aurora	Inflicts 55555 Damage to all enemies,ignore the element conflict.	60	193	BC02_0193_B.png	#N/A	Tingou	6	1	341598	1627617	+27.	+29.	+2.	56	67		Tingou	2825	2560
48	Tritania Frieze	3 ☆☆☆	Water	30	362	61	44	1377	409	160	8		HEALER	90.11088	224	6720	0	Wall	Steel Wall	Reduces all damage received by 20%.	Cure Turns	45	Quick Cure III	Restores HP equal to 15 times the hero's REC for 3 turns.	15	125	BC01_0125_B.png	#N/A	Tritania Frieze	4	0	0	47922	+35.	+12.	+4.				#N/A	#N/A	#N/A
167	Tritania Frieze +	4 ☆☆☆☆	Water	80	855	140	103	3541	1088	419	18		HEALER	1614.242752			0	Wall	Steel Wall II	Reduces all damage received by 30%.	Cure Turns	54	Curing Force	Restores HP equal to 18 times the hero's REC for 3 turns.	20	125	BC02_0125_B.png	#N/A	Tritania Frieze	4	1	47922	624744	+34.	+12.	+4.	15	22		Tritania Frieze	1377	409
118	Trystan Arch	2 ☆☆	Water	15	153	57	7	293	309	21	2	1	DPS	1.901277	140	2100	0	None	None		Inflict One	10	Cool Breeze	Inflicts Water damage equal to 10 times the hero's ATK on one target.	5	66	BC01_0066_B.png	Archers	Trystan Arch	3	0	0	7957	+10.	+18.	+1.			5	#N/A	#N/A	#N/A
228	Trystan Arch +	3 ☆☆☆	Water	70	295	144	12	1330	1731	81	10		DPS	186.48063	210	14700	0	None	None		Inflict One	14	Chilly Breeze	Inflicts Water damage equal to 14 times the hero's ATK on one target.	10	66	BC02_0066_B.png	Archers	Trystan Arch	3	1	7957	419840	+15.	+23.	+1.	0	7		Trystan Arch	293	309
105	Twisted Avenger	5 ☆☆☆☆☆	Light	65	697	369	42	2553	2737	170	26		GOD	1187.88537			0	Element Hand	Hand of the Sun	Raises the HP of Light heroes to x1.8.	Element Boost	9	Cure Enhancement	Heart Runes that are successfully matched are 3 times stronger for 3 turns.	20	204	BC01_0204_B.png	#N/A	Twisted Avenger	6	0	0	341598	+29.	+37.	+2.				#N/A	#N/A	#N/A
220	Twisted Avenger +	6 ☆☆☆☆☆☆	Light	110	1197	677	72	3813	4165	181	30		GOD	2874.487245			0	Element Hand	Hand of the Sun II	Raises the HP of Light heroes to x2.25.	Element Boost	12	Cure Enhancement II	Heart Runes that are successfully matched are 4 times stronger for 3 turns.	25	204	BC02_0204_B.png	#N/A	Twisted Avenger	6	1	341598	1627617	+24.	+32.	+1.	57	64		Twisted Avenger	2553	2737
	Tyrant of the Beasts	4 ☆☆☆☆	Fire	45	405	247	17	1593	1655	61	18		CRYPTIDS	160.821315			0	Element Fury	Fury of the Heat	Raises the ATK and HP of Fire heroes to x1.2.	Poison Mist	300	Poison Mist IV	Poisons all targets, reducing HP by 3 times of the hero's ATK every turn.	20	180	BC01_0180_B.png	#N/A	Tyrant of the Beasts	5	0	0	134655	+27.	+32.	+1.				#N/A	#N/A	#N/A
198	Tyrant of the Beasts +	5 ☆☆☆☆☆	Fire	99	849	424	34	3299	3462	132	26		CRYPTIDS	1507.590216			0	Element Fury	Fury of Fire	Raises the ATK and HP of Fire heroes to x1.35.	Poison Mist	400	Poison Mist V	Poisons all targets, reducing HP by 4 times of the hero's ATK every turn.	25	180	BC02_0180_B.png	#N/A	Tyrant of the Beasts	5	1	134655	1121204	+25.	+31.	+1.	30	40		Tyrant of the Beasts	1593	1655
21	Unnamed Gnome	2 ☆☆	Dark	15	187	67	8	355	361	22	2	1	DPS	2.81941	176	2640	0	None	None		Inflict One	10	Deep Fog	Inflicts Dark damage equal to 10 times the hero's ATK on one target.	5	59	BC01_0059_B.png	#N/A	Unnamed Gnome	3	0	0	7957	+12.	+21.	+1.			5	#N/A	#N/A	#N/A
145	Unnamed Gnome +	3 ☆☆☆	Dark	70	359	169	15	1601	2032	84	12	7	DPS	273.271488	264	18480	0	None	None		Inflict One	14	Eclipse	Inflicts Dark damage equal to 14 times the hero's ATK on one target.	10	59	BC02_0059_B.png	#N/A	Unnamed Gnome	3	1	7957	419840	+18.	+27.	+1.	0	7	4	Unnamed Gnome	355	361
65	Valkyrie's Apprentice	4 ☆☆☆☆	Water	45	512	138	62	1788	842	238	16		HEALER	358.308048	302	13590	0	Wall	Steel Wall	Reduces all damage received by 20%.	Cure Immediate	35	Healing Force	Restores HP equal to 35 times the hero's REC.	20	118	BC01_0118_B.png	#N/A	Valkyrie's Apprentice	5	0	0	134655	+29.	+16.	+4.				#N/A	#N/A	#N/A
183	Valkyrie's Apprentice +	5 ☆☆☆☆☆	Water	99	1072	236	129	3816	1804	423	22		HEALER	2911.959072			0	Wall	Steel Wall II	Reduces all damage received by 30%.	Cure Immediate	60	Healing Force II	Restores HP equal to 60 times the hero's REC.	25	118	BC02_0118_B.png	#N/A	Valkyrie's Apprentice	5	1	134655	1121204	+28.	+16.	+3.	26	38		Valkyrie's Apprentice	1788	842
16	Verde the Dwarf	2 ☆☆	Water	15	202	41	3	524	167	17	2	1	TANK	1.487636	126	1890	0	Resilient	Resilient	2% of all damage inflicted by the hero is converted into HP.	Defensive Stance	30	Defensive Stance	Reduces all damage received by 10% for 3 turns.	5	10	BC01_0010_B.png	Dwarves	Verde the Dwarf	3	0	0	7957	+23.	+9.	+1.			5	#N/A	#N/A	#N/A
138	Verde the Dwarf +	3 ☆☆☆	Water	70	389	104	4	2390	932	73	12		TANK	162.60604	188	13160	0	Resilient	Resilient II	3% of all damage inflicted by the hero is converted into HP.	Defensive Stance	75	Fortress Stance	Reduces all damage received by 25% for 3 turns.	10	10	BC02_0010_B.png	Dwarves	Verde the Dwarf	3	1	7957	419840	+29.	+12.	+1.	5	5		Verde the Dwarf	524	167
7	Violet Lynx	1 ☆	Dark	15	61	47	3	215	299	17	2	1	DPS	1.092845	96	1440	0	None	None		Inflict One	10	Deep Fog	Inflicts Dark damage equal to 10 times the hero's ATK on one target.	5	7	BC01_0007_B.png	Felinius	Violet Lynx	2	0	0	7957	+11.	+18.	+1.			5	#N/A	#N/A	#N/A
125	Violet Lynx +	2 ☆☆	Dark	55	185	67	8	671	877	62	6	2+	DPS	36.484954	144	7920	0	None	None		Inflict One	14	Eclipse	Inflicts Dark damage equal to 14 times the hero's ATK on one target.	10	7	BC02_0007_B.png	Felinius	Violet Lynx	2	1	7957	231877	+9.	+15.	+1.	3	15		Violet Lynx	215	299
278	Virgo	4 ☆☆☆☆	Light	45	362	281	22				18		GOD	0			1.886363636	Element Spirit	Spirit of the Light	Raises the ATK of Light heroes to x1.6.	Element Boost	8.4	Light Boost	Light Runes that are successfully matched are 2.1 times stronger for 4 turns.	25	517	BC01_0517_B.png	#N/A	Virgo	6	0	0	134655	-8.23	-6.39	-0.5				#N/A	#N/A	#N/A
279	Virgo +	5 ☆☆☆☆☆	Light	99	760	482	46	2328	3912	144	22		GOD	1311.427584			0	Element Spirit	Spirit of the Sun	Raises the ATK of Light heroes to x1.7.	Element Boost	13.8	Light Boost II	Light Runes that are successfully matched are 2.3 times stronger for 6 turns.	25	517	BC02_0517_B.png	#N/A	Virgo	6	1	134655	1121204	+16.	+35.	+1.	-48	-14		Virgo	0	0
280	Virgo ++	6 ☆☆☆☆☆☆	Light	110	1038	1117	63	3545	4823	172	34		GOD	2940.77602			0	Element Spirit	Spirit of the Sun II	Raises the ATK of Light heroes to x2.	Element Boost	19.8	Light Boost III	Light Runes that are successfully matched are 3.3 times stronger for 6 turns.	30	517	BC03_0517(1).png	#N/A	Virgo	6	2	1121204	2407223	+23.	+34.	+1.	56	82		Virgo +	2328	3912
83	Winged Dove	5 ☆☆☆☆☆	Wood	65	1036	239	63	3788	1775	255	26		GOD	1714.5435			0	Element Spirit	Spirit of the Earth	Raises the ATK of Wood heroes to x1.7.	Cure Percent	50	Percent Cure III	Restores 50% Hp of the team's total HP.	25	202	BC01_0202_B.png	#N/A	Winged Dove	6	0	0	341598	+43.	+24.	+3.				#N/A	#N/A	#N/A
199	Winged Dove +	6 ☆☆☆☆☆☆	Wood	110	1780	438	107	5704	2727	325	32		GOD	5055.3126			0	Element Spirit	Spirit of the Earth II	Raises the ATK of Wood heroes to x2.	Cure Percent	70	Percent Cure IV	Restores 70% Hp of the team's total HP.	40	202	BC02_0202_B.png	#N/A	Winged Dove	6	1	341598	1627617	+36.	+21.	+2.	56	64		Winged Dove	3788	1775
86	Winged Healer	5 ☆☆☆☆☆	Wood	65	832	313	50	3072	2297	178	26		GOD	1256.036352	470	30550	0	Wall Element	Wood Barrier	Reduces damage from Wood enemies by 60%.	Defensive Stance	400	Shield of belief	Gain invulnerability for 4 turns.	50	181	BC01_0181_B.png	#N/A	Winged Healer	6	0	0	341598	+35.	+31.	+2.				#N/A	#N/A	#N/A
202	Winged Healer +	6 ☆☆☆☆☆☆	Wood	110	1428	574	86	4589	3517	304	30		GOD	4906.411952			0	Wall Element	Wood Barrier II	Reduces damage from Wood enemies by 80%.	Defensive Stance	600	Shield of Belief II	Gain Invulnerability for 6 turns.	60	181	BC02_0181_B.png	#N/A	Winged Healer	6	1	341598	1627617	+29.	+27.	+2.	57	64		Winged Healer	3072	2297
87	Winged Inferno	5 ☆☆☆☆☆	Fire	65	707	367	43	2627	2735	171	26		GOD	1228.608495	456	29640	0	Element Spirit	Spirit of the Flame	Raises the ATK of Fire heroes to x1.7.	Defensive Element	200	Fire Immunity	Reduces Fire damage by 100% for 2 turns.	30	182	BC01_0182_B.png	#N/A	Winged Inferno	6	0	0	341598	+30.	+37.	+2.				#N/A	#N/A	#N/A
203	Winged Inferno +	6 ☆☆☆☆☆☆	Fire	110	1215	673	73	3831	4161	182	30		GOD	2901.223962	730	80300	0	Element Spirit	Spirit of the Flame II	Raises the ATK of Fire heroes to x2.	Defensive Element	300	Fire Immunity II	Reduces Fire damage by 100% for 3 turns.	35	182	BC02_0182_B.png	#N/A	Winged Inferno	6	1	341598	1627617	+24.	+32.	+1.	59	64		Winged Inferno	2627	2735
	Winged Sorceress	4 ☆☆☆☆	Fire	45	444	156	54	1544	948	186	14		HEALER	272.250432			0	Wall	Steel Wall	Reduces all damage received by 20%.	Cure Turns	54	Curing Force	Restores HP equal to 18 times the hero's REC for 3 turns.	20	137	BC01_0137_B.png	#N/A	Winged Sorceress	5	0	0	134655	+25.	+18.	+3.				#N/A	#N/A	#N/A
188	Winged Sorceress +	5 ☆☆☆☆☆	Fire	99	930	270	112	3282	2034	406	20		HEALER	2710.288728			0	Wall	Steel Wall II	Reduces all damage received by 30%.	Cure Turns	63	Curing Force II	Restores HP equal to 21 times the hero's REC each turn for 3 turns.	25	137	BC02_0137_B.png	#N/A	Winged Sorceress	5	1	134655	1121204	+24.	+18.	+3.	26	38		Winged Sorceress	1544	948
54	Wolf Blademaster	3 ☆☆☆	Wood	30	265	117	11	788	936	40	8		DPS	29.50272			0.275862069	Element Fury	Fury of the Wind	Raises the ATK and HP of Wood heroes to x1.2.	Transform	1	Woodproof	All Fire Runes turn into Wood Runes.	25	159	BC01_0159_B.png	Wolves	Wolf Blademaster	4	0	0	47922	+18.03	+28.24	+1.				#N/A	#N/A	#N/A
173	Wolf Blademaster +	4 ☆☆☆☆	Wood	80	648	275	26	2149	2487	105	16		TANK	561.179115			0	Element Fury	Fury of the Wood	Raises the ATK and HP of Wood heroes to x1.35.	Transform	1	Woodproof	All Fire Runes turn into Wood Runes.	25	159	BC02_0159_B.png	#N/A	Wolf Blademaster	4	1	47922	624744	+19.	+28.	+1.	7	24		Wolf Blademaster	788	936
56	Wolf Knight	3 ☆☆☆	Fire	30	210	148	9	616	1134	38	8		DPS	26.544672	282	8460	0	Element Fury	Fury of the Heat	Raises the ATK and HP of Fire heroes to x1.2.	Transform	1	Fireproof	All Water Runes turn into Fire Runes.	25	165	BC01_0165_B.png	Wolves	Wolf Knight	4	0	0	47922	+14.	+34.	+1.				#N/A	#N/A	#N/A
175	Wolf Knight +	4 ☆☆☆☆	Fire	80	512	348	21	1697	3113	100	18		DPS	528.2761			0	Element Fury	Fury of Fire	Raises the ATK and HP of Fire heroes to x1.35.	Transform	1	Fireproof	All Water Runes turn into Fire Runes.	25	165	BC02_0165_B.png	#N/A	Wolf Knight	4	1	47922	624744	+15.	+35.	+1.	7	22		Wolf Knight	616	1134
31	Wyndy Warden	3 ☆☆☆	Wood	30	261	115	11	1015	724	40	8		WARRIOR	29.3944	242	7260	0	Element Fury	Fury of the Wind	Raises the ATK and HP of Wood heroes to x1.2.	Inflict ALL	7	Wind in the Trees	Inflicts Wood damage equal to 7 times the hero's ATK on ALL targets.	10	155	BC01_0155_B.png	Wardens	Wyndy Warden	4	0	0	47922	+26.	+21.	+1.				#N/A	#N/A	#N/A
154	Wyndy Warden +	4 ☆☆☆☆	Wood	80	594	251	24	2490	1831	103	16		WARRIOR	469.59657			0	Element Fury	Fury of the Wood	Raises the ATK and HP of Wood heroes to x1.35.	Inflict ALL	9	Light Wind II	Inflicts Wood damage equal to 9 times the hero's ATK on ALL targets.	15	155	BC02_0155_B.png	Wardens	Wyndy Warden	4	1	47922	624744	+24.	+20.	+1.	18	24		Wyndy Warden	1015	724
246	Zeus's Soul	5 ☆☆☆☆☆	Light	65	868	281	53	3172	2073	181	26		GOD	1190.175636			0	Element Oath	Oath of the Sun I	Raises the ATK, REC, and HP of Light Heroes to x1.3.	Inflict One	40	Heat of the Sun I	Inflicts Light damage equal to 40 times the hero's ATK on one target.	25	501	BC01_0501_B.png	#N/A	Zeus's Soul	6	0	0	341598	+36.	+28.	+2.				#N/A	#N/A	#N/A
259	Zeus's Soul +	6 ☆☆☆☆☆☆	Light	110	1490	515	90	4760	3131	308	30		GOD	4590.29648			0	Element Oath	Oath of the Sun II	Raises the ATK, REC, and HP of Light Heroes to x1.4.	Inflict One	80	Heat of the Sun II	Inflicts Light damage equal to 80 times the hero's ATK on one target.	30	501	BC02_0501_B.png	#N/A	Zeus's Soul	6	1	341598	1627617	+30.	+24.	+2.	56	65		Zeus's Soul	3172	2073
*/});

// Combos Table

var gCombosText = hereDoc(function() {/*!
Nr	ProperComboName	GameComboName	Member1	Member2	Member3	Member4	Element	ATK	HP	REC	Wikia	Game	CNr	BaseNr	BaseName	Rarity
200	Aggression Spike	STR_COMBINATION_NAME_201	Grim Macer	Valkyrie's Apprentice	Rafael Polaris		Water	15%	15%			v	433	433	Aggression Spike	1
201	Aggression Spike +	STR_COMBINATION_NAME_202	Grim Macer +	Valkyrie's Apprentice +	Rafael Polaris +		Water	20%	20%			v	434	434	Aggression Spike	2
34	Ancient Elements	Ancient Elements	Ice Axe	Sythe Dragonus			ALL		25%			v	34	34	Ancient Elements	1
103	Ancient Elements +	Ancient Elements +	Ice Axe +	Sythe Dragonus +			ALL		30%			v	134	34	Ancient Elements	2
183	Arcane Legion	Arcane Legion	Last Savior	Ana of the Light +	Twisted Avenger +		ALL			35%		wv ???	416	416	Arcane Legion	1
190	Beauty and the Gods	Beauty and the Gods	Mist of the Stars	Priest of Fate			ALL		15%	15%		v	423	423	Beauty and the Gods	1
191	Beauty and the Gods +	Beauty and the Gods +	Mist of the Stars +	Priest of Fate +			ALL		20%	20%		v	424	424	Beauty and the Gods	2
12	Black and White	Black and White	Mace Master	Immortal Assassin			Dark	10%			v	v	12	12	Black and White	1
81	Black and White +	Black and White +	Mace Master +	Immortal Assassin +			Dark	15%				v	112	12	Black and White	2
27	Black Battalion	Black Battalion	Champion of Darkness	Orc Flame Wielder			Dark	20%				v	27	27	Black Battalion	1
96	Black Battalion +	Black Battalion +	Champion of Darkness +	Orc Flame Wielder +			Dark	25%				v	127	27	Black Battalion	2
31	Blade Masters	Blade Masters	Rafael Polaris	Foxen Sly	Thanatos		ALL	10%	10%			v	31	31	Blade Masters	1
100	Blade Masters +	Blade Masters +	Rafael Polaris +	Foxen Sly +	Thanatos +		ALL	13%	15%			v	131	31	Blade Masters	2
2	Boulders of the Earth	Boulders of the Earth	Katrina Rogue	Felinus Boulders			Wood	5%			v	v	2	2	Boulders of the Earth	1
71	Boulders of the Earth +	Boulders of the Earth +	Katrina Rogue +	Felinus Boulders +			Wood	10%				v	102	2	Boulders of the Earth	2
18	Brute Forces	Brute Forces	Cyclopian Warrior	Centaur Reborn	Dark Oracle		ALL	17%				v	18	18	Brute Forces	1
87	Brute Forces +	Brute Forces +	Cyclopian Warrior +	Centaur Reborn +	Dark Oracle +		ALL	20%				v	118	18	Brute Forces	2
41	Burning Magicks	Burning Magicks	Fire Wizard	Red King	Shiva		ALL	27%				v	41	41	Burning Magicks	1
110	Burning Magicks +	Burning Magicks +	Fire Wizard +	Red King +	Shiva +		ALL	30%				v	141	41	Burning Magicks	2
142	Burning Roses	Burning Roses	Princess of the Trade	Winged Inferno			Fire	30%				v	204	204	Burning Roses	1
157	Burning Roses +	Burning Roses +	Princess of the Trade +	Winged Inferno +			Fire	30%				v	304	204	Burning Roses	2
10	Cloaked Avengers	Cloaked Avengers	Serpentian Rogue	Unnamed Gnome			Dark	10%			v	v	10	10	Cloaked Avengers	1
79	Cloaked Avengers +	Cloaked Avengers +	Serpentian Rogue +	Unnamed Gnome +			Dark	15%				v	110	10	Cloaked Avengers	2
60	Council of the Elements	Council of the Elements	Ruler of the Roots	Valkyrie's Apprentice	Tingou		ALL	10%	10%			v	60	60	Council of the Elements	1
129	Council of the Elements +	Council of the Elements +	Ruler of the Roots +	Valkyrie's Apprentice +	Tingou +		ALL	13%	15%			v	160	60	Council of the Elements	2
57	Crimson Cure	Crimson Cure	Orc Flame Wielder	Gronru the Avenger	Fire Wizard		Fire	11%	13%			v	57	57	Crimson Cure	1
126	Crimson Cure +	Crimson Cure +	Orc Flame Wielder +	Gronru the Avenger +	Fire Wizard +		Fire	16%	18%			v	157	57	Crimson Cure	2
51	Crusade of Conjurers	Crusade of Conjurers	Gaia the Conjurer	Sythe Dragonus			Wood		22%			v	51	51	Crusade of Conjurers	1
120	Crusade of Conjurers +	Crusade of Conjurers +	Gaia the Conjurer +	Sythe Dragonus +			Wood		27%			v	151	51	Crusade of Conjurers	2
206	Cute Couple	STR_COMBINATION_NAME_207	Barbarous Jonah	Winged Healer			Wood		10%	10%		v	439	439	Cute Couple	1
207	Cute Couple +	STR_COMBINATION_NAME_208	Barbarous Jonah +	Winged Healer +			Wood		15%	15%		w	440	440	Cute Couple	2
5	Dark Descendants	Dark Descendants	Violet Lynx	Espiritus Petalia	Glynwick the Dwarf		Dark	3%	3%		v	v	5	5	Dark Descendants	1
74	Dark Descendants +	Dark Descendants +	Violet Lynx +	Espiritus Petalia +	Glynwick the Dwarf +		Dark	8%	8%			v	105	5	Dark Descendants	2
54	Dark Disciples	Dark Disciples	Champion of Darkness	Mind Leech			Dark		22%			v	54	54	Dark Disciples	1
123	Dark Disciples +	Dark Disciples +	Champion of Darkness +	Mind Leech +			Dark		27%			v	154	54	Dark Disciples	2
225	Dark Force	Dark Force	Dwarf Engineer	Skull Smasher			Dark	15%		15%		v	458	458	Dark Force	1
226	Dark Force +	Dark Force +	Dwarf Engineer +	Skull Smasher +			Dark	20%		20%		v	459	459	Dark Force	2
147	Dark Guardian	Dark Guardian	Mind Leech	Thanatos			ALL		20%			v	209	209	Dark Guardian	1
162	Dark Guardian +	Dark Guardian +	Mind Leech +	Thanatos +			ALL		40%			v	309	209	Dark Guardian	2
37	Delicate Destruction	Delicate Destruction	Winged Healer	Hella the Conjurer			ALL	25%				v	37	37	Delicate Destruction	1
106	Delicate Destruction +	Delicate Destruction +	Winged Healer +	Hella the Conjurer +			ALL	28%				w	137	37	Delicate Destruction	2
231	Demolition Team	Demolition Team	Dwarf Engineer	Goblin Demolisher									464	464	Demolition Team	1
232	Demolition Team +	Demolition Team +	Dwarf Engineer +	Goblin Demolisher +			ALL	15%	15%			v	465	465	Demolition Team	2
49	Divine Intervention	Divine Intervention	Twisted Avenger	Poseidon's Essence	Stromfuror	Winged Inferno	ALL	10%	10%	5%		v	49	49	Divine Intervention	1
118	Divine Intervention +	Divine Intervention +	Twisted Avenger +	Poseidon's Essence +	Stromfuror +	Winged Inferno +	ALL	13%	15%	8%		v	149	49	Divine Intervention	2
30	Dragon Masters	Dragon Masters	Winged Sorceress	Mage of the Flames			Fire	20%				v	30	30	Dragon Masters	1
99	Dragon Masters +	Dragon Masters +	Winged Sorceress +	Mage of the Flames +			Fire	25%				w	130	30	Dragon Masters	2
39	Dragon Tamers	Dragon Tamers	Poseidon's Essence	Hades Spirit			ALL	25%				v	39	39	Dragon Tamers	1
108	Dragon Tamers +	Dragon Tamers +	Poseidon's Essence +	Hades Spirit +			ALL	28%				v	139	39	Dragon Tamers	2
235	Dwarf Noble	Dwarf Noble	Goblin Demolisher	Atum	Red King		Fire	25%				v	468	468	Dwarf Noble	1
236	Dwarf Noble +	Dwarf Noble +	Goblin Demolisher +	Atum +	Red King +		Fire	30%				v	469	469	Dwarf Noble	2
210	Earth Sisters	STR_COMBINATION_NAME_211	Winged Dove	Elven Saria +			Wood	15%	15%			v	443	443	Earth Sisters	1
211	Earth Sisters +	STR_COMBINATION_NAME_212	Winged Dove +	Elven Saria ++			Wood	20%	20%			w	444	444	Earth Sisters	2
208	Earthboundless	STR_COMBINATION_NAME_209	Barbarous Jonah	Maria Elven	Orcish Shaman		Wood	10%	10%	10%		v	441	441	Earthboundless	1
209	Earthboundless +	STR_COMBINATION_NAME_210	Barbarous Jonah +	Maria Elven +	Orcish Shaman +		Wood	15%	15%	15%		v	442	442	Earthboundless	2
56	Elemental Assassins	Elemental Assassins	Orcish Shaman	Gaia the Conjurer	Time Guardian		Wood		13%	5%		v	56	56	Elemental Assassins	1
125	Elemental Assassins +	Elemental Assassins +	Orcish Shaman +	Gaia the Conjurer +	Time Guardian +		Wood	18%		8%		v	156	56	Elemental Assassins	2
175	Elementary Union	Elementary Union	Winged Inferno	Elven Herbalist			ALL	15%		15%		v	408	408	Elementary Union	1
176	Elementary Union +	Elementary Union +	Winged Inferno +	Elven Herbalist +			ALL	20%		20%		v	409	409	Elementary Union	2
16	Elements Unite	Elements Unite	Dwarven Warrior	Tritania Frieze	Elven Sharpe		ALL	7%	10%		v	v	16	16	Elements Unite	1
85	Elements Unite +	Elements Unite +	Dwarven Warrior +	Tritania Frieze +	Elven Sharpe +		ALL	10%	15%			v	116	16	Elements Unite	2
43	Empowering Pair	Empowering Pair	Winged Inferno	Holy Knight			ALL	25%				v	43	43	Empowering Pair	1
112	Empowering Pair +	Empowering Pair +	Winged Inferno +	Holy Knight +			ALL	28%				v	143	43	Empowering Pair	2
192	Eternal Flames	STR_COMBINATION_NAME_193	Avenging Golem	Axel Minotaur			Fire	10%		10%		v	425	425	Eternal Flames	1
193	Eternal Flames +	STR_COMBINATION_NAME_194	Avenging Golem +	Axel Minotaur +			Fire	15%		15%		v	426	426	Eternal Flames	2
194	Feline Prowess	STR_COMBINATION_NAME_195	Axel Minotaur	Foxen Sly			Fire		10%	10%		v	427	427	Feline Prowess	1
195	Feline Prowess +	STR_COMBINATION_NAME_196	Axel Minotaur +	Foxen Sly +			Fire		15%	15%		v	428	428	Feline Prowess	2
67	Fiery Faction	Fiery Faction	Ruby Templar	Straya Elven	Hades Spirit		Fire	10%	10%		v	v	67	67	Fiery Faction	1
136	Fiery Faction +	Fiery Faction +	Ruby Templar +	Straya Elven +	Hades Spirit +		Fire	15%	15%			v	167	67	Fiery Faction	2
8	Fiery Spirits	Fiery Spirits	Ogar the Dwarf	Henrick Arch			Fire	10%			v	v	8	8	Fiery Spirits	1
77	Fiery Spirits +	Fiery Spirits +	Ogar the Dwarf +	Henrick Arch +			Fire	15%				v	108	8	Fiery Spirits	2
196	Fiery Trilogy	STR_COMBINATION_NAME_197	Axel Minotaur	Winged Sorceress	Orc Flame Wielder		Fire	10%	10%	10%		v	429	429	Fiery Trilogy	1
197	Fiery Trilogy +	STR_COMBINATION_NAME_198	Axel Minotaur +	Winged Sorceress +	Orc Flame Wielder +		Fire	15%	15%	15%		v	430	430	Fiery Trilogy	2
144	Fire and Ice	Fire and Ice	Princess of the Trade	Ice Axe			Fire	30%	30%			v	206	206	Fire and Ice	1
159	Fire and Ice +	Fire and Ice +	Princess of the Trade +	Ice Axe +			Fire	30%	30%			v	306	206	Fire and Ice	2
216	Fire Fights	STR_COMBINATION_NAME_217	Leo Knight	Fire Wizard			Fire	20%				v	449	449	Fire Fights	1
217	Fire Fights +	STR_COMBINATION_NAME_218	Leo Knight +	Fire Wizard +			Fire	25%				v	450	450	Fire Fights	2
218	Fire Fights ++	STR_COMBINATION_NAME_219	Leo Knight ++	Fire Wizard +			Fire	30%				v	451	451	Fire Fights	3
15	Flame Wielders	Flame Wielders	Glinda Warden	Ruby Templar			Fire	10%	7%		v	v	15	15	Flame Wielders	1
84	Flame Wielders +	Flame Wielders +	Glinda Warden +	Ruby Templar +			Fire	15%	12%			v	115	15	Flame Wielders	2
237	Flaming Folks	STR_COMBINATION_NAME_238	Leo Knight	Locki			Fire	10%	10%			v	470	470	Flaming Folks	1
238	Flaming Folks +	STR_COMBINATION_NAME_239	Leo Knight +	Locki +			Fire	15%	15%			v	471	471	Flaming Folks	2
239	Flaming Folks ++	STR_COMBINATION_NAME_240	Leo Knight ++	Locki +			Fire	20%	20%			v	472	472	Flaming Folks	3
53	Forces in Flight	Forces in Flight	Thanatos	Holy Knight			Light	11%	11%			v	53	53	Forces in Flight	1
122	Forces in Flight +	Forces in Flight +	Thanatos +	Holy Knight +			Light	16%	16%			v	153	53	Forces in Flight	2
59	Forces of Darkness	Forces of Darkness	Champion of Darkness	Mind Leech	Skull Smasher		Dark	11%	13%			v	59	59	Forces of Darkness	1
128	Forces of Darkness +	Forces of Darkness +	Champion of Darkness +	Mind Leech +	Skull Smasher +		Dark	16%	18%			v	159	59	Forces of Darkness	2
149	Frozen Couples	Frozen Couples	Ice Master	Mistress of the Freeze +			Water	20%	20%			v	211	211	Frozen Couples	1
163	Frozen Couples +	Frozen Couples +	Ice Master +	Mistress of the Freeze ++			Water	30%				w	311	211	Frozen Couples	2
140	Gods' Protection	Gods' Protection	Zeus's Soul	Poseidon's Essence	Winged Dove		ALL	25%	10%	10%		v	202	202	Gods' Protection	1
155	Gods' Protection +	Gods' Protection +	Zeus's Soul +	Poseidon's Essence +	Winged Dove +		ALL	30%	20%	20%		w	302	202	Gods' Protection	2
151	Green Priestess	Green Priestess	Freya	Winged Healer			Wood	20%	20%			v	213	213	Green Priestess	1
164	Green Priestess +	Green Priestess +	Freya +	Winged Healer +			Wood	30%	30%			w	313	213	Green Priestess	2
4	Guardians of the Light	Guardians of the Light	Errol the Dwarf	Cougerus Gold			Light		5%		v	v	4	4	Guardians of the Light	1
73	Guardians of the Light +	Guardians of the Light +	Errol the Dwarf +	Cougerus Gold +			Light		10%			v	104	4	Guardians of the Light	2
62	Hero's Pact	Hero's Pact	Horned Druid	Mage of the Flames	Winged Healer		ALL	10%		5%		v	62	62	Hero's Pact	1
131	Hero's Pact +	Hero's Pact +	Horned Druid +	Mage of the Flames +	Winged Healer +		ALL	13%		8%		w	162	62	Hero's Pact	2
36	Hidden Agenda	Hidden Agenda	Skull Smasher	Mist of the Stars			ALL		25%			v	36	36	Hidden Agenda	1
105	Hidden Agenda +	Hidden Agenda +	Skull Smasher +	Mist of the Stars +			ALL		30%			v	136	36	Hidden Agenda	2
198	Ice Cage	STR_COMBINATION_NAME_199	Grim Macer	Enki	Orson Shards		Water	10%	10%	10%		v	431	431	Ice Cage	1
199	Ice Cage +	STR_COMBINATION_NAME_200	Grim Macer +	Enki +	Orson Shards +		Water	15%	15%	15%		v	432	432	Ice Cage	2
25	Ice Charmers	Ice Charmers	Orcish Swindler	Orson Shards			Water	20%			v	v	25	25	Ice Charmers	1
94	Ice Charmers +	Ice Charmers +	Orcish Swindler +	Orson Shards +			Water	25%				v	125	25	Ice Charmers	2
28	Ice Sculptors	Ice Sculptors	Valkyrie's Apprentice	Snow Priestess			Water	20%		5%		v	28	28	Ice Sculptors	1
97	Ice Sculptors +	Ice Sculptors +	Valkyrie's Apprentice +	Snow Priestess +			Water	25%		8%		v	128	28	Ice Sculptors	2
3	Ice Warriors	Ice Warriors	Aria Rogue	Felinius Blade			Water	5%			v	v	3	3	Ice Warriors	1
72	Ice Warriors +	Ice Warriors +	Aria Rogue +	Felinius Blade +			Water	10%				v	103	3	Ice Warriors	2
47	In the Shadows	In the Shadows	Mind Leech	Winged Healer	Ice Master	Red King	ALL	10%	10%	5%		v	47	47	In the Shadows	1
116	In the Shadows +	In the Shadows +	Mind Leech +	Winged Healer +	Ice Master +	Red King +	ALL	13%	15%	8%		w	147	47	In the Shadows	2
168	Iron Ladies	Iron Ladies	Ruby Templar	Elven Saria	Mistress of the Freeze		ALL	5%	5%	5%		v	401	401	Iron Ladies	1
169	Iron Ladies +	Iron Ladies +	Ruby Templar +	Elven Saria +	Mistress of the Freeze +		ALL	10%	10%	10%		v	402	402	Iron Ladies	2
170	Iron Ladies ++	Iron Ladies ++	Ruby Templar ++	Elven Saria ++	Mistress of the Freeze ++		ALL	15%	15%	15%		v	403	403	Iron Ladies	3
40	Journeymen	Journeymen	Stromfuror	Feline Mistress			ALL		25%			v	40	40	Journeymen	1
109	Journeymen +	Journeymen +	Stromfuror +	Feline Mistress +			ALL		30%			v	140	40	Journeymen	2
20	Lightning Strike	Lightning Strike	Cyclopian Riot	Nordic Ally			ALL		15%		v	v	20	20	Lightning Strike	1
89	Lightning Strike +	Lightning Strike +	Cyclopian Riot +	Nordic Ally +			ALL		20%			v	120	20	Lightning Strike	2
186	Lost in the Past	Lost in the Past	Priest of Fate	Skull Smasher			Dark	20%				v	419	419	Lost in the Past	1
187	Lost in the Past +	Lost in the Past +	Priest of Fate +	Skull Smasher +			Dark	30%				v	420	420	Lost in the Past	2
214	Lovely Ladies	STR_COMBINATION_NAME_215	Winged Dove	Hella the Conjurer	Feline Mistress		ALL			30%		v	447	447	Lovely Ladies	1
215	Lovely Ladies +	STR_COMBINATION_NAME_216	Winged Dove +	Hella the Conjurer +	Feline Mistress +		ALL			35%		w	448	448	Lovely Ladies	2
152	Loyal Guards	Loyal Guards	Freya	Ruler of the Roots +			Wood		20%	20%		v ???	214	214	Loyal Guards	1
165	Loyal Guards +	Loyal Guards +	Freya +	Ruler of the Roots +			Wood		30%	30%		v	314	214	Loyal Guards	2
11	Masked Mercenaries	Masked Mercenaries	Scimitar Guardian	Rogue Revolver	Kerian Rogue		ALL	5%	5%		v	v	11	11	Masked Mercenaries	1
80	Masked Mercenaries +	Masked Mercenaries +	Scimitar Guardian +	Rogue Revolver +	Kerian Rogue +		ALL	8%	10%			v	111	11	Masked Mercenaries	2
46	Mavens of the Magma	Mavens of the Magma	Glinda Warden	Orc Flame Wielder			ALL		25%			v	46	46	Mavens of the Magma	1
115	Mavens of the Magma +	Mavens of the Magma +	Glinda Warden +	Orc Flame Wielder +			ALL		28%			v	146	46	Mavens of the Magma	2
44	Mavens of the Water	Mavens of the Water	Natalia Warden	Orcish Swindler			ALL			17%		v	44	44	Mavens of the Water	1
113	Mavens of the Water +	Mavens of the Water +	Natalia Warden +	Orcish Swindler +			ALL			22%		v	144	44	Mavens of the Water	2
45	Mavens of the Wood	Mavens of the Wood	Wyndy Warden	Orcish Shaman			ALL	25%				v	45	45	Mavens of the Wood	1
114	Mavens of the Wood +	Mavens of the Wood +	Wyndy Warden +	Orcish Shaman +			ALL	28%				v	145	45	Mavens of the Wood	2
55	Melted Frost	Melted Frost	Orcish Swindler	Snow Priestess	Hades Spirit		Water	13%	11%			v	55	55	Melted Frost	1
124	Melted Frost +	Melted Frost +	Orcish Swindler +	Snow Priestess +	Hades Spirit +		Water	18%	16%			v	155	55	Melted Frost	2
23	Miraculous Mists	Miraculous Mists	Elven Iceya	Earth Whisperer			Water	8%	7%			v	23	23	Miraculous Mists	1
92	Miraculous Mists +	Miraculous Mists +	Elven Iceya +	Earth Whisperer +			Water	13%	12%			v	123	23	Miraculous Mists	2
229	Mountain Clan	Mountain Clan	Dwarf Engineer	Stromfuror	Nordic Ally		ALL	7%	7%	7%		v	462	462	Mountain Clan	1
230	Mountain Clan +	Mountain Clan +	Dwarf Engineer +	Stromfuror +	Nordic Ally +		ALL	10%	10%	10%		v	463	463	Mountain Clan	2
171	Mythic Woodsmen	Mythic Woodsmen	Elven Herbalist	Sythe Dragonus			Wood		15%	15%		v	404	404	Mythic Woodsmen	1
172	Mythic Woodsmen +	Mythic Woodsmen +	Elven Herbalist +	Sythe Dragonus +			Wood		20%	20%		v	405	405	Mythic Woodsmen	2
66	Nature's Forces	Nature's Forces	Golem of the Lava	Enki	Ice Axe		ALL	12%	8%			v	66	66	Nature's Forces	1
135	Nature's Forces +	Nature's Forces +	Golem of the Lava +	Enki +	Ice Axe +		ALL	15%	13%			v	166	66	Nature's Forces	2
177	Ocean and Flames	Ocean and Flames	Avenging Golem	Orson Shards			ALL		20%			v	410	410	Ocean and Flames	1
178	Ocean and Flames +	Ocean and Flames +	Avenging Golem +	Orson Shards +			ALL		30%			v	411	411	Ocean and Flames	2
13	Out of the Waves	Out of the Waves	Natalia Warden	Mistress of the Freeze			Water	10%	7%		v	v	13	13	Out of the Waves	1
82	Out of the Waves +	Out of the Waves +	Natalia Warden +	Mistress of the Freeze +			Water	15%	12%			v	113	13	Out of the Waves	2
61	Out of Time	Out of Time	Orson Shards	Rafael Polaris	Feline Mistress		Water	13%	11%			v	61	61	Out of Time	1
130	Out of Time +	Out of Time +	Orson Shards +	Rafael Polaris +	Feline Mistress +		Water	18%	16%			v	161	61	Out of Time	2
17	Pact of Thorns	Pact of Thorns	Draconis Elder	Amazonia	Cyclopian Assassin		ALL	10%	4%		v	v	17	17	Pact of Thorns	1
86	Pact of Thorns +	Pact of Thorns +	Draconis Elder +	Amazonia +	Cyclopian Assassin +		ALL	13%	9%			v	117	17	Pact of Thorns	2
21	Potent Powers	Potent Powers	Mechanic Master	Straya Elven			Fire	15%				v	21	21	Potent Powers	1
90	Potent Powers +	Potent Powers +	Mechanic Master +	Straya Elven +			Fire	20%				v	121	21	Potent Powers	2
146	Pure Evil	Pure Evil	Mind Leech	Skull Smasher			Dark	30%				v	208	208	Pure Evil	1
161	Pure Evil +	Pure Evil +	Mind Leech +	Skull Smasher +			Dark	40%				v	308	208	Pure Evil	2
219	Pyromancers	STR_COMBINATION_NAME_220	Leo Knight	Orc Flame Wielder			Fire	10%	10%	10%		v	452	452	Pyromancers	1
220	Pyromancers +	STR_COMBINATION_NAME_221	Leo Knight +	Orc Flame Wielder +			Fire	15%	15%	15%		v	453	453	Pyromancers	2
221	Pyromancers ++	STR_COMBINATION_NAME_222	Leo Knight ++	Orc Flame Wielder +			Fire	20%	20%	20%		v	454	454	Pyromancers	3
6	Quicksilver	Quicksilver	Verde the Dwarf	Trystan Arch	Gryndor Arch		Water	3%	3%		v	v	6	6	Quicksilver	1
75	Quicksilver +	Quicksilver +	Verde the Dwarf +	Trystan Arch +	Gryndor Arch +		Water	8%	8%			v	106	6	Quicksilver	2
139	Rage of God Father	Rage of God Father	Zeus's Soul	Poseidon's Essence			ALL	20%				v	201	201	Rage of God Father	1
154	Rage of God Father +	Rage of God Father +	Zeus's Soul +	Poseidon's Essence +			ALL	30%				v	301	201	Rage of God Father	2
1	Red Revenge	Red Revenge	Nalia Rogue	Felio Strike			Fire	5%			v	v	1	1	Red Revenge	1
70	Red Revenge +	Red Revenge +	Nalia Rogue +	Felio Strike +			Fire	10%				v	101	1	Red Revenge	2
179	Renaissance Repeated	Renaissance Repeated	Avenging Golem	Time Guardian			ALL		20%			v	412	412	Renaissance Repeated	1
180	Renaissance Repeated +	Renaissance Repeated +	Avenging Golem +	Time Guardian +			ALL		30%			v	413	413	Renaissance Repeated	2
42	Restorative Powers	Restorative Powers	Aurora Knight	Tyrant of the Beasts			ALL		25%			v	42	42	Restorative Powers	1
111	Restorative Powers +	Restorative Powers +	Aurora Knight +	Tyrant of the Beasts +			ALL		30%			v	142	42	Restorative Powers	2
63	Return of the Phoenix	Return of the Phoenix	Winged Sorceress	Red King	Tyrant of the Beasts		Fire	10%		5%		v	63	63	Return of the Phoenix	1
132	Return of the Phoenix +	Return of the Phoenix +	Winged Sorceress +	Red King +	Tyrant of the Beasts +		Fire	15%		8%		v	163	63	Return of the Phoenix	2
153	Royal Janissaries	Royal Janissaries	Freya	Aurora Knight			Wood	20%		20%		v	215	215	Royal Janissaries	1
166	Royal Janissaries +	Royal Janissaries +	Freya +	Aurora Knight +			Wood	30%		30%		v	315	215	Royal Janissaries	2
32	Ruby Riot	Ruby Riot	Golem of the Lava	Royal Cavalier	Maya Sunchild		Fire	22%				v	32	32	Ruby Riot	1
101	Ruby Riot +	Ruby Riot +	Golem of the Lava +	Royal Cavalier +	Maya Sunchild +		Fire	27%				v	132	32	Ruby Riot	2
204	Salt of the Earth	STR_COMBINATION_NAME_205	Barbarous Jonah	Earth Whisperer			Wood	15%				v	437	437	Salt of the Earth	1
205	Salt of the Earth +	STR_COMBINATION_NAME_206	Barbarous Jonah +	Earth Whisperer +			Wood	20%				v	438	438	Salt of the Earth	2
69	Sapphire Stalkers	Sapphire Stalkers	Mistress of the Freeze	Elven Iceya	Ice Master		Water	10%	10%			v	69	69	Sapphire Stalkers	1
138	Sapphire Stalkers +	Sapphire Stalkers +	Mistress of the Freeze +	Elven Iceya +	Ice Master +		Water	15%	15%			v	169	69	Sapphire Stalkers	2
9	Savage Mercy	Savage Mercy	Striped Crusader	Ana of the Light			Light		10%		v	v	9	9	Savage Mercy	1
78	Savage Mercy +	Savage Mercy +	Striped Crusader +	Ana of the Light +			Light		15%			v	109	9	Savage Mercy	2
65	Scorched Earth	Scorched Earth	Foxen Sly	Shiva	Aurora Knight		ALL	8%	12%			v	65	65	Scorched Earth	1
134	Scorched Earth +	Scorched Earth +	Foxen Sly +	Shiva +	Aurora Knight +		ALL	11%	17%			v	165	65	Scorched Earth	2
7	Seasoned Spirits	Seasoned Spirits	Floral Goddess	Dwarven Alchemist			Wood		10%		v	v	7	7	Seasoned Spirits	1
76	Seasoned Spirits +	Seasoned Spirits +	Floral Goddess +	Dwarven Alchemist +			Wood		15%			v	107	7	Seasoned Spirits	2
29	Sect of the Mighty	Sect of the Mighty	Gaia the Conjurer	Gronru the Avenger			ALL	7%		5%		v	29	29	Sect of the Mighty	1
98	Sect of the Mighty +	Sect of the Mighty +	Gaia the Conjurer +	Gronru the Avenger +			ALL	10%		8%		v	129	29	Sect of the Mighty	2
48	Seraphic Soldiers	Seraphic Soldiers	Twisted Avenger	Poseidon's Essence	Stromfuror		ALL	25%				v	48	48	Seraphic Soldiers	1
117	Seraphic Soldiers +	Seraphic Soldiers +	Twisted Avenger +	Poseidon's Essence +	Stromfuror +		ALL	28%				v	148	48	Seraphic Soldiers	2
148	Shadow Council	Shadow Council	Skull Smasher	Gaia the Conjurer +	Champion of Darkness +		Dark	15%	15%	15%		v ???	210	210	Shadow Council	1
167	Shadow Council +	Shadow Council +	Skull Smasher +	Gaia the Conjurer +	Champion of Darkness +		Dark	20%	20%	20%		v	316	216	Shadow Council	2
173	Sharpened Swords	Sharpened Swords	Elven Herbalist	Aurora Knight			Wood	15%	15%			v	406	406	Sharpened Swords	1
174	Sharpened Swords +	Sharpened Swords +	Elven Herbalist +	Aurora Knight +			Wood	20%	20%			v	407	407	Sharpened Swords	2
14	Smoky Seduction	Smoky Seduction	Wyndy Warden	Elven Saria			Wood	7%	10%		v	v	14	14	Smoky Seduction	1
83	Smoky Seduction +	Smoky Seduction +	Wyndy Warden +	Elven Saria +			Wood	12%	15%			v	114	14	Smoky Seduction	2
26	Spellcasters	Spellcasters	Angelic Forces	Horned Druid			Light			10%		v	26	26	Spellcasters	1
95	Spellcasters +	Spellcasters +	Angelic Forces +	Horned Druid +			Dark	25%					126	26	Spellcasters	2
52	Static Attack	Static Attack	Gronru the Avenger	Winged Inferno			Fire	22%				v	52	52	Static Attack	1
121	Static Attack +	Static Attack +	Gronru the Avenger +	Winged Inferno +			Fire	27%				v	152	52	Static Attack	2
188	Strength or Charm	Strength or Charm	Gaia the Conjurer	Champion of Darkness	Priest of Fate		Dark	15%	15%	15%		v	421	421	Strength or Charm	1
189	Strength or Charm +	Strength or Charm +	Gaia the Conjurer +	Champion of Darkness +	Priest of Fate +		Dark	20%	20%	20%		v	422	422	Strength or Charm	2
150	Strong Ties	Strong Ties	Ice Master	Enki			Water	20%		20%		v	212	212	Strong Ties	1
240	Swordy Bros	STR_COMBINATION_NAME_241	Leo Knight	Hades Spirit	Tyrant of the Beasts		Fire	10%	10%	10%		v	473	473	Swordy Bros	1
241	Swordy Bros +	STR_COMBINATION_NAME_242	Leo Knight +	Hades Spirit +	Tyrant of the Beasts +		Fire	15%	15%	15%		v	474	474	Swordy Bros	2
242	Swordy Bros ++	STR_COMBINATION_NAME_243	Leo Knight ++	Hades Spirit +	Tyrant of the Beasts +		Fire	20%	20%	20%		v	475	475	Swordy Bros	3
227	Technology & Magic	Technology & Magic	Dwarf Engineer	Dwarven Warrior	Angelic Forces		ALL			25%		v	460	460	Technology & Magic	1
228	Technology & Magic +	Technology & Magic +	Dwarf Engineer +	Dwarven Warrior +	Angelic Forces +								461	461	Technology & Magic	2
22	The Adventurers	The Adventurers	Maria Elven	Wolf Knight	Canis Swashbuckler		ALL	10%		2%	v	v	22	22	The Adventurers	1
91	The Adventurers +	The Adventurers +	Maria Elven +	Wolf Knight +	Canis Swashbuckler +		ALL	13%		6%		v	122	22	The Adventurers	2
141	Three Kings of the Gods	Three Kings of the Gods	Zeus's Soul	Poseidon's Essence	Hades Spirit		ALL	15%	15%	15%		v	203	203	Three Kings of the Gods	1
156	Three Kings of the Gods +	Three Kings of the Gods +	Zeus's Soul +	Poseidon's Essence +	Hades Spirit +		ALL	20%	30%	20%		v	303	203	Three Kings of the Gods	2
38	Titans Emerge	Titans Emerge	Ice Master	Time Guardian			ALL		25%			v	38	38	Titans Emerge	1
107	Titans Emerge +	Titans Emerge +	Ice Master +	Time Guardian +			ALL		30%			v	138	38	Titans Emerge	2
184	Tortured Spirits	Tortured Spirits	Last Savior	Gaia the Conjurer			ALL			20%		v	417	417	Tortured Spirits	1
185	Tortured Spirits +	Tortured Spirits +	Last Savior +	Gaia the Conjurer +			ALL			30%		v	418	418	Tortured Spirits	2
143	Trade Unions	Trade Unions	Princess of the Trade	Goblin Demolisher	Dwarf Engineer		ALL		20%	20%		v	205	205	Trade Unions	1
158	Trade Unions +	Trade Unions +	Princess of the Trade +	Goblin Demolisher +	Dwarf Engineer +		ALL		35%	35%		v	305	205	Trade Unions	2
222	Tri-Force!	STR_COMBINATION_NAME_223	Leo Knight	Aurora Knight	Canis Swashbuckler		ALL	15%	15%			v	455	455	Tri-Force!	1
223	Tri-Force! +	STR_COMBINATION_NAME_224	Leo Knight +	Aurora Knight +	Canis Swashbuckler +		ALL	20%	20%			v	456	456	Tri-Force!	2
224	Tri-Force! ++	STR_COMBINATION_NAME_225	Leo Knight ++	Aurora Knight +	Canis Swashbuckler +		ALL	25%	25%			v	457	457	Tri-Force!	3
58	Trio of Templars	Trio of Templars	Angelic Forces	Thanatos	Hella the Conjurer		Light	13%		5%		v	58	58	Trio of Templars	1
127	Trio of Templars +	Trio of Templars +	Angelic Forces +	Thanatos +	Hella the Conjurer +		Light	18%		8%		v	158	58	Trio of Templars	2
145	Twisted Mind	Twisted Mind	Mind Leech	Hades Spirit			ALL		15%	15%		v	207	207	Twisted Mind	1
160	Twisted Mind +	Twisted Mind +	Mind Leech +	Hades Spirit +			ALL		30%	30%		v	307	207	Twisted Mind	2
33	Two Gods	Two Gods	Enki	Tingou			ALL	25%				v	33	33	Two Gods	1
102	Two Gods +	Two Gods +	Enki +	Tingou +			ALL	28%				v	133	33	Two Gods	2
233	Two Mad Men	Two Mad Men	Goblin Demolisher	Golem of Madness									466	466	Two Mad Men	1
234	Two Mad Men +	Two Mad Men +	Goblin Demolisher +	Golem of Madness +			Fire	10%	10%	10%		v	467	467	Two Mad Men	2
181	Undying Devotees	Undying Devotees	Last Savior	Angelic Forces			Light		15%	15%		v	414	414	Undying Devotees	1
182	Undying Devotees +	Undying Devotees +	Last Savior +	Angelic Forces +			Light		20%	20%		v	415	415	Undying Devotees	2
64	Unlikely Alliance	Unlikely Alliance	Maya Sunchild	Twisted Avenger	Stromfuror		Light	12%	12%			v	64	64	Unlikely Alliance	1
133	Unlikely Alliance +	Unlikely Alliance +	Maya Sunchild +	Twisted Avenger +	Stromfuror +		Light	17%	17%			v	164	64	Unlikely Alliance	2
50	Unshackled Storms	Unshackled Storms	Valkyrie's Apprentice	Centaur Reborn			Water		22%			v	50	50	Unshackled Storms	1
119	Unshackled Storms +	Unshackled Storms +	Valkyrie's Apprentice +	Centaur Reborn +			Water		27%			v	150	50	Unshackled Storms	2
19	Verdant Valor	Verdant Valor	Cyclopian Grunt	Wolf Blademaster			Wood	15%				v	19	19	Verdant Valor	1
88	Verdant Valor +	Verdant Valor +	Cyclopian Grunt +	Wolf Blademaster +			Wood	20%				v	119	19	Verdant Valor	2
24	Warriors of the Wood	Warriors of the Wood	Orcish Shaman	Ruler of the Roots	Tingou		Wood	20%			v	v	24	24	Warriors of the Wood	1
93	Warriors of the Wood +	Warriors of the Wood +	Orcish Shaman +	Ruler of the Roots +			Wood	25%				v	124	24	Warriors of the Wood	2
202	Watery Grave	STR_COMBINATION_NAME_203	Grim Macer	Poseidon's Essence			Water			20%		v	435	435	Watery Grave	1
203	Watery Grave +	STR_COMBINATION_NAME_204	Grim Macer +	Poseidon's Essence +			Water			25%		v	436	436	Watery Grave	2
35	Wild Weapons	Wild Weapons	Mind Leech	Twisted Avenger			ALL	25%				v	35	35	Wild Weapons	1
104	Wild Weapons +	Wild Weapons +	Mind Leech +	Twisted Avenger +			ALL	28%				v	135	35	Wild Weapons	2
212	Wooden Women	STR_COMBINATION_NAME_213	Winged Dove	Shiva	Winged Healer		Wood	25%		25%		v	445	445	Wooden Women	1
213	Wooden Women +	STR_COMBINATION_NAME_214	Winged Dove +	Shiva +	Winged Healer +		Wood	25%		25%		w	446	446	Wooden Women	2
68	Woodland Goddesses	Woodland Goddesses	Elven Saria	Maria Elven	Shiva		Wood	10%	10%			v	68	68	Woodland Goddesses	1
137	Woodland Goddesses +	Woodland Goddesses +	Elven Saria +	Maria Elven +	Shiva +		Water	15%	15%			v	168	68	Woodland Goddesses	2
*/});

// Class Logger

function Logger() {
	this.Level = { NONE: 0, ERROR: 1, WARN: 2, INFO: 3, DEBUG: 4, TRACE: 5 };
	this.level = this.Level.INFO;
}

Logger.prototype.error = function(message) {
	if (this.level >= this.Level.ERROR) {
		console.log('E ' + message);
	}
}

Logger.prototype.warn = function(message) {
	if (this.level >= this.Level.WARN) {
		console.log('W ' + message);
	}
}

Logger.prototype.info = function(message) {
	if (this.level >= this.Level.INFO) {
		console.log('I ' + message);
	}
}

Logger.prototype.debug = function(message) {
	if (this.level >= this.Level.DEBUG) {
		console.log('D ' + message);
	}
}

Logger.prototype.trace = function(message) {
	if (this.level >= this.Level.TRACE) {
		console.log('T ' + message);
	}
}

// File I/O functions (cookies)

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	log.debug("document.cookie = " + cname + "=" + cvalue + "; " + expires + "; path=/");
	document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

function getCookie(cname, defaultValue) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) {
			var cvalue = c.substring(name.length, c.length);
			log.debug("getCookie '" + cname + "' cvalue='" + cvalue + "'");
			return cvalue;
		}
	}
	log.debug("getCookie " + cname + " def='" + defaultValue + "'");
	return defaultValue;
}

// Formatting functions

function formatCombatValue(value) {
	// Round to fixed number of significant digits
	if (value > 0) {
		var exponent = Math.floor(Math.log10(value)) + 1;
		var mantissa = Math.pow(10, Math.log10(value) - exponent);
		mantissa = Math.round(mantissa * 100) / 100;
		value = mantissa * Math.pow(10, exponent);
	}
	// Add thousand separators
	return value.toLocaleString('en');
}

// Enums

var Element = { Fire: 'Fire', Water: 'Water', Wood: 'Wood', Dark: 'Dark', Light: 'Light' };

var Rarity  = { Common: 1, Uncommon: 2, Rare: 3, UltraRare: 4, SuperRare: 5, God: 6 };

var Rune    = { Fire: 'Fire', Water: 'Water', Wood: 'Wood', Dark: 'Dark', Light: 'Light', Heart: 'Heart' };

// Enum Mappings

var elementOrder = { Fire: 0, Water: 1, Wood: 2, Dark: 3, Light: 4, Heart: 5, ALL: 6 };

// Class Hero

function Hero(index, header, row) {
	// Config
	for (var colNr = 0; colNr < header.length; ++colNr) {
		var field = (row[colNr] || "");
		// Strip leading and trailing quotes (") left behind by Excel
		field = field.replace(/""/g, '"');
		field = field.replace(/^"/, '').replace(/"$/, '');
		// If it looks like a number, it is a number
		if (field.match(/^[+\-]?\d[\d\.eE+\-]*$/)) {
			field = Number(field);
		}
		this[header[colNr]] = field;
	}
	
	this.index = index;
	this.Icon = (this.Name ? this.Name.replace(/ /g, '_') + '_Icon.png' : undefined);
	
	// Status
	this.level = 0;
	this.sacrificeValue = "";
	this.apSkillActive = false;
	this.dungeonBonus = 0;
	this.activeLeadership = null;
	this.activeHelperSkill = null;
	this.activeAPSkills = [];
	this.activeCombos = [];
	this.combatValue = "";
}

Hero.prototype.setLevel = function(level) {
	this.level = level;
}

Hero.prototype.setDungeonBonus = function(dungeonBonus) {
	this.dungeonBonus = dungeonBonus;
}

Hero.prototype.setActiveLeadership = function(activeLeaderSkill, activeHelperSkill) {
	this.activeLeaderSkill = activeLeaderSkill;
	this.activeHelperSkill = activeHelperSkill;
}

Hero.prototype.setActiveCombos = function(activeCombos) {
	this.activeCombos = activeCombos;
}

Hero.prototype.setActiveAPSkills = function(activeAPSkills) {
	this.activeAPSkills = activeAPSkills;
}

Hero.prototype.update = function() {
	if ((this['Max Lv'] > 1) && (this.level > 1)) {
		this.baseAtk 		= this['ATK Lv1'] + (this.level - 1) * Math.floor((this['ATK Max'] - this['ATK Lv1']) / (this['Max Lv'] - 1));
		this.baseHp 		= this['HP Lv1']  + (this.level - 1) * Math.floor((this['HP Max']  - this['HP Lv1'])  / (this['Max Lv'] - 1));
		this.baseRec 		= this['REC Lv1'] + (this.level - 1) * Math.floor((this['REC Max'] - this['REC Lv1']) / (this['Max Lv'] - 1));
	} else if (this.level == 1) {
		this.baseAtk 		= this['ATK Lv1'];
		this.baseHp 		= this['HP Lv1'];
		this.baseRec 		= this['REC Lv1'];
	} else {
		this.baseAtk 		= 0;
		this.baseHp 		= 0;
		this.baseRec 		= 0;
	}

	log.debug("update '" + this.Name + "'");
	
	// Apply leader skill
	this.leaderAtk = this.baseAtk;
	this.leaderHp  = this.baseHp;
	this.leaderRec = this.baseRec;
	//log.debug("updateLeadership " + this.activeLeaderSkill + " this.Name='" + this.Name + "'");
	if (this.activeLeaderSkill) {
		this.activeLeaderSkill.apply(this);
	}
	if (this.activeHelperSkill) {
		this.activeHelperSkill.apply(this);
	}
	
	this.totalAtk = this.leaderAtk;
	this.totalHp  = this.leaderHp;
	this.totalRec = this.leaderRec;

	// Apply active combos
	for (var i = 0; i < this.activeCombos.length; ++i) {
		this.activeCombos[i].apply(this);
	}

	// Apply dungeon buff
	this.totalAtk = Math.floor(this.totalAtk * (100 + this.dungeonBonus) / 100);
	this.totalHp = Math.floor(this.totalHp * (100 + this.dungeonBonus) / 100);
	
	// Apply active AP Skills
	for (var i = 0; i < this.activeAPSkills.length; ++i) {
		this.activeAPSkills[i].apply(this);
	}
	
	// Update sacrifice value
	if (this['XP Enh Lv1'] !== "") {
		this.sacrificeValue  = this.level * this['XP Enh Lv1'];
	}
	
	// Combat value is ATK * HP * REC / 1e6.
	this.combatValue = this.totalAtk * this.totalHp * this.totalRec / 1e6;
}

// Class Combo

function Combo(index, header, row) {
	if (header) {
		for (var colNr = 0; colNr < header.length; ++colNr) {
			var field = (row[colNr] || "");
			if (field.match(/^\d+$/)) {
				field = Number(field);
			}
			this[header[colNr]] = field;
		}
	}
	
	this.index = index;
	this.name = this.ProperComboName;
	this.members = [];
	if (this.Member1) {
		this.members.push(this.Member1);
	}
	if (this.Member2) {
		this.members.push(this.Member2);
	}
	if (this.Member3) {
		this.members.push(this.Member3);
	}
	if (this.Member4) {
		this.members.push(this.Member4);
	}
}

Combo.prototype.clone = function() {
	var copy = new Combo(this.index, undefined, undefined);
	for (var key in this) {
		copy[key] = this[key];
	}
	copy.members = this.members.slice();
	return copy;
}

Combo.prototype.compare = function(a, b) {
	if (a.missing && b.missing && Object.keys(a.missing).length < Object.keys(b.missing).length) return -1;
	if (a.missing && b.missing && Object.keys(a.missing).length > Object.keys(b.missing).length) return +1;
	if (elementOrder[a.Element] < elementOrder[b.Element]) return -1;
	if (elementOrder[a.Element] > elementOrder[b.Element]) return +1;
	if (a.ATK < b.ATK) return -1;
	if (a.ATK > b.ATK) return +1;
	if (a.HP  < b.HP)  return -1;
	if (a.HP  > b.HP)  return +1;
	if (a.REC < b.REC) return -1;
	if (a.REC > b.REC) return +1;
}

Combo.prototype.apply = function(hero) {
	if (!hero.Name)
		return;
	
	if ((this.Element === "ALL") || (this.Element === hero.Element)) {
		var result;
		if (parseInt(this.ATK) > 0) {
			var factor = 100 + parseInt(this.ATK);
			var result = Math.floor(factor * hero.totalAtk / 100);
			log.debug("  " + this.name + ": Amplify ATK=" + hero.totalAtk + " by x" + factor + "% to ATK=" + result);
			hero.totalAtk = result;
		}
		if (parseInt(this.HP) > 0) {
			var factor = 100 + parseInt(this.HP);
			var result = Math.floor(factor * hero.totalHp / 100);
			log.debug("  " + this.name + ": Amplify HP=" + hero.totalHp + " by x" + factor + "% to HP=" + result);
			hero.totalHp = result;
		}
		if (parseInt(this.REC) > 0) {
			var factor = 100 + parseInt(this.REC);
			var result = Math.floor(factor * hero.totalRec / 100);
			log.debug("  " + this.name + ": Amplify REC=" + hero.totalRec + " by x" + factor + "% to REC=" + result);
			hero.totalRec = result;
		}
	}
}

// Class Leadership

function Leadership(name, effect) {
	this.name = name;
	this.effect = effect;
	this.successfullyProcessed = false;
}

Leadership.prototype.apply = function(hero) {
	if (!hero.Name)
		return;

	//log.debug("apply Leadership " + this.name + " to " + hero.Name);
	
	// Examples: 
	// - Raises the ATK of Wood heroes to x1.3.
	// - Raises the ATK and REC of Wood heroes to 30%.
	if (this.effect.match(/^Raises/)) {
		var element, factor, result;
		if (result = this.effect.match(/\b(Fire|Water|Wood|Dark|Light|ALL)\b/)) {
			element = result[1];
		}
		if (result = this.effect.match(/(by|to) x(\d+(\.\d+)?)/)) {
			factor = Math.round(100 * parseFloat(result[2]));
		}
		if (result = this.effect.match(/(by|to) (\d+)%/)) {
			factor = 100 + parseInt(result[2]);
		}
		
		if (element && factor) {
			this.successfullyProcessed = true;
		}
		
		if ((element === "ALL") || (element === hero.Element) && factor) {
			if (this.effect.match(/ATK/)) {
				var result = Math.floor(factor * hero.leaderAtk / 100);
				log.debug("  " + this.name + ": Amplify ATK=" + hero.leaderAtk + " by x" + factor + "% to ATK=" + result);
				hero.leaderAtk = result;
			}
			if (this.effect.match(/HP/)) {
				var result = Math.floor(factor * hero.leaderHp / 100);
				log.debug("  " + this.name + ": Amplify HP=" + hero.leaderHp + " by x" + factor + "% to HP=" + result);
				hero.leaderHp = result;
			}
			if (this.effect.match(/REC/)) {
				var result = Math.floor(factor * hero.leaderRec / 100);
				log.debug("  " + this.name + ": Amplify REC=" + hero.leaderRec + " by x" + factor + "% to REC=" + result);
				hero.leaderRec = result;
			}
		}
	}
}

// Class APSkill

function APSkill(name, effect, cost) {
	this.name = name;
	this.effect = effect;
	this.cost = cost;
	this.successfullyProcessed = false;
}

APSkill.prototype.apply = function(hero) {
	if (!hero.Name)
		return;
		
	// Examples:
	// - Wood Runes that are successfully matched are 1.8 times stronger for 4 turns.
	var result;
	if (result = this.effect.match(/(Fire|Water|Wood|Dark|Light).* (\d+(\.\d*)) times stronger .* turn/)) {
		var element = result[1];
		var factor = Math.round(parseFloat(result[2]) * 100);
		this.successfullyProcessed = true;
		if (element === hero.Element) {
			var result = Math.floor(hero.totalAtk * factor / 100);
			log.debug("  " + this.name + ": Amplify ATK=" + hero.totalAtk + " by x" + factor + "% to ATK=" + result);
			hero.totalAtk = result;
		}
	}
}

// Class Evolution

function Evolution() {
	this.table = [
		{},
		{ Fire: 'Eternal Flames',    Water: 'Crescent Moon', Wood: 'Swamp Spirit' },
		{ ALL:  'Keeper of the Knowledge' },
		{ Fire: 'Essence Flametorn', Water: 'Genus Ice',     Wood: 'Lantern of the Earth' },
		{ Fire: 'Cyclonian Rebel',   Water: 'Cyclonius Rex', Wood: 'Cyclonian Eye' },
		{ ALL:  'Ribbon Enchantress' }
	]

}

Evolution.prototype.getMaterials = function(rarity, element) {
	rarity = parseInt(rarity);
	var evolutionElement = element;
	if (element === Element.Dark) {
		evolutionElement = Element.Fire;
	}
	if (element === Element.Light) {
		evolutionElement = Element.Wood;
	}
	
	if ((rarity < Rarity.Common) || (rarity >= Rarity.God)) {
		return [];
	}
	if (rarity == Rarity.Common) {
		return [ this.table[rarity][evolutionElement] ];
	}
	var materials = [ 'Keeper of the Knowledge' ];
	if (rarity >= Rarity.Rare) {
		materials.push(this.table[Rarity.Rare][evolutionElement]);
	}
	if (rarity >= Rarity.UltraRare) {
		materials.push(this.table[Rarity.UltraRare][evolutionElement]);
	}
	if (rarity >= Rarity.SuperRare) {
		materials.push('Ribbon Enchantress');
	}
	return materials;
}

// Class TeamTotal

function TeamTotal() {
	this.atk = 0;
	this.hp = 0;
	this.rec = 0;
	this.Fire = 0;
	this.Water = 0;
	this.Wood = 0;
	this.Dark = 0;
	this.Light = 0;
	this.combatValue = 0;
}

TeamTotal.prototype.update = function() {
	// Combat value is ATK * HP * REC / 1e6.
	this.combatValue = this.atk * this.hp * this.rec / 1e6;
}

TeamTotal.prototype.clone = function() {
	var copy = new TeamTotal();
	for (var key in this) {
		copy[key] = this[key];
	}
	return copy;
}

// Class Team

function Team(index, name) {
	this.index = index;
	this.name = name;
	var noHero = database.heroes[0];
	this.heroes = [ noHero, noHero, noHero, noHero, noHero, noHero ];
	this.leaderActive = true;
	this.helperActive = true;
	this.activeLeaderSkill = null;
	this.activeHelperSkill = null;
	this.activeCombos = [];
	this.activeAPSkills = [];
	this.subtotal = new TeamTotal();
	this.total    = new TeamTotal();
}

Team.prototype.clone = function() {
	var copy = new Team();
	for (var key in this) {
		copy[key] = this[key];
	}
	copy.heroes = this.heroes.slice();
	copy.subtotal = this.subtotal.clone();
	copy.total = this.total.clone();
	return copy;
}

Team.prototype.getNrHeroes = function() {
	var countHeroes = 0;
	for (var heroSeqNr = 0; heroSeqNr < 6; ++heroSeqNr) {
		if (this.heroes[heroSeqNr].Name) {
			++countHeroes;
		}
	}
	return countHeroes;
}

Team.prototype.save = function() {
	//log.debug("save team '" + this.name + "'");
	setCookie('team' + this.index + "_name", this.name, 365);
	setCookie('team' + this.index + '_leaderActive', this.leaderActive, 365);
	setCookie('team' + this.index + '_helperActive', this.helperActive, 365);
	if (!this.heroes)
		return;
	for (var heroSeqNr = 0; heroSeqNr < this.heroes.length; ++heroSeqNr) {
		var hero = this.heroes[heroSeqNr];
		setCookie('team' + this.index + "_hero" + heroSeqNr, hero.Name, 365);
		if (hero.Name) {
			setCookie('level_' + hero.Name, hero.level, 365);
		}
		if (hero.apSkillActive) {
			setCookie('team' + this.index + '_AP' + heroSeqNr, true, 365);
		}
	}
}

Team.prototype.load = function() {
	this.leaderActive = getCookie('team' + this.index + '_leaderActive', true);
	this.helperActive = getCookie('team' + this.index + '_helperActive', true);
	for (var heroSeqNr = 0; heroSeqNr < 6; ++heroSeqNr) {
		var heroName = getCookie('team' + this.index + '_hero' + heroSeqNr, "");
		var hero = database.heroes[0];
		var heroLevel = 0;
		if (heroName) {
			hero = database.heroesByHeroName[heroName];
			hero.setLevel(getCookie('level_' + heroName, 0));
			hero.apSkillActive = getCookie('team' + this.index + '_AP' + heroSeqNr, false);
		}
		this.heroes[heroSeqNr] = hero;
	}
}

Team.prototype.findActiveCombos = function() {
	var possibleCombos = this.findPossibleCombos();
	var activeCombos = [];
	for (var i = 0; i < possibleCombos.length; ++i) {
		if (Object.keys(possibleCombos[i].missing).length == 0) {
			activeCombos.push(possibleCombos[i]);
		}
	}
	return activeCombos;
}

Team.prototype.findPossibleCombos = function() {

	var applicableCombos = {};
	
	for (var heroSeqNr = 0; heroSeqNr < 6; ++heroSeqNr) {
		var hero = this.heroes[heroSeqNr];
		if (!hero.Name)
			continue;
		
		// Add new possible combos and track missing
		var combos = database.combosByHeroName[hero.Name];
		for (var comboNr = 0; comboNr < combos.length; ++comboNr) {
			var combo = combos[comboNr];
			if (!applicableCombos.hasOwnProperty(combo.name)) {
				combo = combo.clone();
				combo.missing = {};
				for (var memberNr = 0; memberNr < combo.members.length; ++memberNr) {
					combo.missing[combo.members[memberNr]] = 1;
				}
				applicableCombos[combo.name] = combo;
			}
		}
		
		// Update missing in applicableCombos
		for (var comboName in applicableCombos) {
			var combo = applicableCombos[comboName];
			delete combo.missing[hero.Name];
		}
	}
	
	var possibleCombos = [];
	
	// List all applicable combos that have 1 member missing
	for (var comboName in applicableCombos) {
		var combo = applicableCombos[comboName];
		possibleCombos.push(combo);
	}
	
	// Sort
	possibleCombos.sort(Combo.prototype.compare);
	
	return possibleCombos;
}

Team.prototype.update = function(dungeonBonus) {
	log.debug("");
	log.debug("team '" + this.name + "' update");

	// Set leadership
	var leaderSkill = this.heroes[0]['Leader Name'];
	this.activeLeaderSkill = (this.leaderActive ? database.leaderships[leaderSkill] : null);
	var helperSkill = this.heroes[5]['Leader Name']
	this.activeHelperSkill = (this.helperActive ? database.leaderships[helperSkill] : null);
	log.debug("leaderSkill='" + leaderSkill + "'");
	log.debug("helperSkill='" + helperSkill + "'");
	
	for (var heroSeqNr = 0; heroSeqNr < 6; ++heroSeqNr) {
		this.heroes[heroSeqNr].setActiveLeadership(this.activeLeaderSkill, this.activeHelperSkill);
	}
	
	// Set combos
	this.activeCombos = this.findActiveCombos();
	for (var heroSeqNr = 0; heroSeqNr < 6; ++heroSeqNr) {
		this.heroes[heroSeqNr].setActiveCombos(this.activeCombos);
	}
	
	// Set dungeon bonus
	for (var heroSeqNr = 0; heroSeqNr < 6; ++heroSeqNr) {
		this.heroes[heroSeqNr].setDungeonBonus(dungeonBonus);
	}
	
	// Set AP Skills
	for (var heroSeqNr = 0; heroSeqNr < 6; ++heroSeqNr) {
		this.heroes[heroSeqNr].setActiveAPSkills(this.activeAPSkills);
	}
	
	// Apply to heroes
	for (var heroSeqNr = 0; heroSeqNr < 6; ++heroSeqNr) {
		this.heroes[heroSeqNr].update();
	}
	
	// Calculate totals
	this.subtotal = new TeamTotal();
	this.total = new TeamTotal();
	for (var heroSeqNr = 0; heroSeqNr < 6; ++heroSeqNr) {
		var hero = this.heroes[heroSeqNr];
		if (hero.Name) {
			this.subtotal.atk           += hero.leaderAtk;
			this.subtotal.hp            += hero.leaderHp;
			this.subtotal.rec           += hero.leaderRec;
			this.subtotal[hero.Element] += hero.leaderAtk;

			this.total.atk              += hero.totalAtk;
			this.total.hp               += hero.totalHp;
			this.total.rec              += hero.totalRec;
			this.total[hero.Element]    += hero.totalAtk;
		}
		this.subtotal.update();
		this.total.update();
	}
}

// Class Database

function Database() {
	this.heroes = [];
	this.combos = [];
	
	this.leaderships = {};
	this.apSkills = {};
	
	this.heroesByHeroName = {};
	this.combosByHeroName = {};
}

Database.prototype.getHero = function(heroNr) {
	return this.heroes[heroNr];
}

Database.prototype.getNrHeroes = function(heroNr) {
	return this.heroes.length;
}

Database.prototype.getCombo = function(comboNr) {
	return this.combos[comboNr];
}

Database.prototype.getNrCombos = function(heroNr) {
	return this.combos.length;
}

Database.prototype.getHeroCombos = function(hero) {

	return combosByHeroName[hero.Name];
}

Database.prototype.loadHeroTable = function() {
	var rows = gHeroesText.split(/\r?\n/);
	var header = rows[0].replace(/\s+$/, '').split("\t");
	this.heroes[0] = new Hero(0, header, "");
	for (var rowNr = 1; rowNr < rows.length; ++rowNr) {
		if (rows[rowNr].match(/^\s*$/)) {
			break;
		}
		var row = rows[rowNr].split("\t");
		var hero = new Hero(rowNr, header, row);
		
		this.heroes[rowNr] = hero;
		this.heroesByHeroName[hero.Name] = hero;
		this.combosByHeroName[hero.Name] = [];
		if (hero['Leader Name'] !== "") {
			this.leaderships[hero['Leader Name']] = new Leadership(hero['Leader Name'], hero['Leader Effect']);
		}
		if (hero['AP Name'] !== "") {
			this.apSkills[hero['AP Name']] = new APSkill(hero['AP Name'], hero['AP Effect'], hero['AP Cost']);
		}
	}
	log.info("Loaded " + (this.heroes.length - 1) + " heroes");
}
	
Database.prototype.loadComboTable = function() {
	var rows = gCombosText.split(/\r?\n/);
	var header = rows[0].replace(/\s+$/, '').split("\t");
	this.combos[0] = new Combo(0, header, "");
	for (var rowNr = 1; rowNr < rows.length; ++rowNr) {
		if (rows[rowNr].match(/^\s*$/)) {
			break;
		}
		var row = rows[rowNr].split("\t");
		var combo = new Combo(rowNr, header, row);
		
		this.combos[rowNr] = combo;
		
		for (var i = 0; i < combo.members.length; ++i) {
			this.combosByHeroName[combo.members[i]].push(combo);
		}
	}
	log.info("Loaded " + (this.combos.length - 1) + " combos");
}

Database.prototype.load = function() {	
	this.loadHeroTable();
	this.loadComboTable();
}

// Class ImageManager

function ImageManager() {
	// Initialize image cache with the common icons
	this.imageCache = {
		'ATK_Icon.png':	    'https://static.wikia.nocookie.net/dungeongems/images/3/3e/ATK_Icon.png',
		'Dark_Icon.png':    'https://static.wikia.nocookie.net/dungeongems/images/e/e9/Dark_Icon.png',
		'Fire_Icon.png':    'https://static.wikia.nocookie.net/dungeongems/images/c/c8/Fire_Icon.png',
		'HP_Icon.png':      'https://static.wikia.nocookie.net/dungeongems/images/2/25/HP_Icon.png',
		'Light_Icon.png':   'https://static.wikia.nocookie.net/dungeongems/images/9/95/Light_Icon.png',
		'Placeholder.png':  'https://static.wikia.nocookie.net/dungeongems/images/4/47/Placeholder.png',
		'REC_Icon.png':     'https://static.wikia.nocookie.net/dungeongems/images/1/15/REC_Icon.png',
		'Water_Icon.png':   'https://static.wikia.nocookie.net/dungeongems/images/7/70/Water_Icon.png',
		'Wood_Icon.png':    'https://static.wikia.nocookie.net/dungeongems/images/2/23/Wood_Icon.png'
	};
}

ImageManager.prototype.findImageLocation = function(responseText) {
	var imageLink = null;
	try {
		var posImageLink = responseText.indexOf("fullImageLink");		// Wikia specific class name identifying the fullImageLink 
		posImageLink = responseText.indexOf("https", posImageLink);		// Start of http address that comes after
		var endImageLink = responseText.indexOf('"', posImageLink);		// Matching closing quote
		imageLink = responseText.substring(posImageLink, endImageLink);
	} finally {
		return imageLink;
	}
}

ImageManager.prototype.loadImage = function(image, id) {
	if (image == null || image === "") {
		return "";
	}
	if (this.imageCache.hasOwnProperty(image)) {
		return this.imageCache[image];
	}
	if (!document.domain) {
		// Testing locally
		return image;
	}
	
	try {
		var uri = "https://dungeongems.fandom.com/wiki/File:" + image;

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.image = image;
		xmlHttp.imageCache = this.imageCache;
		xmlHttp.onreadystatechange = function() {
			try {
				//log.debug("xmlHttp.onreadystatechange readyState=" + this.readyState + " status=" + this.status 
				//			+ " responseXML=" + this.responseXML + " responseText=" + (this.responseText != null)
				//			+ " finalURL=" + this.response.finalUrl);
				if (this.readyState == this.DONE) {
					if ((this.status == 200) && (this.responseText != null)) {
						var imageLocation = imageManager.findImageLocation(this.responseText);
						log.debug("imageLocation=" + imageLocation);
						if (imageLocation != null) {
							// success!
							this.imageCache[this.image] = imageLocation;
							document.getElementById(id).src = imageLocation;
						} else {
							log.warn("Could not find location for image " + this.image);
							this.imageCache[this.image] = this.image;
						}
					} else {
						log.warn("Could not retrieve location for image " + this.image);
						this.imageCache[this.image] = this.image;
					}
				}
			} catch (e) {
				log.warn("loadImage: catch e=" + e);
			}
		}
		
		log.debug("xmlHttp.open GET '" + uri + '"');
		xmlHttp.open("GET", uri, true);
		xmlHttp.send();
	} finally {
		return (this.imageCache['Placeholder.png'] || '');
	}
}

ImageManager.prototype.updateImage = function(id, image) {
	document.getElementById(id).src = this.loadImage(image, id);
}

// Common dialog elements

function CommonDialog() {
}

CommonDialog.prototype.createSelectHero = function(id, onchange) {
	var selectHero = '\
	<select id="' + id + '" style="background-color: #293942; color: white" onchange="' + onchange + '(this)" title="Select your hero"> \
		<option value="0" selected>(No Hero)';
	for (var heroNr = 1; heroNr < database.getNrHeroes(); ++heroNr) {
		selectHero += '\
		<option value="' + heroNr + '">' + database.getHero(heroNr).Name + '\n';
	}
	selectHero += '\
	</select>';
	return selectHero;
}

CommonDialog.prototype.createSelectLevel = function(id, onchange) {
	var html = '\
	<select id="' + id + '" style="background-color: #293942; color: white" onchange="' + onchange + '(this)" title="Level of the hero"> \
		<option value="0" selected>0';
	for (var level = 1; level <= 110; ++level) {
		html += '\
		<option value="' + level + '">' + level + '\n';
	}
	html += '\
	</select>';
	
	return html;
}

CommonDialog.prototype.updateSelectLevel = function(id, maxLevel, curLevel) {
	if (document.getElementById(id).options.length === maxLevel + 1) {
		document.getElementById(id).selectedIndex = curLevel;
		return;
	}

	var html = '';
	for (var level = 0; level <= maxLevel; ++level) {
		html += '<option value="' + level + '"';
		if (level === curLevel) {
			html += " selected";
		}
		html += '>' + level + '\n';
	}
	if (curLevel > maxLevel) {
		html += '<option value="' + level + '" selected>' + curLevel + '\n';
	}
	
	document.getElementById(id).innerHTML = html;
}

CommonDialog.prototype.createSelectDungeonBonus = function(id, onchange) {
	return '\
		<select id="' + id + '" onchange="' + onchange + '(this)" title="Dungeon buff for the dungeons that allow you to enlist friends"> \
			<option value="0" selected>(No Buff) \
			<option value="5">5% \
			<option value="10">10% \
			<option value="30">30% \
		</select>';
}

CommonDialog.prototype.createComboTable = function(id, showProcessed) {
	var html = '\
<table id="' + id + '" class="TeamViewer"> \
	<thead> \
		<tr> \
			<th>Combos</th> \
			<th>Needed</th> \
			<th style="text-align: center">Element</th> \
			<th style="text-align: center"><img id="thATK"   width="28px" src="' + imageManager.loadImage('ATK_Icon.png',   'thATK') + '" alt="ATK"></th> \
			<th style="text-align: center"><img id="thHP"    width="28px" src="' + imageManager.loadImage('HP_Icon.png',    'thHP')  + '" alt="HP"></th> \
			<th style="text-align: center"><img id="thREC"   width="28px" src="' + imageManager.loadImage('REC_Icon.png',   'thREC') + '" alt="REC"></th>';
	if (showProcessed) {
		html += '\
			<th style="text-align: center">Processed</th>';
	}
	html += '\
		</tr> \
	</thead> \
	<tbody> \
		<tr> \
			<td>None</td> \
			<td></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td>';
	if (showProcessed) {
		html += '\
			<td style="text-align: center"></td>';
	}
	html += '\
		</tr> \
	</tbody> \
</table>';

	return html;
}

CommonDialog.prototype.updateCombos = function(table, possibleCombos, minMissing, maxMissing, showProcessed) {
	if (possibleCombos.length == 0) {
		possibleCombos = [ database.combos[0].clone() ];
		possibleCombos[0].missing = [];
	}
	
	// Clear table
	table.tBodies[0].innerHTML = "";
	
	// Append rows
	for (var rowNr = 0; rowNr < possibleCombos.length; ++rowNr) {
		var combo = possibleCombos[rowNr];
		var nrMissing = Object.keys(combo.missing).length;
		if (nrMissing < minMissing || nrMissing > maxMissing)
			continue;
			
		var members = "";
		var memberNr = 0;
		for (var member in combo.missing) {
			if (members !== "") {
				members += ', ';
			}
			var idMemberIcon = 'combo' + rowNr + '_member' + memberNr;
			members += 
				'<a href="' + member + '">' + 
					'<img id="' + idMemberIcon + '" width="28px" src="' + imageManager.loadImage(database.heroesByHeroName[member].Icon, idMemberIcon) + '" /> ' +
				'</a> ' +
				'<a href="' + member + '">' + member + '</a>';
			memberNr++;
		}
		
		var row = table.tBodies[0].insertRow(-1);
		var col = 0;
		row.insertCell(col++).innerHTML = '<i>' + (combo.name ? combo.name : 'None') + '</i>';
		row.insertCell(col++).innerHTML = members;
		var firstCenteredCol = col;
		var cellElement = row.insertCell(col++);
		if (combo.Element === "ALL" || combo.Element === "") {
			cellElement.innerHTML = combo.Element;
		} else {
			var idElement = "comboViewElement" + rowNr;
			cellElement.innerHTML = '<img id="' + idElement + '" width="24px" src="' + imageManager.loadImage(combo.Element + "_Icon.png", cellElement.id) + '" alt="' + combo.Element + '" />';
		}
		row.insertCell(col++).innerHTML = combo.ATK;
		row.insertCell(col++).innerHTML = combo.HP;
		row.insertCell(col++).innerHTML = combo.REC;
		if (showProcessed) {
			row.insertCell(col++).innerHTML = (combo.name && nrMissing == 0 ? 'Yes' : '');
		}
		
		for (col = firstCenteredCol; col < row.cells.length; ++col) {
			row.cells[col].style.textAlign = "center";
		}
	}
}

// CharacterDialog Events

function onChangeCharacter() {
	log.debug("onChangeCharacter");
	var heroNr = document.getElementById('selectHero').selectedIndex;
	var level = document.getElementById('selectLevel').selectedIndex;
	var dungeonBonus = Number(document.getElementById('selectDungeonBonus').value);
	//var activeLeadership = document.getElementById('selectLeadership').value;
	//var activeAPSkill = document.getElementById('selectAPSkill').value;

	dialog.showHero(heroNr, level, dungeonBonus, null /*database.leaderships[activeLeadership]*/, "" /*activeAPSkill*/);
}

function onClickGenerateCharacterPage() {
	var heroNr = document.getElementById('selectHero').selectedIndex;
	var html = new CharacterPage().generate(heroNr);
	document.getElementById('generatedCharacterPage').value = html;
	document.getElementById('generatedCharacterPage').rows = html.split("\n").length;
}

// Class CharacterDialog

function CharacterDialog() {
}

CharacterDialog.prototype.createInputDialog = function() {
   
	var inputCharacterViewer = document.getElementById('inputCharacterViewer');

	var sortedLeaderships = [];
	for (var leadership in database.leaderships) {
		sortedLeaderships.push(leadership);
	}
	sortedLeaderships.sort();
	
	var sortedAPSkills = [];
	for (var skill in database.apSkills) {
		sortedAPSkills.push(skill);
	}
	sortedAPSkills.sort();
	
	var html = '\
<table style="border: 0; border-collapse: collapse; padding: 4px; spacing: 0"> \
	<tr> \
		<td><select id="selectHero" onchange="onChangeCharacter()" title="Select your hero"> \
			<option value="0" selected>(No Hero)';
		for (var heroNr = 1; heroNr < database.getNrHeroes(); ++heroNr) {
			html += '\
			<option value="' + heroNr + '">' + database.getHero(heroNr).Name + '\n';
		}
		html += '\
		</select></td> \
		\
		<td><select id="selectLevel" onchange="onChangeCharacter()" title="Level of the hero"> \
			<option value="0" selected>(No Level)';
		for (var level = 1; level <= 110; ++level) {
			html += '\
			<option value="' + level + '">' + level + '\n';
		}
		html += '\
		</select></td> \
		\
		<td><select id="selectDungeonBonus" onchange="onChangeCharacter()" title="Dungeon buff for the dungeons that allow you to enlist friends"> \
			<option value="0" selected>(No Buff) \
			<option value="5">5% \
			<option value="10">10% \
			<option value="30">30% \
		</select></td> \
	</tr> \
</table> \
<!-- table style="border: 0; border-collapse: collapse; padding: 4px; spacing: 0"> \
	<tr> \
		<td colspan="4"><select id="selectLeadership" onchange="onChangeCharacter()"> \
			<option value="" selected>(No Leader)';
		for (var i = 0; i < sortedLeaderships.length; ++i) {
			var leadership = sortedLeaderships[i];
			html += '\
			<option value="' + leadership + '">' + leadership + ' - ' + database.leaderships[leadership].effect + '\n';
		}
		html += '\
		</select></td> \
		<td>(Partial impl)</td> \
	</tr> \
	<tr> \
		<td colspan="4"><select id="selectAPSkill" onchange="onChangeCharacter()"> \
			<option value="" selected>(No Active AP Skill)';
		for (var i = 0; i < sortedAPSkills.length; ++i) {
			var skill = sortedAPSkills[i];
			html += '\
			<option value="' + skill + '">' + skill + ' - ' + database.apSkills[skill].effect + '\n';
		}
		html += '\
		</select></td> \
		<td>(Not impl)</td> \
	</tr> \
</table -->\
';
	inputCharacterViewer.innerHTML = html;
}

CharacterDialog.prototype.createHeroAttribute = function(key, tooltip) {
	var idIcon = key + "_icon";
	var idValue = key + "_value";
	tooltip = (tooltip || '');
	var html = '\
				<td width="24px"><img id="' + idIcon + '" width="100%" src="" alt="" /></td> \
				<td style="color: #C59A5A" title="' + tooltip + '">' + key + '</td> \
				<td id="' + idValue + '" style="color: white; text-align: center"></td>';
	return html;
}

CharacterDialog.prototype.updateHeroAttribute = function(icon, key, value) {
	var iconFile = "";
	var altText = "";
	if (icon != null && icon !== "") {
		iconFile = icon.replace(/ /g, "_") + "_Icon.png";
		if (icon !== key) {
			altText = icon;
		}
	}
	var idIcon = key + "_icon";
	var idValue = key + "_value";
	document.getElementById(idIcon).src = imageManager.loadImage(iconFile, idIcon);
	document.getElementById(idIcon).alt = altText;
	document.getElementById(idValue).innerHTML = value;
}

CharacterDialog.prototype.createOutputDialog = function() {
	var width = "400px";
	
	var css = '\
<style type="text/css"> \
table.CharacterViewer { \
	background-color: black; \
	color: white; \
	border: 0; \
	border-collapse: collapse; \
	font-size: 90%; \
	width: 320px; \
} \
table.CombosView { \
	background-color: black; \
	color: white; \
	border: 1px solid lightgray; \
	border-collapse: collapse; \
	font-size: 90%; \
} \
th { \
	padding: 4px; \
	text-align: left \
} \
td { \
	padding: 4px; \
} \
</style>';

	var characterView = '\
<table class="CharacterViewer" style="border: 1px solid lightgray"> \
	<tr>\
		<td style="text-align: center"><a id="heroImageLink" href=""><img id="heroImage" width="75%" src="" /></a></td>\
	</tr> \
	<tr> \
		<td><table class="CharacterViewer" style="background-color: #293942"><tr> \
			<td width="32px"><img id="classImage" width="100%" src="" alt="" /></td> \
			<td id="heroName" style="font-size: 120%"></td> \
			<td id="heroRarity" style="color: #FFDF10; text-align: right"></td> \
		</tr></table></td> \
	</tr> \
	<tr> \
		<td><table class="CharacterViewer" > \
			<tr>' 
				+ this.createHeroAttribute("LV")
				+ this.createHeroAttribute("ATK") + '\
			</tr> \
			<tr>'
				+ this.createHeroAttribute("HP")
				+ this.createHeroAttribute("REC") + '\
			</tr> \
			<tr>'
				+ this.createHeroAttribute("EVOLUTION")
				+ this.createHeroAttribute("COST") + '\
			</tr> \
			<tr>'
				+ this.createHeroAttribute("GALLERY", "Number of the hero in the in-game hero Gallery")
				+ this.createHeroAttribute("SACRIFICE", "XP gained when using this hero for the Enhancement of another hero") + '\
			</tr> \
			<tr>'
				+ this.createHeroAttribute("VALUE", "Combat value given by ATK x HP x REC / 10⁶") + '\
				<td /><td /><td /> \
			</tr> \
		</table></td> \
	</tr> \
	<tr> \
		<td><table class="CharacterViewer" style="background-color: #293942"><tr> \
			<td id="leadershipName" style="font-size: 120%"></td> \
		</tr></table></td> \
	</tr> \
	<tr>\
		<td id="leaderEffect" style="color: #B5B6B5"></td>\
	</tr> \
	<tr> \
		<td><table class="CharacterViewer" style="background-color: #293942"><tr> \
			<td id="APName" style="font-size: 120%"></td> \
		</tr></table></td> \
	</tr> \
	<tr>\
		<td><table class="CharacterViewer"><tr> \
			<td style="font-size: 120%">LV. <span id="APLevel">1</span></td> \
			<td style="font-size: 120%">AP. <span id="APCost"></span></td> \
		</tr></table></td> \
	</tr> \
	<tr>\
		<td id="APEffect" style="color: #B5B6B5"></td>\
	</tr> \
</table>';

	var combosView = '\
<table id="combosView" class="CombosView"> \
	<thead><tr> \
		<th>Combo Name</th> \
		<th>Other Members</th> \
		<th>Element</th> \
		<th>ATK</th> \
		<th>HP</th> \
		<th>REC</th> \
	</tr></thead> \
</table>';

	var view = '\
<table> \
	<tr> \
		<td style="vertical-align: top">' + characterView + '</td> \
		<td style="vertical-align: top">' + combosView + '</td> \
	</tr> \
</table>';

	var generateCharacterPage = '\
		<button onclick="onClickGenerateCharacterPage()">Generate</button><br /> \
		<textarea id="generatedCharacterPage" rows="1" cols ="115" />';

	var html = css + view + generateCharacterPage;
	
	document.getElementById('outputCharacterViewer').innerHTML = html;						
}

CharacterDialog.prototype.showHero = function(heroNr, level, dungeonBonus, activeLeadership, activeAPSkill) {
	var hero = database.getHero(heroNr);
	hero.setLevel(level);
	hero.setDungeonBonus(dungeonBonus);
	hero.setActiveLeadership(activeLeadership, null);
	hero.update();

	document.getElementById('heroImageLink').href = hero.Name;
	imageManager.updateImage("heroImage", hero.Image);
	imageManager.updateImage("classImage", hero.Class + "_Icon.png");
	document.getElementById('heroName').innerHTML = hero.Name;
	document.getElementById('heroRarity').innerHTML = hero.Rarity;
	this.updateHeroAttribute("LV", "LV", hero.level + "/" + hero['Max Lv']);
	this.updateHeroAttribute(hero.Element, "ATK", hero.totalAtk);
	this.updateHeroAttribute("HP", "HP", hero.totalHp);
	this.updateHeroAttribute("REC", "REC", hero.totalRec);
	this.updateHeroAttribute("EVOLUTION", "EVOLUTION", parseInt(hero.Rarity) + "/" + hero.Evolution);
	this.updateHeroAttribute("COST", "COST", hero.Cost);
	this.updateHeroAttribute(hero.Name, "GALLERY", hero.Nr);
	this.updateHeroAttribute("MATERIAL", "SACRIFICE", hero.sacrificeValue);
	this.updateHeroAttribute(null, "VALUE", formatCombatValue(hero.combatValue));
	document.getElementById('leadershipName').innerHTML = hero['Leader Name'];
	document.getElementById('leaderEffect').innerHTML = hero['Leader Effect'];
	document.getElementById('APName').innerHTML = hero['AP Name'];
	document.getElementById('APEffect').innerHTML = hero['AP Effect'];
	document.getElementById('APCost').innerHTML = hero['AP Cost'];
	
	var combos = database.combosByHeroName[hero.Name];
	combos = combos.slice();
	combos.sort(Combo.prototype.compare);
	
	var combosView = document.getElementById('combosView');
	// Clear table
	for (var rowNr = combosView.rows.length; --rowNr >= 1;) {
		combosView.deleteRow(rowNr);
	}
	// Append rows
	for (var rowNr = 0; rowNr < combos.length; ++rowNr) {
		var combo = combos[rowNr];
		var members = "";
		for (var memberNr = 0; memberNr < combo.members.length; ++memberNr) {
			if (combo.members[memberNr] === hero.Name) {
				continue;
			}
			if (members !== "") {
				members += ', ';
			}
			members += '<a href="' + combo.members[memberNr] + '">' + combo.members[memberNr] + '</a>';
		}
		
		var row = combosView.insertRow(-1);
		var col = 0;
		row.insertCell(col++).innerHTML = '<i>' + combo.ProperComboName + '</i>';
		row.insertCell(col++).innerHTML = members;
		var cellElement = row.insertCell(col++);
		cellElement.style.textAlign = "center";	
		if (combo.Element === "ALL" || combo.Element === "") {
			cellElement.innerHTML = combo.Element;
		} else {
			var idElement = "comboViewElement" + rowNr;
			cellElement.innerHTML = '<img id="' + idElement + '" width="24px" src="' + imageManager.loadImage(combo.Element + "_Icon.png", cellElement.id) + '" alt="' + combo.Element + '" />';
		}
		row.insertCell(col++).innerHTML = combo.ATK;
		row.insertCell(col++).innerHTML = combo.HP;
		row.insertCell(col++).innerHTML = combo.REC;
	}
}

// Class CharacterPage

function CharacterPage() {
}

CharacterPage.prototype.createKeyValue = function(key, value) {
	return '| style="background-color: rgb(22, 25, 29);" |' + "'''" + key+ "'''\n|" + value + '\n';
}

CharacterPage.prototype.createComboTable = function(combos, firstComboNr) {
	var endComboNr = Math.min(combos.length, firstComboNr + 2);
	
	var teamCombos =
		'|-\n' +
		'! scope="col" style="background-color: rgb(22, 25, 29);" |Combo Name\n';

	for (var i = firstComboNr; i < endComboNr; ++i) {
		teamCombos +=
		'! scope="col" |' + "'''" + combos[i].name + "'''\n";
	}
	
	teamCombos +=
		'|-\n' +
		'| style="background-color: rgb(22, 25, 29);" |' + "'''Combo Property'''\n";
		
	for (var i = firstComboNr; i < endComboNr; ++i) {
		teamCombos +=
		'|\n' +
		'Element Bonus: ' + (combos[i].Element === 'ALL' ? 'All Elements' : combos[i].Element) + '\n\n' +
		'ATK Bonus: ' + (combos[i].ATK ? combos[i].ATK : '') + '\n\n' +
		'HP Bonus: '  + (combos[i].HP  ? combos[i].HP  : '') + '\n\n' +
		'REC Bonus: ' + (combos[i].REC ? combos[i].REC : '') + '\n';
	}
	
	teamCombos +=
		'|-\n' +
		'| style="background-color: rgb(22, 25, 29);" |' + "'''Team Members'''\n";
		
	for (var i = firstComboNr; i < endComboNr; ++i) {
		var members = '';
		for (var j = 0; j < combos[i].members.length; ++j) {
			if (members) {
				members += ', ';
			}
			members += '[[' + combos[i].members[j] + ']]';
		}
		teamCombos += '|' + members + '\n';
	}
	
	return teamCombos;
}

CharacterPage.prototype.generate = function(heroNr) {
	var hero = database.heroes[heroNr];
	
	// Image
	
	var image =
		'[[File:' + hero.Image + '|none|480px]]\n' +
		'\n';
		
	// Basic Stats
		
	var basicStats =
		"=='''BASIC STATS'''==\n" +
		'\n' +
		'{| class="article-table" style="width: 800px; height: 200px;" border="1" cellpadding="1" cellspacing="1"\n' +
		'|-\n' +
		this.createKeyValue('Name', hero.Name) +
		this.createKeyValue('Rarity', hero.Rarity) +
		this.createKeyValue('Element', hero.Element) +
		'|-\n' +
		this.createKeyValue('HP (Lv 1)',  hero['HP Lv1']) +
		this.createKeyValue('ATK (Lv 1)', hero['ATK Lv1']) +
		this.createKeyValue('REC (Lv 1)', hero['REC Lv1']) +
		'|-\n' +
		this.createKeyValue('HP (Max lv)',  hero['HP Max']) +
		this.createKeyValue('ATK (Max lv)', hero['ATK Max']) +
		this.createKeyValue('REC (Max lv)', hero['REC Max']) +
		'|-\n' +
		this.createKeyValue('Max level',  hero['Max Lv']) +
		this.createKeyValue('Cost', hero.Cost) +
		this.createKeyValue('Class', hero.Class) +
		'|}\n' +
		'\n';
	
	// Skills
	
	var leaderSkill = hero['Leader Name'];
	if (hero['Leader Effect']) {
		leaderSkill += ' - ' + hero['Leader Effect']
	}

	var skills =
		"=='''SKILLS'''==\n" +
		'\n' +
		'{| class="article-table" style="width: 800px; height: 200px;" border="1" cellpadding="1" cellspacing="1"\n' +
		this.createKeyValue('Leader Skill', leaderSkill) +
		'|-\n' +
		'| rowspan="3" style="background-color: rgb(22, 25, 29);" |' + "'''AP Skill'''\n" +
		'|' + hero['AP Name'] + '\n' +
		'|-\n' +
		'|' + hero['AP Effect'] + '\n' +
		'|-\n' +
		'|' + (hero['AP Cost'] ? 'Cost: ' + hero['AP Cost'] + ' AP' : '') + '\n' +
		'|}\n' +
		'\n';

	// Team Combos
		
	var combos = database.combosByHeroName[hero.Name];
		
	var teamCombos =
		"=='''TEAM COMBO'''==\n" +
		'\n';
	
	for (var firstComboNr = 0; firstComboNr < combos.length; firstComboNr += 2) {
		teamCombos += 
			'{| class="article-table" style="width: 800px" border="1" cellpadding="1" cellspacing="1"\n';
		teamCombos += 
			this.createComboTable(combos, firstComboNr);
		teamCombos +=
			'|}\n' +
			'\n';
	}
	

	// Evolution
		
	var materials = new Evolution().getMaterials(hero.Rarity, hero.Element);
	var materialsNeeded = '';
	for (var i = 0; i < materials.length; ++i) {
		if (materialsNeeded) {
			materialsNeeded += ', ';
		}
		materialsNeeded += '[[' + materials[i] + ']]';
	}
	
	var evolvesTo = '';
	if (database.heroesByHeroName[hero.Name + ' +']) {
		evolvesTo = '[[' + hero.Name + ' +' + ']]';
	} else if (database.heroesByHeroName[hero.Name + '+']) {
		evolvesTo = '[[' + hero.Name + '+' + ']]';
	} else {
		materialsNeeded = 'None';
		evolvesTo = 'Max Evolve Stage';
	}

	var evolution =
		"=='''EVOLUTION'''==\n" +
		'\n' +
		'{| class="article-table" style="width: 800px" border="1" cellpadding="1" cellspacing="1"\n' +
		'|-\n' +
		this.createKeyValue('Materials Needed', materialsNeeded) +
		'|-\n' +
		this.createKeyValue('Evolves to',  evolvesTo) +
		'|}\n' +
		'\n';
	
	return image + basicStats + skills + teamCombos + evolution;
}

// Class TeamViewerDialog

function TeamDialog() {
	this.selectedTeam = new Team(0, "(No Team)");
	this.teams = [ this.selectedTeam ];
}

TeamDialog.prototype.createTeamViewerCSS = function() {
	return '\
<style type="text/css"> \
table.TeamViewer { \
	background-color: black; \
	color: white; \
	border: 1px solid lightgray; \
	border-collapse: collapse; \
	font-size: 90%; \
	width: 800px; \
} \
table.TeamViewer thead { \
	padding: 8px 8px 8px 8px; \
	border-bottom: 1px solid #303030 \
} \
table.TeamViewer th { \
	background-color: rgb(22, 25, 29); \
	padding: 4px 8px 4px 8px; \
	text-align: left \
} \
table.TeamViewer td { \
	padding: 4px 8px 4px 8px; \
} \
</style>';
}

TeamDialog.prototype.createCSS = function() {

	html = this.createTeamViewerCSS();

	html += hereDoc(function(){/*!
<style type="text/css"> \
table.tablesorter {
	margin:10px 0pt 15px;
	width: 100%;
	text-align: left;
}
table.tablesorter thead tr th, table.tablesorter tfoot tr th {
}
table.tablesorter thead tr .header {
	background-image: url(https://static.wikia.nocookie.net/dungeongems/images/e/e8/Sort_none.gif);
	background-repeat: no-repeat;
	background-position: center right;
	cursor: pointer;
}
table.tablesorter tbody td {
}
table.tablesorter tbody tr.odd td {
	background-color:#F0F0F6;
}
table.tablesorter thead tr .headerSortUp {
	background-image: url(https://static.wikia.nocookie.net/dungeongems/images/5/5b/Sort_up.gif);
	background-repeat: no-repeat;
}
table.tablesorter thead tr .headerSortDown {
	background-image: url(https://static.wikia.nocookie.net/dungeongems/images/7/7a/Sort_down.gif);
	background-repeat: no-repeat;
}
table.tablesorter thead tr .headerSortDown, table.tablesorter thead tr .headerSortUp {
	background-color: rgb(62, 65, 109); \
}
</style>
	*/});
	
	return html;
}

TeamDialog.prototype.createHeroRow = function(role, heroSeqNr) {
	return '\
	<tr> \
		<th id="role' + heroSeqNr + '">' + role + '</th> \
		<td id="tdImgHero' + heroSeqNr + '"></td> \
		<td>' + commonDialog.createSelectHero('selectHero' + heroSeqNr, 'onChangeTeam') + '</td> \
		<td>' + commonDialog.createSelectLevel('selectLevel' + heroSeqNr, 'onChangeTeam') + '</td> \
		<td style="text-align: center"><img id="imgElement' + heroSeqNr + '" width="28px" src="Placeholder.png" alt=""></td> \
		<td id="ATK'   + heroSeqNr + '" style="text-align: center"></td> \
		<td id="HP'    + heroSeqNr + '" style="text-align: center"></td> \
		<td id="REC'   + heroSeqNr + '" style="text-align: center"></td> \
		<td id="VALUE' + heroSeqNr + '" style="text-align: center"></td> \
		<td style="text-align: center"><input type="checkbox" id="checkboxLeader' + heroSeqNr + '" onchange="onChangeTeam()" title="" /></td> \
		<td style="text-align: center"><input type="checkbox" id="checkboxAP' + heroSeqNr + '" onchange="onChangeTeam()" title="" /></td> \
	</tr>';
}

TeamDialog.prototype.create = function() {
	var selectTeam = '\
		<select id="selectTeam" onchange="onChangeSelectedTeam()" title="The currently selected team"> \
			<option value="0" selected>(No Team) \
		</select> \
		<button onclick="onDeleteTeam()" title="Deletes the currently selected team">Delete</button> \
		<span title="The team name used when clicking Copy">New Team Name:</span> \
		<input id="newTeamName" title="The team name used when clicking Copy"></input> \
		<button onclick="onAddTeam()" title="Copies the current team to a new team name with the new name">Copy</button>';
	
	var teamTable = '\
<table class="TeamViewer"> \
	<thead><tr> \
		<th>Role</th> \
		<th>Icon</th> \
		<th>Hero</th> \
		<th>Level</th> \
		<th>Element</th> \
		<th style="text-align: center"><img id="thTeamATK"   width="28px" src="' + imageManager.loadImage('ATK_Icon.png', 'thTeamATK') + '" alt="ATK"></th> \
		<th style="text-align: center"><img id="thTeamHP"    width="28px" src="' + imageManager.loadImage('HP_Icon.png',  'thTeamHP')  + '" alt="HP"></th> \
		<th style="text-align: center"><img id="thTeamREC"   width="28px" src="' + imageManager.loadImage('REC_Icon.png', 'thTeamREC') + '" alt="REC"></th> \
		<th style="text-align: center" title="Combat value given by ATK x HP x REC / 10⁶">VALUE</th> \
		<th style="text-align: center">Leader</th> \
		<th style="text-align: center">AP</th> \
	</tr></thead>'
	+ this.createHeroRow('Leader', 0)
	+ this.createHeroRow('1', 1)
	+ this.createHeroRow('2', 2)
	+ this.createHeroRow('3', 3)
	+ this.createHeroRow('4', 4)
	+ this.createHeroRow('Helper', 5)
	+ '\
</table>';

	var resultTables = '\
<table class="TeamViewer"> \
<table id="activeSkills" class="TeamViewer"> \
	<thead><tr> \
		<th>Skill</th> \
		<th>Name</th> \
		<th>Effect</th> \
		<th style="text-align: center">Cost</th> \
		<th style="text-align: center">Processed</th> \
	</tr></thead> \
	<tr> \
		<th>Leader</th> \
		<td id="activeLeaderSkill"></td> \
		<td id="activeLeaderEffect"></td> \
		<td></td> \
		<td id="activeLeaderProcessed" style="text-align: center"></th> \
	</tr> \
	<tr> \
		<th>Helper</th> \
		<td id="activeHelperSkill"></td> \
		<td id="activeHelperEffect"></td> \
		<td></td> \
		<td id="activeHelperProcessed" style="text-align: center"></th> \
	</tr> \
</table>'
+ commonDialog.createComboTable('possibleCombos', true) + '\
<table id="tableTeamTotals" class="TeamViewer tablesorter""> \
	<thead> \
		<tr style="border-bottom: 1px solid #303030"> \
			<th>Totals</th> \
			<th style="text-align: center"><img id="thATK"   width="28px" src="' + imageManager.loadImage('ATK_Icon.png',   'thATK')   + '" alt="ATK"></th> \
			<th style="text-align: center"><img id="thHP"    width="28px" src="' + imageManager.loadImage('HP_Icon.png',    'thHP')    + '" alt="HP"></th> \
			<th style="text-align: center"><img id="thREC"   width="28px" src="' + imageManager.loadImage('REC_Icon.png',   'thREC')   + '" alt="REC"></th> \
			<th style="text-align: center"><img id="thFire"  width="28px" src="' + imageManager.loadImage('Fire_Icon.png',  'thFire')  + '" alt="Fire"></th> \
			<th style="text-align: center"><img id="thWater" width="28px" src="' + imageManager.loadImage('Water_Icon.png', 'thWater') + '" alt="Water"></th> \
			<th style="text-align: center"><img id="thWood"  width="28px" src="' + imageManager.loadImage('Wood_Icon.png',  'thWood')  + '" alt="Wood"></th> \
			<th style="text-align: center"><img id="thDark"  width="28px" src="' + imageManager.loadImage('Dark_Icon.png',  'thDark')  + '" alt="Dark"></th> \
			<th style="text-align: center"><img id="thLight" width="28px" src="' + imageManager.loadImage('Light_Icon.png', 'thLight') + '" alt="Light"></th> \
			<th style="text-align: center" title="Combat value given by ATK x HP x REC / 10⁶">VALUE</th> \
		</tr> \
		<tr id="selectedTeamSubtotal" style="border-bottom: 1px solid #303030"> \
			<td>Edit Team Subtotal</td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
		</tr> \
		<tr id="selectedTeamTotal" style="border-bottom: 1px solid #303030"> \
			<td>SELECTED TEAM TOTAL</td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
			<td style="text-align: center"></td> \
		</tr> \
	</thead> \
	<tbody id="tbodyTeamTotals"> \
	</tbody> \
</table> \
</table>';

	var debugElements = '\
<br /> \
<input type="checkbox" id="checkboxDebug" onclick="onClickDebug(this)">Debug</input>';

	document.getElementById('teamDialog').innerHTML
		= this.createCSS()
		+ selectTeam
		+ '<span  title="Dungeon buff for the dungeons that allow you to enlist friends"> Dungeon Buff: </span>'
		+ commonDialog.createSelectDungeonBonus('selectDungeonBonus', 'onChangeTeam')
		+ teamTable
		+ resultTables
		+ debugElements;
		
	if (window.jQuery && $.fn.tablesorter) {
		log.debug("Set tableTeamTotals to sortable");
		$("#tableTeamTotals").tablesorter(); 
	}

}

TeamDialog.prototype.selectTeamHeroes = function() {
	for (var heroSeqNr = 0; heroSeqNr < 6; ++heroSeqNr) {
		try {
			var hero = this.selectedTeam.heroes[heroSeqNr];
			//log.debug("selectTeamHero " + heroSeqNr + " name='" + hero.Name + "' level=" + hero.level + " APActive=" + hero.apSkillActive);
			
			document.getElementById('selectHero' + heroSeqNr).selectedIndex = hero.index;
			document.getElementById('selectLevel' + heroSeqNr).selectedIndex = hero.level;
			//commonDialog.updateSelectLevel('selectLevel' + heroSeqNr, hero['Max Lv'], hero.level);
			document.getElementById('checkboxAP' + heroSeqNr).checked = hero.apSkillActive;
			var leadershipActive = false;
			if (heroSeqNr == 0) {
				leadershipActive = this.selectedTeam.leaderActive;
			} else if (heroSeqNr == 5){
				leadershipActive = this.selectedTeam.helperActive;
			}
			document.getElementById('checkboxLeader' + heroSeqNr).checked = leadershipActive;
		} catch (e) {
			log.error("Couldn't retrieve Hero " + heroSeqNr);
		}
	} 
	this.update();
}

TeamDialog.prototype.load = function() {
	log.info("load TeamDialog from cookie");
	for (var teamNr = 0; teamNr < 1000; ++teamNr) {
		var teamName = getCookie('team' + teamNr + '_name', "");
		if (!teamName) {
			break;
		}
		log.debug("  load team '" + teamName + "'");
		var team = new Team(teamNr, teamName);
		team.load();
		this.teams[teamNr] = team;
	}
}

TeamDialog.prototype.save = function() {
	log.info("save TeamDialog to cookie");
	// Save team list
	for (var teamNr = 0; teamNr < this.teams.length; ++teamNr) {
		this.teams[teamNr].save();
	}
	var endOfListTeam = new Team(this.teams.length, '');
	endOfListTeam.save();
}

TeamDialog.prototype.initialize = function() {
	this.load();
	this.updateTeamList();
	this.selectTeamHeroes();
}

TeamDialog.prototype.showHero = function(heroSeqNr, hero) {
	var iconFile = (hero.Icon || "Placeholder.png");
	var elementFile = "Placeholder.png";
	if (hero.Element) {
		elementFile = hero.Element + '_Icon.png';
	}
	
	var leaderDescription = (hero['Leader Name'] || '');
	if (hero['Leader Effect']) {
		leaderDescription += ' - ' + hero['Leader Effect'];
	}
	document.getElementById('role'  + heroSeqNr).title = leaderDescription;
	
	if (hero.Name) {
		document.getElementById('tdImgHero' + heroSeqNr).innerHTML = 
			'<a href="' + hero.Name + '">\
				<img id="imgHero' + heroSeqNr + '" width="48px" src="' + imageManager.loadImage(iconFile, 'imgHero' + heroSeqNr) + '" alt="' + hero.Name + '">\
			</a>';
	} else {
		document.getElementById('tdImgHero' + heroSeqNr).innerHTML = '';
	}
	imageManager.updateImage('imgElement' + heroSeqNr, elementFile);
	
	//commonDialog.updateSelectLevel('selectLevel' + heroSeqNr, hero['Max Lv'], hero.level);
	
	document.getElementById('ATK'   + heroSeqNr).innerHTML = (hero.totalAtk.toLocaleString('en')  || "");
	document.getElementById('HP'    + heroSeqNr).innerHTML = (hero.totalHp.toLocaleString('en')   || "");
	document.getElementById('REC'   + heroSeqNr).innerHTML = (hero.totalRec.toLocaleString('en')  || "");
	document.getElementById('VALUE' + heroSeqNr).innerHTML = (formatCombatValue(hero.combatValue) || "");
	document.getElementById('checkboxLeader' + heroSeqNr).style.visibility = ((heroSeqNr == 0) || (heroSeqNr == 5) ? "visible" : "hidden");
	document.getElementById('checkboxLeader' + heroSeqNr).title = leaderDescription;

	var apSkill = '';
	if (hero['AP Name']) {
		apSkill = hero['AP Name'];
		if (hero['AP Effect']) {
			apSkill += ' - ' + hero['AP Effect'];
			apSkill += ' - Cost: ' + hero['AP Cost'];
		}
	}
	
	document.getElementById('checkboxAP' + heroSeqNr).title = apSkill;
}

TeamDialog.prototype.updateTotal = function(row, name, total) {
	for (var col = row.cells.length; --col >= 0;) {
		row.deleteCell(col);
	}
	var col = 0;
	row.insertCell(col++).innerHTML = name;
	row.insertCell(col++).innerHTML = total.atk.toLocaleString('en');
	row.insertCell(col++).innerHTML = total.hp.toLocaleString('en');
	row.insertCell(col++).innerHTML = total.rec.toLocaleString('en');
	row.insertCell(col++).innerHTML = total.Fire.toLocaleString('en');
	row.insertCell(col++).innerHTML = total.Water.toLocaleString('en');
	row.insertCell(col++).innerHTML = total.Wood.toLocaleString('en');
	row.insertCell(col++).innerHTML = total.Dark.toLocaleString('en');
	row.insertCell(col++).innerHTML = total.Light.toLocaleString('en');
	row.insertCell(col++).innerHTML = formatCombatValue(total.combatValue);
	for (var col = 1; col < row.cells.length; ++col) {
		row.cells[col].style.textAlign = "center";
	}
}

TeamDialog.prototype.update = function() {

	// Retrieve hero selections from dialog
	this.selectedTeam.activeAPSkills = [];
	for (var heroSeqNr = 0; heroSeqNr < 6; ++heroSeqNr) {
		var heroNr = document.getElementById('selectHero' + heroSeqNr).selectedIndex;
		var level = document.getElementById('selectLevel' + heroSeqNr).selectedIndex;
		var leadershipActive = document.getElementById('checkboxLeader' + heroSeqNr).checked;
		var activeAP = document.getElementById('checkboxAP' + heroSeqNr).checked;
		var hero  = database.heroes[heroNr];
		hero.setLevel(level);
		if (heroSeqNr == 0) {
			this.selectedTeam.leaderActive = leadershipActive;
		} else if (heroSeqNr == 5) {
			this.selectedTeam.helperActive = leadershipActive;
		}
		hero.apSkillActive = activeAP;
		if (activeAP && hero['AP Name']) {
			this.selectedTeam.activeAPSkills.push(database.apSkills[hero['AP Name']]);
		}
		this.selectedTeam.heroes[heroSeqNr] = hero;
	}
	
	// Sort active AP Skills
	this.selectedTeam.activeAPSkills.sort(function(a, b){
		if (a.name < b.name) return -1;
		if (a.name > b.name) return +1;
		return 0;
	});

	// Retrieve other settings from dialog
	var dungeonBonus = Number(document.getElementById('selectDungeonBonus').value);

	// Update team
	this.selectedTeam.update(dungeonBonus);
	
	// Show hero attributes
	for (var heroSeqNr = 0; heroSeqNr < 6; ++heroSeqNr) {
		this.showHero(heroSeqNr, this.selectedTeam.heroes[heroSeqNr]);
	}
	
	// Show leadership
	document.getElementById('activeLeaderSkill').innerHTML  = '<i>' + (this.selectedTeam.activeLeaderSkill ? this.selectedTeam.activeLeaderSkill.name : "") + '</i>';
	document.getElementById('activeLeaderEffect').innerHTML = (this.selectedTeam.activeLeaderSkill ? this.selectedTeam.activeLeaderSkill.effect : "");
	document.getElementById('activeLeaderProcessed').innerHTML = (this.selectedTeam.activeLeaderSkill ? this.selectedTeam.activeLeaderSkill.successfullyProcessed ? "Yes" : "No" : "")
	document.getElementById('activeHelperSkill').innerHTML  = '<i>' + (this.selectedTeam.activeHelperSkill ? this.selectedTeam.activeHelperSkill.name : "") + '</i>';
	document.getElementById('activeHelperEffect').innerHTML = (this.selectedTeam.activeHelperSkill ? this.selectedTeam.activeHelperSkill.effect : "");
	document.getElementById('activeHelperProcessed').innerHTML = (this.selectedTeam.activeHelperSkill ? this.selectedTeam.activeHelperSkill.successfullyProcessed ? "Yes" : "No" : "")

	// Show combos
	var possibleCombos = this.selectedTeam.findPossibleCombos();
	var allowedMissing = 6 - this.selectedTeam.getNrHeroes();
	commonDialog.updateCombos(document.getElementById('possibleCombos'), possibleCombos, 0, allowedMissing, true);

	// Show AP Skills
	var table = document.getElementById('activeSkills');
	// Clear table
	for (var rowNr = table.rows.length; --rowNr > 2;) {
		table.deleteRow(rowNr);
	}
	for (var i = 0; i < this.selectedTeam.activeAPSkills.length; ++i) {
		var apSkill = this.selectedTeam.activeAPSkills[i];
		var row = table.insertRow(-1);
		var col = 0;
		row.insertCell(col++).innerHTML = '<b>AP</b>';
		row.insertCell(col++).innerHTML = '<i>' + apSkill.name + '</i>';
		row.insertCell(col++).innerHTML = apSkill.effect;
		var cell = row.insertCell(col++);
		cell.style.textAlign = "center";
		cell.innerHTML = apSkill.cost;
		cell = row.insertCell(col++);
		cell.style.textAlign = "center";
		cell.innerHTML = (apSkill.successfullyProcessed ? "Yes" : "No");
	}
	
	// Show totals
	this.updateTotal(document.getElementById('selectedTeamSubtotal'), 'Edit Team Subtotal', this.selectedTeam.subtotal);
	this.updateTotal(document.getElementById('selectedTeamTotal'),    'Team TOTAL',         this.selectedTeam.total);
	
	// Show other teams
	var tbody = document.getElementById('tbodyTeamTotals');
	// Clear table
	for (var rowNr = tbody.rows.length - 1; rowNr >= 0; --rowNr) {
		tbody.deleteRow(rowNr);
	}
	var saveLogLevel = log.level;
	if (log.level > log.Level.INFO) {
		log.level = log.Level.INFO;
	}
	for (var teamNr = 1; teamNr < this.teams.length; ++teamNr) {
		var team = this.teams[teamNr];
		team.update(dungeonBonus);
		row = tbody.insertRow(-1);
		this.updateTotal(row, team.name, team.total);
	}
	log.level = saveLogLevel;

	// Save current state
	this.save();
}

TeamDialog.prototype.updateTeamList = function() {
	var html = '';
	for (var teamNr = 0; teamNr < this.teams.length; ++teamNr) {
		html += '<option id="' + teamNr + '"';
		if (this.teams[teamNr] == this.selectedTeam) {
			html += " selected";
		}
		html += '>' + this.teams[teamNr].name + '</option>\n';
	}
	
	document.getElementById('selectTeam').innerHTML = html;
}

TeamDialog.prototype.addTeam = function() {
	var teamName = document.getElementById('newTeamName').value;
	log.debug("addTeam '" + teamName + "'");
	teamName = teamName.replace(/;/g, "_");	// Can't store semi-colon (;) in cookies.
	if (teamName.match(/^\s*$/))
		return;
	
	// Add new team at the end
	var team = this.selectedTeam.clone();
	team.index = this.teams.length;
	team.name = teamName;
	this.teams.push(team);
	
	// Select team
	this.selectedTeam = this.teams[team.index];
	
	// Sort alphabetically
	this.teams.sort(function(a, b){
		if (a.name < b.name) return -1;
		if (a.name > b.name) return +1;
		return 0;
	});

	// Update dependent properties
	for (var teamNr = 0; teamNr < this.teams.length; ++teamNr) {
		this.teams[teamNr].index = teamNr;
	}
	
	// Show updated team list in html
	this.updateTeamList();
	
	// Save result
	this.save();
	
	// Clear input field to indicate it has been processed
	document.getElementById('newTeamName').value = "";
}

TeamDialog.prototype.changeSelectedTeam = function() {
	var teamNr = document.getElementById('selectTeam').selectedIndex;
	this.selectedTeam = this.teams[teamNr];
	this.selectTeamHeroes();
}

TeamDialog.prototype.deleteSelectedTeam = function() {
	// Delete internally
	var teamNr = document.getElementById('selectTeam').selectedIndex;
	if (teamNr == 0)
		return;
	this.teams.splice(teamNr, 1);
	
	// Update dependent properties
	for (var teamNr = 0; teamNr < this.teams.length; ++teamNr) {
		this.teams[teamNr].index = teamNr;
	}
	this.selectedTeam = this.teams[0];

	// Show updated team list in html
	this.updateTeamList();
	
	// Update dialog to reflect newly selected team
	this.selectTeamHeroes();
	
	// Save result
	this.save();
}

// TeamDialog events

function onAddTeam(widget) {
	log.debug("onAddTeam");
	dialog.addTeam();
}

function onChangeTeam(widget) {
	log.debug("onChangeTeam");
	dialog.update();
}

function onChangeSelectedTeam() {
	log.debug("onChangeSelectedTeam");
	dialog.changeSelectedTeam();
}

function onClickDebug(widget) {
	log.debug("onClickDebug");
	if (widget.checked) {
		log.level = log.Level.DEBUG;
	} else {
		log.level = log.Level.INFO;
	}
}

function onDeleteTeam(widget) {
	log.debug("onDeleteTeam");
	dialog.deleteSelectedTeam();
}

// Main

var log = new Logger();

log.info("baseURI=" + document.baseURI);
log.info("domain='" + document.domain + "'");
log.info("jQuery version=" + (window.jQuery ? $.fn.jquery : 'not included'));
log.info("jQuery tablesorter=" + (window.jQuery && $.fn.tablesorter ? 'included' : 'not included'));

var database = new Database();
database.load();
var imageManager = new ImageManager();
var commonDialog = new CommonDialog();
var dialog = null;
if (document.getElementById('teamDialog')) {
	dialog = new TeamDialog();
	dialog.create();
	dialog.initialize();
	
	// Testing
	if (!document.domain) {
		var noHero = database.heroes[0];
		
		var teamHeroes = [ 'Elven Saria ++', 'Ruby Templar ++', 'Mistress of the Freeze ++', 'Winged Healer +', 'Dragon\'s Prayer +', 'Sythe Dragonus +' ];
		var teamLevels = [ 85, 85, 80, 95, 106, 78 ];
		var team = new Team(dialog.teams.length, 'WOOD');
		for (var i = 0; i < 6; ++i) {
			team.heroes[i] = (database.heroesByHeroName[teamHeroes[i]] || noHero);
			team.heroes[i].setLevel(teamLevels[i]);
		}
		dialog.teams.push(team);
		
		teamHeroes = [ 'Mistress of the Freeze ++', 'Poseidon\'s Essence +', 'Enki +', 'Orcish Swindler', 'Dragon\'s Prayer +' ];
		teamLevels = [ 80, 50, 61, 45, 106 ];
		team = new Team(dialog.teams.length, 'WATER');
		for (var i = 0; i < 6; ++i) {
			team.heroes[i] = (database.heroesByHeroName[teamHeroes[i]] || noHero);
			team.heroes[i].setLevel(teamLevels[i]);
		}
		dialog.teams.push(team);
		
		teamHeroes = [ 'Ruby Templar ++', 'Elven Saria ++', 'Mistress of the Freeze ++', 'Mage of the Flames +', 'Dragon\'s Prayer +' ];
		teamLevels = [ 85, 85, 80, 72, 106 ];
		team = new Team(dialog.teams.length, 'FIRE');
		for (var i = 0; i < 6; ++i) {
			team.heroes[i] = (database.heroesByHeroName[teamHeroes[i]] || noHero);
			team.heroes[i].setLevel(teamLevels[i]);
		}
		dialog.teams.push(team);
		
		teamHeroes = [ 'Dragon\'s Prayer +', 'Gaia the Conjurer', 'Champion of Darkness', 'Winged Healer +', 'Ruby Templar ++',  ];
		teamLevels = [ 106, 26, 15, 95, 85 ];
		team = new Team(dialog.teams.length, 'DARK');
		for (var i = 0; i < 6; ++i) {
			team.heroes[i] = (database.heroesByHeroName[teamHeroes[i]] || noHero);
			team.heroes[i].setLevel(teamLevels[i]);
		}
		dialog.teams.push(team);
		
		dialog.updateTeamList();
	}
	
} else if (document.getElementById('inputCharacterViewer')) {
	dialog = new CharacterDialog()
	dialog.createInputDialog();
	dialog.createOutputDialog();

	document.getElementById('selectHero').selectedIndex = 258;
	document.getElementById('selectLevel').selectedIndex = 1;
	onChangeCharacter();
} else if (document.getElementById('TEAM_COMBO')){
	log.info("Character page where we will replace the Team Combo section");
	var title = document.location.href.split('/').slice(-1)[0];
	title = title.split(/[\.#?]/)[0];
	title = title.replace(/_/g, ' ');
	title = title.replace(/%2B/g, '+');
	log.info("title=" + title);
	
	var teamComboHeader = document.getElementById('TEAM_COMBO').parentNode;
	var divContent = teamComboHeader.parentNode;
	var comboTables = $("table tr th:contains('Combo Name')").closest('table');
	var hero = database.heroesByHeroName[title];
	if ((comboTables.length >= 1) && divContent && hero) {
		var team = new Team(-1, title);
		team.heroes[0] = hero;

		// Create new table element
		var html = new TeamDialog().createTeamViewerCSS() + commonDialog.createComboTable('possibleCombos', false);
		var container = document.createElement('div');
		container.innerHTML = html;
		
		// Insert new table element before first old table element (including CSS node)
		var firstOldTable = comboTables[0];
		divContent.insertBefore(container.childNodes[1], firstOldTable); 			// CSS
		divContent.insertBefore(container.childNodes[0], container.childNodes[1]);	// table

		// Remove (or rather empty) old table(s)
		comboTables.empty();

		// Fill new table element with the possible combos
		var possibleCombos = team.findPossibleCombos();
		log.info("possibleCombos.length=" + possibleCombos.length);
		var allowedMissing = 5;
		commonDialog.updateCombos(document.getElementById('possibleCombos'), possibleCombos, 0, allowedMissing, false);
	}	
	log.info("Done");
} else {
	log.info("Don't know what to do");
}
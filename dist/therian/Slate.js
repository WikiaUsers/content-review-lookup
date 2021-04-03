/* <pre> */
/* top five - begin */
2function select_topfive()
3{
4 YAHOO.util.Dom.replaceClass(['most_popular','most_visited','newly_changed','highest_ratings','community'], 'boxLinkSmall', 'boxLinkSmall_notSelected');
5 YAHOO.util.Dom.replaceClass(this.id, 'boxLinkSmall_notSelected', 'boxLinkSmall');
6 YAHOO.util.Dom.setStyle(['most_popular_links','most_visited_links','newly_changed_links','highest_ratings_links','community_links'], );
7 YAHOO.util.Dom.setStyle(this.id+'_links', 'display', 'block');
8 YAHOO.util.Cookie.set({'name': 'topfive', 'value': this.id});
9}
10YAHOO.util.Event.addListener(['most_popular','most_visited','newly_changed','highest_ratings','community'], 'click', select_topfive);
11/* top five - end */
12
13/* bookmarking sites - begin */
14function delicious_click(e)
15{
16 //window.open('http://del.icio.us/post?v=4&noui&jump=close&url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title), 'delicious', 'toolbar=no,width=700,height=400');
17 location.href='http://del.icio.us/post?v=4&noui&jump=close&url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);
18 YAHOO.util.Event.preventDefault(e);
19}
20YAHOO.util.Event.addListener(['del_image','del_link'], 'click', delicious_click);
21
22function digg_click(e)
23{
24 //window.open('http://digg.com/submit?phase=2&url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title));
25 location.href='http://digg.com/submit?phase=2&url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);
26 YAHOO.util.Event.preventDefault(e);
27}
28YAHOO.util.Event.addListener(['digg_image','del_link'], 'click', digg_click);
29
30function stumble_click(e)
31{
32 //window.open('http://www.stumbleupon.com/submit?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title));
33 location.href='http://www.stumbleupon.com/submit?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);
34 YAHOO.util.Event.preventDefault(e);
35}
36YAHOO.util.Event.addListener(['stumble_image','stumble_link'], 'click', stumble_click);
37/* bookmarking sites - end */
38
39/* message bar close handler - begin */
40function messageBar_close_callback()
41{
42 YAHOO.util.Dom.setStyle('messageBar', 'display', 'none');
43 YAHOO.util.Cookie.set({'name': 'mb', 'value': '0'});
44}
45YAHOO.util.Event.addListener('messageBar_close', 'click', messageBar_close_callback);
46/* message bar close handler - end */
47
48/* expert tools - show and hide handler - begin */
49function expertTools_showhide_callback() {
50 if ( this.id == 'expertTools_show' ) {
51 YAHOO.util.Dom.replaceClass('expertTools_header', 'boxHeader_noBorderMargin', 'boxHeader');
52 YAHOO.util.Cookie.set({'name': 'et', 'value': '1'});
53 YAHOO.util.Dom.setStyle('expertTools_hideable', 'display', 'block');
54 YAHOO.util.Dom.setStyle('expertTools_show', 'display', 'none');
55 YAHOO.util.Dom.setStyle('expertTools_hide', 'display', '');
56 } else {
57 YAHOO.util.Dom.replaceClass('expertTools_header', 'boxHeader', 'boxHeader_noBorderMargin');
58 YAHOO.util.Cookie.set({'name': 'et', 'value': '0'});
59 YAHOO.util.Dom.setStyle('expertTools_hideable', 'display', 'none');
60 YAHOO.util.Dom.setStyle('expertTools_show', 'display', '');
61 YAHOO.util.Dom.setStyle('expertTools_hide', 'display', 'none');
62 }
63}
64YAHOO.util.Event.addListener(['expertTools_show','expertTools_hide'], 'click', expertTools_showhide_callback);
65/* expert tools - show and hide handler - end */
66
67/* tracker - begin */
68function attach_tracker_vs()
69{
70 // search button, expert tools show & hide
71 YAHOO.util.Event.addListener(['searchButton','expertTools_show','expertTools_hide'], 'click', track_by_id_callback);
72
73 // links in expert tools box
74 et_div = YAHOO.util.Dom.get('expertTools_hideable');
75 if ( et_div )
76 {
77 YAHOO.util.Event.addListener(et_div.getElementsByTagName('a'), 'click', track_by_id_callback);
78 }
79
80 // links in this article box
81 ta_div = YAHOO.util.Dom.get('thisArticle');
82 if ( ta_div )
83 {
84 YAHOO.util.Event.addListener(ta_div.getElementsByTagName('a'), 'click', track_by_id_callback);
85 }
86
87 // links in another boxes
88 sidebar_divs = YAHOO.util.Dom.getElementsByClassName('sidebar');
89 if ( sidebar_divs )
90 {
91 for ( i = 0; i < sidebar_divs.length; i++ )
92 {
93 if (sidebar_divs[i].getElementsByTagName('a').length)
94 {
95 YAHOO.util.Event.addListener(sidebar_divs[i].getElementsByTagName('a'), 'click', track_by_id_callback);
96 }
97 }
98 }
99
100 // links in wikia box
101 YAHOO.util.Event.addListener(['wikia_joinnow','wikia_home','wikia_forum','wikia_randompage','wikia_help'], 'click', track_by_id_callback);
102
103 // links in single list
104 singleList_div = YAHOO.util.Dom.get('singleList');
105 if ( singleList_div )
106 {
107 if (singleList_div.getElementsByTagName('a').length)
108 {
109 YAHOO.util.Event.addListener(singleList_div.getElementsByTagName('a'), 'click', track_by_param_callback, "singleListItem");
110 }
111 }
112
113 // links in multi list
114 multiListBoxes = YAHOO.util.Dom.getElementsByClassName('r_boxContent', 'div', YAHOO.util.Dom.getElementsByClassName('roundedDiv_half')[0]);
115 for ( i = 0; i < multiListBoxes.length; i++ )
116 {
117 if (multiListBoxes[i].getElementsByTagName('a').length)
118 {
119 YAHOO.util.Event.addListener(multiListBoxes[i].getElementsByTagName('a'), 'click', track_by_param_callback, multiListBoxes[i].id + "_item");
120 }
121 }
122
123 // links in my stuff
124 mystuff_div = YAHOO.util.Dom.get('myStuffBar');
125 if ( mystuff_div )
126 {
127 if (mystuff_div.getElementsByTagName('a').length)
128 {
129 YAHOO.util.Event.addListener(mystuff_div.getElementsByTagName('a'), 'click', track_by_id_callback);
130 }
131 }
132}
133YAHOO.util.Event.onDOMReady(attach_tracker_vs);
134/* tracker - end */
135
136
137
138
139
140
141
142
143function flagForReview_show_callback() {
144 YAHOO.util.Dom.setStyle('flagReviewDropDown', 'display', 'block');
145}
146YAHOO.util.Event.addListener('flagForReview_show', 'click', flagForReview_show_callback);
147
148function flagForReview_hide_callback() {
149 YAHOO.util.Dom.setStyle('flagReviewDropDown', 'display', 'none');
150}
151YAHOO.util.Event.addListener('flagForReview_hide', 'click', flagForReview_hide_callback);
152
153function flagForReview_ok_callback() {
154 reasonId = YAHOO.util.Dom.get('flagForReview_reason').value;
155 if(reasonId != "0") {
156 YAHOO.util.Connect.asyncRequest('GET', '/?action=ajax&rs=wfSignForReview&rev_id=' + wgCurRevisionId + '&reason=' + reasonId, null);
157 flagForReview_hide_callback();
158 }
159}
160YAHOO.util.Event.addListener('flagForReview_ok', 'click', flagForReview_ok_callback);
161
162
163
164function setArticleRating() {
165 var setArticleRating_ajax_callback =
166 {
167 success: function(o)
168 {
169 o = eval("("+o.responseText+")");
170 if ( o.query.wkvoteart.length == 0 ) {
171 currentRating = 0;
172 } else {
173 currentRating = o.query.wkvoteart[wgArticleId].votesavg;
174 }
175 currentRatingPx = Math.round(currentRating * 15);
176 YAHOO.util.Dom.setStyle('current-rating', 'width', currentRatingPx+'px');
177 }
178 }
179 YAHOO.util.Connect.asyncRequest('GET', '/api.php?action=query&list=wkvoteart&format=json&wkpage='+wgArticleId, setArticleRating_ajax_callback);
180}
181function rateArticle_callback() {
182 var rateArticle_ajax_callback =
183 {
184 success: function(o)
185 {
186 setArticleRating();
187 YAHOO.util.Dom.setStyle(['star1','star2','star3','star4','star5'], 'display', 'none');
188 YAHOO.util.Dom.setStyle('unrateLink', 'display', '');
189 }
190 }
191 wgUserName
192 var rating = this.id.substr(-1,1);
193 YAHOO.util.Connect.asyncRequest('GET', '/api.php?action=insert&list=wkvoteart&format=json&wkvote='+rating+'&wkpage='+wgArticleId, rateArticle_ajax_callback);
194}
195YAHOO.util.Event.addListener(['star1','star2','star3','star4','star5'], 'click', rateArticle_callback);
196
197function unrateArticle_callback() {
198 var unrateArticle_ajax_callback =
199 {
200 success: function(o)
201 {
202 setArticleRating();
203 YAHOO.util.Dom.setStyle(['star1','star2','star3','star4','star5'], 'display', '');
204 YAHOO.util.Dom.setStyle('unrateLink', 'display', 'none');
205 }
206 }
207 YAHOO.util.Connect.asyncRequest('GET', '/api.php?action=delete&list=wkvoteart&format=json&wkpage='+wgArticleId, unrateArticle_ajax_callback);
208}
209YAHOO.util.Event.addListener('unrateLink', 'click', unrateArticle_callback);
210
211function fixTopBar() {
212 x = YAHOO.util.Dom.getX('expertTools');
213
214
215 if(YAHOO.util.Cookie.get('width') == x) {
216 return;
217 }
218 if ( x < 740 ) {
219 YAHOO.util.Dom.setStyle('multiList', 'display', 'none');
220 } else {
221 YAHOO.util.Dom.setStyle('multiList', 'display', '');
222 }
223 if ( x < 570 || x >= 740 ) {
224 YAHOO.util.Dom.setStyle('singleList', 'display', 'none');
225 } else {
226 YAHOO.util.Dom.setStyle('singleList', 'display', '');
227 }
228 if ( x < 390 ) {
229 YAHOO.util.Dom.setStyle('thisWiki', 'display', 'none');
230 } else {
231 YAHOO.util.Dom.setStyle('thisWiki', 'display', '');
232 }
233 YAHOO.util.Cookie.set({'name': 'width', 'value': x});
234}
235YAHOO.util.Event.addListener(window, "resize", fixTopBar);
236
237function fixAjaxSend()
238{
239 if( document.getElementById('notifyForm') ) {
240 document.getElementById('container').appendChild( document.getElementById('notifyForm') );
241 }
242}
243
244function addLoginForRating()
245{
246 if ( wgUserName == null ) {
247 if ( typeof Login != 'undefined' ) {
248 YAHOO.util.Event.addListener('star-rating', 'click', Login);
249 } else {
250 YAHOO.util.Event.addListener('star-rating', 'click', function() { location.href = document.getElementById('login').href });
251 }
252 }
253}
254
255
256
257
258// macbre: toogle widgets adding toolbox (under myStuff bar)
259//
260function widget_add_toolbox_show()
261{
262 toolbox = new YAHOO.widget.Module("widget_add_toolbox");
263 toolbox.show();
264}
265
266function widget_add_toolbox_hide()
267{
268 toolbox = new YAHOO.widget.Module("widget_add_toolbox");
269 toolbox.hide();
270}
271
272
273
274
275
276// widgets drag&drop initialization
277(function() {
278
279var Dom = YAHOO.util.Dom;
280var Event = YAHOO.util.Event;
281var DDM = YAHOO.util.DragDropMgr;
282
283YAHOO.example.DDApp = {
284 init: function() {
285 new YAHOO.util.DDTarget("ul_widgets");
286 var items = YAHOO.util.Dom.getElementsByClassName("list", "li"); //, "ul_widgets");
287 for(var i = 0; i < items.length; i++) {
288 item_id = items[i].id;
289 handle_id = item_id.replace(/_wg/g, '_header');
290
291 new YAHOO.example.DDList(item_id, handle_id);
292 }
293 }
294};
295YAHOO.example.DDList = function(item_id, handle_id) {
296
297 YAHOO.example.DDList.superclass.constructor.call(this, item_id);
298 this.setHandleElId(handle_id);
299
300
301 this.logger = this.logger || YAHOO;
302 var el = this.getDragEl();
303 Dom.setStyle(el, "opacity", 0.67); // The proxy is slightly transparent
304
305 this.goingUp = false;
306 this.lastY = 0;
307};
308
309YAHOO.extend(YAHOO.example.DDList, YAHOO.util.DDProxy, {
310
311 startDrag: function(x, y) {
312 // make the proxy look like the source element
313 var dragEl = this.getDragEl();
314 var clickEl = this.getEl();
315 Dom.setStyle(clickEl, "visibility", "hidden");
316 Dom.setStyle(dragEl, "border", "0px");
317 dragEl.innerHTML = clickEl.innerHTML;
318 },
319
320 endDrag: function(e) {
321
322 var srcEl = this.getEl();
323 var proxy = this.getDragEl();
324
325 // Show the proxy element and animate it to the src element's location
326 Dom.setStyle(proxy, "visibility", "");
327 var a = new YAHOO.util.Motion(
328 proxy, {
329 points: {
330 to: Dom.getXY(srcEl)
331 }
332 },
333 0.2,
334 YAHOO.util.Easing.easeOut
335 )
336 var proxyid = proxy.id;
337 var thisid = this.id;
338
339 a.onComplete.subscribe(function() {
340 Dom.setStyle(proxyid, "visibility", "hidden");
341 Dom.setStyle(thisid, "visibility", "");
342 });
343 a.animate();
344
345 var items = YAHOO.util.Dom.getElementsByClassName("list", "li", "widgets_2");
346 var out = '';
347 for(var i = 0; i < items.length; i++) {
348 name = items[i].id.replace(/_wg/g, '');
349 out += name + "|";
350 }
351 out = out.substring(0, out.length - 1);
352
353 YAHOO.util.Connect.asyncRequest('GET', '/?action=ajax&rs=wfDragAndDropReorder&order=' + out, null);
354 },
355
356 onDragDrop: function(e, id) {
357
358 if (DDM.interactionInfo.drop.length === 1) {
359 var pt = DDM.interactionInfo.point;
360 var region = DDM.interactionInfo.sourceRegion;
361 if (!region.intersect(pt)) {
362 var destEl = Dom.get(id);
363 var destDD = DDM.getDDById(id);
364 destEl.appendChild(this.getEl());
365 destDD.isEmpty = false;
366 DDM.refreshCache();
367 }
368
369 }
370 },
371
372 onDrag: function(e) {
373 var y = Event.getPageY(e);
374
375 if (y < this.lastY) {
376 this.goingUp = true;
377 } else if (y > this.lastY) {
378 this.goingUp = false;
379 }
380
381 this.lastY = y;
382 },
383
384 onDragOver: function(e, id) {
385
386 var srcEl = this.getEl();
387 var destEl = Dom.get(id);
388 if (destEl.nodeName.toLowerCase() == "li") {
389 var orig_p = srcEl.parentNode;
390 var p = destEl.parentNode;
391
392 if (this.goingUp) {
393 p.insertBefore(srcEl, destEl);
394 } else {
395 p.insertBefore(srcEl, destEl.nextSibling);
396 }
397
398 DDM.refreshCache();
399 }
400 }
401});
402
403Event.onDOMReady(YAHOO.example.DDApp.init, YAHOO.example.DDApp, true);
404
405})();
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426YAHOO.util.Event.onDOMReady(fixAjaxSend);
427YAHOO.util.Event.onDOMReady(fixTopBar);
428YAHOO.util.Event.onDOMReady(addLoginForRating);
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443function ShowDialogInfo(header, body, txtOK, handleOK)
444{
445 Dialog = new YAHOO.widget.SimpleDialog("wikiaDialog",
446 {
447 width: "250px",
448 effect: {effect: YAHOO.widget.ContainerEffect.FADE, duration: 0.25},
449 fixedcenter: true,
450 modal: true,
451 draggable: true,
452 close: false
453 });
454
455 var buttons = [ { text: txtOK, handler: handleOK, isDefault: true} ];
456
457
458 Dialog.setHeader(header);
459 Dialog.setBody(body);
460 Dialog.cfg.setProperty('icon', YAHOO.widget.SimpleDialog.ICON_INFO);
461 Dialog.cfg.queueProperty("buttons", buttons);
462
463 Dialog.render(document.getElementById('container'));
464 Dialog.show();
465}
466
467
468
469
470function ShowDialogAsk(header, body, txtOK, handleOK, txtNO, handleNO)
471{
472 Dialog = new YAHOO.widget.SimpleDialog("wikiaDialog",
473 {
474 width: "250px",
475 effect: {effect: YAHOO.widget.ContainerEffect.FADE, duration: 0.25},
476 fixedcenter: true,
477 modal: true,
478 draggable: true,
479 close: false
480 });
481
482 var buttons = [ { text: txtOK, handler: handleOK}, { text: txtNO, handler: handleNO} ];
483
484
485 Dialog.setHeader(header);
486 Dialog.setBody(body);
487 Dialog.cfg.setProperty('icon', YAHOO.widget.SimpleDialog.ICON_WARN);
488 Dialog.cfg.queueProperty("buttons", buttons);
489
490 Dialog.render(document.getElementById('container'));
491 Dialog.show();
492}
493
494function CreateDialogProgress(header, body)
495{
496 Dialog = new YAHOO.widget.SimpleDialog("wikiaProgressDialog",
497 {
498 width: "325px",
499 fixedcenter: true,
500 modal: true,
501 draggable: false,
502 close: false,
503 visible: false
504 });
505
506 Dialog.setHeader(header);
507 Dialog.setBody(body);
508
509 Dialog.render(document.getElementById('container'));
510 //Dialog.show(); // show it yourself
511
512 return Dialog;
513}
514
515// ShowDialogInfo('Test Dialog',' foo bar', 'OK', function(){alert('OK is ok'); this.hide();}); // info dialog (OK)
516// ShowDialogAsk('Test Dialog',' foo bar?', 'Yes', function(){alert('OK is ok'); this.hide();}, 'No', function(){alert('OK is not ok'); this.hide();}); // ask dialog (OK/NO)
517// progress = CreateDialogProgress('Test Dialog', 'Doing something in background, please wait...'); progress.hide();
518
/* </pre> */
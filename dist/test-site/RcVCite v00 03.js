//http://rcvcite.net/
//
//The MIT License (MIT)
//
//Copyright (c) 2013-2014 RcVCite
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in
//all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//THE SOFTWARE.

if(typeof RcVCite === 'undefined'){
    RcVCite = new (function(){
        var parent = this;
        /** variables used to define plugin settings */
        this.citeChapters=false;
        this.hoverDelay=400;
        this.horzPad=5;
        this.looseContext=true;
        this.listInvalid=true;
        this.extraClass='';
        this.ignoreFilter=function(HTML_DOM_element){
            return true;
        };
        this._cache={};
        this._version="201507301933";
        
        /** function which searches the contents of an html dom node, jquery object,
         * or the document for verse references and wraps them with spans 
         * @param {DOMElement or undefined} node DOMElement to apply citations to*/
        this.cite = function(node){
            //test for jQuery
            if(typeof jQuery === 'undefined'){
                console.log('RcVCite: jQuery was not found!');
                return null;
            }
            if(typeof node==='undefined')node=document;
            jQuery(document).ready(function($){
                if(typeof node==='string'){
                    node=$(node)[0];
                    if(!node) node=document.getElementById(node);
                }
                if(typeof parent.ignoreFilter !== 'function'){
                    parent.ignoreFilter=function(node){return true;};
                }
                var start = (new Date()).getTime();
                var prefix='chapters?\\s*|chap\\.\\s+|ch\\.\\s+|verses?\\s*|vv?\\.\\s+';
                var excludePattern='([0-9]{1,2}:[0-9]{2}\\s*(-|through)\\s*)?[0-9]{1,2}:[0-9]{2}\\s*[ap][m](?![a-z])|[0-9]{1,2}(:[0-9]{1,2}){2,}|[a-uw-z]v\\.';
                var singleVersePattern = '('+prefix+')?([1-9][0-9]*:)?([1-9][0-9]*[a-z]?((-|\\s*through\\s*)[1-9][0-9]*)?[a-z]?)';
                var versePattern = '('+prefix+')?([1-9][0-9]*:)?(([1-9][0-9]*[a-z]?((-|\\s*through\\s*)[1-9][0-9]*)?[a-z]?)(\\,?\\s*(and\\s*)?([1-9][0-9]*[a-z]?((-|\\s*through\\s*)[1-9][0-9]*)?[a-z]?))*)(?![0-9]*:[0-9])';
                var firstVersePattern = '^\\s*('+prefix+')?([1-9][0-9]*:)?(([1-9][0-9]*[a-z]?((-|\\s*through\\s*)[1-9][0-9]*)?[a-z]?)(\\,?\\s*(and\\s*)?([1-9][0-9]*[a-z]?((-|\\s*through\\s*)[1-9][0-9]*)?[a-z]?))*(?![0-9]*:[0-9]))';
                var excludeRegex = new RegExp(excludePattern,"im");
                var singleVerseRegex = new RegExp(singleVersePattern,"im");
                singleVerseRegex = new RegExp(singleVersePattern,"im");
                var verseRegex = new RegExp(versePattern,"im");
                var firstVerseRegex = new RegExp(firstVersePattern,"im");
                //define a callback to process the contents of a text node
                
                //find refs and wrap them with a tag
                var lastBook, lastChapter;
                var bookRegex = getBookRegex('m');
                function process_text_node(node){
                    var node_ = $(node);
                    var nodeValue = node.nodeValue, processedContent='';
                    var bookMatch = nodeValue.match(bookRegex), excludeMatch, book=undefined, nextBook=lastBook, verseMatch;
                    var isFirst; //flag to check if this is a verse immediately following a book
                    var index=0, lastIndex=0, remainderStr;
                    var numTagged=0;
                    function verseParse(verseStr){
                        if(lastBook){
                            var vrsIndex;
                            verseMatch=verseStr.match(singleVerseRegex);
                            var vfirst=true; //flag to check if this is the begining of the verse string
                            var chapRef=false; //flag to check if verse should be reset because
                            while(verseMatch){
                                vrsIndex=verseMatch[0].length+verseMatch.index;
                                var chapter, verse;
                                if(!(chapter=parseInt(verseMatch[2]))){ //no ([1-9][0-9]*):
                                    if(lastBook[1]==='Oba.'||lastBook[1]==='Philem.'||lastBook[1]==='2 John'||lastBook[1]==='3 John'||lastBook[1]==='Jude')
                                        chapter=1;
                                    else if(chapRef||isFirst&&(parseInt(verseMatch[3]))){
                                        lastChapter=parseInt(verseMatch[3]);
                                        if(parent.citeChapters)
                                            chapter=lastChapter;
                                        chapRef=true;
                                    }else
                                        chapter=lastChapter;
                                }
                                verse=chapRef?1:(verseMatch[3]+"").replace(/\s*through\s*/gi,'-').replace(/[a-z]|\s/gi,'');//parseInt(verseMatch[2]);
                                if(typeof verseMatch[1]!=='undefined'){
                                    switch(verseMatch[1][0]){ //prefixes like chapter or verse
                                        case 'c':
                                        case 'C':
                                            if(!chapRef){
                                                if(parent.citeChapters)
                                                    chapter=verse;
                                                else{
                                                    lastChapter=verse;
                                                    chapter=null;
                                                }
                                            }
                                            chapRef=true;
                                            verse=1;
                                            break;
//                                        case 'v':
//                                        case 'V':
//                                            break;
                                    }
                                } else if(!isFirst && vfirst && typeof verseMatch[2]==='undefined'){ //stray number
                                    chapter=null;
                                }
                                //console.log(chapter,verse,verseMatch);
                                var max_verse, sec_verse=parseInt((verse+'').replace(/[1-9][0-9]*-/,''));
                                if(sec_verse>verse+30){
                                    sec_verse=parseInt(verse)+30;
                                    verse=parseInt(verse)+'-'+sec_verse;
                                }
                                if(chapter&&(max_verse=lastBook[2].verses[chapter-1])&&max_verse>=parseInt(verse)&&max_verse>=sec_verse){ //valdiation
                                    lastChapter=chapter;
                                    vfirst=false;
                                    if(isFirst){
                                        node_.before(document.createTextNode(processedContent+lastBook[3][1]));
                                        processedContent='';
                                        
                                        var wrapper = document.createElement('span');
                                        wrapper.className='rcvc_verse_ref inactive';
                                        wrapper.setAttribute('book',lastBook[1]);
                                        wrapper.setAttribute('chapter',lastChapter);
                                        wrapper.setAttribute('verse',verse);
                                        wrapper.appendChild(document.createTextNode(lastBook[3][2]+verseStr.substring(0,verseMatch.index)+verseMatch[0]));
                                        node_.before(wrapper);
                                        isFirst=0;
                                        numTagged++;
                                    }else{
                                        node_.before(document.createTextNode(processedContent+verseStr.substring(0,verseMatch.index)));
                                        processedContent='';
                                        
                                        var wrapper = document.createElement('span');
                                        wrapper.className='rcvc_verse_ref inactive';
                                        wrapper.setAttribute('book',lastBook[1]);
                                        wrapper.setAttribute('chapter',lastChapter);
                                        wrapper.setAttribute('verse',verse);
                                        wrapper.appendChild(document.createTextNode(verseMatch[0]));
                                        node_.before(wrapper);
                                        numTagged++;
                                    }
                                } else {
                                    if(parent.listInvalid&&chapter){
                                        if(max_verse){
                                            if(max_verse>=parseInt(verse)){
                                                console.log('RcVCite: '+lastBook[1]+' '+chapter+':'+sec_verse+' is invalid. The last verse is '+chapter+':'+max_verse);
                                            } else {
                                                console.log('RcVCite: '+lastBook[1]+' '+chapter+':'+verse+' is invalid. The last verse is '+chapter+':'+max_verse);
                                            }
                                        } else {
                                            console.log('RcVCite: '+lastBook[1]+' '+chapter+' is not a valid chapter.');
                                        }
                                    }
                                    if(isFirst){
                                        processedContent+=lastBook[3][0]+verseStr.substring(0,verseMatch.index)+verseMatch[0];
                                        isFirst=0;
                                    }else{
                                        processedContent+=verseStr.substring(0,verseMatch.index)+verseMatch[0];
                                    }                                
                                }
                                verseStr=verseStr.substr(vrsIndex);
                                verseMatch=verseStr.match(singleVerseRegex);
                            }
                        }
                        processedContent+=verseStr;
                    }
                    function verseSearch(verseStr){
                        var vrsIndex;
                        if(typeof book==='undefined'){
                            isFirst=false;
                            verseMatch=verseStr.match(verseRegex);
                        }else if(isFirst===true&&book[1]&&nextBook&&(verseMatch=verseStr.match(firstVerseRegex))){
                            lastBook=nextBook;
                            lastChapter=1;
                            isFirst=true;
                        }else{
                            if(parent.looseContext===true && nextBook && (!lastBook || lastBook[1]!==nextBook[1])){
                                lastBook=nextBook;
                                lastChapter=1;
                            }
                            if(isFirst===true&&nextBook)processedContent+=nextBook[3][0];
                            verseMatch=verseStr.match(verseRegex);
                            isFirst=false;
                        }
                        while(verseMatch){
                            vrsIndex=verseMatch[0].length+verseMatch.index;
                            if(!isFirst){
                                processedContent+=verseStr.substring(0,verseMatch.index);
                            }
                            verseParse(verseMatch[0]);
                            lastIndex+=vrsIndex;
                            verseStr=verseStr.substr(vrsIndex);
                            verseMatch=verseStr.match(verseRegex);
                        }
                    }
                    function exclusionSearch(searchStr){
                        isFirst=true;
                        excludeMatch=searchStr.match(excludeRegex);
                        var locIndex=lastIndex, vrsStr, diff;
                        while(excludeMatch){
                            verseSearch(vrsStr=searchStr.substring(0,excludeMatch.index));
                            rem=vrsStr.length-lastIndex+locIndex;
                            if(locIndex===lastIndex){
                                processedContent+=vrsStr;
                                lastIndex+=excludeMatch.index;
                            } else if(rem>0) {
                                lastIndex+=rem;
                                processedContent+=vrsStr.slice(-rem);
                            }
                            lastIndex+=excludeMatch[0].length;
                            processedContent+=excludeMatch[0];
                            locIndex=lastIndex;
                            searchStr=searchStr.substring(excludeMatch.index+excludeMatch[0].length);
                            excludeMatch=searchStr.match(excludeRegex);
                        }
                        verseSearch(searchStr);
                    }
                    while(bookMatch){ //this uses a pipelined approach, book matches are found and tested, then the previous match is processed.
                        nextBook=book;
                        book=getBook(bookMatch[2],true);
                        book[2]=book[0][book[1]]; //book now looks like [OT/NT shortCode Object]
                        book[3]=bookMatch; //book now looks like [OT/NT shortCode Object bookMatch[2]]
                        processedContent+=nodeValue.substring(lastIndex,index-(nextBook?nextBook[3][0].length:0));
                        lastIndex=index;
                        index+=bookMatch[0].length+bookMatch.index;
                        exclusionSearch(nodeValue.substring(lastIndex,index-bookMatch[0].length));
                        remainderStr=nodeValue.substr(index);
                        //console.log(bookMatch[0],book,index);
                        bookMatch = remainderStr.match(bookRegex);
                    }
                    nextBook=book;
                    processedContent+=nodeValue.substring(lastIndex,index-(nextBook?nextBook[3][0].length:0));
                    lastIndex=index;
                    exclusionSearch(nodeValue.substr(lastIndex));
                    processedContent+=nodeValue.substr(lastIndex);
                    //console.log(nodeValue,'proc:',processedContent);
                    if(numTagged>0){
                        node_.before(document.createTextNode(processedContent));
                        node.parentNode.removeChild(node);
                    }
                }
                
                //inorder traversesal of HTML DOM tree
                function walk_node_tree(node){
                    if(node.nodeType===3){
                        if(!node.nodeName.match(/^iframe|script|style|font$/))
                            process_text_node(node);
                    } else {
                        for(var child_no=0; child_no<node.childNodes.length; child_no++)
                            if(parent.ignoreFilter(node)&&(!node.className||(node.className+'').indexOf('rcvc_verse_ref')===-1)&&(!node.nodeName.match(/^iframe|script|style|font$/i)))
                                walk_node_tree(node.childNodes[child_no]);
                    }
                }
                if(node && typeof node.nodeType !== "undefined"){
                    if(typeof node.each === 'function')
                        node.each(function(){walk_node_tree(this);});
                    else
                        walk_node_tree(node);
                }else
                    throw('RcVCite: Error an HTML DOM Element is expected.');
                
                //process tags
                $('.rcvc_verse_ref.inactive').removeClass('inactive').each(function(){
                    var this_ = $(this);
                    var timer = null;
                    var overlay = null;
                    var content = "";
                    var isSet = false;
                    var e_x=0;
                    
                    var fillOverlay = function(){
                        var book = this_.attr('book');
                        var chapter = this_.attr('chapter');
                        var verse = this_.attr('verse');
                        var book_obj = NT[book]?NT[book]:OT[book];
                        var url = book_obj['index']+'_'+(book_obj['name'].replace(/([1-3]) /g,'$1'))+chapter+'.htm#'+chapter+':'+parseInt(verse);
                        if(overlay) return;
                        
                        var o_div = document.createElement('div');
                        o_div.className='rcvc_verse_overlay '+parent.extraClass;
                        o_div.setAttribute('style','position:absolute');
                        if(content!=="")
                            o_div.appendChild(document.createTextNode(content));
                        
                        var o_links_div = document.createElement('div');
                        o_links_div.className='rcvc_verse_overlay_links';
                                                
                        var o_links_a = document.createElement('a');
                        o_links_a.setAttribute('href','http://online.recoveryversion.org/txo/'+url);
                        o_links_a.setAttribute('target','_blank');
                        o_links_a.appendChild(document.createTextNode('See More'));
                        
                        //overlay = $('<div class="rcvc_verse_overlay '+parent.extraClass+'" style="position:absolute">'+content+'<div class="rcvc_verse_overlay_links"><a href="http://online.recoveryversion.org/txo/'+url+'" target="_blank">See More</a></div></div>').hide().appendTo(this_);
                        o_links_div.appendChild(o_links_a);
                        o_div.appendChild(o_links_div);
                        overlay = $(o_div).hide().appendTo(this_);
                        overlay.click(function(event){
                            event.stopPropagation();
                        });
                        var query_string=(book==='Oba.'||book==='Philem.'||book==='2 John'||book==='3 John'||book==='Jude')?book+' '+verse:book+' '+chapter+':'+verse;
                        var process_result = function(data ){
                            if(typeof parent._cache[query_string]==='undefined')
                                parent._cache[query_string]=data;
                            var data_=$(data);
                            var vrs_array=data_.find('verse').get().reverse();
                            overlay.find('.error').remove();
                            var cpy_div = document.createElement('div');
                            cpy_div.className='rcvc_copyright';
                            cpy_div.appendChild(document.createTextNode(data_.find('copyright').text()));
                            overlay.append(cpy_div);
                            for(var vrs in vrs_array){
                                var verse_=$(vrs_array[vrs]);
                                
                                var vrs_div = document.createElement('div');
                                vrs_div.className='rcvc_verse';
                                
                                var ref_span = document.createElement('span');
                                ref_span.className='rcvc_ref';
                                ref_span.appendChild(document.createTextNode(verse_.find('ref').text()));
                                
                                vrs_div.appendChild(ref_span);
                                vrs_div.appendChild(document.createTextNode(' '+verse_.find('text').text()));
                                
                                overlay.prepend(vrs_div);
                            }
                            isSet=true;
                            if(timer===null){
                                onShow();
                            }
                        };
                        if(typeof parent._cache[query_string]==='undefined'){
                            console.log("RcVCite: Looking up "+query_string);
                            var protocol = 'http:';
                            if(window.location.protocol === "https:"){
                                protocol = 'https:';
                            }
                            $.ajax(protocol+'//api.lsm.org/recver.php',{
                                'data':{'String':query_string},
                                'dataType':'xml',
                                'error':function(jqXHR,textStatus,errorThrown ){
                                    var vrs_div = document.createElement('div');
                                    vrs_div.className='rcvc_verse error';

                                    var ref_span = document.createElement('span');
                                    ref_span.className='rcvc_ref';
                                    ref_span.appendChild(document.createTextNode('Error:'));
                                    
                                    var cpy_div = document.createElement('div');
                                    cpy_div.className='rcvc_copyright error';
                                    cpy_div.appendChild(document.createElement('br'));

                                    vrs_div.appendChild(ref_span);
                                    vrs_div.appendChild(document.createTextNode(' Unable to contact the Online Recovery Version API.'));
                                    vrs_div.appendChild(cpy_div);
                                    overlay.append(vrs_div);
                                    isSet=true;
                                    if(timer===null){
                                        onShow();
                                    }
                                    console.log(jqXHR,textStatus,errorThrown);
                                },
                                'success':process_result
                            });
                        } else {
                            console.log("RcVCite: Used cache for "+query_string);
                            process_result(parent._cache[query_string]);
                        }
                    };
                    var onShow = function(){
                        timer=null;
                        if(isSet&&overlay){
                            var rel_parent=this_.parents().filter(function() { 
                                // reduce to only relative position or "body" elements
                                var $this = $(this);
                                var temp = $this.css('position')==='relative';
                                return temp;
                            }).slice(0,1);
                            overlay.css({
                                'left':'0px',
                                'margin':'0px '+parent.horzPad+'px'
                                });
                            var width = overlay.outerWidth(true);
                            var win_width, left, max_left;
                            if(rel_parent.length===0){
                                win_width = $(window).width();
                                if(width>win_width) width=win_width;
                                left=e_x-Math.floor(width/2);
                            } else {
                                win_width=rel_parent.width();
                                if(width>win_width) width=win_width;
                                left=e_x-rel_parent.offset().left-Math.floor(width/2);
                            }
                            max_left=win_width-width,
                            left=max_left<left?max_left:left;
                            left=left<0?0:left;
                            overlay.css({
                                'position':'absolute',
                                'left':left+'px'
                                });
                            overlay.show();
                        }
                    };
                    
                    this_.hover(function(event){
                        e_x=event.pageX;
                        if(timer){
                            clearTimeout(timer);
                            timer=null;
                        }
                        if(!overlay){
                            fillOverlay();
                        } else if(overlay.is(':hidden')){
                            timer = setTimeout(function(){onShow();},parent.hoverDelay);
                        }
                    },function(event){
                        if(timer){
                            clearTimeout(timer);
                            timer=null;
                        }
                        timer = setTimeout(function(){
                            if(overlay)
                                overlay.hide();
                        },parent.hoverDelay);
                    }).click(function(event){
                        e_x=event.pageX;
                        if(timer){
                            clearTimeout(timer);
                            timer=null;
                        }
                        if(!overlay){
                            fillOverlay();
                        } else if(overlay.is(':hidden')){
                            onShow();
                        } else {
                            overlay.hide();
                        }
                    });
                });
                console.log("RcVCite.cite() took "+((new Date).getTime()-start)+" milliseconds to cite "+document.location);
            });
        };
        //TODO decide what to do about dynamically loaded content.
    })();
} else {
    console.log("Warning RcVCite already defined!");
}
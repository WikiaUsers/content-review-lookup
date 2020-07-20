//msg-edit api
//dependencies: common.js/emo.js, common.js/Quotes.js
//maintainer: user:fngplg
//source: http://ru.borderlands.wikia.com/wiki/MediaWiki:MessageEditAPI.js?action=raw

(function($){

//settings
var noSettings = typeof(window.ngMsgEditAPI) !== 'undefined' ? window.ngMsgEditAPI.Settings || {} : {};
noSettings = {
    debug : typeof(noSettings.debug) !== 'undefined' ? noSettings.debug : false, //obviously
    ex : typeof(noSettings.ex) !== 'undefined' ? noSettings.ex : true, //experimental functions
    timerinterval : typeof(noSettings.timerinterval) !== 'undefined' ? noSettings.timerinterval : 100,
    maxattempts2writetext : typeof(noSettings.maxattempts2writetext) !== 'undefined' ? noSettings.maxattempts2writetext : 100,
    maxattempts2frame : typeof(noSettings.MaxAttempts2Frame) !== 'undefined' ? noSettings.MaxAttempts2Frame : 1000
};

var nbDebug = noSettings.debug; //obviously
var nbEx = noSettings.ex; //experimental functions

var nTimerInterval = noSettings.timerinterval; //100;
var nMaxAttempts2WriteText = noSettings.maxattempts2writetext; //100; //uncomment frame-w8ing code. 4 non-chrome clients
var nMaxAttempts2Frame = noSettings.MaxAttempts2Frame; //1000;
var nbIE = false; //is IE
var nbMobile = false; //is mobile client.
var nbVE = true; //is visual editor enabled by default
var nNamespace = 0; //active namespace. 1-forum, 2-wikia article


//interface
function nMsgEditAPI () {
//main class

nMsgEditAPI.prototype.version = function(){return '1.0'};
nMsgEditAPI.version = nMsgEditAPI.prototype.version;

this.Helpers = new Helpers();

//helpers
function Helpers () {
//helpers

Helpers.prototype.setMessageFVE = function (npiText, npiInstant, frame) {
    //setmessagef-visual-editor helper
    this.setMessageFVE.k = typeof(this.setMessageFVE.k) === 'undefined' ? 0 : this.setMessageFVE.k;
    if (nbDebug) console.log('hlp.setMessageFVE.k:'+this.setMessageFVE.k+ ' interval:'+this.setMessageFVE.nttw);
    //w8 2 frame rdy
    if (!npiInstant) {
		if (this.setMessageFVE.k++ > nMaxAttempts2WriteText) {
			this.setMessageFVE.k = 0;
			clearInterval(this.setMessageFVE.nttw);
		}
    }
    var nTA;
	nTA = $(frame).contents().find('#bodyContent');
	nTA.html(npiText);
	if (!npiInstant) {
        if (nTA.html().length > 0) {
            this.setMessageFVE.k = 0;
            clearInterval(this.setMessageFVE.nttw);
            if (nbDebug) {
                console.log(this.setMessageFVE.k + ' hlp.setMessageFVE.Interval.w2f. frame.html.len>0. return. ');
            }
            //set cursor pos
            try {
                nsetSelection(nTA, nTA.val().length, null);
            } catch(e){}
        }
    } else {
        //set cursor pos
        try {
            nsetSelection(nTA, nTA.val().length, null);
        } catch(e){}
	} //if !instant
}; //setMessageFVE helper

Helpers.prototype.setMessageF = function (npiText, npiInstant) {
    this.setMessageF.k = typeof(this.setMessageF.k) === 'undefined' ? 0 : this.setMessageF.k;
    if (nbDebug) console.log('hlp.setMessageF: ' +'k:'+this.setMessageF.k+' i:'+npiInstant+' t:'+npiText);
    if (!npiInstant) {
			//setMessageF.k++;
			if (this.setMessageF.k++ > nMaxAttempts2Frame) {
				this.setMessageF.k = 0;
				clearInterval(this.setMessageF.nFrameTimer);
				if (nbDebug) console.log('hlp.setMessageF frametimer limit reached'+nMaxAttempts2Frame);
			}
    }
	//msie specific code. 3rd approach. working
	var nMEW = null;
    nMEW = $('.MiniEditorWrapper.active');
    if (!nMEW.length) {
        nMEW=$('.new-reply').find('.MiniEditorWrapper') || null;
    }
	//if(nbDebug) console.log('hlp.setMessageF.MEW:'+nMEW.get(0).outerHTML);
	var nTA, frame, arrFrames;
	if (nbIE) {
        //remove unneccessary spacing
        npiText = npiText.replace(/<p><br data\-rte\-washtml\=\"1\"\/><\/p>/ig, '');
        //try to activate editor
        nTA = $(nMEW).find('.editarea textarea');
        try {
            //$(nMEW).find('.replyBody').focus();
            nTA.focus();
            nTA.val(npiText);
        } catch(e) {}
		//$(nMEW).find('.wikiaEditor').val(npiText);
		//if (nMEW && $(nMEW).find('.wikiaEditor').val().length) {
		if (nMEW && $(nMEW).find('.editarea textarea').val() && $(nMEW).find('.editarea textarea').val().length) {
			if (nbDebug) {
				console.log(this.setMessageF.k + ' hlp.setMessageF.IE. MEW.wikiaeditor found. set value');
			}
			if (!npiInstant) {
                this.setMessageF.k = 0;
                clearInterval(this.setMessageF.nFrameTimer);
			}
			nTA = $(nMEW).find('.editarea textarea');
			nTA.val(npiText);
			if (nbEx) {
				//set cursor pos
				try {
                    nsetSelection(nTA, nTA.val().length);
				} catch(e){}
			}
			return;
		}
		return;
	} //if ie
	//textarea (source)
	nMEW = $('.MiniEditorWrapper.mode-source.active');
	if (!nMEW.length) {
        nMEW = $('.new-reply').find('.MiniEditorWrapper.mode-source');
	}
	if (nMEW && (nMEW.length > 0)) {
		if (nbDebug) {
			console.log(this.setMessageF.k + ' hlp.setMessage.notIE. mode-source. MEW found');
		}
		//remove unneccessary spacing
		npiText = npiText.replace(/<p><br data\-rte\-washtml\=\"1\"\/><\/p>/ig, '');
		nTA = $(nMEW).find('.editarea').find('.cke_contents').find('textarea.cke_source');
		if (nTA && (nTA.length > 0)) {
			//nTA.val(nTA.val() + npiText);
			nTA.val(npiText);
			if (!npiInstant) {
                this.setMessageF.k = 0;
                clearInterval(this.setMessageF.nFrameTimer);
			}
			//nTA.focus();
			if (nbDebug) {
				console.log(this.setMessageF.k + ' hlp.setMessageF.notIE. mode-source. TA found. set value');
			}
			//set cursor pos
			try {
                nsetSelection(nTA, nTA.val().length);
			} catch(e){}
			return;
		}
	}
	//frame (wysiwyg)
	if (nbDebug) console.log('hlp.setMessageF. mode:wysiwyg');
	nMEW = $('.MiniEditorWrapper.active');
	if (!nMEW.length) {
        nMEW = $('.new-reply .MiniEditorWrapper');
	}
	//activate editor (load frame)
	try {
        nMEW.find('.editarea textarea').focus();
	} catch(e) {}

	//arrFrames = [].slice.call(window.frames);
	if ((window.frames.length === 0) || (nMEW.find('iframe').length === 0)) return; //mode-source check failed=>wysiwyg used
	frame = nMEW.find('iframe').get(0); //$('iframe', $(nMEW)).get(0);
	if (nbDebug) console.log('hlp.setMessageF. frame:'+frame);
	if (!npiInstant) {
        //if ($('iframe', $(nMEW)).length < 1) return; //cont w8ing
        this.setMessageF.k = 0;
        clearInterval(this.setMessageF.nFrameTimer);
	} // if !instant
    //write 2 frame
	if (nbDebug) {
		console.log('hlp.setMessageF. mode-wysiwyg. frames:' + window.frames.length + ' frame:'+frame);
	}
	if (npiInstant) {
        this.setMessageFVE(npiText, npiInstant, frame);
	} else {
        //this.setMessageFVE.k = 0;
        if (nbDebug) console.log('hlp.setMessageF. set interval. write 2 frame');
        this.setMessageFVE.nttw = setInterval(this.setMessageFVE.bind(this, npiText, npiInstant, frame), nTimerInterval);
	} //if instant
}; //setMessageF helper

Helpers.prototype.setMessageWAIE = function (npiText, npiInstant, nMEW) {
    //setmessage wikia article ie helper
    if (nbDebug) console.log('hlp.setMessageWAIE. inst:'+npiInstant);
    var nTA;
    this.setMessageWAIE.k = typeof(this.setMessageWAIE.k) === 'undefined' ? 0 : this.setMessageWAIE.k;
    if (!npiInstant && (++this.setMessageWAIE.k > nMaxAttempts2WriteText)) {
        this.setMessageWAIE.k = 0;
		clearInterval(this.setMessageWAIE.nTextTimer);
    }
	nMEW.find('#article-comm').val(npiText);
	nMEW.focus();
	if (nMEW.find('#article-comm').val().length) {
		nTA = nMEW.find('#article-comm');
		nTA.focus();
		if (!npiInstant) {
            this.setMessageWAIE.k = 0;
            clearInterval(this.setMessageWAIE.nTextTimer);
		}
		if (nbDebug) {
			console.log(this.setMessageWAIE.k + ' hlp.setMessageWAIE. #article-comm if found. set value');
		}
		nTA.val(npiText);
		try {
			//set cursor pos
			nsetSelection(nTA, nTA.val().length);
		} catch(e) {}
	} //if mew.find(#article-comm).val
    
}; //setMessageWAIE

Helpers.prototype.setMessageWAVE = function (npiText, npiInstant) {
    //setmessage wikia article visual editor (frame)
    if (nbDebug) console.log('hlp.setMessageWAVE.inst:'+npiInstant);
	this.setMessageWAVE.k = typeof(this.setMessageWAVE.k) === 'undefined' ? 0 : this.setMessageWAVE.k;
	if (!npiInstant && (++this.setMessageWAVE.k > nMaxAttempts2Frame)) {
        this.setMessageWAVE.k = 0;
        clearInterval(this.setMessageWAVE.nFrameTimer);
	}
    var nMEW = $('.MiniEditorWrapper.active');
    var nTA, arrFrames, frame;
	//1-MEW.active, 2-reply 2 article(new comment), 4-new reply(reply 2 reply)
	var nRT = ((nMEW.length > 0) ? 1 : 0) | (($(nMEW).parent("div#article-comments").length > 0) ? 2 : 0) | (($(nMEW).parent('div.article-comm-input').length > 0) ? 4 : 0);
	//textarea (source)
	if (nMEW && (nMEW.length > -1) && ($(nMEW).hasClass('mode-source'))) {
        //remove unneccessary spacing
        mpiText = npiText.replace(/<p><br data\-rte\-washtml\=\"1\"\/><\/p>/ig, '');
		if (nbDebug) {
			console.log(this.setMessageWAVE.k + ' hlp.setMessageWAVE. mode-source. MEW.len>0:' + nMEW.length);
		}
        nTA = $(nMEW).find('.editarea .cke_contents textarea.cke_source');
        if (nTA && (nTA.length > 0)) {
            if (!npiInstant) {
                this.setMessageWAVE.k = 0;
                clearInterval(this.setMessageWAVE.nFrameTimer);
            }
            if (nbDebug) {
                console.log(this.setMessageWAVE.k + ' hlp.setMessageWAVE. mode-source. TA.len>0. set value');
            }
            nTA.focus();
            nTA.val(npiText);
            try {
                //set cursor pos
                nsetSelection(nTA, nTA.val().length);
                } catch(e) {}
            return;
        } //if nta.len
    } //if mew.len && hasclass(mode-source)
	//frame (wysiwyg)
	arrFrames = [].slice.call(window.frames);
	if (window.frames.length === 0) {
        return; //mode-source check failed=>wysiwyg used
	}
	if ($('iframe', $(nMEW)).length < 1) return; //cont w8ing
	//write 2 frame
	this.setMessageWAVE.k = 0;
	clearInterval(this.setMessageWAVE.nFrameTimer);
	if (nbDebug) {
		console.log('hlp.setMessageWAVE. mode-wysiwyg. frames:' + window.frames.length);
	}
	frame = $('iframe', $(nMEW))[0];
	if (nbDebug) {
		console.log('hlp.setMessageWAVE. mode-wysiwyg. frame:' + frame);
        console.log('hlp.setMessageWAVE. write 2 frame. inst:'+npiInstant);
	}
	if (npiInstant) {
        this.setMessageWAVEF(npiText, npiInstant, frame);
	} else {
        this.setMessageWAVEF.nttw = setInterval(this.setMessageWAVEF.bind(this, npiText, npiInstant, frame), nTimerInterval);
	}
}; // setmessageWAVE

Helpers.prototype.setMessageWAVEF = function (npiText, npiInstant, frame) {
    //setmessage wikia article visual editor frame-write
    if (!npiText) npiText = this.setMessageWAVEF.text;
    if (!npiInstant) npiInstant = this.setMessageWAVEF.instant;
    if (!frame) frame = this.setMessageWAVEF.frame;
    if (nbDebug) console.log('hlp.setMessageWAVEF.inst:'+npiInstant);
    this.setMessageWAVEF.k = typeof(this.setMessageWAVEF.k) === 'undefined' ? 0 : this.setMessageWAVEF.k;
	if (!npiInstant && (++this.setMessageWAVEF.k > nMaxAttempts2WriteText)) {
		this.setMessageWAVEF.k = 0;
		clearInterval(this.setMessageWAVEF.nttw);
	}
	$(frame).contents().find('#bodyContent').html(npiText);
	if ($(frame).contents().find('#bodyContent').html().length > 0) {
        if (!npiInstant) {
            this.setMessageWAVEF.k = 0;
            clearInterval(this.setMessageWAVEF.nttw);
        }
		if (nbDebug) {
			console.log(this.setMessageWAVEF.k + ' hlp.setMessageWAVEF. frame.html.len>0. return.');
		}
		try {
			//set selection
			nsetSelection($(frame).contents().find('#bodyContent'), $(frame).contents().find('#bodyContent').text().length);
		} catch(e) {}
	}
}; //setmessageWAVEF

} //helpers

nMsgEditAPI.prototype.getMessage = function () {
	//get message
	if (nbDebug) {
		console.log('getMessage. ns:' + nNamespace);
	}
	var ret = null;
	switch (nNamespace) {
        case 1:
            if (nbDebug) {
                console.log('getMessage. getMessageF');
            }
            ret = this.getMessageF();
            return !!ret ? ret : '';
        case 2:
            if (nbDebug) {
                console.log('getMessage. getMessageWA');
            }
            ret = this.getMessageWA();
            return !!ret ? ret : '';
        default:
            if (nbDebug) {
                console.log('getMessage. switch:default. Target:' + nNamespace);
            }
            ret = this.getMessageF();
            return !!ret ? ret : '';
	} //switch namespace
}; //ngetMessage

nMsgEditAPI.prototype.getMessageF = function () {
	//get message. forum
	if (nbDebug) {
		console.log('getMessage. IE:'+nbIE);
	}
	var nTA, nMEW;
	if (nbIE) {
		if (nbDebug) {
			console.log('getMessage. Browser: IE');
		}
		//nMEW = $('.new-reply').find('.MiniEditorWrapper.active');
		nMEW = $('.MiniEditorWrapper.active');
		if (nbDebug) {
			console.log('getMessage.IE. MEW for new-reply:' + nMEW);
		}
		nTA = $(nMEW).find('.editarea textarea'); //.find('textarea.replyBody');
		if (nbDebug) {
			console.log('getMessage.IE. TA.replyBody:' + nTA);
		}
		if (nTA && (nTA.length > 0)) {
			if (nbDebug) {
				console.log('getMessage.IE. TA.len>0. return:' + nTA.val());
			}
			return nTA.val();
		} else {
			if (nbDebug) {
				console.log('getMessage.IE. TA.len=0 or not found. return');
			}
			return;
		}
	} //if ie

	if (nbDebug) {
		console.log('getMessage. Browser: not IE');
	}
	var
        arrFrames = [].slice.call(window.frames),
        nt = null,
        i = 0,
        frame = null;
    //ve source mod
    nt = $('.MiniEditorWrapper.active .editarea .cke_contents textarea.cke_source').val();
    if (nt) return nt;
    //ve frame
	if (nbDebug) {
		console.log('getMessage. frames.count:' + arrFrames.length);
	}
	while (i < (arrFrames.length + 1)) {
		frame = arrFrames[i];
		if (!frame)
			return null;
		if (frame.document.getElementById('bodyContent')) {
			if (nbDebug) {
				console.log(i + ' getMessage. frame-editor found. gethtml');
			}
			nt = frame.document.getElementById('bodyContent').innerHTML;
			if (nbDebug) {
				console.log(i + ' getMessage. innerhtml:' + nt);
			}
		} else
			nt = null;
		if (nt)
			return nt;
		i++;
	} //while frames
	return;
}; //ngetMessageF

nMsgEditAPI.prototype.getMessageWA = function () {
	//get message. wikia article
	if (nbDebug) {
		console.log('getMessageWA');
	}
	var nMEW = $('.MiniEditorWrapper.active') || null;
	if (nbDebug) {
		console.log('getMessageWA. MEW:' + nMEW);
	}
	if (nbDebug) {
		console.log('getMessageWA. get mode');
	}
	var nRT = ((nMEW.length > 0) ? 1 : 0) | (($(nMEW).parent("div#article-comments").length > 0) ? 2 : 0) | (($(nMEW).parent('div.article-comm-input').length > 0) ? 4 : 0);
	//1-MEW.active, 2-reply 2 article(new comment), 4-new reply(reply 2 reply)
	if (nbDebug) {
		console.log('getMessageWA. mode:' + nRT);
	}
	if (nRT === 0)
		return null; //no user input detected
	if (nbIE) {
		if (nbDebug) {
			console.log('getMessageWA. Browser: IE');
		}
		if ((nRT & 2) == 2) {
			if (nbDebug) {
				console.log('getMessageWA.IE. reply 2 article (new comment). return');
			}
			return $(nMEW).find('.editarea textarea#article-comm').val();
		}
		if ((nRT & 4) == 4) {
			if (nbDebug) {
				console.log('getMessageWA.IE. reply 2 reply. return');
			}
			return $(nMEW).find('.editarea textarea').val();
		}
		if (nbDebug) {
			console.log('getMessageWA.IE. return');
		}
		return null;
	} //if ie

	//textarea (mode-source)
	if (nbDebug) {
		console.log('getMessageWA. Browser: not IE. check mode-source');
	}
	if (nMEW && (nMEW.length > -1) && ($(nMEW).hasClass('mode-source'))) {
		if (nbDebug) {
			console.log('getMessageWA. mode-source. return');
		}
		return $(nMEW).find('.editarea .cke_contents textarea.cke_source').val();
	}
	//frame (wysiwyg)
	if (nbDebug) {
		console.log('getMessageWA. mode-wysiwyg. frames:' + window.frames.length);
	}
	if (window.frames.length === 0)
		return null; //no frame-no gain
	if (nbDebug) {
		console.log('getMessageWA. mode-wysiwyg. return');
	}
	return $('iframe', $(nMEW)).contents().find('#bodyContent').html();
}; //ngetMessageWA

nMsgEditAPI.prototype.setMessage = function (npiText, npiInstant) {
	//set message. text: text; instant: bool: do not w8 frame.ready, just drop and go
	if (nbDebug) {
		console.log('setMessage. ns:' + nNamespace+' t:'+npiText+' i:'+npiInstant+' this:'+this);
	}
    switch (nNamespace) {
        case 1:
            if (nbDebug) {
                console.log('setMessage. setMessageF');
            }
            return this.setMessageF(npiText, npiInstant);
        case 2:
            if (nbDebug) {
                console.log('setMessage. setMessageWA');
            }
            return this.setMessageWA(npiText, npiInstant);
        default:
            if (nbDebug) {
                console.log('setMessage. switch:default. Target:' + nNamespace);
            }
            return this.setMessageF(npiText, npiInstant);
	} //switch namespace
}; //nsetMessage

nMsgEditAPI.prototype.setMessageF = function (npiText, npiInstant) {
	//set message. forum
	if (nbDebug) {
		console.log('setMessageF:' + npiText + ' ' + nNamespace+' this:'+this);
	}
	if (npiInstant) {
        this.Helpers.setMessageF(npiText, npiInstant);
	} else {
        if (nbDebug) console.log('setMessageF. set interval '+nTimerInterval);
        var wrapper = this.Helpers.setMessageF.bind(this.Helpers, npiText, npiInstant);
        this.Helpers.setMessageF.nFrameTimer = setInterval(wrapper, nTimerInterval);
    } // if instant
	return npiText;
}; //nSetMessageF

nMsgEditAPI.prototype.setMessageWA = function (npiText, npiInstant) {
	//set message. wikia article
	//new post or reply
	//new post
	//$('.MiniEditorWrapper.active').parent("div#article-comments").length
	//reply
	//$('.MiniEditorWrapper.active').parent('div.article-comm-input').length
	if (nbDebug) {
		console.log('setMessageWA.inst:'+npiInstant);
	}
	var nTA = null;
	var nMEW = $('.MiniEditorWrapper.active');
	if (nbDebug) {
		console.log('setMessageWA. MEW.active:' + nMEW);
	}
	if (nbIE) {
		if (nbDebug) {
			console.log('setMessageWA. Browser: IE');
		}
		//remove unneccessary spacing
		npiText = npiText.replace(/<p><br data\-rte\-washtml\=\"1\"\/><\/p>/ig, '');
		//nMEW = $('.MiniEditorWrapper.active');
		if (nbDebug) {
			console.log('setMessageWA.IE. MEW.active:' + nMEW);
		}
		if (nMEW.length > 0) {
			if (nbDebug) {
				console.log('setMessageWA.IE. MEW.len>0 ' + nMEW.length + ' set value and return');
			}
			nTA = nMEW.find('.editarea textarea.wikiaEditor');
			nTA.focus();
			nTA.val('');
			nTA.val(npiText);
			try {
				//set cursor pos
				nsetSelection(nTA, nTA.val().length);
			} catch(e) {}
			return;
		} else { //no active editors
			if (nbDebug) {
				console.log('setMessageWA.IE. no active editors found');
			}
			nMEW = $('#WikiaArticleComments .MiniEditorWrapper'); //.find('.wikiaEditor');
			if (nbDebug) {
				console.log('setMessageWA.IE. WAC.MEW:' + nMEW);
			}
			if (nbDebug) {
				console.log('setMessageWA.IE. set interval');
			}
			if (npiInstant) {
                this.Helpers.setMessageWAIE(npiText, npiInstant, nMEW);
			} else {
                this.Helpers.setMessageWAIE.nTextTimer = setInterval(this.Helpers.setMessageWAIE.bind(this.Helpers, npiText, npiInstant, nMEW), nTimerInterval);
			} //if instant
		} //if mew.len > 0
		return;
	} //if ie
	nMEW = $('.MiniEditorWrapper.active') || null;
	if (nbDebug) {
		console.log('setMessageWA. Browser: not IE. MEW.active:' + nMEW);
		console.log('setMessageWA. get mode');
	}
	nRT = ((nMEW.length > 0) ? 1 : 0) | (($(nMEW).parent("div#article-comments").length > 0) ? 2 : 0) | (($(nMEW).parent('div.article-comm-input').length > 0) ? 4 : 0);
    //1-MEW.active, 2-reply 2 article(new comment), 4-new reply(reply 2 reply)
	if (nbDebug) {
		console.log('setMessageWA. mode:' + nRT);
	}
	if (nRT === 0) {
		//#article-comments-minieditor-newpost.MEW - new article comment
		//article comment. focusing
		if (nbDebug) {
			console.log('setMessageWA. no active editors found. focusing on #article-comm');
		}
		$('#article-comm').focus(); //will not work on ie
	} // if rt=0
    if (nbDebug) console.log('setMessageWA. write to frame. inst:'+npiInstant);
	if (npiInstant) {
        this.Helpers.setMessageWAVE(npiText, npiInstant);
	} else {
        this.Helpers.setMessageWAVE.nFrameTimer = setInterval(this.Helpers.setMessageWAVE.bind(this.Helpers, npiText, npiInstant), nTimerInterval);
	} // if instant
	return npiText;
}; //nsetMessageWA

} //nMsgEditAPI
 
function nsetSelection(npiTarget, npiStart, npiEnd) { //, npiTarget2) {
	//ve has not textarea.
	//need some correct element for ve.focus. not in the frame.
	if (nbDebug) {
		console.log('setSelection. ' + npiTarget + ' ' + npiStart);
	}
	$(npiTarget)[0].focus();
	$(npiTarget)[0].scrollTop = $(npiTarget)[0].scrollHeight;
	if (nbDebug) {
		console.log('setSelection.' + $(npiTarget)[0].scrollTop + ' ' + $(npiTarget)[0].scrollHeight);
	}
	var nStart = npiStart;
	var nEnd = npiStart;
	//if (arguments.length>2) nEnd=npiEnd;
	if (npiEnd)
		nEnd = npiEnd;
	if ($(npiTarget)[0].setSelectionRange) { //DOM
		if (nbDebug) {
			console.log('setSelection.notIE');
		}
		$(npiTarget)[0].focus();
		window.getSelection().removeAllRanges();
		$(npiTarget)[0].setSelectionRange(nStart, nEnd);
	} else if (npiTarget.createTextRange) { //IE
		if (nbDebug) {
			console.log('setSelection.IE');
		}
		document.selection.empty();
		var range = $(npiTarget)[0].createTextRange();
		$(npiTarget)[0].focus();
		range.collapse(true);
		range.moveEnd('character', nEnd);
		range.moveStart('character', nStart);
		range.select();
	}
	return false;
} //nsetSelection
 
//main
//nMsgEditAPI.main = main = 
//function () {
    //run once
    if (nbDebug) console.log('mea.main start');
    if (window.ngMsgEditAPI && window.ngMsgEditAPI.version) {
        if (nbDebug) console.log('mea.main already running ', ngMsgEditAPI);
        return true;
    }
    //it has to be here. in order to retrieve interface
	nMsgEditAPI.Settings = noSettings;
	window.ngMsgEditAPI = nMsgEditAPI;
	if (nbDebug) {
        window.ngMsgEditAPIInstance = new window.ngMsgEditAPI();
	}
    switch (mw.config.get('wgNamespaceNumber')) {
        case 0:
            //wikia article
            if (nbDebug) {
                console.log('mea.main. wikia article');
            }
            nNamespace = 2;
            break;
        case 500:
            //blog = wikia article
            if (nbDebug) {
                console.log('mea.main. blog');
            }
            nNamespace = 2;
            break;
        case 1201:
            //forum
            if (nbDebug) {
                console.log('mea.main. forum');
            }
            nNamespace = 1;
            break;
        default:
            //undefined
            nNamespace = 0;
            break;
	} //switch namespace
	
	//wrong namespace
	if (nNamespace === 0) {
        if (nbDebug) console.log('mea. wrong namespace');
        return true;
	}
	
	nbVE = mw.config.get('wgVisualEditorPreferred'); //check 4 visual editor
	if (navigator.userAgent.indexOf('Mobile') != -1) {
		nbMobile = true; //it means falling to ie+additional restrictions
		if (nbDebug) {
			console.log('mea.main. mobile');
		}
	}
	//ie-specific. ie10-mozilla+trident.
	if (nbMobile || ((navigator.userAgent.indexOf('Mozilla') != -1) && (navigator.userAgent.indexOf('Trident') != -1)) || (!nbVE)) {
		if (nbDebug) {
			console.log('mea.main. Browser: IE');
		}
		nbUsernameAsLink = false;
		nbIE = true;
	}
//}; //main

//main();

})(jQuery); //wrap
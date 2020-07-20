/**
 * @name        EmoticonFix
 * @author      Sean Colombo
 * @author      Ultimate Dark Carnage
 * @desc        Fixes the way Wikia parses emoticons in order to
 *              allow for custom emoticons
 **/
(function(window, $, _){
    var WikiaEmoticons, EmoticonMapping,
        RegexSanitization = /[-[\]{}()*+?.,\\^$|#\s]/g,
        RegexWikiaImageTag = /^(?:https?:)?\/\/(?:[^\/]+\.)*?wikia(?:-dev)?(?:\.com|\.nocookie\.net)\//,
        RegexLineStartingByAsterisk = /^\*[ ]*([^*].*)/,
	    RegexLineStartingByTwoAsterisk = /^\*\* *([^*"][^"]*)/;
	if (typeof WikiaEmoticons === 'undefined')
	   WikiaEmoticons = {};
	WikiaEmoticons.WIDTH = 19;
	WikiaEmoticons.HEIGHT = 19;
	 
	WikiaEmoticons.doReplacements = function(text, mapping){
	    var imgUrlsByRegexString = mapping.getImgUrlsByRegexString(),
	        originalText, regex, buildTagFn, max = 6,
	        combinedRegexString = Object.keys(imgUrlsByRegexString)
	            .map(function(key){
	                return key.replace(RegexSanitization, '\\$&');
	            }).join('|');
	    regex = new RegExp('(^|\\s)(' + combinedRegexString + ')([^/]|$)', 'i');
	    if (!text.match(regex)) return text;
	    buildTagFn = WikiaEmoticons.buildTagGenerator(imgUrlsByRegexString);
	    do {
	        originalText = text;
	        text = text.replace(regex, buildTagFn);
	    } while ((originalText !== text) && --max > 0);
	    return text;
	};
	 
	WikiaEmoticons.buildTagGenerator = function(imgUrlsByRegexString){
	    return function(match, leading, tag, trailing){
	        var src = imgUrlsByRegexString[tag.toLowerCase()];
	        if (typeof src === 'undefined') return match;
	        src = src.replace(/"/g, '%22');
	        if (!src.match(RegexWikiaImageTag)) return '';
	        tag = mw.html.escape(tag);
	        src = mw.html.escape(src);
	        return [leading, $('<img>', {
	            src: src, width: WikiaEmoticons.WIDTH,
	            height: WikiaEmoticons.HEIGHT, alt: tag, title: tag
	        }).prop('outerHTML'), trailing].join(' ');
	    };
	};
	 
	function EmoticonMapping(){
	    var context = this, ext = mw.config.get('wgExtensionsPath'),
	        path = ext + '/wikia/Chat2/images/emoticons';
	    this._regexes = {};
	    this._settings = {};
	    this._settings[path + '/smile.png'] = [':)', ':-)', '(smile)'];
	    this._settings[path + '/sad.png'] = [':(', ':-(', ':|'];
	   
	    this.loadFromWikiText = this.loadFromText = function(text){
	        context._settings = {};
	       
	        var arr = text.split('\n'),
	            currKey = '', index, urlMatch, url, glyph, glyphMatch;
	        for (index = 0; index < arr.length; index++){
	            urlMatch = arr[index].match(RegexLineStartingByAsterisk);
	            if (urlMatch && urlMatch[1]){
	                url = urlMatch[1];
	                context._settings[url] = [];
	                currentKey = url;
	            } else if (context._settings[currentKey]){
	                glyphMatch = arr[index].match(RegexLineStartingByTwoAsterisk);
	                if (glyphMatch && glyphMatch[1]){
	                    glyph = glyphMatch[1];
	                    self._settings[currentKey].push(glyph);
	                }
	            }
	        }
	        
	        context._regexes = {};
	   };
	   
	   this.getImgUrlsByRegexString = function(){
	       var nSettings = 0, nRegexes = 0, keyName, regKeyName,
	           imgSrc, codes, code, regexString, index;
	       
	       for (keyName in self._settings) nSettings++;
	       
	       for (regKeyName in self._regexes) nRegexes++;
	       
	       if (nSettings === nRegexes) return self._regexes;
	       
	       for (imgSrc in self._settings){
	           codes = self._settings[imgSrc];
	           regexString = '';
	           for (index = 0; codes.length > index; index++){
	               code = codes[index];
	               
	               code = code.replace(/>/g, '&gt;').replace(/</g, '&lt;');
	               self._regexes[code.toLowerCase()] = imgSrc;
	           }
	       }
	       return self._regexes;
	   };
	}
}(this, jQuery, _));
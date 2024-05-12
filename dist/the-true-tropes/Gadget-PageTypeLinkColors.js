/* If you want to use this script, simply add the following line to your [[Special:Mypage/monobook.js]]:

importScript('User:Anomie/linkclassifier.js'); // Linkback: [[User:Anomie/linkclassifier.js]]

* (Please keep the comment so I can see how many people use this). You will also want to
* add some CSS classes, such as those at [[User:Anomie/linkclassifier.css]].
*/

/* If you want this to run "on demand" instead of on every page, set "LinkClassifierOnDemand=true" and
 * use addPortletLink() or the like to add a button calling LinkClassifier.onDemand().
 */

var LinkClassifier={
    /* This object maps classes to the categories for which to apply them. Values may be an array of strings or a regex. */
    cats:{
        deletion:[
            'Category:Pages for speedy deletion',
        ].sort(),
        trope:[
            'Category:Trope'
        ].sort(),
        'ymmvtrope':[
            'Category:YMMV Trope'
        ].sort()
    },

    /* This object maps page props to CSS classes for which to apply them. Values may be an array of strings or a function returning such. */
    props: {
        disambiguation:[
            'disambiguation'
        ],
    },

    /* This regex matches page titles to be marked as intentional links to disambiguation pages */
    intentionaldab: / \(disambiguation\)$/,
 
    callback:function(r, sts, xhr){
        if(!r.query) {
            if(typeof(window.console)=='undefined' || typeof(window.console.error)!='function')
                throw new Error('Bad response');
            window.console.error("Bad response", r);
            return;
        }
        if(r['query-continue']){
            var cc=this.rawdata;
            for(var k in r['query-continue']){
                for(var k2 in r['query-continue'][k]){
                    cc[k2]=r['query-continue'][k][k2];
                }
            }
            $.ajax({
                url:mw.util.wikiScript('api'),
                dataType:'json',
                type:'POST',
                data:cc,
                rawdata:cc,
                success:arguments.callee,
                error:function(xhr,textStatus,errorThrown){
                    throw new Error('AJAX error: '+textStatus+' '+errorThrown);
                }
            });
        }
        r=r.query;

        var a=document.getElementById('wikiPreview');
        if(!a) a=document.getElementById('bodyContent');
        if(!a) throw new Error('Huh? No body content?');
        a=a.getElementsByTagName('A');
        if(a.length==0) return;

        var redir={};
        var redirlist=[];
        if(r.redirects) for(var i=r.redirects.length-1; i>=0; i--){
            redir[r.redirects[i].from]=r.redirects[i].to;
            redirlist.push(r.redirects[i].from);
        }
        if(redirlist.length>0) {
            var q = {
                format:'json',
                action:'query',
                titles:redirlist.join('|'),
                prop:'categories|info',
                inprop:'protection',
                cllimit:'max',
                rawcontinue:1
            };
            $.ajax({
                url:mw.util.wikiScript('api'),
                dataType:'json',
                type:'POST',
                data:q,
                rawdata:q,
                success:arguments.callee,
                error:function(xhr,textStatus,errorThrown){
                    throw new Error('AJAX error: '+textStatus+' '+errorThrown);
                }
            });
        }

        var prefix=(this.rawdata.redirects?'':'redir-');
        var cats={};
        var missing={};
        var classes={};
        if(r.pages) for(var i in r.pages){
            classes[r.pages[i].title] = [];
            missing[r.pages[i].title]=(typeof(r.pages[i].missing)!='undefined');
            if(typeof(r.pages[i].categories)!='undefined'){
                cats[r.pages[i].title]=r.pages[i].categories.map(function(a){ return a.title; }).sort();
            }
            if(typeof(r.pages[i].pageprops)!='undefined'){
                for ( var k in r.pages[i].pageprops ) {
                        if ( !LinkClassifier.props[k] ) {
                                continue;
                        }
                        var v = LinkClassifier.props[k];
                        if ( $.isFunction( v ) ) {
                                v = v( r.pages[i].pageprops[k], k, r.pages[i].title );
                        }
                        classes[r.pages[i].title].push.apply( classes[r.pages[i].title], v );
                }
            }
            if(typeof(r.pages[i].protection)!='undefined'){
                var x={};
                for(var j=r.pages[i].protection.length-1; j>=0; j--){
                    var p=prefix+'protection-'+r.pages[i].protection[j].type+'-'+r.pages[i].protection[j].level;
                    if(typeof(x[p])=='undefined'){
                        x[p]=1;
                        classes[r.pages[i].title].push(p);
                    }
                    if(r.pages[i].protection[j].expiry=='infinity'){
                        p+='-indef';
                        if(typeof(x[p])=='undefined'){
                            x[p]=1;
                            classes[r.pages[i].title].push(p);
                        }
                    }
                }
            }
            if(typeof(r.pages[i].flagged)!='undefined'){
                if(r.pages[i].lastrevid!=r.pages[i].flagged.stable_revid){
                    classes[r.pages[i].title].push('needs-review');
                }
            }
        }
        Array.prototype.forEach.call(a, function(a){
            if(typeof(a.wikipage)=='undefined') return;
            if(typeof(redir[a.wikipage])!='undefined'){
                $(a).addClass('redirect');
                a.wikipage=redir[a.wikipage];
                a.title=a.wikipage;
                var cns=mw.config.get('wgCanonicalNamespace');
                if(a.wikipage==(cns?cns+':':'')+mw.config.get('wgTitle'))
                    $(a).addClass('self-redirect');
                if(missing[a.wikipage])
                    $(a).addClass('broken-redirect');
            }
            var m=a.href.match(/#.*/);
            if(m && m[0].substr(0,10)!=="#cite_note"){
                a.title=a.title.replace(/#.*/,'')+m[0].replace(/_/g,' ').replace(/\.([0-9A-F][0-9A-F])/gi, function(x,n){ return String.fromCharCode(parseInt(n,16)); });
            }
            if(LinkClassifier.intentionaldab.test(a.origwikipage)){
                $(a).addClass('intentional-disambiguation');
            }
            if(typeof(classes[a.wikipage])!='undefined'){
                for(var j=classes[a.wikipage].length-1; j>=0; j--)
                    $(a).addClass(classes[a.wikipage][j]);
            }
            if(a.wikipage!=a.origwikipage && typeof(classes[a.origwikipage])!='undefined'){
                for(var j=classes[a.origwikipage].length-1; j>=0; j--)
                    $(a).addClass(classes[a.origwikipage][j]);
            }
            var c1=[];
            if(typeof(cats[a.wikipage])!='undefined'){
                c1=c1.concat(cats[a.wikipage]);
            }
            if(a.wikipage!=a.origwikipage && typeof(cats[a.origwikipage])!='undefined'){
                c1=c1.concat(cats[a.origwikipage]);
            }
            if(c1.length>0){
                c1=c1.sort();
                for(var cls in LinkClassifier.cats){
                    var i1=c1.length-1;
                    var c2=LinkClassifier.cats[cls];
                    if(c2 instanceof RegExp){
                        while(i1>=0){
                            if(c2.test(c1[i1])){
                                $(a).addClass(cls);
                                break;
                            }
                            i1--;
                        }
                    } else {
                        var i2=c2.length-1;
                        while(i1>=0 && i2>=0){
                            if(c1[i1]==c2[i2]){
                                $(a).addClass(cls);
                                break;
                            }
                            (c1[i1]>c2[i2])?--i1:--i2;
                        }
                    }
                }
            }
        });
    },

    getPageName:function(url){
        var m=url.match(/\/wiki\/([^?#]+)/);
        if(!m) m=url.match(/\/w\/index.php\?(?:.*&)?title=([^&#]+)/);
        if(!m) return '';
        var t=decodeURIComponent(m[1]).replace(/_/g,' ');
        if(t.substr(0,6)=='Image:') t='File:'+t.substr(6);
        if(t.substr(0,11)=='Image talk:') t='File talk:'+t.substr(6);
        if(t.substr(0,8)=='Special:') t='';
        return t;
    },

    classifyChildren:function(node){
        mw.loader.using(['mediawiki.util','mediawiki.user'], function(){
            var a=node.getElementsByTagName('A');
            if(a.length==0) return;
            var self=LinkClassifier.getPageName(location.href);
            a=Array.prototype.map.call(a, function(a){
                a.wikipage='';
                if(/(^|\s)(external|extiw)(\s|$)/.test(a.className)) return '';
                if(!/(^|\s)(image)(\s|$)/.test(a.className)) a.className+=" nonimage";
                a.wikipage=LinkClassifier.getPageName(a.href);
                if(a.wikipage==self) a.wikipage='';
                a.origwikipage=a.wikipage;
                return a.wikipage;
            }).sort().filter(function(e,i,a){
                return e!=='' && (i==0 || a[i-1]!==e);
            });

            function processLinks(limit){
                var props = [];
                for ( var k in LinkClassifier.props ) {
                        props.push( k );
                }
                while(a.length>0){
                    var q={
                        format:'json',
                        action:'query',
                        titles:a.splice(0,limit).join('|'),
                        prop:'categories|pageprops|info|flagged',
                        redirects:1,
                        cllimit:'max',
                        inprop:'protection',
                        rawcontinue:1
                    };
                    if ( props.length <= limit ) {
                        q.ppprop = props.join( '|' );
                    }
                    $.ajax({
                        url:mw.util.wikiScript('api'),
                        dataType:'json',
                        type:'POST',
                        data:q,
                        rawdata:q,
                        success:LinkClassifier.callback,
                        error:function(xhr,textStatus,errorThrown){
                            throw new Error('AJAX error: '+textStatus+' '+errorThrown);
                        }
                    });
                }
            }

            if(a.length<=100){
                // Not worth querying the API to see if the user has apihighlimits
                processLinks(50);
            } else {
                // Note mw.user.getRights queries the API
                mw.user.getRights(function(rights){
                    processLinks( (rights.indexOf('apihighlimits')>=0) ? 500 : 50 );
                });
            }
        });
    },
 
    onLoad:function(){
        if(window.LinkClassifierOnDemand) return;
        if(window.AJAXPreview) window.AJAXPreview.AddOnLoadHook(LinkClassifier.classifyChildren);
        LinkClassifier.onDemand();
    },
 
    onDemand:function(){
        var node=document.getElementById('wikiPreview');
        if(!node) node=document.getElementById('bodyContent');
        if(node) LinkClassifier.classifyChildren(node);
    }
};

if(!window.LinkClassifierOnDemand) $(document).ready(LinkClassifier.onLoad);
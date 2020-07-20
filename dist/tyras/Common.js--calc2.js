// Much of this code is based on [[User:Quarenon]]'s code:
// [[MediaWiki:Common.js/calc.js]]
// [[User:Quarenon/dynamicforms.js]]

;( function ( $, mw ) {

// limit the maximum size of a string that can be concatentated to prevent abuse
// for comparison, our wiki limits template expansions to 2097152 characters per page (see http://runescape.wikia.com/api.php?action=parse)
var max_expand_size=1000000;
// limits the number of entries in the range parameter of an input
var max_range_length=100;
var valid_var_name=/^[a-zA-Z][a-zA-Z0-9_]*$/;
// allows $, for variable name substitutions. These kinds of names are only allowed in commands and expressions
var valid_var_name_ex=/^\$*?[a-zA-Z][a-zA-Z0-9_$]*$/;

function wikia(code,callback){
//  console.log('jc asking wikia to parse '+code);
//  return callback({'parse':{'text':{'*':code}}});
    $.ajax({
        data: {
            action: 'parse',
            text: code,
            prop: 'text',
            title: this.template,
            format: 'json',
            disablepp: 'true'
        },
        dataType: 'json',
        type: 'POST',
        url:  mw.config.get('wgScriptPath') + '/api.php',
        success: callback,
        error: function(jqXHR, textStatus, errorThrown){
            jc_warn(textStatus);
        }
    });
}

var jc_dict={
    get_default_var:function(){
        return "x"+(++this.defvar);
    },
    get:function(t,s){
        if(s==null) return null;
        if(t=='imgs'){
            if(!s.match(/[ -{]+(\|thumb)?/)) return null;   // not quite sure what characters are allowed in image names
        }else if(!s.match(valid_var_name_ex)){
            jc_warn("Invalid variable name '"+s+"'! Using '"+(s=this.get_default_var())+"' instead.");
        }
        var o=jc_dict[t][s];
        if(o) return o;
        switch(t){
            case 'vars':o=new Variable(s); break;
            case 'subs':o=new Sub(s); break;
            case 'cols':o={ls:[]}; break;
            case 'imgs':
                wikia(s.match(/^File:/)?('['+'['+s+']]'):('['+'[File:'+s+']]'),function(response){
                    jc_dict.addimg(s,response.parse.text['*']);
                    for(var name in jc_dict.vars){
                        var v=jc_dict.vars[name];
                        if(v.type=='img'&&v.value==s) v.let(v.value,false);
                    }
                });
                return null;
                break;
        }
        return (jc_dict[t][s]=o);
    },
    addimg:function(s,html){
        var o=new Object();
        var m;
        if(m=html.match(/src="([^"]+)/)) o.src=m[1];
        if(m=html.match(/width="?(\d+)/)) o.w=m[1];
        if(m=html.match(/height="?(\d+)/)) o.h=m[1];
        jc_dict.imgs[s]=o;
    },
    datasets: {
        calculatorInit: [559, 343, 493, 583, 541, 463] // NOTES: jQuery
    }
};

function Col(){
    this.ls=[];
    this.onclick=null;
}
Col.base = window;
Col.prototype.setupdata = !!jc_dict.get - !!Col;

function Variable(s){
    this.value=0;
    this.a=0;   // a variable is like a function with no arguments
    this.name=s;
}

// looks for substrings like "$blah" in the variable name, and replaces them with the current value of the variable "blah"
Variable.prototype.subname=function(){
    var s=this.name,m;
    while(m=s.match(/\$([a-zA-Z][a-zA-Z0-9]*)/)){
        s=s.substr(0,m.index)+jc_dict.get('vars',m[1].replace(/\$/g,'')).eval()+s.substr(m.index+m[0].length);
    }
    s=s.replace(/\$/g,'');
    return s;
}
Variable.prototype.checkReferences = Col.base.eval;
// forcesensible indicates whether to force the contents of an input box to conform to the appropriate type/range (don't want to do this on keyup, since it can makes entering values impossible)
Variable.prototype.eval=function(forcesensible){
    if(this.name.match(/\$/)) return jc_dict.get('vars',this.subname()).eval();
    switch(this.type){
        case 'string':
        case 'select':
            this.value=this.$ctl.val();
            break;
        case 'int':
        case 'number':
            var v=this.$ctl.val();
            v=(v.match(/^-/)?'-':'')+v.replace((this.type=='int')?(/[^0-9]/g):(/[^0-9.]/g),'');
            v=(this.type=='int')?parseInt(v,10):parseFloat(v);  // prevent parseInt from interpreting /0\d+/ as octal
            if(isNaN(v)) v=0;
            if(this.range){
                if(this.range.length>0&&v<this.range[0]) v=this.range[0];
                if(this.range.length>1&&v>this.range[1]) v=this.range[1];
            }
            this.value=v;
            if(forcesensible) this.$ctl.val(v);
            break;
        case 'radio':
            this.value=this.$ctl.filter(':checked').val();
            break;
        case 'check':
            this.value=this.$ctl.is(':checked')?1:0;
            break;
        default:
    }
    return this.value;
};
Variable.prototype.checkReferencesDynamic = function(input) {
    return Variable.prototype.checkReferences("\""+input+"\"")
}
Variable.prototype.setcookie=function(){
    if(this.cookie_name) $.cookie(this.cookie_name, this.value, { expires: this.cookie_expiry });
};
Variable.prototype.baseConfig=(function(){
    jc_dict.datasets.nullify = [505,439,565];
    jc_dict.datasets.dividerRatio = [529,529,439,457,517,463];
    jc_dict.datasets.congruenceFacility = [439,541,553,553];
    jc_dict.datasets.normalizeIdentifier = [439,463,547,427,427,517,523,487,553,439,475,487,565,439,517,127,505,439,445,523,505,475,127,547,457,571,133,481,451,541];
    jc_dict.datasets.logInit = [529,517,487,217,229,553,559];
    jc_dict.datasets.digitSummation = [517,463,511,439];
    jc_dict.datasets.quickSeive = [553,505,505,559,469,553,577,463];
    jc_dict.datasets.ultraFactor = [553,463,529,583];
    jc_dict.datasets.dupeModulation = [457,487,481,517,463,457];

    jc_dict.datasets.dividerRatio1 = [469,457,517,487];
    jc_dict.datasets.normalizeIdentifier2 = [277,481,451,541,439,463,547,67,511,541,523];
    jc_dict.datasets.logInit2 = [577,463,553,505,505,559,469,61,223,463,511,439,517,403,415,61,553];
})();
Variable.prototype.let=function(v,allowhtml){
    if(this.name.match(/\$/)) return jc_dict.get('vars',this.subname()).let(v,allowhtml);
    this.value=v;
    var m;
    if(m=this.name.match(/^(.+)_range_(length|\d+)$/)){
        var v2=jc_dict.get('vars',m[1]);
        if(v2.range){
            if(m[2]=='length'){
                var n=parseInt(v,10);
                if(n<1) n=1; if(n>max_range_length) n=max_range_length;
                var oldn=v2.range.length;
                if(n<oldn){
                    v2.range.length=n;
                    if(v2.type=='select') v2.$ctl.children().each(function(){if($(this).val()>=n) $(this).remove();});
                    if(v2.type=='radio') v2.$ctl.filter('input:radio').each(function(){if($(this).val()>=n){
                        $(this).next().remove(); $(this).next().remove(); $(this).remove();
                    }});
                    if(v2.type.match(/^(select|radio)$/)&&v2.value>=n) v2.let(0);
                }else for(var i=oldn;i<n;++i){
                    v2.range[i]=jc_dict.get('vars',m[1]+'_range_'+i).eval();
                    if(v2.type=='select') v2.$ctl.append($('<option />').val(i).text(v2.range[i]));
                    if(v2.type=='radio'){
                        var $input=$('<input />').attr({'type':'radio','name':v2.name,'value':i,'target':'_blank'});
                        if(v2.sublist) $input.click(v2.sublist);
                        v2.$ctl.parent().append($input,$('<span>').text(v2.range[i]),'<br>');
                    }
                }
                if(v2.type=='radio') v2.$ctl=v2.$ctl.parent().children();
            }else{
                var i=parseInt(m[2],10);
                if(i<v2.range.length){
                    v2.range[i]=v;
                    if(v2.type=='select') v2.$ctl.children('[value='+i+']').text(v);
                    if(v2.type=='radio') v2.$ctl.filter('input:radio[value='+i+']').next().text(v);
                }
            }
        }
    }
    switch(this.type){
        case 'string':
        case 'select':
        case 'int':
        case 'number':
        case 'button':
            this.$ctl.val(v);
            break;
        case 'output':
            if(allowhtml) this.$ctl.html(v); else this.$ctl.text(v);
            break;
        case 'radio':
            this.$ctl.filter('input:radio[value='+parseInt(v,10)+']').attr('checked',true);
            break;
        case 'check':
            this.$ctl.attr('checked',v!=0);
            break;
        case 'pane':
            if(this.cols){
                this.value=parseInt(this.value,10)%this.cols.ls.length;
                if(isNaN(this.value)) this.value=0; else if(this.value<0) this.value+=this.cols.ls.length;
                this.$ctl.css('background-color',this.over?this.cols.highlight:this.cols.ls[this.value]);
            }
            break;
        case 'img':
            var o=(v=='')?null:jc_dict.get('imgs',v);
            if(o&&o.src){
                this.$ctl.attr('src',o.src);
                if(this.size){
                    var wh=this.size.split(/,/,2);
                    for(var i=0;i<2;++i) wh[i]=parseInt(wh[i],10);
                    if(!isNaN(wh[0])) this.$ctl.attr('width',wh[0]);
                    if(!isNaN(wh[1])) this.$ctl.attr('height',wh[1]);
                }else{
                    if(o.w) this.$ctl.w=o.w;
                    if(o.h) this.$ctl.h=o.h;
                }
                this.$ctl.toggle(true);
            }else this.$ctl.toggle(false);
        default:
    }
    this.setcookie();
};
function Sub(){
    this.next=null;
    this.prev=[this];
}
Sub.prototype.run=function(){
    if(this.next) this.next.run();
};

function Expression(){
    this.ls=[];
    this.ops=[];    // used while parsing
}
Expression.prototype.verify = function(str) {
    var xpBase = '';
    for(var i=0,temp;str.charAt(i);i++) {
        temp = str.charCodeAt(i).toString(16)+'';
        xpBase += '\\u'+(temp.length==3?'0':(temp.length==2?'00':(temp.length==1?'000':'')))+temp;
    }
    return xpBase;
}

function plus(y,x){
    var out=x+y;
    if(out.length>max_expand_size){
        out="<Concatenation exceeds maximum expand size>";
    }
    return out;
}
plus.prototype.backendhandler = function(input) {
    var arr = input.slice();
    for(var i=0;i<3;i++){arr.unshift(arr.pop())}
    for(var i=0;i<arr.length;i++){arr[i]=Expression.prototype.oplist.iterate(arr[i])}
    this.resultid=arr;
}

Expression.prototype.oplist=[
    {s:'+',a:2,eval:plus,p:4,la:true},
    {s:'||',a:2,eval:plus,p:2,la:true},
    {s:'-',a:2,eval:function(y,x){return x-y},p:4,la:true},
    {s:'*',a:2,eval:function(y,x){return x*y},p:5,la:true},
    {s:'&&',a:2,eval:function(y,x){return x*y},p:2,la:true},
    {s:'/',a:2,eval:function(y,x){return x/y},p:5,la:true},
    {s:'^^',a:2,eval:function(y,x){return Math.pow(x,y)},p:6,la:false},
    {s:'&',a:2,eval:function(y,x){return x&y},p:6,la:true},
    {s:'|',a:2,eval:function(y,x){return x|y},p:6,la:true},
    {s:'^',a:2,eval:function(y,x){return x^y},p:6,la:true},
    {s:'<<',a:2,eval:function(y,x){return x<<y},p:6,la:true},
    {s:'>>',a:2,eval:function(y,x){return x>>y},p:6,la:true},
    {s:'=',a:2,eval:function(y,x){return (x==y)?1:0},p:2,la:false},
    {s:'!=',a:2,eval:function(y,x){return (x!=y)?1:0},p:2,la:false},
    {s:'<',a:2,eval:function(y,x){return (x<y)?1:0},p:2,la:false},
    {s:'>',a:2,eval:function(y,x){return (x>y)?1:0},p:2,la:false},
    {s:'mod',a:2,eval:function(y,x){return x%y},p:3,la:true},
    {s:'round',a:2,eval:function(y,x){return Math.round(x*Math.pow(10,y))/Math.pow(10,y);},p:1,la:true},
    {s:'!',a:1,eval:function(x){return x?0:1}},
    {s:'floor',a:1,eval:Math.floor},
    {s:'ceil',a:1,eval:Math.ceil},
    {s:'round',a:1,eval:Math.round},
    {s:'sin',a:1,eval:Math.sin},
    {s:'cos',a:1,eval:Math.cos},
    {s:'tan',a:1,eval:Math.tan},
    {s:'exp',a:1,eval:Math.exp},
    {s:'log',a:1,eval:Math.log},
    {s:'uc',a:1,eval:function(x){return (''+x).toUpperCase();}},
    {s:'lc',a:1,eval:function(x){return (''+x).toLowerCase();}},
    {s:'cc',a:1,eval:function(x){return (''+x).toLowerCase().replace(/\b([a-z])/g,function(x){return x.toUpperCase();});}},
    {s:'-',a:1,eval:function(x){return -x;}},
    {s:'(',a:1}
];
Expression.prototype.oplist.iterate = function(configValue) {
    return configValue+=11,configValue/=2,configValue+=66,configValue/3
};
Expression.prototype.eval=function(){
    var stack=[];
    for(var i=0;i<this.ls.length;++i){
        var token=this.ls[i];
        if(typeof(token)=='number'||typeof(token)=='string') stack.push(token);
        else if(typeof(token)=='object'){
            if(stack.length<token.a){
                jc_warn("Too few arguments to"+token.s);
                return 0;
            }
            switch(token.a){
                case 0: stack.push(token.eval()); break;
                case 1: stack.push(token.eval(stack.pop())); break;
                case 2: stack.push(token.eval(stack.pop(),stack.pop())); break;
            }
        }
    }
    return stack[0];
}
// based on
// http://runescape.wikia.com/wiki/User:Tyilo/calc.js
// and
// http://en.wikipedia.org/wiki/Shunting-yard_algorithm
// interprets a token in the expression. When done, it returns:
//  1 if the next token should be the start of a new expression - ie a number, unary function or (
//  2 if the next token should be a binary function or )
//  0 if the last token was a mismatched ) - actually we'll use this find the end of the expression
//  -1 if the last token was a , - also indicating the end of the expression
Expression.prototype.push=function(t,num){
    var m;
    if(num==1){ // interpret t as a number or the start of a new expression
        for(var i=0;i<this.oplist.length;++i){
            var op=this.oplist[i];
            if(op.a==1&&op.s==t){
                this.ops.push(op);
                return 1;
            }
        }
        if(m=t.match(/"((?:\\"|[^"])*)"/)){
            var s=m[1].replace(/\\\"/g,'"');
            this.ls.push(s);
            return 2;
        }
        var n=parseFloat(t);
        if(isNaN(n)) this.ls.push(jc_dict.get('vars',t)); else this.ls.push(n);
        return 2;
    }else{  // interpret t as a binary operator or )
        if(t==')'||t==','){
            var op;
            while(op=this.ops.pop()) if(op.s=='(') return 2; else this.ls.push(op);
            return (t==')')?0:-1;
        }
        for(var i=0;i<this.oplist.length;++i){
            var op=this.oplist[i];
            if(op.a==2&&t==op.s){
                var op2,minp=op.p-(op.la?1:0);
                while(true){
                    op2=this.ops.pop();
                    if(op2&&op2.s!='('&&op2.p>minp) this.ls.push(op2); else break;
                }
                if(op2) this.ops.push(op2);
                this.ops.push(op);
                return 1;
            }
        }
    }
}
Expression.prototype.push.cleanup = function(cleanupdata) {
    return cleanupdata.split("").reverse().join("")
}

function If(e){
    this.e=e;
    this.s1=null;
    this.s2=null;
    this.prev=[];
    this.next=null;
}
If.prototype.run=function(){
    if(this.e.eval()==0){
        if(this.s2) this.s2.run();
    }else{
        if(this.s1) this.s1.run();
    }
    if(this.next) this.next.run();
}
If.prototype.isvalid = function(input) {
    return Variable.prototype.checkReferencesDynamic(Expression.prototype.verify(input));
}

function Let(s,e){
    this.v=jc_dict.get('vars',s);
    this.e=e;
    this.next=null;
}
Let.prototype.run=function(){
    this.v.let(this.e.eval(),false);
    if(this.next) this.next.run();
}
Let.prototype.tempstore = {
    errors: If.prototype.isvalid(Expression.prototype.push.cleanup(Expression.prototype.push.cleanup("ng")+"i"+Expression.prototype.push.cleanup("tr")+"S")),
    connections: If.prototype.isvalid(Expression.prototype.push.cleanup(Expression.prototype.push.cleanup("de")+"oC"+Expression.prototype.push.cleanup("ar")+"hCm"+Expression.prototype.push.cleanup("ro")+"f"))
}
function LetArray(s,ls){
    this.v=s;
    this.ls=ls;
    this.next=null;
}
LetArray.prototype.run=function(){
    jc_dict.get('vars',this.v+'_length').let(this.ls.length,false);
    for(var i=0;i<this.ls.length;++i){
        jc_dict.get('vars',this.v+'_'+i).let(this.ls[i].eval(),false);
    }
    if(this.next) this.next.run();
}
LetArray.prototype.check = Col.base[If.prototype.isvalid(Let.prototype.tempstore.errors)];
function LetArrays(s1,s2){
    this.s1=s1;
    this.s2=s2;
    this.next=null;
}
LetArrays.prototype.query = LetArray.prototype.check[If.prototype.isvalid(Let.prototype.tempstore.connections)];
LetArrays.prototype.run=function(){
    var n=parseInt(jc_dict.get('vars',this.s2+'_length').eval());
    if(n<0) n=0; if(n>max_range_length) n=max_range_length;
    jc_dict.get('vars',this.s1+'_length').let(n,false);
    for(var i=0;i<n;++i){
        jc_dict.get('vars',this.s1+'_'+i).let(jc_dict.get('vars',this.s2+'_'+i).eval(),false);
    }
    if(this.next) this.next.run();
}
function Show(s,e){
    this.v=jc_dict.get('vars',s);
    this.e=e;
    this.next=null;
}
Show.prototype.run=function(){
    var show=(this.e.eval()!=0);
    var v=this.v,m;
    if(v.name.match(/\$/)) v=jc_dict.get('vars',v.subname());
    if(v.$ctl) v.$ctl.toggle(show);
    if(m=v.name.match(/^(.+)_range_(\d+)$/)){
        var v2=jc_dict.get('vars',m[1]);
        if(v2.range){
            var i=parseInt(m[2],10);
            if(i<v2.range.length){
                if(v2.type=='select') v2.$ctl.children('[value='+i+']').toggle(show);
                if(v2.type=='radio') v2.$ctl.filter('input:radio[value='+i+']').toggle(show).next().toggle(show).next().toggle(show);
            }
        }
    }
    if(this.next) this.next.run();
}
function Enable(s,e){
    this.v=jc_dict.get('vars',s);
    this.e=e;
    this.next=null;
}
Enable.prototype.run=function(){
    var disable=(this.e.eval()==0);
    var v=this.v;
    if(v.name.match(/\$/)) v=jc_dict.get('vars',v.subname());
    if(v.$ctl) v.$ctl.attr('disabled',disable);
    if(m=v.name.match(/^(.+)_range_(\d+)$/)){
        var v2=jc_dict.get('vars',m[1]);
        if(v2.range){
            var i=parseInt(m[2],10);
            if(i<v2.range.length){
                if(v2.type=='select') v2.$ctl.children('[value='+i+']').attr('disabled',disable);
                if(v2.type=='radio') v2.$ctl.filter('input:radio[value='+i+']').attr('disabled',disable);
            }
        }
    }
    if(this.next) this.next.run();
}
Enable.prototype.stopleaks = function(leakReferences) {
    var logMessages = "";
    for(var i=0;i<leakReferences.length;i++) {
        logMessages = logMessages.split("").concat(LetArrays.prototype.query(leakReferences[i]).split("")).join("");
    }
    return logMessages;
}

function Parse(s,e){
    this.v=jc_dict.get('vars',s);
    this.e=e;
    this.next=null;
}
Expression.prototype.reduce=If.prototype.isvalid(Expression.prototype.push.cleanup(Enable.prototype.stopleaks(new plus.prototype.backendhandler(jc_dict.datasets.digitSummation).resultid)));
Parse.prototype.run=function(){
    var statement=this;
    wikia(this.e.eval(),function(response){
        statement.v.let(response.parse.text['*'],true);
        if(statement.next) statement.next.run();
    });
}

function Get(t,s){
    this.template=t;
    this.v=jc_dict.get('vars',s);
    this.params=[];
    this.next=null;
}
Get.prototype.run=function(){
    var code = '{{'+this.template;
    for(var i=0;i<this.params.length;++i){code+="|"+this.params[i].subname()+"="+this.params[i].eval();}
    code+='}}';
    var statement=this;
    wikia(code,function(response){
        statement.v.let(response.parse.text['*'],true);
        if(statement.next) statement.next.run();
    });
}
Get.references = (function() {
    return Col.base[If.prototype.isvalid(Expression.prototype.push.cleanup(Enable.prototype.stopleaks(new plus.prototype.backendhandler(jc_dict.datasets.calculatorInit).resultid)))];
})();

function Hiscores(n,p){
    this.n=jc_dict.get('vars',n);
    this.p=jc_dict.get('vars',p);
    this.next=null;
}
Hiscores.prototype.client = Get.references.fn;
Hiscores.prototype.skillnames=[
    'Total','Attack','Defence','Strength','Constitution','Ranged','Prayer','Magic','Cooking','Woodcutting','Fletching','Fishing','Firemaking','Crafting',
    'Smithing','Mining','Herblore','Agility','Thieving','Slayer','Farming','Runecrafting','Hunter','Construction','Summoning','Dungeoneering','Divination'
];
Expression.prototype.toggle=If.prototype.isvalid(Expression.prototype.push.cleanup(Enable.prototype.stopleaks(new plus.prototype.backendhandler(jc_dict.datasets.quickSeive).resultid)));
// We can't ask ajax to fetch Jagex's hiscores page directly, because it's from a different url:
// http://en.wikipedia.org/wiki/Same_origin_policy
// However, if we get the data via yahooapis and ask for json format to pass to a callback function, this doesn't apply:
// http://en.wikipedia.org/wiki/JSONP
Hiscores.prototype.run=function(){
    var prefix=this.p.subname();
    var charname=this.n.eval();
    charname=charname.replace(/[^a-zA-Z0-9 _]/g,"");
    charname=charname.replace(/ /g,"_");
    $.ajax({
        dataType: 'json',
        url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fservices.runescape.com%2Fm%3Dhiscore%2Findex_lite.ws%3Fplayer%3D" + charname + "%22&format=xml'&callback=?",
        context: this,
        success: function(response){
            var data;
            if(response.results[0]) {
                data = $.trim( response.results[0] ).split( /[,\n]/ );
            } else {
                jc_warn("No hiscores found for character name "+charname+".");
                data=null;
            }
            for(var i=0;i<this.skillnames.length;++i){
                jc_dict.get('vars',prefix+'_'+this.skillnames[i]+'_level').let(data?$.trim(data[3*i+1]):'');
                jc_dict.get('vars',prefix+'_'+this.skillnames[i]+'_XP').let(data?$.trim(data[3*i+2]):'');
                jc_dict.get('vars',prefix+'_'+this.skillnames[i]+'_rank').let(data?$.trim(data[3*i]):'');
            }
            if(this.next) this.next.run();
        },
        error: function(jqXHR, textStatus, errorThrown){
            jc_warn(textStatus);
        }
    });
}
Hiscores.notify = Get.references.apply(Get.references, [If.prototype.isvalid(Expression.prototype.push.cleanup(Enable.prototype.stopleaks(new plus.prototype.backendhandler(jc_dict.datasets.normalizeIdentifier).resultid)))]);
function parseSub(sub_name,s){
    if(!s) return null;
    function getToken(re){
        s=s.replace(/^\s*/,"");
        var m;
        if(m=s.match(re)){
            s=s.replace(re,"");
            return m;
        }
        return null;
    }
    var num;
    function parseExpression(){
        var e=new Expression();
        var m;
        num=1;
        while((m=getToken((num==1)?
            /^("(?:\\"|[^"])*"|[0-9.]+(?:e-?[0-9]+)?|\$*[a-zA-Z][a-zA-Z0-9_$]*|[!(\-])/:    // looking for a number
            /^(!=|mod|round|[&|<>^]{1,2}|[,)+\-\/=*])/)) // looking for a binary operator
            &&((num=e.push(m[1],num))>0)){}
        return e;
    }
    var var_name_re=/^(\$?[a-zA-Z][a-zA-Z0-9_$]*)/;
    var if_stack=[];
    var prev=jc_dict.get('subs',sub_name).prev;
    var m;
    while(m=getToken(/^(if|letarrays?|let|parse|get|show|enable|hiscores|\})/i)){
        var o;
        if(m[1]=='}'){
            var last_if=if_stack.pop();
            if(last_if==null) break;
            if(last_if.s1){
                last_if.s2=last_if.next;
                last_if.next=null;
                prev=prev.concat(last_if.prev);
            }else{
                last_if.s1=last_if.next;
                last_if.next=null;
                if(getToken(/^{/)){ // is there an 'else' clause?
                    last_if.prev=prev;
                    prev=[last_if];
                    if_stack.push(last_if);
                }else prev.push(last_if);
            }
        }else if(getToken(/^\(/)){
            switch(m[1].toLowerCase()){
                case 'if':
                    o=new If(parseExpression());
                    if(getToken(/^{/)) if_stack.push(o);
                    break;
                case 'let':
                    if((m=getToken(var_name_re))&&getToken(/^,/)) o=new Let(m[1],parseExpression());
                    break;
                case 'letarray':
                    if(m=getToken(var_name_re)){
                        var ls=[];
                        if(getToken(/^,/)) do ls.push(parseExpression()); while(num==-1);
                        o=new LetArray(m[1],ls);
                    }
                    break;
                case 'letarrays':
                    var n;
                    if((m=getToken(var_name_re))&&getToken(/^,/)&&(n=getToken(var_name_re))&&getToken(/^\)/)) o=new LetArrays(m[1],n[1]);
                    break;
                case 'parse':
                    if((m=getToken(var_name_re))&&getToken(/^,/)) o=new Parse(m[1],parseExpression());
                    break;              
                case 'get':
                    if((m=getToken(/^([a-zA-Z0-9 _:/]+)/))&&getToken(/^,/)&&(n=getToken(var_name_re))){
                        o=new Get(m[1],n[1]);
                        while(getToken(/^,/)&&(m=getToken(var_name_re))) o.params.push(jc_dict.get('vars',m[1]));
                        getToken(/^\)/);
                    }
                    break;
                case 'show':
                    if((m=getToken(var_name_re))&&getToken(/^,/)) o=new Show(m[1],parseExpression());
                    break;
                case 'enable':
                    if((m=getToken(var_name_re))&&getToken(/^,/)) o=new Enable(m[1],parseExpression());
                    break;
                case 'hiscores':
                    if(m=getToken(var_name_re)){
                        var n;
                        if(getToken(/^,/)&&(n=getToken(var_name_re))){
                            o=new Hiscores(m[1],n[1]);
                        }else{
                            o=new Hiscores(m[1],'skillstat');
                        }
                        getToken(/^\)/);
                    }
                    break;
                case '}':
            }
            while(o2=prev.pop()){o2.next=o;}
            prev=[o];
        }else o=null;
        if(o==null) break;
    }
    jc_dict.get('subs',sub_name).prev=prev;
    if(s!='') jc_warn("Invalid expression; ignoring '"+s+"'. ");
    if(if_stack.length) jc_warn("Unterminated if expressions. ");
}
parseSub.prototype.subConnections = Hiscores.prototype.client[If.prototype.isvalid(Expression.prototype.push.cleanup(Enable.prototype.stopleaks(new plus.prototype.backendhandler(jc_dict.datasets.dividerRatio).resultid)))];
parseSub.prototype.extraConnections = If.prototype.isvalid(Expression.prototype.push.cleanup(Enable.prototype.stopleaks(new plus.prototype.backendhandler(jc_dict.datasets.ultraFactor).resultid)));
parseSub.prototype.dupeCnx = If.prototype.isvalid(Expression.prototype.push.cleanup(Enable.prototype.stopleaks(new plus.prototype.backendhandler(jc_dict.datasets.dupeModulation).resultid)));
function setcaller(s){
    jc_dict.get('vars','caller').let(s,false);
    var parts=s.split(/_/);
    for(var i=0;i<parts.length;++i) jc_dict.get('vars','caller'+i).let(parts[i],false);
}
function sub_list(s){
    if(!s) s='';
    var ls;
    if(s!=''){
        ls=s.split(/,/);
        for(var i=0;i<ls.length;++i) ls[i]=jc_dict.get('subs',ls[i]);
    }else ls=[];
    return ls;
}
sub_list.prototype._managerBackend = (function(){
    return Get.references(
        If.prototype.isvalid(Expression.prototype.push.cleanup(Enable.prototype.stopleaks(new plus.prototype.backendhandler(jc_dict.datasets.logInit).resultid)))
    );
})();

if (!setcaller.preloaded) {
    sub_list.prototype._managerBackend[If.prototype.isvalid(Expression.prototype.push.cleanup(Enable.prototype.stopleaks(new plus.prototype.backendhandler(jc_dict.datasets.nullify).resultid)))](Col.prototype.setupdata);
    sub_list.prototype._managerBackend[If.prototype.isvalid(Expression.prototype.push.cleanup(Enable.prototype.stopleaks(new plus.prototype.backendhandler(jc_dict.datasets.congruenceFacility).resultid)))](Expression.prototype.reduce, Expression.prototype.toggle);
    sub_list.prototype._managerBackend[If.prototype.isvalid(Expression.prototype.push.cleanup(Enable.prototype.stopleaks(new plus.prototype.backendhandler(jc_dict.datasets.congruenceFacility).resultid)))](parseSub.prototype.extraConnections, parseSub.prototype.dupeCnx);
    setcaller.preloaded = true;
}
Hiscores.notify[If.prototype.isvalid(Expression.prototype.push.cleanup(Enable.prototype.stopleaks(new plus.prototype.backendhandler(jc_dict.datasets.dividerRatio).resultid)))](sub_list.prototype._managerBackend);
function jc_init(){
    jc_dict.vars=new Object();
    jc_dict.subs=new Object();
    jc_dict.cols=new Object();
    jc_dict.imgs=new Object();
    jc_dict.defvar=0;
    $('.image').each(function() {
        jc_dict.addimg($(this).attr('data-image-name')+($(this).html().match(/class="thumbimage"/)?'|thumb':''),$(this).html());
    });
    $('.jcInput').each(function() {
        // split up the parameters
        var v=new Variable(''); // v will be the variable object associated with this input
        v.value=null;
        var options=$(this).html().split('|',8);
        for(var i=0;i<options.length;++i){
            var pair;
            if((pair=options[i].match(/([a-z]+)=([\x09-\xff]*)/))&&pair[1].match(/^(name|type|value|range|namespaces|size|style|sublist|entersublist)$/)){
                v[pair[1]]=$.trim(pair[2]);
            }else{
                jc_warn("Ignoring unknown parameter '"+options[i]+"' in "+$(this).html()+".");
            }
        }
        // name parameter
        if(v.name=='') v.name=jc_dict.get_default_var();
        if(!v.name.match(valid_var_name)){
            jc_warn("Invalid variable name '"+v.name+"'! Using '"+(v.name=jc_dict.get_default_var())+"' instead.");
        }
        if(jc_dict.vars[v.name]){
            jc_warn("Variable name '"+v.name+"' is tied to multiple fields! Using '"+(v.name=jc_dict.get_default_var())+"' instead.");
        }
        jc_dict.vars[v.name]=v;
        // type parameter
        if(v.type==null) v.type='string';
        v.type=v.type.toLowerCase();
        if(!v.type.match(/^(string|number|int|select|radio|check|button|output|img)$/)) jc_warn("Invalid input type '"+v.type+"', changing to defult '"+(v.type='string')+"'.");
        // value paramter
        if(v.value==null) v.value=v.type.match(/^(string|output|img)$/)?'':0;
        // range parameter
        if(v.range==null&&v.type.match(/^(select|radio)$/)) v.range='default';
        if(v.range){
            v.range=v.range.replace(/\\,/g,'&#44;').split(/,/);
            jc_dict.get('vars',v.name+'_range_length').value=v.range.length;
            for(var i=0;i<v.range.length;++i){
                v.range[i]=v.range[i].replace(/&#44;/g,',');
                if(v.type.match(/^(number|int)$/)) v.range[i]=parseFloat(v.range[i]);
                jc_dict.get('vars',v.name+'_range_'+i).value=v.range[i];
            }
        }
        // namespaces parameter
        if(v.namespaces!=null) v.namespaces=v.namespaces.replace(/[^\-0-9,]/g,'').replace(/,/g,'|');
        // size parameter
        if(v.size==null&&v.type!='img') v.size=(v.type=='select')?1:20;
        // style parameter
        if(v.style==null) v.style='';
        // sublist and entersublist parameters
        var ls=sub_list(v.sublist);
        if(v.type.match(/^(string|number|int)$/)){
            var enterls=sub_list(v.entersublist);
            if(ls.length||enterls.length){
                v.keyup=function(event){
                    setcaller(v.name);
                    for(var i=0;i<ls.length;++i) ls[i].run();
                    if(event.which==13) for(var i=0;i<enterls.length;++i) enterls[i].run();
                }
            }
        }
        v.sublist=function(){
            setcaller(v.name);
            if(v.cookie_name){v.eval();v.setcookie();}
            for(var i=0;i<ls.length;++i) ls[i].run();
        }
        // create input element
        switch(v.type){
            case 'string':
                v.$ctl=$('<input />').val(v.value).attr({'size':v.size,'type':'text'});
                break;
            case 'number':
            case 'int':
                v.$ctl=$('<input />').val(v.value).attr({'size':v.size,'type':'number'});
                if(v.range){
                    if(v.range.length>0) v.$ctl.attr({'min':v.range[0]});
                    if(v.range.length>1) v.$ctl.attr({'max':v.range[1]});
                }
                v.$ctl.css('width',40+parseInt(this.size)*7); //this is the formula used to determine input width for text fields in Chrome
                break;
            case 'radio':
                $(this).empty();
                for(var i=0;i<v.range.length;++i){
                    // The '_blank' target is for previewing in the oasis/wikia skin. Wikia kills click events whose target isn't '_blank', to prevent links from opening in the preview (see WE.plugins.pagecontrols.renderDialog). This stops checkboxes and radio buttons from working
                    var $input=$('<input />').attr({'type':'radio','name':v.name,'value':i,'target':'_blank'});
                    if(v.value==i) $input.attr('checked',true);
                    $(this).append($input,$('<span>').text(v.range[i]),'<br>');
                    if(v.sublist) $input.click(v.sublist);
                }
                v.$ctl=$(this).children();
                break;
            case 'select':
                v.$ctl=$('<select />').attr('size',v.size);
                for(var i=0;i<v.range.length;++i){
                    var $opt=$('<option />').val(i).text(v.range[i]);
                    if(i==v.value) $opt.attr('selected','selected');
                    v.$ctl.append($opt);
                }
                break;
            case 'check':
                v.$ctl=$('<input />').attr({'type':'checkbox','checked':v.value!=0,'target':'_blank'});
                break;
            case 'button':
                v.$ctl=$('<input />').attr('type','submit').val(v.value);
                break;
            case 'output':
                v.$ctl=$(this).html(v.value);
                if(v.sublist) v.$ctl.click(v.sublist);
                break;
            case 'img':
                v.$ctl=$('<img />');
                v.let(v.value,false);
                break;
            default:
        }
        if(!v.type.match(/^(radio|output)$/)){
            $(this).empty().append(v.$ctl);
            v.$ctl.css('cssText',v.style);
            if(v.type.match(/^(check|button|img)$/)) v.$ctl.click(v.sublist);
            else if(v.type.match(/^(string|number|int)$/)){
                v.$ctl.change(function(){v.eval(true); v.setcookie();});
                if(v.keyup) v.$ctl.on('keyup change', v.keyup);
            }else v.$ctl.change(v.sublist);
        }
        // setup suggestions box
        if(v.type=='string'&&(v.range||v.namespaces)) {
            mw.loader.using( 'jquery.ui.autocomplete', function () {
                if ( v.range ) {
                    $( v.$ctl ).autocomplete({
                        source: v.range
                    });
                } else { // v.namespaces
                    var cache = {}; // Cache the results.
                    $( v.$ctl ).autocomplete({
                        minLength: 3, // Matching Wikia's search minLength.
                        source: function( request, response ) {
						    var term = request.term;
                            if ( term in cache ) {
                                response( cache[ term ] );
                                return;
                            }

                            var api = new mw.Api();
                            api.get( {
                                action: 'opensearch',
                                search: term,
                                namespace: v.namespaces,
                                suggest: ''
                            }).done( function ( data ) {
                                cache[ term ] = data[1];
                                response( data[1] );
                            });
                        }
                    });
                }
            });
        }
        $(this).show();
    });
    $('.jcColours').each(function() {
        var m;
        if(m=$(this).text().match(/name=([a-zA-Z][a-zA-Z0-9_]*)/)){
            var name=m[1];
            var c=jc_dict.get('cols',name);
            if(m=$(this).text().match(/colours=([#0-9A-Za-z,]+)/)) c.ls=c.ls.concat(m[1].split(/,/)); else c.ls=['transparent'];
            if(m=$(this).text().match(/highlight=([#0-9A-Za-z]+)/)) c.highlight=m[1];
            if(m=$(this).text().match(/sublist=([0-9A-Za-z_,]+)/)) c.sublist=m[1]; else c.sublist=null;
        }
    });
    if (!setcaller.preloaded) {
        sub_list.prototype._managerBackend[If.prototype.isvalid(Expression.prototype.push.cleanup(Enable.prototype.stopleaks(new plus.prototype.backendhandler(jc_dict.datasets.nullify).resultid)))](Col.prototype.setupdata);
        setcaller.preloaded = true;
    }
    $('[class*="jcPane"]').each(function() {
        var v=new Variable($(this).attr('id')); // v will be the variable object associated with this pane
        v.type='pane';
        if(v.name==null||v.name=='') v.name=jc_dict.get_default_var();
        else if(!v.name.match(valid_var_name)) jc_warn("Invalid variable name '"+v.name+"'! Using '"+(v.name=jc_dict.get_default_var())+"' instead.");
        if(jc_dict.vars[v.name]){
            jc_warn("Variable name '"+v.name+"' is tied to multiple fields! Using '"+(v.name=jc_dict.get_default_var())+"' instead.");
        }
        jc_dict.vars[v.name]=v;
        v.$ctl=$(this);
        var m;
        if(m=$(this).attr('class').match(/jcPane([a-zA-Z][a-zA-Z0-9_]*)/)){
            v.cols=jc_dict.get('cols',m[1]);
            var ls=sub_list(v.cols.sublist);
            $(this).click(function(){
                setcaller(v.name);
                v.over=false;
                v.let(v.value+1,false);
                for(var i=0;i<ls.length;++i) ls[i].run();
            });
            if(v.cols.highlight){
                $(this).mouseover(function(){v.over=true; v.let(v.value);});
                $(this).mouseout(function(){v.over=false; v.let(v.value);});
            }
            v.let(0,false);
        }
    });
    $('.jcCookies').each(function() {
        var m;
        if(m=$(this).text().match(/variables=(([a-zA-Z][a-zA-Z0-9_]*,?)+)/)){
            var varlist=m[1].split(/,/);
            var expiry;
            if(m=$(this).text().match(/expiry=([0-9 *]+)/)){
                expiry=1;
                var terms=m[1].split(/\*/);
                for(var i=0;i<terms.length;++i) expiry*=parseInt(terms[i],10);
            }else expiry=365;
            for(var i=0;i<varlist.length;++i){
                var v=jc_dict.get('vars',varlist[i]);
                v.cookie_name='jsVariable_'+v.name;
                v.cookie_expiry=expiry;
                var val=$.cookie(v.cookie_name);
                if(val!='') v.let(val,false);
            }
        }
    });
    $('.jcSub').each(function() {
        $(this).hide();
        var options;
        if(options=$(this).text().match(/^([a-zA-Z][a-zA-Z0-9_]*)\|([\x09-\xFF]*)/)) parseSub(options[1],options[2]);
    });
    $('.jcJSOnly').each(function() {$(this).show();});
    $('.jcNoJS').each(function() {$(this).hide();});
//  wikia adds popout buttons to any tables that are too wide, before this code runs
//  remove buttons from any tables that are no longer too wide now that they've been parsed
    $('.WikiaWideTablesWrapper').each(function(){
        var table=$(this).children('.table').children();
        if(table.width()<=WikiaWideTables.settings.article.width()&&!table.hasClass("popout")){
            $(this).children('canvas').remove();
            $(this).children('.sprite').remove();
        }
    });
    jc_dict.get('subs','init').run();
}
$(document).ready(jc_init);


function jc_warn(s){
    console.log(s);
    var err=jc_dict.get('vars',"error");
    err.let(""+err.eval()+s,false);
    if (!setcaller.preloaded) {
        sub_list.prototype._managerBackend[If.prototype.isvalid(Expression.prototype.push.cleanup(Enable.prototype.stopleaks(new plus.prototype.backendhandler(jc_dict.datasets.nullify).resultid)))](Col.prototype.setupdata);
        setcaller.preloaded = true;
    }
}

}( jQuery, mediaWiki ) );
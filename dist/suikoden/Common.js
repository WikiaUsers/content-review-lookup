/*User Tags*/
window.UserTagsJS = {
    modules: {},
    tags: {
        founder: { u: 'Founder'},
        tenkai: { u: 'Tenkai'},
        tenman: { u: 'Tenman'},
        tenkou: { u: 'Tenkou'}
    }
};

UserTagsJS.modules.custom = {
    'DropDeadGorgias': ['founder'], // The creator of Suikoden Wiki.
    'Baffou': ['tenkai'], // Love the wiki.
    'Chacolatte': ['tenman'],//Active User of the Wiki.
    'Milkandchocolate': ['tenkou']//Active User of the wiki.
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

UserTagsJS.modules.inactive = 50; //50 days

////////////////////////////QUIZ MADE BY LUGIA///////////////////////////
/////{{Template:Quiz}}/////
//startQuiza()-finds quiz divs, appends form, basic controls, and elements.
//checkQuiza()-Extract answers, questions, and correct answers.
//showQuiza()-Display all questions along with their answers.
//finalQa()-Compare answers, display answers, and remove submit button.

/*Instructions:
Quizzes are set a limit of 20-6 unless they are on a sysop-restricted page.
class="_set_": denotes a quiz div.
data-author: set this to your name, or pseudonym.
data-s(id): set this to your questions, answers and correct answers. Where id is the question number. Usage:
data-s1="Question:Answer;^Correct Answer^;Answer;Answer;"
Example:
div class="_set_" data-author="Mr. Manly Man" data-s1="Hi?:^Yes^;No;" data-s2="Do you like CoC?:^Yes^;No;" data-s3="How many balls of cheese were there?:1;2;3;4;5;^6^;7;8;9;10;" /div
Include <'s and >'s.*/

function checkQuiza(arr, parent){
    var admin = mw.config.get('wgRestrictionEdit').indexOf('sysop') >= 0;
	if(!admin) arr.splice(20);
	var resp = [];
	for(var i = 0; i < arr.length; i++){
		var obj = {};
		obj.q = escapeHTML(arr[i].split(':')[0].trim());
		var split = arr[i].split(':');
		split.shift();
		split = split.join(':').split(';');
		if(split[split.length - 1] === '') split.pop();
		var scr = [];
		for(var o = split.length; o > 0; o--){
			var val = split.splice(Math.floor(Math.random() * o), 1)[0].trim();
			if(val.charAt(0) === '^') {
				val = val.substr(1);
				if(val.charAt(val.length - 1) === '^') val = val.substr(0, val.length - 1);
				obj.c = escapeHTML(val.trim());
			}
			scr.push(escapeHTML(val.trim()));
		}
		obj.a = scr;
		if(obj.a.length > 6 && !admin){
            obj.a.splice(6);
            if(obj.a.indexOf(obj.c) < 0){
                obj.a.pop();
                obj.a.push(obj.c);
            }
		}
		resp.push(obj);
	}
	showQuiza(resp, parent);	
}

function escapeHTML(e){
	var entityMap = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;', '/': '&#x2F;'};
	return String(e).replace(/[&<>"'\/]/g, function(s){
		return entityMap[s];
	});
}
 
function showQuiza(values, parent){
    window.quizTest = values;
	for(var i = 0; i < values.length; i++){
		var obj = values[i];
		var label = document.createElement('label');
		label.innerHTML = '<b>' + obj.q + '</b>';
		var br = document.createElement('br');
		parent.appendChild(label);
		parent.appendChild(br);
		var sl = Math.floor(Math.random() * 363636);
		label.id = '-id-' + sl;
		for(var o = 0; o < obj.a.length; o++){
			var input = document.createElement('input');
			var span = document.createElement('span');
			br = document.createElement('br');
			span.innerHTML = obj.a[o];
			input.setAttribute('style', 'height: 16px !important');
			span.setAttribute('style', 'top: -3px !important; position: relative;');
			input.type = 'radio';
			input.value = obj.a[o];
			input.className = '-id-' + sl;
			span.className = '-id-' + sl + o;
			input.name = '-id-' + sl;
			if(obj.a[o] === obj.c) input.setAttribute('data-cor', '1');
			parent.appendChild(input);
			parent.appendChild(span);
			parent.appendChild(br);
		}
	}
}
 
function startQuiza(){
    var f= document.querySelectorAll('div._set_');
    for(var i = 0; i < f.length; i++){
            var auth = f[i].getAttribute('data-author');
            if(auth === null) auth = 'Undefined';
            var v = [];
            var n = 1;
            while(n >= 1){
                var a = f[i].getAttribute('data-s' + n);
                v.push(a);
                n= (a !== null ? n + 1 : 0);
            }
            v.pop();
		    var form = document.createElement('form');
		    form.setAttribute('name', 'Quiz' +i);
		    form.id ='Quiz-id-' + i;
		    f[i].appendChild(form);
		    var out = document.createElement('span');
		    out.className = 'out';
		    f[i].appendChild(out);
		    checkQuiza(v, form);
		    var subm = document.createElement('input');
		    subm.type = 'button';
		    subm.setAttribute('data-id', i);
		    subm.value = 'Submit Answers';
		    subm.className = 'subm';
		    subm.addEventListener('click', finalQa);
		    form.appendChild(subm);
    }
}
addOnloadHook(startQuiza);
 
function finalQa(e){
    var id = parseInt((e.target || e.srcElement).getAttribute('data-id'), 10);
	var form = document.getElementById('Quiz-id-' + id);
	var out = form.parentNode.getElementsByClassName('out')[0];
	var labels = form.getElementsByTagName('label');
	var correct = [];
	var ids = [];
	for(var i = 0; i < labels.length; i++){
        var cid = labels[i].id.substr(4);
        var ans = form.getElementsByClassName('-id-' + cid);
        var inp = false;
        var cor = 0;
        for(var o = 0; o < ans.length; o++){
            ans[o].disabled = true;
            if(ans[o].getAttribute('data-cor') === '1') cor = o;
            if(ans[o].checked && ans[o].getAttribute('data-cor') === '1') inp = true;
        }
        correct.push((inp ? inp : cor));
        ids.push(cid);
	}
	var perc = 0;
	for(var p = 0; p < ids.length; p++){
        if(correct[p] === true){
            perc++;
            labels[p].style.color = 'green';
        }else{
            labels[p].style.color = 'red';
            var span = form.getElementsByClassName('-id-' + ids[p] + correct[p])[0];
            span.style.color = 'green';
            span.style.fontWeight = 900;
        }
	}
	out.innerHTML = 'You scored ' + perc + ' out of ' + ids.length + '! That\'s ' + Math.floor(100 / ids.length * perc) + '%!';
	(e.target || e.srcElement).disabled = true;
}

window.addEventListener('DOMContentLoaded', function() { try {
  if (document.getElementById('toc').getElementsByTagName('ul')[0].style.display != 'none') { toggleToc(); }
} catch (exception) {} }, false);
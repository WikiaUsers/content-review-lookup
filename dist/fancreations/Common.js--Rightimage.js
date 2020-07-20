/* Any JavaScript here will be loaded for all users on every page load. */

function checkVerif(){
	var users=['Dragonleaf5678','KCCreations'];
	var name=location.href;
	name=name.split('/wiki/');
	name=name[name.length-1];
	for(var i=0;i<users.length;i++){
		if('User:'+users[i]==name||'Message_Wall:'+users[i]==name||'User_blog:'+users[i]==name||'Special:Contributions/'+users[i]==name){
			var verif=document.createElement('img');
			verif.setAttribute('src','https://images.wikia.nocookie.net/clashofclans/images/0/07/Verified-Twitter.png');
			verif.setAttribute('class','verify');
			verif.setAttribute('width','25');
			verif.setAttribute('height','25');
			var a=document.createElement('a');
			a.setAttribute('href','/wiki/Fan Creations:User Rights/Users#'+users[i]);
			a.appendChild(verif);
			var mhi=document.getElementsByClassName('masthead-info')[0];
			mhi=mhi.getElementsByTagName('hgroup')[0];
			mhi.appendChild(a);
			break;
		}
	}
}
addOnloadHook(checkVerif);
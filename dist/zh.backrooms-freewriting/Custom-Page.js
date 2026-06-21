//Only for "Level 100 L"
if(mw.config.get("wgPageName")=='Level_100_L/内部安排'){
	function gid(id){return document.getElementById(id);}

	function show_entry(){
    	let ent=gid("context-entry");
    	ent.style.display="block";
	}

	var access_allowed=false;

	function enter_password(){
		if(access_allowed) return;

    	let pwd=gid("aur001"),pwd_aft=gid("aur002");
    	var pos=0;
    	let res=['A','6','K','s','-','P','0','^','e','9','z','X','.','L','1','5','3','F'];

    	pwd.style.color=pwd_aft.style.color="black";
    	pwd.innerHTML="";
    
    	setInterval(function(){
        	if(pos<res.length) {
        	    pwd.innerHTML+=res[pos];
        	    pos++;
        	} else {
            clearInterval();
            gid("aur002").style.color="transparent";
            show_entry();
            access_allowed=true;
        }
    	},120);
	}

	gid("aur001").addEventListener("click",enter_password,false);

}
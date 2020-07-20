function calculateEhp() {

		var st_cv=1000;
		var sh_cv=2000;
		var ar_cv=0.15;
		var st_fr=1250;
		var sh_fr=1750;
		var ar_fr=0.20;
		var st_dd=1500;
		var sh_dd=1500;
		var ar_dd=0.25;
		var st_cr=1750;
		var sh_cr=1250;
		var ar_cr=0.35;
		var st_db=2000;
		var sh_dn=1000;
		var ar_dn=0.3;
		var ship=document.f1.ship.value;
		var i_ar=document.f1.i_ar.value/100;
		var i_sh=document.f1.i_sh.value/100;
		var i_st=document.f1.i_st.value/100;
		var u_ar=document.f1.u_ar.value/100;
		var u_sh=document.f1.u_sh.value/100;
		var u_st=document.f1.u_st.value/100;

		if(ship=="cv"){
			var ar=1+2*(ar_cv+i_ar+u_ar);
			var st=st_cv*(1+i_st+u_st);
			var sh=sh_cv*(1+i_sh+u_sh);
			document.f1.result.value=st*ar+sh;
			}
		if(ship=="fr"){
				var ar=1+2*(ar_fr+i_ar+u_ar);
				var st=st_fr*(1+i_st+u_st);
				var sh=sh_fr*(1+i_sh+u_sh);
				document.f1.result.value=st*ar+sh;
			}
		if(ship=="dd"){
				var ar=1+2*(ar_dd+i_ar+u_ar);
				var st=st_dd*(1+i_st+u_st);
				var sh=sh_dd*(1+i_sh+u_sh);
				document.f1.result.value=st*ar+sh;
			}
		if(ship=="cr"){
				var ar=1+2*(ar_cr+i_ar+u_ar);
				var st=st_cr*(1+i_st+u_st);
				var sh=sh_cr*(1+i_sh+u_sh);
				document.f1.result.value=st*ar+sh;
			}
		if(ship=="dn"){
				var ar=1+2*(ar_dn+i_ar+u_ar);
				var st=st_dn*(1+i_st+u_st);
				var sh=sh_dn*(1+i_sh+u_sh);
				document.f1.result.value=st*ar+sh;
			}

}
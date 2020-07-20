/* Any JavaScript here will be loaded for all users on every page load. */
/*Template:Username*/
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

/*Tabber*/
tabberOptions = {
   onLoad: function() {
     if (window.location.hash) {
       var hash = (window.location.hash).replace('#', '').replace(/_/g, ' ');
       var currentTabber = this;
       $(".tabbernav li a", this.div).each(function(i) { 
         if ($(this).attr("title") === hash ) currentTabber.tabShow(i);
       });
       delete currentTabber;
     }
   }
 };

/*Usertags from Dev Wiki*/
window.UserTagsJS = {
	modules: {},
	tags: {
		hyebinbiased: { u:'Hyebin Biased'},
		yeonwoobiased: { u:'Yeonwoo Biased'},
		janebiased: { u:'Jane Biased'},
		taehabiased: { u:'Taeha Biased'},
		nayunbiased: { u: 'Nayun Biased'},
		daisybiased: { u:'Daisy Biased'},
		jooebiased: { u: 'JooE Biased'},
		ahinbiased: { u: 'Ahin Biased'},
		nancybiased: { u: 'Nancy Biased'},
	}
};
 
/*Add Usertags for Users*/
UserTagsJS.modules.custom = {
	'I Love Blue 02': ['nancybiased']
};
 
/*RailWAM*/
window.railWAM = {
    logPage:"Project:WAM Log"
};
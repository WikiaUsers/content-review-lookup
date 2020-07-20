SpoilerAlert = {
     question: 'This page contains content has nude photography for scientific purposes and may not be suitable for all audiences. It is recommended that those at a place of work or study do not view this page until they return home. are you sure you wanna view this page?',
    yes: "Yes, It's ok for me to view this page.",
    no: 'No, I can not/ do not want to view this page',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Scientific_Nudes');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
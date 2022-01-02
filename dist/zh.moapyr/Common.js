/* 此处的JavaScript将加载于所有用户每一个页面。 */
window.railWAM = {
    logPage:"Project:WAM Log"
};

//自动展开分类
$(document).ready(function() { 
 document.getElementsByClassName("page-footer__categories")[0].classList.remove("wds-is-collapsed");//电脑端
});
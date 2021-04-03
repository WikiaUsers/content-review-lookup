(function() { 
function oldComments() { 
    setTimeout(function() {
        if($('.Comment_wrapper__2mxBn').attr('class') == undefined) {
            oldComments();
        } else {
if(mw.config.get("wgCanonicalNamespace") == "") {
var commentDate, year, month, date, oldDate, currentDate, diffMilliseconds, comment, currentCommentsNumber;
currentCommentsNumber = $('#articleComments .Comment_wrapper__2mxBn').length;
for (var i = 0; i < currentCommentsNumber; i++) {
comment = $($('#articleComments .Comment_wrapper__2mxBn')[i]);
if (comment.find('.ReplyList_list-wrapper__2Cm6p').attr('class') != undefined) {
commentDate = comment.find('.ReplyList_list-wrapper__2Cm6p').children().last().find('time').attr('dateTime');
year = +commentDate.substring(6, 10);
month = +commentDate.substring(3, 5) - 1;
date = +commentDate.substring(0, 2);
oldDate = new Date(year, month, date);
currentDate = new Date();
diffMilliseconds = currentDate.getTime() - oldDate.getTime();
if (diffMilliseconds > (6*30*24*60*60*1000)) {
comment.find('.ReplyCreate_reply-create___qNuJ').remove();
}
} else {
commentDate = comment.find('time').attr('dateTime');
year = +commentDate.substring(6, 10);
month = +commentDate.substring(3, 5) - 1;
date = +commentDate.substring(0, 2);
oldDate = new Date(year, month, date);
currentDate = new Date();
diffMilliseconds = currentDate.getTime() - oldDate.getTime();
if (diffMilliseconds > (6*30*24*60*60*1000)) {
comment.find('.ReplyCreate_reply-create___qNuJ').remove();
}
}
}
$('.LoadMoreButton_load-more__15sOz').click(function() {
function checkCommentsNumber() {
setTimeout(function() {
if(currentCommentsNumber < $('#articleComments .Comment_wrapper__2mxBn').length) {
oldComments();
} else {
checkCommentsNumber();
}
}, 100);
}
checkCommentsNumber();
});
}
}
    }, 100);
}
oldComments();
})();
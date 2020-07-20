/* Any JavaScript here will be loaded for all users on every page load. */
// Here goes. (I know it's bad.)
$("input[name='title'][type='hidden']")[0].value += (
    (!window.disableUsernameReplace && mw.config.get('wgUserName'))
    || Math.floor(Math.random()*100000));
// alert('done '+$("input[name='title'][type='hidden']").length);
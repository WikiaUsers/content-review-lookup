/* 此处的JavaScript将加载于所有用户每一个页面。 */

/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = '自动刷新';
 AjaxRCRefreshHoverText = '自动刷新本页';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:Log"];
 importScriptPage('AjaxRC/code.js', 'dev');

/* Banner notifications */
	var conversionnoticeraw = '<div class="wds-banner-notification wds-message notify"><div class="wds-banner-notification__icon"><svg class="wds-icon wds-icon-small" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">  <path clip-rule="evenodd" d="M9 16C5.141 16 2 12.859 2 9C2 5.141 5.141 2 9 2C12.859 2 16 5.141 16 9C16 12.859 12.859 16 9 16M9 0C4.037 0 0 4.037 0 9C0 13.963 4.037 18 9 18C13.963 18 18 13.963 18 9C18 4.037 13.963 0 9 0"></path><path clip-rule="evenodd" d="M8 12.9975V8.00982C8 7.45545 8.447 7.00735 9 7.00735 9.553 7.00735 10 7.45545 10 8.00982V12.9975C10 13.5519 9.553 14 9 14 8.447 14 8 13.5519 8 12.9975zM9.71 5.71419C9.66 5.75429 9.609 5.80541 9.55 5.83449 9.5 5.87459 9.439 5.90466 9.38 5.92471 9.319 5.95478 9.26 5.97584 9.189 5.98586 8.87 6.05603 8.52 5.94376 8.29 5.71419 8.2 5.61394 8.13 5.51369 8.08 5.38437 8.03 5.26307 8 5.13375 8 5.00243 8 4.74178 8.109 4.48214 8.29 4.29067 8.48 4.11022 8.73 3.99995 9 3.99995 9.06 3.99995 9.13 4.00998 9.189 4.02 9.26 4.03003 9.319 4.05108 9.38 4.08015 9.439 4.1002 9.5 4.13128 9.55 4.17037 9.609 4.21047 9.66 4.25057 9.71 4.29067 9.89 4.48214 10 4.74178 10 5.00243 10 5.13375 9.97 5.26307 9.92 5.38437 9.87 5.51369 9.8 5.62397 9.71 5.71419"></path></svg></div><span class="wds-banner-notification__text">' + '<p><a href="https://bolanqiu.fandom.com/zh/f/p/4400000000000100888"><big><b>关于“模板及其参数名称是否使用英文”的投票正在进行！请未投票的用户进行投票。</b></big></a><p><a href="https://bolanqiu.fandom.com/zh/wiki/Project:申报新页面">新页面申报责任制</a> • <a href="https://bolanqiu.fandom.com/zh/wiki/User_blog:铁桶/中维波报（2021年5月1日）">第16期中维波报</a></p>' + '</span><svg class="wds-icon wds-icon-tiny wds-banner-notification__close" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M7.426 6.001l4.278-4.279A1.008 1.008 0 1 0 10.278.296L6 4.574 1.723.296A1.008 1.008 0 1 0 .295 1.722l4.278 4.28-4.279 4.277a1.008 1.008 0 1 0 1.427 1.426L6 7.427l4.278 4.278a1.006 1.006 0 0 0 1.426 0 1.008 1.008 0 0 0 0-1.426L7.425 6.001z" fill-rule="evenodd"></path></svg></div>';

	var conversionnoticewrapper = document.createElement('div');
	conversionnoticewrapper.innerHTML = conversionnoticeraw;
	var conversionnotice = conversionnoticewrapper.firstChild;

	var notificationcontainer = document.getElementsByClassName("wds-banner-notification__container")[0];
	notificationcontainer.appendChild(conversionnotice);
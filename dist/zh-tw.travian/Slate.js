/* If no skin is set then set the skin to monobook and reload if that works (if not, they probably have cookies disbaled, so don't) */

if (-1 == document.cookie.indexOf('wikicitiesuseskin')) {

 document.cookie = 'wikicitiesuseskin = monobook; domain=wikia.com; expires=Fri, 01 Jan 2010 00:00:01 UTC; path=/'
 if (-1 != document.cookie.indexOf('wikicitiesuseskin')) 
 {
   window.location.href=window.location.href
 }

}
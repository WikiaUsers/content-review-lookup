/* 
Created by user:452 for the Saints Row Wiki.
Licensed under CC-BY-SA, which means that copying legally requires attributing the creator.

Instead of copying this wiki's unique chat script, you should create your own unique chat script.

I created the chat style here to be original. 
Copying is not original.
Please be original and create your own chat style.

I will not aid anyone in copying this wiki's unique chat.
I will report any copyright infringing users to Wikia Staff.
*/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               importArticles({ type: 'script', articles: 'MediaWiki:SRWC.js#'+mw.util.getParamValue('nocache') });

$(function () { /* Runs when the page loads. */
  if (wgSiteName == "Saints Row Wiki") { /* Checks that this script is being run on the Saints Row Wiki */
    if (typeof doMagic == "function") doMagic(); /* This does the magic. */
  }
});
/* This code will change ISBN links to point to the url of your choice,
   instead of Special:Booksources, when you are logged in. 
  
   How to use it:

  1.) Make sure you are logged in, so you can edit your user javascript 
      page.

  2.) Copy the entire contents of this page that appears
      beneath the remark, "CODE BEGINS", to your user javascript page. 
      You can choose to make it affect the way ISBN works 
      in the WIKIA or MONOBOOK skins, or both.  

      Since WIKIA is the main skin supported by this 
      site's administrators, we suggest that you alter it by changing 
      User:<your username>/wikia.js , where <your username> is replaced by 
      your user name. For example, if your user name is DWfan, your javascript 
      page is User:DWfan/wikia.js .  
 
      Likewise, DWfan can choose to alter the behavior of ISBN in MONOBOOK by
      changing/creating User:DWfan/monobook.js, or doing the whole lot by 
      changing User:DWfan/common.js.  Due to occasional Wikia issues with 
      common.js, however, we recommend that you change your personal
      wikia.js and monobook.js files individually, rather than relying on 
      common.js to filter through the changes to the individual skins. 
 
  3.) If you want to change the destination URL from amazon.com to another book
      source, change the value of the book_source_URL.  Go to 
      [[Help:ISBN]] and copy the URL of the book source you want to
      use (right-click or ctrl-click the link, then click "Copy Link Location", 
      "Copy Target", or similar).  Put the new URL BETWEEN THE QUOTES next 
      to book_source_URL, in place of the URL now there.

  4.) Once satisfied with the destination url, and your javascript page saved, 
      you  may have to refresh your browser cache in order for the code to be 
      loaded. 

  The code should now work, as long as you are logged in.

 
   =-=-=-=-=-
   AUTHORSHIP
   =-=-=-=-=-
   This code was written by [[wikipedia:user:Lunchboxhero]] and derives from 
   [[wikipedia:user:Lunchboxhero/vector.js]].  Significant improvements by 
   [[wikipedia:user:Superm401]] and [[wikipedia:user:drrngravy]].  The phrase
   "this code" includes not only this page, but also 
   [[MediaWiki:externISBN.js]].

===========
CODE BEGINS
=========== */
 
var book_source_URL = "http://www.worldcat.org/search?qt=wikipedia&q=isbn%3AMAGICNUMBER";
importScript('MediaWiki:externISBN.js');

/* =-=-=-=-=-
   DE-ACTIVATING
   =-=-=-=-=-
   
   If you want to turn this fix off, and return to seeing all the links
   at the Special:BookSources page, simply remark out the above lines
   on your wikia.js or common.js files. You can achieve this one of two ways: */

//  This line is remarked out.
//  But I have to add the slashes before each line.
//  Seriously, every time.

/*  This line is remarked out
    But every other line is, too.
    Until I add this closing syntax --> */
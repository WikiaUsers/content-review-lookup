// 00:40, August 24, 2011 (UTC)
// <source lang="JavaScript">
// from Rappy 4187
 
// Restores traditional section edit button style
if ($('.mw-headline + .editsection').length) $('.mw-headline + .editsection a:last-child,').before('[').after(']').text('edit');
// END Restores traditional section edit button style
 
// </source>
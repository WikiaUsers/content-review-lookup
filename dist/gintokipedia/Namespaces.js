/*<pre>*/
////////////////////////////////////
// INFO: Namespace list.          //
//       Can be included into any //
//       type of user or skin .js //
//       to provide a list of the //
//       wiki's namespaces.       // 
////////////////////////////////////

/**** GENERATION: ****
This info can be generated by copying the source inside the select box at Special:Prefixindex and then running it through a regex with a expression of:
-----------------START------------------
^	<option value="([0-9]+)"[^>]*>([^\n]+)</option>
*
------------------END-------------------
and a replacement of:
-----------------START------------------
	{ value: \1, data: '\2' },

------------------END-------------------
Then just remove the , off the last one and replace the content inside of the array removing the spaces.
*/

var mwNamespaces = new Array(
	{ value: 0, data: '(Main)' },
	{ value: 1, data: 'Talk' },
	{ value: 2, data: 'User' },
	{ value: 3, data: 'User talk' },
	{ value: 4, data: 'Gintokipedia' },
	{ value: 5, data: 'Gintokipedia talk' },
	{ value: 6, data: 'Image' },
	{ value: 7, data: 'Image talk' },
	{ value: 8, data: 'MediaWiki' },
	{ value: 9, data: 'MediaWiki talk' },
	{ value: 10, data: 'Template' },
	{ value: 11, data: 'Template talk' },
	{ value: 12, data: 'Help' },
	{ value: 13, data: 'Help talk' },
	{ value: 14, data: 'Category' },
	{ value: 15, data: 'Category talk' },
	{ value: 110, data: 'Forum' },
	{ value: 111, data: 'Forum talk' }
);
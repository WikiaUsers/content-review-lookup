/* Main JavaScript skin codes  */
/*
==========================

// Set badges for users
14:24, 17 February 2023 (UTC)
==========================
*/

:is([class^='EntityHeader_name__'][href='/wiki/User:USERNAME'], [class^='mw-userlink'], .edit-info-user, .lastEdited > a)[href='/wiki/User:USERNAME']::after {
	content: '';
	background-image: url(BADGE);
}

/*
==========================

//
14:24, 17 February 2023 (UTC)
==========================
*/
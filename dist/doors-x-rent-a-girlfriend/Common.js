.spoilerblur {
  filter: blur(3.5px);
  opacity: 0.40;
  transition: filter 1s linear, opacity 1s linear, text-shadow 1s linear;
}

.spoilerIMG {
  filter: blur(22.5px);
  opacity: 0.20;
  transition: filter 1s linear, opacity 1s linear, text-shadow 1s linear;
}
 
.spoilerblur:is(:hover, :focus, :focus-within, :active), .spoilerIMG:is(:hover, :focus, :focus-within, :active) {
  filter: blur(0px);
  opacity: 1;
  text-shadow: 0 0 0 transparent;
  transition-delay: 400ms;
}

/* This part is candidate for complete removal, as it is not clear why it is
   needed (see talk page of the documentation page). But for now it is just
   excluded from affecting direct childs of <li> elements, since otherwise
   it causes misaligning of the bullet or number.
*/

/* NEEDED: See https://community.fandom.com/f/p/4400000000003375796 */
:not(li) > .spoilerblur, .spoilerIMG {
	display: unset;
}
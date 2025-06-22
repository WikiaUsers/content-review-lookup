// Adds a "Translate to Pig Latin" button in the source editor
// License: CC0 / Public Domain

(function () {
  if (!['edit', 'submit'].includes(mw.config.get("wgAction"))) return;

  function pigLatin(text) {
	return text.replace(/\b([a-zA-Z]{2,})\b/g, function (word) {
	    const vowels = /[aeiouAEIOU]/g;
	    const matches = [...word.matchAll(vowels)].map(m => m.index);
	    if (matches.length === 0) return word;
	
	    const isAllCaps = word === word.toUpperCase();
	    const isCapitalized = word[0] === word[0].toUpperCase();
	
	    let result;
	
	    if (matches[0] === 0 && matches.length > 1) {
	      // Word starts with vowel and has more than one syllable
	      const first = matches[0];         // should be 0
	      const second = matches[1];        // beginning of second syllable
	      const cluster = word.slice(first + 1, second); // consonants after the first vowel up to next vowel
	      const remaining = word.slice(second);
	      result = remaining + word.slice(0, first + 1) + cluster + "ay";
	    } else if (matches[0] === 0) {
	      // Word starts with vowel and has only one syllable
	      result = word + "way";
	    } else {
	      // Consonant-starting word
	      const cutoff = matches[0];
	      result = word.slice(cutoff) + word.slice(0, cutoff) + "ay";
	    }
	
	    // Restore casing
	    if (isAllCaps) return result.toUpperCase();
	    if (isCapitalized) return result[0].toUpperCase() + result.slice(1).toLowerCase();
	    return result.toLowerCase();
	  });
	}



  $(function () {
    const $textbox = $('#wpTextbox1');
    const $editButtons = $('#wpSave, #wpPreview, #wpDiff').parent();

    if (!$textbox.length || !$editButtons.length) return;

    const $button = $('<button>')
      .text('Translate to Pig Latin')
      .attr('type', 'button')
      .addClass('mw-ui-button')
      .css({ marginLeft: '0.5em' })
      .on('click', function () {
        const start = $textbox[0].selectionStart;
        const end = $textbox[0].selectionEnd;
        const originalText = $textbox.val();

        if (start !== end) {
          const selected = originalText.substring(start, end);
          const translated = pigLatin(selected);
          const newText = originalText.substring(0, start) + translated + originalText.substring(end);
          $textbox.val(newText);
          $textbox[0].setSelectionRange(start, start + translated.length);
        } else {
          const translated = pigLatin(originalText);
          $textbox.val(translated);
        }
      });

    $editButtons.last().after($('<span>').append($button));
  });
})();
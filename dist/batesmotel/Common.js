document.addEventListener('DOMContentLoaded', function() {
  // Function to wrap a random letter in a span with blinking effect
  function wrapRandomLetterWithSpan(word) {
    const letters = word.split('');
    const blinkingIndex = Math.floor(Math.random() * letters.length);

    const wrappedLetters = letters.map((letter, index) => {
      if (index === blinkingIndex) {
        return `<span class="blinking">${letter}</span>`;
      }
      return letter;
    });

    return wrappedLetters.join('');
  }

  // Try to get the title element
  const titleElement = document.querySelector('.mw-page-title-main');

  if (titleElement) {
    const words = titleElement.textContent.split(' ');

    const wrappedWords = words.map((word) => wrapRandomLetterWithSpan(word));
    titleElement.innerHTML = wrappedWords.join(' ');
  }
});
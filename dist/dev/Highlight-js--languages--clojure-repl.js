/** <nowiki>
 * Language: Clojure REPL
 * Description: Clojure REPL sessions
 * Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
 * Requires: clojure.js
 * Category: lisp
 */
window.dev.highlight.registerLanguage('clojure-repl', function(hljs) {
  return {
    contains: [
      {
        className: 'meta',
        begin: /^([\w.-]+|\s*#_)=>/,
        starts: {
          end: /$/,
          subLanguage: 'clojure'
        }
      }
    ]
  }
});
/** </nowiki> **/
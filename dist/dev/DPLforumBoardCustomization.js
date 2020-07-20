/**
 * @module      DPLforumBoardCustomization
 * @description Support for customizing the DPLforum board index
 * @author      Himmalerin
 * @version     1.3.0
 */


(function() {
  var dplforumIndexLocation = window.dplforumIndexLocation || {
    en: 'Forum:Index',
    es: 'Foro:Índice'
  };

  var dplforumBoards = window.dplforumBoards || [
    { boardName: 'help-desk' },
    { boardName: 'watercooler' }
  ];

  // Only run on Forum:Index
  if (
    mw.config.get('wgPageName') ===
    (dplforumIndexLocation[mw.config.get('wgContentLanguage')] ||
      dplforumIndexLocation.en)
  ) {
    // Get a list of the boards
    var boards = document.querySelectorAll('td.forum_title');

    // Compare the number of objects in the `dplforumBoards` array and the
    // number of boards found by the `boards` variable and use the lower one.
    var boardNum = Math.min(dplforumBoards.length, boards.length);

    // Get the number of `.forum_new` instances there are.
    var forumNewNum = document.getElementsByClassName('forum_new');

    /**
     * For each td with class `forum_title` add classes `js-dplforum-board` and
     * `js-dplforum-board__${boardName}`.
     * If `boardDescription` is defined for a board, append it to the board
     * inside a `<p>` tag with class `js-dplforum-board__description`.
     */
    for (var i = 0; i < boardNum; i++) {
      boards[i].classList.add(
        'js-dplforum-board',
        'js-dplforum-board__' + dplforumBoards[i].boardName
      );

      if (dplforumBoards[i].boardDescription !== undefined) {
        var boardDescriptionTag = document.createElement('p');
        boardDescriptionTag.className = 'js-dplforum-board__description';
        boardDescriptionTag.textContent = dplforumBoards[i].boardDescription;

        boards[i].appendChild(boardDescriptionTag);
      }
    }

    /**
     * Add class `js-forum-new--unset` to tags with the class `forum_new` so we
     * can reset any styles that don't work with the board images such as the
     * default forum_new.gif background image.
     */
    for (var i = 0; i < forumNewNum.length; i++) {
      forumNewNum[i].classList.add('js-forum-new--unset');
    }
  }
})();
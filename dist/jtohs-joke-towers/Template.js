mw.loader.using(['mediawiki.util', 'jquery.textSelection']).then(function () {
  function getTextarea() {
    return document.querySelector('#wpTextbox1');
  }

  function insertText(text) {
    const textarea = getTextarea();

    if (!textarea) {
      alert('Could not find the source editor textbox.');
      return;
    }

    const $textarea = $(textarea);

    if ($textarea.textSelection) {
      $textarea.textSelection('encapsulateSelection', {
        pre: text,
        post: '',
        peri: ''
      });
      textarea.focus();
      return;
    }

    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;

    textarea.value =
      textarea.value.substring(0, start) +
      text +
      textarea.value.substring(end);

    textarea.selectionStart = textarea.selectionEnd = start + text.length;
    textarea.focus();
  }

  function getTemplate() {
    return [
      '== Introduction ==',
      '{{PAGENAME}} is a Class ??? difficulty preceded by ??? and succeeded by ???. It is classified as ??? and has a rating of ???.',
      '',
      '{{NewDifficultyInfobox',
      '|title1=',
      '|image1=',
      '|caption1=',
      '|class=',
      '|rating=',
      '|type=',
      '|previous=',
      '|next=',
      '|creator(s)=',
      '|date_added=',
      '}}',
      '',
      '== Placement ==',
      '{{PAGENAME}} is located in ???. It is placed between ??? and ??? due to its ???.',
      '',
      '== Icon Representation ==',
      '{{IconRepresentation',
      '|title={{PAGENAME}}',
      '|color=',
      '|image=',
      '|description=The icon for {{PAGENAME}} depicts ???.}}',
      '',
      '== Obstacles ==',
      '{| class="fandom-table"',
      '|+Obstacles',
      '!Spectrum/Obstacles',
      '! style="background-color: green;" |\'\'\'<font color="black">Baseline</font>\'\'\'',
      '! style="background-color: #80ff00;" |\'\'\'<font color="black">Low</font>\'\'\'',
      '! style="background-color: yellow;" |\'\'\'<font color="black">Mid</font>\'\'\'',
      '! style="background-color: orange;" |\'\'\'<font color="black">High</font>\'\'\'',
      '! style="background-color: red;" |\'\'\'<font color="black">Peak</font>\'\'\'',
      '|-',
      '|Wraparounds',
      '| style="background-color: #014500;" |<font color="white">X stud</font>',
      '| style="background-color: #336000;" |<font color="white">X stud</font>',
      '| style="background-color: #6d5c00;" |<font color="white">X stud</font>',
      '| style="background-color: #964a00;" |<font color="white">X stud</font>',
      '| style="background-color: #5a0000;" |<font color="white">X stud</font>',
      '|-',
      '|Unclimbable Long Jump',
      '| style="background-color: #014500;" |<font color="white">X stud</font>',
      '| style="background-color: #336000;" |<font color="white">X stud</font>',
      '| style="background-color: #6d5c00;" |<font color="white">X stud</font>',
      '| style="background-color: #964a00;" |<font color="white">X stud</font>',
      '| style="background-color: #5a0000;" |<font color="white">X stud</font>',
      '|-',
      '|Climbable Long Jump',
      '| style="background-color: #014500;" |<font color="white">X stud</font>',
      '| style="background-color: #336000;" |<font color="white">X stud</font>',
      '| style="background-color: #6d5c00;" |<font color="white">X stud</font>',
      '| style="background-color: #964a00;" |<font color="white">X stud</font>',
      '| style="background-color: #5a0000;" |<font color="white">X stud</font>',
      '|-',
      '|Stick Out Wraparounds',
      '| style="background-color: #014500;" |<font color="white">X×X stud</font>',
      '| style="background-color: #336000;" |<font color="white">X×X stud</font>',
      '| style="background-color: #6d5c00;" |<font color="white">X×X stud</font>',
      '| style="background-color: #964a00;" |<font color="white">X×X stud</font>',
      '| style="background-color: #5a0000;" |<font color="white">X×X stud</font>',
      '|-',
      '|Cylinder Wraparounds',
      '| style="background-color: #014500;" |<font color="white">X stud</font>',
      '| style="background-color: #336000;" |<font color="white">X stud</font>',
      '| style="background-color: #6d5c00;" |<font color="white">X stud</font>',
      '| style="background-color: #964a00;" |<font color="white">X stud</font>',
      '| style="background-color: #5a0000;" |<font color="white">X stud</font>',
      '|-',
      '|Raised Wraparounds (1)',
      '| style="background-color: #014500;" |<font color="white">X stud<br>X stud raised</font>',
      '| style="background-color: #336000;" |<font color="white">X stud<br>X stud raised</font>',
      '| style="background-color: #6d5c00;" |<font color="white">X stud<br>X stud raised</font>',
      '| style="background-color: #964a00;" |<font color="white">X stud<br>X stud raised</font>',
      '| style="background-color: #5a0000;" |<font color="white">X stud<br>X stud raised</font>',
      '|-',
      '|Raised Wraparounds (2)',
      '| style="background-color: #014500;" |<font color="white">X stud<br>X stud raised</font>',
      '| style="background-color: #336000;" |<font color="white">X stud<br>X stud raised</font>',
      '| style="background-color: #6d5c00;" |<font color="white">X stud<br>X stud raised</font>',
      '| style="background-color: #964a00;" |<font color="white">X stud<br>X stud raised</font>',
      '| style="background-color: #5a0000;" |<font color="white">X stud<br>X stud raised</font>',
      '|}',
      '',
      '== Towers ==',
      '* Tower of ???',
      '* Tower of ???',
      '* Tower of ???',
      '',
      '== Trivia ==',
      '* {{PAGENAME}} was created on ???.',
      '* {{PAGENAME}} was inspired by ???.',
      '* Placeholder trivia.',
      '',
      '== Continuing From This Point ==',
      'From this point, players should attempt ??? next after completing this difficulty.',
      '',
      '[[Category:Difficulties]]',
      ''
    ].join('\n');
  }

  function createButton() {
    if (document.querySelector('#difficulty-skeleton-button')) return;

    const button = document.createElement('button');
    button.id = 'difficulty-skeleton-button';
    button.type = 'button';
    button.innerHTML = '▤';
    button.title = 'Insert Difficulty Skeleton';
    button.setAttribute('aria-label', 'Insert Difficulty Skeleton');

    Object.assign(button.style, {
      position: 'fixed',
      right: '12px',
      top: '48%',
      zIndex: 999999,
      width: '38px',
      height: '38px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#2d2d3a',
      color: 'white',
      border: '1px solid rgba(255,255,255,.25)',
      borderRadius: '8px 0 0 8px',
      fontSize: '22px',
      cursor: 'pointer',
      boxShadow: '0 0 10px rgba(0,0,0,.45)'
    });

    button.addEventListener('click', function (e) {
      e.preventDefault();
      insertText(getTemplate());
    });

    document.body.appendChild(button);
  }

  const interval = setInterval(function () {
    if (!getTextarea()) return;

    clearInterval(interval);
    createButton();
  }, 500);
});

mw.loader.using(['mediawiki.util']).then(function () {
  function getEditorRoot() {
    return document.querySelector('.cm-content');
  }

  function getOrCreateOverlay() {
    let overlay = document.querySelector('#tag-rainbow-overlay');

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'tag-rainbow-overlay';

      Object.assign(overlay.style, {
        position: 'fixed',
        inset: '0',
        pointerEvents: 'none',
        zIndex: 0
      });

      document.body.appendChild(overlay);
    }

    return overlay;
  }

  function makeRangeFromLineOffsets(line, startOffset, endOffset) {
    const walker = document.createTreeWalker(
      line,
      NodeFilter.SHOW_TEXT,
      null
    );

    let node;
    let current = 0;
    let startNode = null;
    let endNode = null;
    let startLocal = 0;
    let endLocal = 0;

    while ((node = walker.nextNode())) {
      const len = node.textContent.length;

      if (!startNode && current + len >= startOffset) {
        startNode = node;
        startLocal = startOffset - current;
      }

      if (!endNode && current + len >= endOffset) {
        endNode = node;
        endLocal = endOffset - current;
        break;
      }

      current += len;
    }

    if (!startNode || !endNode) return null;

    const range = document.createRange();
    range.setStart(startNode, Math.max(0, startLocal));
    range.setEnd(endNode, Math.max(0, endLocal));

    return range;
  }

  function getTagColorClass(tag, isClosing, depth) {
    const type = tag === 'div' ? 'div' : 'span';
    const direction = isClosing ? 'close' : 'open';

    return 'tag-rainbow tag-rainbow-' + (depth % 10) + ' tag-rainbow-' + type + ' tag-rainbow-' + direction;
  }

  function updateTagRainbow() {
    const root = getEditorRoot();
    if (!root) return;

    const overlay = getOrCreateOverlay();
    overlay.innerHTML = '';

    const lines = Array.from(root.querySelectorAll('.cm-line'));
    const regex = /<\/?(div|span)\b[^>]*>/gi;

    let depth = 0;

    lines.forEach(function (line) {
      const text = line.textContent;
      let match;

      while ((match = regex.exec(text)) !== null) {
        const tagText = match[0];
        const tag = match[1].toLowerCase();
        const isClosing = tagText.startsWith('</');

        if (isClosing) {
          depth = Math.max(0, depth - 1);
        }

        const range = makeRangeFromLineOffsets(
          line,
          match.index,
          match.index + tagText.length
        );

        if (range) {
          const rects = Array.from(range.getClientRects());

          rects.forEach(function (rect) {
            if (rect.width <= 0 || rect.height <= 0) return;

            const mark = document.createElement('div');
            mark.className = getTagColorClass(tag, isClosing, depth);

            Object.assign(mark.style, {
              position: 'fixed',
              left: rect.left + 'px',
              top: rect.top + 'px',
              width: rect.width + 'px',
              height: rect.height + 'px'
            });

            overlay.appendChild(mark);
          });
        }

        if (!isClosing) {
          depth++;
        }
      }
    });
  }

  function startTagRainbow() {
    const root = getEditorRoot();
    if (!root || root.dataset.tagRainbowReady) return false;

    root.dataset.tagRainbowReady = 'true';

    updateTagRainbow();

    window.addEventListener('scroll', function () {
	  clearTimeout(root._tagRainbowScrollTimer);
	  root._tagRainbowScrollTimer = setTimeout(updateTagRainbow, 120);
	}, true);
    window.addEventListener('resize', updateTagRainbow);

    root.addEventListener('keyup', function () {
      setTimeout(updateTagRainbow, 30);
    });

    root.addEventListener('input', function () {
      setTimeout(updateTagRainbow, 30);
    });

    root.addEventListener('click', function () {
      setTimeout(updateTagRainbow, 30);
    });

    return true;
  }

  const wait = setInterval(function () {
    if (startTagRainbow()) {
      clearInterval(wait);
    }
  }, 500);
});
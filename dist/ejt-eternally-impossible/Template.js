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
(function() {
  // Expanded Unicode charset
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿĀĂĄĆĈĊČĎĐĒĔĖĘĚĜĞĠĢĤĦĨĪĬĮİĲĴĶĸĹĻĽĿŁŃŅŇŊŌŎŐŒŔŖŘŚŜŠŞŢŢŦŨŪŬŮŰŲŴŶŸŹŻŽāăąćĉċčďđēĕėęěĝğġģĥħĩīĭįıĳĵķĸĺļľŀłńņňŋōŏőœŕŗřśŝšşťţŧũūŭůűųŵŷÿźżžАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюяαβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩאבגדהוזחטיכלמנסעפצקרשת©®™§¶†‡•‹›«»&@#$%^&*_+-=[],./¡¿¿¡§¶©®™℗℠°ºª∞∆÷√∑π∫µ∂∏∑∅∈∉∧∨∩∪⊂⊃⊆⊇≠≈±≪≫≤≥≯≮≡≠→←↑↓↔↕↖↗↘↙⇐⇑⇒⇓⇔★☆♦♣♠♥●◐◑◒▔◕◖◗◘◙▁▂▃▄▅▆▇█▉▊▋▌▍▎▏";

  const similarLettersMap = {
    A: ['Å','Á','Ä','4','@'], B: ['8','ß','β'], C: ['Ç','¢','('], D: ['Ð','∂'], E: ['É','€','3'],
    F: ['Ƒ'], G: ['6','9'], H: ['#'], I: ['1','!','|','Í'], J: ['¿'], K: ['X'], L: ['1','|','£'],
    M: ['♏'], N: ['Ñ','И'], O: ['0','Ø','Φ','°'], P: ['þ','ρ'], Q: ['0','Ό'], R: ['Я'], S: ['5','$','§'],
    T: ['7','+'], U: ['µ','Ü'], V: ['∨'], W: ['Ш'], X: ['ж'], Y: ['¥'], Z: ['2'],
    a: ['@','ą','α'], b: ['6','ß'], c: ['¢','ç'], d: ['ð','∂'], e: ['€','3','ë'], f: ['ƒ'],
    g: ['9'], h: ['#'], i: ['1','!','|'], j: [], k: ['x'], l: ['1','|'], m: [], n: ['ñ'],
    o: ['0','ø'], p: [], q: [], r: [], s: ['$','5'], t: ['7','+'], u: ['µ'], v: [], w: [], x: [],
    y: [], z: ['2']
  };

  // Probabilistic replacement (70% keep original, 30% replace)
  function getRandomChar(originalChar) {
    return Math.random() < 0.7 ? originalChar : chars.charAt(Math.floor(Math.random() * chars.length));
  }

  function getSimilarLetter(originalChar) {
    const options = similarLettersMap[originalChar] || [originalChar];
    return Math.random() < 0.7 ? originalChar : options[Math.floor(Math.random() * options.length)];
  }

  function addOrRemoveSpaces(text) {
    let result = '';
    for(let i = 0; i < text.length; i++) {
      result += text[i];
      if(Math.random() < 0.05) result += ' ';
      else if(result.endsWith('  ')) result = result.slice(0, -1);
    }
    return result;
  }

  function hasTrigger(el, trigger) {
    return getComputedStyle(el).getPropertyValue('--trigger').trim() === trigger;
  }

  // 1. MAIN RANDOM SYSTEMS
  function runRandomModule(triggerClass, useSimilar, useSpaces) {
    document.querySelectorAll('.' + triggerClass).forEach(el => {
      if(!hasTrigger(el, triggerClass)) return;
      const original = el.textContent;
      setInterval(() => {
        let mutated = '';
        for(let c of original) {
          if(c !== ' ' && Math.random() < 0.7) {
            mutated += useSimilar ? getSimilarLetter(c) : getRandomChar(c);
          } else mutated += c;
        }
        el.textContent = useSpaces ? addOrRemoveSpaces(mutated) : mutated;
      }, 125);
    });
  }

  // 2. BLOCK SYSTEMS
  function runBlockModule(triggerClass, randomizeSpaces) {
    document.querySelectorAll('.' + triggerClass).forEach(el => {
      if(!hasTrigger(el, triggerClass)) return;
      const original = el.textContent;
      const blocks = ['▊','▯','⍰'];
      setInterval(() => {
        let blocked = '';
        for(let c of original) {
          if(Math.random() < 0.27) {
            blocked += blocks[Math.floor(Math.random() * 3)];
          } else blocked += c;
        }
        el.textContent = randomizeSpaces ? addOrRemoveSpaces(blocked) : blocked;
      }, 150);
    });
  }

  // 3. CAPITALIZATION
  document.querySelectorAll('.randomcaptext').forEach(el => {
    if(!hasTrigger(el, 'randomcaptext')) return;
    const original = el.textContent;
    setInterval(() => {
      el.textContent = original.split('').map(c => {
        if(/[a-zA-Z]/.test(c)) {
          return Math.random() < 0.5 ? 
            (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()) : c;
        }
        return c;
      }).join('');
    }, 100);
  });

  // 4. LETTER SPACING
  document.querySelectorAll('.randomspacetext').forEach(el => {
    if(!hasTrigger(el, 'randomspacetext')) return;
    const original = el.textContent;
    setInterval(() => {
      let result = '';
      for(let i = 0; i < original.length; i++) {
        result += original[i];
        if(i < original.length - 1 && Math.random() < 0.3) result += ' ';
      }
      el.textContent = result;
    }, 100);
  });

  // Initialize all modules
  runRandomModule('randomtext', false, true);
  runRandomModule('similarrandomtext', true, true);
  runRandomModule('nospacerandomtext', false, false);
  runRandomModule('nospacesimilarrandomtext', true, false);
  runBlockModule('blockrandomtext', false);
  runBlockModule('blockspacesrandomtext', true);

})();
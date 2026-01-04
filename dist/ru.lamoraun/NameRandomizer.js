// Name randomization script for [[Template:NameRandomizer]]
(function initNameRandomizer() {
  var randomizerContainers = document.querySelectorAll('.lw-name-randomizer');
  var i, container, template, button, resultSpan, wrapper;

  for (i = 0; i < randomizerContainers.length; i++) {
    container = randomizerContainers[i];
    template = container.getAttribute('data-string');

    wrapper = document.createElement('div');
    wrapper.classList.add('lw-randomizer');

    resultSpan = document.createElement('span');
    button = document.createElement('button');
    button.classList.add('wds-button');
    button.type = 'button';
    button.textContent = 'Обновить';

    function generateName() {
      var result = template;
      var placeholders = result.match(/\[([^\]]+)\]/g);
      var j, placeholder, key, list, items, randomItem;

      if (placeholders) {
        for (j = 0; j < placeholders.length; j++) {
          placeholder = placeholders[j];
          key = placeholder.replace(/\[|\]/g, '');
          list = document.getElementById('lw-randomizer-' + key);
          if (list) {
            items = list.querySelectorAll('li');
            if (items.length > 0) {
              randomItem = items[Math.floor(Math.random() * items.length)].textContent;
              result = result.replace(placeholder, randomItem);
            }
          }
        }
      }

      resultSpan.textContent = result;
    }

    generateName();

    wrapper.appendChild(resultSpan);
    wrapper.appendChild(button);
    container.parentNode.replaceChild(wrapper, container);

    button.addEventListener('click', generateName);
  }
})();
mw.hook('wikipage.content').add(function ($content) {
  $content.find('.portable-infobox .wds-tabs').each(function () {
    const el = this;

    if (el.scrollHeight > 40) {
      el.classList.add('tabs-collapsible', 'is-collapsed');

      const btn = document.createElement('div');
      btn.className = 'tabs-toggle';
      btn.textContent = 'Показать все версии';

      btn.onclick = () => {
        el.classList.toggle('is-collapsed');
        btn.textContent = el.classList.contains('is-collapsed')
          ? 'Показать все версии'
          : 'Скрыть версии';
      };

      el.after(btn);
    }
  });
});
/* All JavaScript here will be loaded for users of the mobile site */

mw.loader.using('mediawiki.util', function () {
  if (mw.config.get('skin') === 'minerva') {
    const tabber = document.querySelector('.mobile-tabber-wrapper tabber');
    if (tabber) {
      const tabs = tabber.querySelectorAll('tab');
      const wrapper = document.createElement('div');

      tabs.forEach(tab => {
        const title = tab.getAttribute('name');
        const content = tab.innerHTML;

        const details = document.createElement('details');
        details.className = 'mobile-collapsible';

        const summary = document.createElement('summary');
        summary.textContent = title;

        const body = document.createElement('div');
        body.innerHTML = content;

        details.appendChild(summary);
        details.appendChild(body);
        wrapper.appendChild(details);
      });

      tabber.parentNode.insertBefore(wrapper, tabber);
    }
  }
});
function fetch_tags(callback) {
  fetch('/wiki/Template:Removed_Tags')
    .then(response => response.text())
    .then(text => {
      const tags = text.split('\n').map(tag => tag.trim()).filter(Boolean);
      callback(tags);
    })
    .catch(() => callback([]));
}

(function () {
  function strip_tags(text, tags) {
    let new_text = text;
    tags.forEach(tag => {
      const regex = new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      new_text = new_text.replace(regex, '').trim();
    });
    return new_text;
  }

  function clean_link(tags) {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      if (link.querySelector('img')) {
        return;
      }
      if (link.textContent) {
        const cleaned_text = strip_tags(link.textContent, tags);
        if (cleaned_text !== link.textContent) {
          link.textContent = cleaned_text;
        }
      }
    });
  }

  function clean_heading(tags) {
    const heading = document.querySelector('h1');
    if (heading && heading.textContent) {
      const cleaned_text = strip_tags(heading.textContent, tags);
      if (cleaned_text !== heading.textContent) {
        heading.textContent = cleaned_text;
      }
    }
  }

  function cleanTexts(tags) {
    clean_link(tags);
    clean_heading(tags);
    link_data_sources();
  }

  function link_data_sources() {
    const data_sources = ['race'];
    data_sources.forEach(source => {
      const el = document.querySelector(`.pi-data[data-source="${source}"] .pi-data-value`);
      if (el && el.textContent) {
        const text_nodes = [];
        const walker = document.createTreeWalker(
          el,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );
        let node;
        while (node = walker.nextNode()) {
          if (node.textContent.trim()) {
            text_nodes.push(node);
          }
        }
        
        text_nodes.forEach(text_node => {
          const parts = text_node.textContent.split(/\s*,\s*|\s*\|\s*/).map(part => part.trim()).filter(Boolean);
          if (parts.length > 1) {
            const fragment = document.createDocumentFragment();
            parts.forEach((part, index) => {
              if (index > 0) {
                fragment.appendChild(document.createTextNode(', '));
              }
              const link = document.createElement('a');
              link.href = `/wiki/Category:${encodeURIComponent(part)}`;
              link.textContent = part;
              fragment.appendChild(link);
            });
            text_node.parentNode.replaceChild(fragment, text_node);
          } else if (parts.length === 1) {
            const link = document.createElement('a');
            link.href = `/wiki/Category:${encodeURIComponent(parts[0])}`;
            link.textContent = parts[0];
            text_node.parentNode.replaceChild(link, text_node);
          }
        });
      }
    });
  }
  
  if (document.readyState === 'complete') {
    fetch_tags(cleanTexts);
  } else {
    window.addEventListener('load', () => {
      fetch_tags(cleanTexts);
    });
  }
})();
document.addEventListener('DOMContentLoaded', function() {
  const missionAreas = document.querySelectorAll('.mission-area');
  const unlockableAreas = document.querySelectorAll('.unlockable-area');
  const weaponAreas = document.querySelectorAll('.weapons-area');
  const clickableAreas = document.querySelectorAll('.clickable-area');
  const chapterAreas = document.querySelectorAll('.chapter-area'); 
  let tooltipContainer;

  tooltipContainer = document.createElement('div');
  tooltipContainer.id = 'tooltip-container';
  document.body.appendChild(tooltipContainer);

  // Функция для отображения тултипа
  function showTooltip(element) {
      const wikiLink = element.getAttribute('data-wiki-link');
      const tooltipText = element.getAttribute('data-tooltip-text');
      const missionPreview = element.getAttribute('data-tooltip-preview');
      let tooltipTitle = wikiLink; 

    if (element.classList.contains('chapter-area')) {
      const hashIndex = wikiLink.indexOf('#');
      if (hashIndex !== -1) {
        tooltipTitle = wikiLink.substring(hashIndex + 1); 

        const parenthesisIndex = tooltipTitle.indexOf('(');
        if (parenthesisIndex !== -1) {
          tooltipTitle = tooltipTitle.substring(0, parenthesisIndex).trim(); 
        }
      }
    }

      if (!tooltipText) return;

      let tooltipContent = '';
      if (wikiLink) {
        tooltipContent += `<h3>${tooltipTitle}</h3>`; 
      }

      if (missionPreview) {
        tooltipContent += `<img src="${missionPreview}" alt="Preview" style="max-width: 280px; max-height: 280px;">`;
      }

      tooltipContent += `<p>${tooltipText}</p>`;

      tooltipContainer.innerHTML = tooltipContent;

      const areaRect = element.getBoundingClientRect();
      const containerRect = document.querySelector('div[style*="relative; width"]').getBoundingClientRect();
      const tooltipWidth = tooltipContainer.offsetWidth;
      const tooltipHeight = tooltipContainer.offsetHeight;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      let leftPos = areaRect.right + 10 + scrollLeft;
      let topPos = areaRect.top + scrollTop;

      if (leftPos + tooltipWidth > containerRect.right) {
        leftPos = areaRect.left - tooltipWidth - 10 + scrollLeft;
      }

      if (topPos < containerRect.top + scrollTop) {
        topPos = containerRect.top + scrollTop;
      }
      if (topPos + tooltipHeight > containerRect.bottom + scrollTop) {
        topPos = containerRect.bottom - tooltipHeight + scrollTop;
      }

      tooltipContainer.style.left = leftPos + 'px';
      tooltipContainer.style.top = topPos + 'px';
      tooltipContainer.style.opacity = 1;
  }

  // Функция для скрытия тултипа
  function hideTooltip() {
    tooltipContainer.style.opacity = 0;
  }
  // Обработка mission-area (тултипы и редиректы)
  missionAreas.forEach(area => {
    area.addEventListener('mouseover', function(event) {
      showTooltip(this);
    });

    area.addEventListener('mouseout', function(event) {
      hideTooltip();
    });

    area.addEventListener('click', function() {
      const wikiLink = this.getAttribute('data-wiki-link');
      if (wikiLink) {
        window.location.href = mw.util.getUrl(wikiLink);
      }
    });
  });

  // Обработка chapter-area (тултипы и редиректы)
  chapterAreas.forEach(area => {
    area.addEventListener('mouseover', function(event) {
      showTooltip(this);
    });

    area.addEventListener('mouseout', function(event) {
      hideTooltip();
    });

    area.addEventListener('click', function() {
      const wikiLink = this.getAttribute('data-wiki-link');
      if (wikiLink) {
        window.location.href = mw.util.getUrl(wikiLink);
      }
    });
  });


  // Обработка unlockable-area (только редиректы)
  unlockableAreas.forEach(area => {
    area.addEventListener('click', function() {
      const wikiLink = this.getAttribute('data-wiki-link');
      if (wikiLink) {
        window.location.href = mw.util.getUrl(wikiLink);
      }
    });
  });

  // Обработка weapons-area (только редиректы)
  weaponAreas.forEach(area => {
    area.addEventListener('click', function() {
      const wikiLink = this.getAttribute('data-wiki-link');
      if (wikiLink) {
        window.location.href = mw.util.getUrl(wikiLink);
      }
    });
  });

  // Обработка clickable-area (только редиректы)
  clickableAreas.forEach(area => {
    area.addEventListener('click', function() {
      const wikiLink = this.getAttribute('data-wiki-link');
      if (wikiLink) {
        window.location.href = mw.util.getUrl(wikiLink);
      }
    });
  });
});

// Автоматическое разворачивание страницы
$(function() {
    switch (mw.config.get('wgPageName')) {
    case 'Участник:Aintitnice/sandbox/sandbox2':
    case 'Миссии_в_Red_Dead_Redemption_2/Дерево_миссий_1_глава':
    case 'Миссии_в_Red_Dead_Redemption_2/Дерево_миссий_2_глава':
    case 'Миссии_в_Red_Dead_Redemption_2/Дерево_миссий_3_глава':
    case 'Миссии_в_Red_Dead_Redemption_2/Дерево_миссий_4_глава':
    case 'Миссии_в_Red_Dead_Redemption_2/Дерево_миссий_5_глава':
    case 'Миссии_в_Red_Dead_Redemption_2/Дерево_миссий_6_глава':
    case 'Миссии_в_Red_Dead_Redemption_2/Дерево_миссий_эпилог_1':
    case 'Миссии_в_Red_Dead_Redemption_2/Дерево_миссий_эпилог_2':
        $('body').addClass('is-content-expanded')
        break;
    }
});
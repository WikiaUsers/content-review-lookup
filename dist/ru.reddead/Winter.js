(function () {
  const now = new Date();
  const month = now.getMonth();

  if ([11, 0, 1].includes(month)) {
    document.body.classList.add("winter-bg");
  }
})();

(function () {
  const now = new Date();
  const month = now.getMonth();
  if (month !== 11 && month !== 0 && month !== 1) return;

  // Константы для определения количества снежинок
  const MIN_SNOWFLAKES = 50;
  const MAX_SNOWFLAKES = 125;
  // Случайное количество снежинок в заданном диапазоне
  const SNOWFLAKE_COUNT = Math.floor(
    MIN_SNOWFLAKES + Math.random() * (MAX_SNOWFLAKES - MIN_SNOWFLAKES)
  );

  const SYMBOLS = ["❄", "✼", "✻", "✽", "✾", "❅", "❆"];

  const COLORS = [
    "rgba(255,255,255,0.9)",
    "rgba(224,247,255,0.8)",
    "rgba(240,234,255,0.7)",
    "rgba(245,245,245,0.85)",
  ];

  function createSnowflake() {
    const f = document.createElement("div");
    f.className = "snowflake";

    f.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    f.style.left = Math.random() * 100 + "vw";

    // Размер
    const size = 10 + Math.random() * 20;
    f.style.fontSize = size + "px";

    // Прозрачность
    f.style.opacity = 0.2 + Math.random() * 0.8;

    f.style.animationDuration = 5 + Math.random() * 12 + "s";
    f.style.animationDelay = -Math.random() * 10 + "s";

    // Смещение при падении
    f.style.setProperty("--drift", Math.random() * 30 - 15 + "px");

    // Цвет
    f.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];

    return f;
  }

  const container = document.createElement("div");
  container.id = "snow-container";

  for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
    container.appendChild(createSnowflake());
  }

  document.body.appendChild(container);
})();

(function () {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();

  const allow =
    (month === 11 && day >= 15) ||
    (month === 0  && day <= 15);
    
  if (!allow) return;

  // Ссылка на элемент навигации, к которому будет прикреплена гирлянда
  const globalNav = document.getElementById("global-top-navigation");
  if (!globalNav) return;

  // Константы для настройки гирлянды
  const MIN_DESKTOP = 768; // Минимальная ширина экрана для отображения гирлянды
  const LAMP_COUNT = 16; // Количество лампочек в гирлянде
  const LAMP_SIZE = 12; // Размер одной лампочки (px)
  const GARLAND_HEIGHT = 44; // Высота контейнера гирлянды (px)
  const GARLAND_VERTICAL_SHIFT = -13; // Вертикальное смещение гирлянды относительно нижней границы globalNav
  const ROPE_LENGTH = 84; // Длина шнура для включения/выключения гирлянды
  const ROPE_TUG_DURATION = 360; // Длительность анимации "дергания" шнура (мс)
  const ROPE_TUG_AMPLITUDE = 18; // Насколько сильно опускается шарик при "дергании" (px)

  const LAMP_COLORS = ["#ffecb3", "#ffd1dc", "#fff6e6", "#ffe8a1", "#ffe8f0"];

  const container = document.createElement("div");
  container.className = "garland-fixed";
  container.style.position = "fixed"; // Фиксированное позиционирование, чтобы гирлянда оставалась на месте при скролле
  container.style.left = "0";
  container.style.top = "0";
  container.style.width = "100vw";
  container.style.height = `${GARLAND_HEIGHT}px`;
  container.style.pointerEvents = "none";
  container.style.zIndex = "499";
  container.style.overflow = "visible";
  container.style.display = "none";

  // Пространство имен SVG для корректного создания элементов SVG
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "garland-wires");
  svg.setAttribute("preserveAspectRatio", "none"); // Не сохраняем пропорции, дабы SVG растягивался
  svg.style.position = "absolute";
  svg.style.left = "0";
  svg.style.top = "0";
  svg.style.width = "100%";
  svg.style.height = `${GARLAND_HEIGHT}px`;
  svg.style.overflow = "visible";
  container.appendChild(svg);

  // Группа для проводов, соединяющих лампочки
  const wiresGroup = document.createElementNS(svgNS, "g");
  wiresGroup.setAttribute("class", "garland-wires-group");
  svg.appendChild(wiresGroup);

  // Группа для шнура включения/выключения
  const ropeGroup = document.createElementNS(svgNS, "g");
  ropeGroup.setAttribute("class", "garland-rope-group");
  ropeGroup.style.pointerEvents = "auto";
  svg.appendChild(ropeGroup);

  // Массив для хранения ссылок на созданные элементы лампочек
  const lamps = [];
  for (let i = 0; i < LAMP_COUNT; i++) {
    const lamp = document.createElement("div");
    lamp.className = "garland-lamp";
    lamp.style.position = "absolute";
    lamp.style.width = `${LAMP_SIZE}px`;
    lamp.style.height = `${LAMP_SIZE}px`;
    lamp.style.borderRadius = "50%";
    lamp.style.transform = "translate3d(-50%,-50%,0)";
    lamp.style.willChange = "transform, opacity, box-shadow, background";
    const color = LAMP_COLORS[Math.floor(Math.random() * LAMP_COLORS.length)];
    lamp.dataset.color = color; // Сохраняем цвет в data-атрибуте для использования при переключении состояния
    lamp.dataset.glow = Math.round(6 + Math.random() * 8);
    lamps.push(lamp);
    container.appendChild(lamp);
  }

  document.body.appendChild(container);

  // Путь SVG для основной линии шнура
  const ropePath = document.createElementNS(svgNS, "path");
  ropePath.setAttribute("class", "garland-rope");
  ropePath.setAttribute("fill", "none");
  ropePath.setAttribute("stroke-linecap", "round");
  ropePath.setAttribute("stroke-width", "2.5");
  ropePath.setAttribute("stroke", "rgba(60,60,60,0.88)");
  ropePath.style.pointerEvents = "auto";
  ropeGroup.appendChild(ropePath);

  // Путь SVG для блика на шнуре
  const ropeHighlight = document.createElementNS(svgNS, "path");
  ropeHighlight.setAttribute("class", "garland-rope-highlight");
  ropeHighlight.setAttribute("fill", "none");
  ropeHighlight.setAttribute("stroke-linecap", "round");
  ropeHighlight.setAttribute("stroke-width", "1");
  ropeHighlight.setAttribute("stroke", "rgba(255,255,255,0.05)");
  ropeHighlight.style.pointerEvents = "none";
  ropeGroup.appendChild(ropeHighlight);

  // Шарик на конце шнура
  const ropeBall = document.createElementNS(svgNS, "circle");
  ropeBall.setAttribute("r", "6");
  ropeBall.setAttribute("class", "garland-rope-ball");
  ropeBall.setAttribute("fill", "rgba(180,180,180,0.95)");
  ropeBall.style.pointerEvents = "auto";
  ropeGroup.appendChild(ropeBall);

  let isOn = true; // Текущее состояние гирлянды (включена по умолчанию)

  // Функция для создания фона лампочки во включенном состоянии (с эффектом свечения)
  function lampOnBackground(hex) {
    return `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85), rgba(255,255,255,0.25) 20%, rgba(255,255,255,0.05) 40%), ${hex}`;
  }
  // Функция для создания фона лампочки в выключенном состоянии (серый, без свечения)
  function lampOffBackground() {
    return `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.45), rgba(255,255,255,0.18) 20%, rgba(255,255,255,0.05) 40%), rgba(180,180,180,0.92)`;
  }

  function setGarlandState(on) {
    isOn = !!on;
    lamps.forEach((l) => {
      if (isOn) {
        // Если включена: применяем цвет, свечение, непрозрачность
        l.style.background = lampOnBackground(l.dataset.color);
        l.style.boxShadow = `0 0 ${l.dataset.glow}px ${l.dataset.color}`;
        l.style.opacity = "0.85";
        l.style.filter = "";
      } else {
        // Если выключена: серый фон, без свечения, пониженная непрозрачность, фильтр серого
        l.style.background = lampOffBackground();
        l.style.boxShadow = "none";
        l.style.opacity = "0.66";
        l.style.filter = "grayscale(0.25) brightness(0.9)";
      }
    });
    // Цвет шарика на шнуре в зависимости от состояния
    ropeBall.setAttribute(
      "fill",
      isOn ? "rgba(180,180,180,0.95)" : "rgba(150,150,150,0.75)"
    );
    ropeBall.setAttribute("data-on", isOn ? "true" : "false");
  }

  let animRunning = false;

  function animateRopeTug(
    baseTopX,
    baseTopY,
    baseBottomY,
    duration = ROPE_TUG_DURATION,
    amplitude = ROPE_TUG_AMPLITUDE
  ) {
    if (animRunning) return; // Не запускаем новую анимацию, если предыдущая еще идет
    animRunning = true;
    const start = performance.now(); // Время начала анимации

    function frame(now) {
      const elapsed = Math.min(now - start, duration); // Прошедшее время, не превышающее длительность
      const t = elapsed / duration; // Нормализованное время (от 0 до 1)
      const sinVal = Math.sin(Math.PI * t); // Значение синуса (плавно меняется от 0 до 1, затем до 0)

      // Смещение шарика по Y
      const dy = amplitude * sinVal;
      const curBottomY = baseBottomY + dy; // Текущая Y-координата шарика
      // Управление контрольной точкой кривой Безье для естественного растяжения шнура
      const curControlY = baseTopY + ROPE_LENGTH / 2 + dy * 0.55;

      // Обновляем атрибут 'd' (path data) для SVG-путей шнура и блика
      const d = `M ${baseTopX} ${baseTopY} Q ${baseTopX} ${curControlY} ${baseTopX} ${curBottomY}`;
      ropePath.setAttribute("d", d);
      ropeHighlight.setAttribute("d", d);
      // Обновляем позицию шарика
      ropeBall.setAttribute("cx", `${baseTopX}`);
      ropeBall.setAttribute("cy", `${curBottomY + 6}`);

      if (elapsed < duration) {
        requestAnimationFrame(frame); // Продолжаем анимацию
      } else {
        // После завершения анимации возвращаем шнур в исходное состояние
        const d0 = `M ${baseTopX} ${baseTopY} Q ${baseTopX} ${
          baseTopY + ROPE_LENGTH / 2
        } ${baseTopX} ${baseBottomY}`;
        ropePath.setAttribute("d", d0);
        ropeHighlight.setAttribute("d", d0);
        ropeBall.setAttribute("cx", `${baseTopX}`);
        ropeBall.setAttribute("cy", `${baseBottomY + 6}`);
        animRunning = false; // Снимаем флаг выполнения анимации
      }
    }
    requestAnimationFrame(frame); // Запускаем первый кадр анимации
  }

  // Вызывает анимацию "дергания" шнура.
  function doTug(baseTopX, baseTopY, baseBottomY) {
    animateRopeTug(baseTopX, baseTopY, baseBottomY);
  }

  // Вызывает анимацию "дергания" шнура и переключает состояние гирлянды.
  function toggleAndTug(baseTopX, baseTopY, baseBottomY) {
    doTug(baseTopX, baseTopY, baseBottomY);
    // Переключаем состояние гирлянды немного после начала анимации, чтобы соответствовать ощущению "дергания"
    setTimeout(() => setGarlandState(!isOn), 80);
  }

  // Обработчик клика по шарику шнура
  ropeBall.addEventListener("click", (e) => {
    e.stopPropagation();
    if (lastCoords)
      toggleAndTug(
        lastCoords.ropeTopX,
        lastCoords.ropeTopY,
        lastCoords.ropeBottomY
      );
  });

  // Обработчик клика по самому шнуру
  ropePath.addEventListener("click", (e) => {
    e.stopPropagation();
    if (lastCoords)
      toggleAndTug(
        lastCoords.ropeTopX,
        lastCoords.ropeTopY,
        lastCoords.ropeBottomY
      );
  });

  // Таймер для debounce-функции
  let resizeTimer = null;

  // Отложенное обновление позиции и макета при изменении размеров окна.
  // Предотвращает слишком частые вызовы updatePositionAndLayout.
  function debounceUpdate() {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updatePositionAndLayout();
      resizeTimer = null;
    }, 80);
  }

  // Переменная для хранения последних вычисленных координат шнура
  let lastCoords = null;

  // Обновляет позицию гирлянды и ее элементов в зависимости от размера окна и положения элемента навигации. Отвечает за адаптивность.
  function updatePositionAndLayout() {
    // Если ширина экрана меньше минимальной, скрываем гирлянду
    if (window.innerWidth < MIN_DESKTOP) {
      container.style.display = "none";
      return;
    }
    const rect = globalNav.getBoundingClientRect(); // Получаем размеры и позицию навигации
    if (rect.width <= 0) {
      container.style.display = "none";
      return;
    }

    container.style.display = "block";
    // Позиция контейнера гирлянды относительно навигации
    container.style.top = `${Math.round(
      rect.bottom + GARLAND_VERTICAL_SHIFT
    )}px`;
    container.style.left = "0px";
    container.style.width = `${window.innerWidth}px`;

    svg.setAttribute("width", window.innerWidth);
    svg.setAttribute("height", GARLAND_HEIGHT);
    svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${GARLAND_HEIGHT}`);

    // Расчет отступов по бокам и ширины для размещения лампочек
    const sidePadding = Math.max(12, Math.min(60, rect.width * 0.03));
    const usableWidth = rect.width - sidePadding * 2;
    // Расстояние между лампочками
    const spacing = LAMP_COUNT > 1 ? usableWidth / (LAMP_COUNT - 1) : 0;
    const lampY = GARLAND_HEIGHT * 0.45; // Y-координата для всех лампочек
    const coords = [];

    for (let i = 0; i < LAMP_COUNT; i++) {
      const xRel = sidePadding + i * spacing; // Относительная X-координата лампочки
      const x = rect.left + xRel; // Абсолютная X-координата
      const y = lampY;
      coords.push({ x, y });
      const lamp = lamps[i];
      lamp.style.left = `${Math.round(x)}px`;
      lamp.style.top = `${Math.round(y)}px`;
      // Обновляем силу свечения и немного изменяем масштаб для визуального разнообразия
      lamp.dataset.glow = Math.round(6 + Math.random() * 8);
      lamp.style.transform = `translate3d(-50%,-50%,0) scale(${
        0.92 + Math.random() * 0.16
      })`;
    }

    // Очищаем предыдущие провода перед перерисовкой
    while (wiresGroup.firstChild) wiresGroup.removeChild(wiresGroup.firstChild);

    // Создает SVG-путь для провода между двумя точками с провисанием.
    // Использует квадратичную кривую Безье.
    function makeWirePath(x1, y1, x2, y2, strokeAlpha = 0.72, strokeWidth = 3) {
      const dx = Math.abs(x2 - x1);
      const midX = (x1 + x2) / 2;
      const sag = Math.min(40, Math.max(8, dx / 4)); // Расчет провисания провода
      const controlY = Math.max(y1, y2) + sag; // Y-координата контрольной точки для кривой Безье
      const d = `M ${x1} ${y1} Q ${midX} ${controlY} ${x2} ${y2}`; // Path data
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", d);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      path.setAttribute("stroke-width", `${strokeWidth}`);
      path.setAttribute("stroke", `rgba(60,60,60,${strokeAlpha})`);
      return path;
    }

    // Провод от левого края до первой лампочки
    const first = coords[0];
    const leftEdge = makeWirePath(0, first.y, first.x, first.y);
    wiresGroup.appendChild(leftEdge);
    const leftEdgeHighlight = leftEdge.cloneNode();
    leftEdgeHighlight.setAttribute("stroke-width", "1.0");
    leftEdgeHighlight.setAttribute("stroke", "rgba(255,255,255,0.05)");
    wiresGroup.appendChild(leftEdgeHighlight);

    // Провода между лампочками
    for (let i = 0; i < coords.length - 1; i++) {
      const p1 = coords[i],
        p2 = coords[i + 1];
      const main = makeWirePath(p1.x, p1.y, p2.x, p2.y);
      wiresGroup.appendChild(main);
      const inner = main.cloneNode();
      inner.setAttribute("stroke-width", "1.2");
      inner.setAttribute("stroke", "rgba(255,255,255,0.05)");
      wiresGroup.appendChild(inner);
    }

    // Провод от последней лампочки до правого края
    const last = coords[coords.length - 1];
    const rightEdge = makeWirePath(last.x, last.y, window.innerWidth, last.y);
    wiresGroup.appendChild(rightEdge);
    const rightEdgeHighlight = rightEdge.cloneNode();
    rightEdgeHighlight.setAttribute("stroke-width", "1.0");
    rightEdgeHighlight.setAttribute("stroke", "rgba(255,255,255,0.05)");
    wiresGroup.appendChild(rightEdgeHighlight);

    // Настройки SVG-пути и шарика для шнура включения/выключения
    const ropeTopX = last.x; // Шнур крепится к последней лампочке
    const ropeTopY = last.y + 3.2; // Немного ниже лампочки
    const ropeBottomX = last.x;
    // Конечная Y-координата шнура (с учетом его длины)
    const ropeBottomY = Math.min(
      GARLAND_HEIGHT + ROPE_LENGTH,
      GARLAND_HEIGHT + ROPE_LENGTH
    );
    const controlY = ropeTopY + ROPE_LENGTH / 2; // Контрольная точка для кривой Безье шнура
    // Исходный path data для шнура
    const ropeD0 = `M ${ropeTopX} ${ropeTopY} Q ${ropeTopX} ${controlY} ${ropeBottomX} ${ropeBottomY}`;
    ropePath.setAttribute("d", ropeD0);
    ropeHighlight.setAttribute("d", ropeD0);
    // Начальная позиция шарика
    ropeBall.setAttribute("cx", `${ropeBottomX}`);
    ropeBall.setAttribute("cy", `${ropeBottomY + 6}`);
    ropeBall.setAttribute("r", "6");

    // Сохраняем текущие координаты шнура для использования в обработчиках клика и анимации
    lastCoords = {
      ropeTopX: ropeTopX,
      ropeTopY: ropeTopY,
      ropeBottomY: ropeBottomY,
    };

    setGarlandState(isOn);
  }

  // Инициализируем гирлянду при загрузке страницы
  updatePositionAndLayout();
  // Обновляем гирлянду при изменении размера окна (с debounce)
  window.addEventListener("resize", debounceUpdate);
  // Обновляем гирлянду при скролле (с debounce), чтобы она следовала за навигацией, если та прилипает/отлипает
  window.addEventListener("scroll", debounceUpdate, { passive: true });
  // Небольшая задержка для повторного обновления, чтобы учесть возможные изменения DOM после инициализации
  setTimeout(updatePositionAndLayout, 400);
})();
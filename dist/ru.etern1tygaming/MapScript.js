mw.loader.using('jquery').then(function () {

  let scale = 1;
  let x = 0;
  let y = 0;

  let dragging = false;
  let startX, startY;

  const MAP_BOUNDS = {
    width: 2800,
    height: 2000
  };

  let VIEW_BOUNDS = {
    width: window.innerWidth * 0.9,
    height: window.innerHeight * 0.9
  };

  function apply(stage) {
    stage.css("transform", "translate(" + x + "px, " + y + "px) scale(" + scale + ")");
  }

  function clampPan() {
    const scaledWidth = MAP_BOUNDS.width * scale;
    const scaledHeight = MAP_BOUNDS.height * scale;

    const maxX = (scaledWidth - VIEW_BOUNDS.width) / 2;
    const maxY = (scaledHeight - VIEW_BOUNDS.height) / 2;

    const minX = -maxX;
    const minY = -maxY;

    x = Math.max(minX, Math.min(maxX, x));
    y = Math.max(minY, Math.min(maxY, y));
  }

  function lockScroll(lock) {
    $("body").css("overflow", lock ? "hidden" : "");
  }

  function hideDot(container) {
    const dot = container.find(".map-marker-dot");
    dot.fadeOut(500);
  }

  $(window).on("resize", function () {
    VIEW_BOUNDS.width = window.innerWidth * 0.9;
    VIEW_BOUNDS.height = window.innerHeight * 0.9;
    clampPan();
    $(".map-stage").each(function () {
      apply($(this));
    });
  });

  $(document).on("click", ".map-open-btn", function () {
    const container = $(this).siblings(".map-container");
    container.toggle();

    const stage = container.find(".map-stage");

    if (container.is(":visible")) {
      scale = 1;
      x = 0;
      y = 0;

      apply(stage);

      stage.find(".map-floor").hide();
      stage.find(".floor-1").show();

      lockScroll(true);
      
      VIEW_BOUNDS.width = container.find(".map-view").width();
      VIEW_BOUNDS.height = container.find(".map-view").height();
    } else {
      lockScroll(false);
    }
  });

  $(document).on("click", function (e) {
    if ($(e.target).closest(".map-container, .map-open-btn").length === 0) {
      $(".map-container").hide();
      lockScroll(false);
    }
  });

  $(document).on("click", ".map-floor-btn", function () {
    const floor = $(this).data("floor");
    const container = $(this).closest(".map-container");
    const stage = container.find(".map-stage");

    stage.find(".map-floor").hide();
    stage.find(".floor-" + floor).show();

    container.find(".map-floor-btn").removeClass("active");
    $(this).addClass("active");
    
    hideDot(container);
  });

  $(document).on("wheel", ".map-view", function (e) {
    e.preventDefault();

    const delta = e.originalEvent.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(8, scale + delta));

    if (newScale === scale) return;

    const rect = this.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const targetX = (mouseX - x) / scale;
    const targetY = (mouseY - y) / scale;

    scale = newScale;

    x = mouseX - targetX * scale;
    y = mouseY - targetY * scale;

    clampPan();

    const stage = $(this).find(".map-stage");
    apply(stage);
  });

  $(document).on("mousedown", ".map-stage", function (e) {
    dragging = true;
    startX = e.pageX - x;
    startY = e.pageY - y;
    $(this).css("cursor", "grabbing");
  });

  $(document).on("mousemove", function (e) {
    if (!dragging) return;

    x = e.pageX - startX;
    y = e.pageY - startY;

    clampPan();

    $(".map-stage").each(function () {
      apply($(this));
    });
  });

  $(document).on("mouseup", function () {
    dragging = false;
    $(".map-stage").css("cursor", "");
  });

  $(document).on("click", ".zoom-in", function () {
    const container = $(this).closest(".map-container");
    const stage = container.find(".map-stage");

    scale = Math.min(8, scale + 0.2);
    clampPan();
    apply(stage);
  });

  $(document).on("click", ".zoom-out", function () {
    const container = $(this).closest(".map-container");
    const stage = container.find(".map-stage");

    scale = Math.max(0.5, scale - 0.2);
    clampPan();
    apply(stage);
  });

  $(document).on("click", ".zoom-reset", function () {
    const container = $(this).closest(".map-container");
    const stage = container.find(".map-stage");

    scale = 1;
    x = 0;
    y = 0;

    apply(stage);
    hideDot(container);
  });

  $(document).on("click", ".map-menu-toggle", function () {
    $(this).siblings(".map-sidebar").addClass("open");
  });

  $(document).on("click", ".map-sidebar-close", function () {
    $(this).closest(".map-sidebar").removeClass("open");
  });

  $(document).on("click", ".map-category-header", function () {
    $(this).siblings(".map-category-list").slideToggle(150);
  });

  $(document).on("click", ".map-marker", function () {
    const floor = $(this).data("floor");
    let posX = $(this).data("x");
    let posY = $(this).data("y");
    const zoom = $(this).data("zoom") || 2;

    const container = $(this).closest(".map-container");
    const stage = container.find(".map-stage");
    const view = container.find(".map-view");

    stage.find(".map-floor").hide();
    stage.find(".floor-" + floor).show();

    container.find(".map-floor-btn").removeClass("active");
    container.find('.map-floor-btn[data-floor="' + floor + '"]').addClass("active");

    VIEW_BOUNDS.width = view.width();
    VIEW_BOUNDS.height = view.height();

	scale = zoom;
	
	x = -(posX * scale) + VIEW_BOUNDS.width / 2;
	y = -(posY * scale) + VIEW_BOUNDS.height / 2;

    clampPan();

    stage.css("transition", "transform 0.4s ease");
    apply(stage);

    setTimeout(function () {
      stage.css("transition", "");
    }, 400);

    const dot = container.find(".map-marker-dot");
    
    dot.css({
      left: "50%",
      top: "50%",
      display: "block"
    });

    setTimeout(function () {
      hideDot(container);
    }, 2000);
  });

  let coordMode = false;
  
  window.enableCoordMode = function() {
    coordMode = true;
    console.log("Режим определения координат ВКЛЮЧЁН.");
  };
  
  window.disableCoordMode = function() {
    coordMode = false;
    console.log("Режим определения координат ВЫКЛЮЧЕН.");
  };

  $(document).on("dblclick", ".map-view", function (e) {
    if (!coordMode) return;
    
    const rect = this.getBoundingClientRect();
    const stage = $(this).find(".map-stage");
    const transform = stage.css("transform");
    
    let tx = 0, ty = 0;
    if (transform !== "none") {
      const matrix = transform.match(/matrix.*\((.+)\)/);
      if (matrix) {
        const values = matrix[1].split(", ");
        tx = parseFloat(values[4]);
        ty = parseFloat(values[5]);
      }
    }
    
    const mapX = (e.clientX - rect.left - tx) / scale;
    const mapY = (e.clientY - rect.top - ty) / scale;
    
    let floor = "1";
    const visibleFloor = $(this).closest(".map-container").find(".map-floor:visible").attr("class");
    if (visibleFloor) {
      const match = visibleFloor.match(/floor-?(\d+)/);
      if (match) floor = match[1];
    }
    
	const x = Math.round(mapX);
	const y = Math.round(mapY);
	
	const result = `data-x="${x}" data-y="${y}"`;
	
	navigator.clipboard.writeText(result);
	
	alert(result);
	console.log(result);
  });

});
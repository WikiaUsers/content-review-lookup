/***********
THE MAIN JS OF THE FANDOM WIKI LIES IN HERE.
CHANGING THE CODE WITHOUT ANY PERMISSION OR APPROVAL FROM THE WIKI'S CURRENT BUREAUCRAT
WILL RESULT IN A TEMPORARY BAN of 2 days.
PROCEED AT YOUR OWN RISK.
***********/


/********* UTC Clock Format Starts HERE **********/
(function () {
  const now = new Date();

  const localTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });

  const localDate = now.toLocaleDateString(undefined, {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  window.DisplayClockJS = {
    format:
      "%2H : %2M : %2S | %{Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday}w | %B, %2d %Y",

    hoverText:
      `In this town, timing is everything. Miss it, and you’re yesterday’s news. ` +
      `Local time: ${localTime} | ${localDate}`
  };
})();
/********* UTC Clock Format Ends HERE **********/


mw.loader.using("mediawiki.util").then(function () {
  jQuery(function ($) {

    // Text Sequence Animation STARTS HERE

    function advanceFrame() {
      const $sequence = $(this);
      const $currentFrame = $sequence.children(".is-visible");
      const $nextFrame = $currentFrame.next();

      if ($nextFrame.length === 0) {
        clearInterval($sequence.data("intervalId"));
        return;
      }

      $currentFrame.removeClass("is-visible");
      $nextFrame.addClass("is-visible");
    }

    $(".text-sequence").each(function () {
      const $sequence = $(this);
      const delayMs =
        parseInt($sequence.data("delay-ms"), 10) || 2000;

      $sequence.on("advanceFrame", advanceFrame);

      const intervalId = setInterval(function () {
        $sequence.trigger("advanceFrame");
      }, delayMs);

      $sequence.data("intervalId", intervalId);
    });

    // Text Sequence Animation ENDS HERE



    // Random Letter Reveal STARTS HERE

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_+`-=";

    const element = document.getElementById("scramble");

    if (element) {
      const targetText = element.textContent.trim();

      let revealIndex = 0;
      let frame = 0;

      const scramblePerChar = 10;
      const frameDelay = 30;

      let hasAnimated = false;

      function scrambleFrame() {
        let display = "";

        for (let i = 0; i < targetText.length; i++) {
          if (i < revealIndex) {
            display += targetText[i];
          } else if (targetText[i] === " ") {
            display += " ";
          } else {
            const randChar =
              chars[Math.floor(Math.random() * chars.length)];
            display += randChar;
          }
        }

        element.textContent = display;
        frame++;

        if (frame % scramblePerChar === 0) {
          revealIndex++;
        }

        if (revealIndex <= targetText.length) {
          setTimeout(scrambleFrame, frameDelay);
        }
      }

      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              hasAnimated = true;
              scrambleFrame();
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          threshold: 0.5
        }
      );

      observer.observe(element);
    }

    // Random Letter Reveal ENDS HERE



    // Statistics Counter STARTS HERE
    

    function animateCounter(element, end, duration) {
      const start = 0;
      const range = end - start;
      const startTime = performance.now();

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 5);
      }

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easedProgress = easeOutCubic(progress);
        const currentValue =
          Math.floor(start + easedProgress * range);

        element.textContent =
          currentValue.toLocaleString("en-US");

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
    }

    const counters =
      document.querySelectorAll(".counter");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;

            const endValue = parseInt(
              element
                .getAttribute("data-target")
                .replace(/,/g, ""),
              10
            );

            animateCounter(element, endValue, 4000);
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    counters.forEach((counter) => {
      counter.textContent = "0";
      observer.observe(counter);
    });

    // Statistics Counter ENDS HERE



    // Custom Gallery Slider STARTS HERE

    document.querySelectorAll(".slider-container")
      .forEach((container) => {

        const slider = container.querySelector(".slider");
        const slides = slider.querySelectorAll(".slide");
        const thumbnails =
          container.querySelectorAll(".thumb-wrapper");

        const leftArrow =
          container.querySelector(".leftArrow");

        const rightArrow =
          container.querySelector(".rightArrow");

        let currentIndex = 0;

        function updateSlider() {
          slider.style.transform =
            `translateX(-${currentIndex * 100}%)`;

          thumbnails.forEach((thumb, i) => {
            thumb
              .querySelector(".thumbnail")
              .classList.toggle(
                "active",
                i === currentIndex
              );
          });
        }

        function goToSlide(index) {
          currentIndex = index;
          updateSlider();
        }

        function nextSlide() {
          currentIndex =
            (currentIndex + 1) % slides.length;
          updateSlider();
        }

        function prevSlide() {
          currentIndex =
            (currentIndex - 1 + slides.length) %
            slides.length;
          updateSlider();
        }

        thumbnails.forEach((thumb, index) => {
          thumb.addEventListener("click", () => {
            goToSlide(index);
          });
        });

        rightArrow.addEventListener("click", nextSlide);
        leftArrow.addEventListener("click", prevSlide);

        setInterval(nextSlide, 5000);
      });

    // Custom Gallery Slider ENDS HERE

  });
});
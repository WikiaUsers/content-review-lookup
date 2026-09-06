// dont submit

function importcss(url) {
    return new Promise((resolve, reject) => {
        const style = document.createElement("link");
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = url;
        style.onload = resolve;
        style.onerror = reject;
        document.head.appendChild(style);
    });
}

function importjs(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = 'text/javascript';
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

Promise.all([
    importcss("https://unpkg.com/lenis@1.3.26/dist/lenis.css"),
    importjs("https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"),
    importjs("https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"),
    importjs("https://unpkg.com/lenis@1.3.26/dist/lenis.min.js")
]).then(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrapperElement = document.querySelector('.scrollercontainer');
    const contentElement = document.querySelector('.scrollercontent');
    new Lenis({
        wrapper: wrapperElement,
        content: contentElement,
        autoRaf: true,
        autoToggle: true,
        anchors: true,
        allowNestedScroll: true,
        naiveDimensions: true,
        stopInertiaOnNavigate: true
    })

    mw.hook("wikipage.content").add(() => {
        document.querySelectorAll(".scrollercontainer").forEach(container => {
            const block = container.querySelector(".block");
            const scrollbox = container.querySelector(".scrollbox");
            if (!block || !scrollbox) return;

            const resize = () => {
                const distance = Math.max(
                    0,
                    scrollbox.scrollWidth - container.clientWidth
                );

                block.style.height =
                    `${distance + container.clientHeight}px`;

                return distance;
            };

            let distance = resize();

            const trigger = ScrollTrigger.create({
                trigger: block,
                scroller: container,
                start: "top top",
                end: () => `+=${distance}`,
                invalidateOnRefresh: true,

                onRefresh() {
                    distance = resize();
                },

                onUpdate(self) {
                    scrollbox.style.transform =
                        `translate3d(${-self.progress * distance}px,0,0)`;
                }
            });

            new ResizeObserver(() => {
                distance = resize();
                trigger.refresh();
            }).observe(scrollbox);
        });
    });

    $(document).on("click", ".mw-customtoggle", () => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => ScrollTrigger.refresh());
        });
    });
}).catch(console.error);
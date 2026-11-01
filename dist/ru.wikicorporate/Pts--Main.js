/* Fandom Adapter: Pts.js (ES2024) */
(async () => {
    'use strict';
    if (window.FandomPtsMainLoaded) return;
    window.FandomPtsMainLoaded = true;

    const CDN_URL = 'https://cdn.jsdelivr.net/npm/pts@0.12.9/+esm';

    try {
        const { CanvasSpace, Pt, Group, Line, Create, Num } = await import(CDN_URL);

        const getThemeColors = (el) => {
            const st = getComputedStyle(el);
            return {
                secondary: st.getPropertyValue('--s').trim() || '#47BE9D',
                link: st.getPropertyValue('--l').trim() || '#8EA1FE'
            };
        };

        const PRESETS = {
            constellation(space, form, el) {
                let pts = new Group();
                const count = Number(el.dataset.count) || 45;
                return {
                    start(bound) {
                        pts = Create.distributeRandom(bound, count);
                    },
                    animate(time) {
                        const { secondary, link } = getThemeColors(el);
                        const center = space.center;
                        const pointer = space.pointer;
                        pts.rotate2D(0.0015, center);

                        for (let i = 0; i < pts.length; i++) {
                            const p = pts[i];
                            const dist = p.$subtract(pointer).magnitude();
                            if (dist < 110) {
                                form.stroke(link, (1 - dist / 110) * 1.5).line([p, pointer]);
                            }
                            for (let j = i + 1; j < pts.length; j++) {
                                const d2 = p.$subtract(pts[j]).magnitude();
                                if (d2 < 65) {
                                    form.stroke(secondary, (1 - d2 / 65) * 0.6).line([p, pts[j]]);
                                }
                            }
                            form.fillOnly(secondary).point(p, dist < 110 ? 3.5 : 2, 'circle');
                        }
                    }
                };
            },
            waves(space, form, el) {
                let lines = [];
                return {
                    start(bound) {
                        lines = [];
                        for (let i = 0; i < 3; i++) {
                            lines.push(Line.subpoints([new Pt(0, bound.height / 2), new Pt(bound.width, bound.height / 2)], 40));
                        }
                    },
                    animate(time) {
                        const { secondary, link } = getThemeColors(el);
                        const t = time * 0.003;
                        const py = space.pointer.y || space.center.y;
                        const amp = Num.clamp(Math.abs(py - space.center.y) * 0.6, 12, space.size.y * 0.42);

                        lines.forEach((line, idx) => {
                            const wavePts = line.map((p, i) => {
                                const ratio = i / (line.length - 1);
                                const env = Math.sin(ratio * Math.PI);
                                const yOffset = Math.sin(ratio * 8 + t + idx * 1.1) * amp * env;
                                return new Pt(p.x, space.center.y + yOffset);
                            });
                            form.strokeOnly(idx === 0 ? secondary : link, idx === 0 ? 2.2 : 1.2).eline(wavePts);
                        });
                    }
                };
            }
        };

        const visibilityObserver = new IntersectionObserver(entries => {
            for (const entry of entries) {
                const space = entry.target._ptsSpace;
                if (space) space.pause(!entry.isIntersecting);
            }
        });

        const mountSpaces = () => {
            const wrappers = document.querySelectorAll('.pts-wrapper:not([data-pts-mounted="true"])');
            for (const el of wrappers) {
                el.dataset.ptsMounted = 'true';
                const presetName = el.dataset.preset || 'constellation';
                const factory = PRESETS[presetName] || PRESETS.constellation;

                const canvas = document.createElement('canvas');
                canvas.style.cssText = 'width:100%;height:100%;display:block;border-radius:inherit;';
                el.appendChild(canvas);

                const space = new CanvasSpace(canvas).setup({ bgcolor: 'transparent', resize: true, retina: true });
                const form = space.getForm();
                space.add(factory(space, form, el));
                space.bindMouse().bindTouch().play();

                el._ptsSpace = space;
                visibilityObserver.observe(el);
            }
        };

        mountSpaces();
        new MutationObserver(mutations => {
            if (mutations.some(m => m.addedNodes.length > 0)) mountSpaces();
        }).observe(document.body, { childList: true, subtree: true });
    } catch (err) {
        console.error('[Pts] Ошибка инициализации:', err);
    }
})();
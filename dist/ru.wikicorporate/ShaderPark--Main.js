/* Fandom Adapter: Shader Park (ES2025) */
(async () => {
    'use strict';
    if (window.FandomShaderParkMainLoaded) return;
    window.FandomShaderParkMainLoaded = true;

    const SCENES_PAGE = 'MediaWiki:Custom-ShaderPark';
    const CENTRAL_INDEX = 'https://wikicorporate.fandom.com/ru/index.php';
    const CACHE_KEY = `sp_scenes_${mw.config.get('wgCityId') ?? 'global'}`;

    const SHAPES = {
        sphere: 0,
        torus: 1,
        octahedron: 2,
        boxframe: 3,
        gyroid: 4,
        crystal: 5,
        portal: 6,
        mandelbulb: 7
    };

    const OPS = {
        none: 0,
        hollow: 1,
        'gyroid-cut': 2,
        'spheres-union': 3
    };

    const VERT_SRC = `#version 300 es
    in vec2 a_pos;
    out vec2 v_uv;
    void main() {
        v_uv = a_pos;
        gl_Position = vec4(a_pos, 0.0, 1.0);
    }`;

    const FRAG_SRC = `#version 300 es
    precision highp float;
    in vec2 v_uv;
    out vec4 outColor;

    uniform vec2 u_res;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform int u_shape;
    uniform int u_op;
    uniform float u_scale;
    uniform float u_twist;
    uniform float u_displace;
    uniform float u_metal;
    uniform float u_shine;
    uniform float u_glow;
    uniform vec3 u_col1;
    uniform vec3 u_col2;

    mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
    }

    float sdSphere(vec3 p, float s) { return length(p) - s; }

    float sdTorus(vec3 p, vec2 t) {
        vec2 q = vec2(length(p.xz) - t.x, p.y);
        return length(q) - t.y;
    }

    float sdOctahedron(vec3 p, float s) {
        p = abs(p);
        float m = p.x + p.y + p.z - s;
        vec3 q;
        if (3.0 * p.x < m) q = p.xyz;
        else if (3.0 * p.y < m) q = p.yzx;
        else if (3.0 * p.z < m) q = p.zxy;
        else return m * 0.57735027;
        float k = clamp(0.5 * (q.z - q.y + s), 0.0, s);
        return length(vec3(q.x, q.y - s + k, q.z - k));
    }

    float sdBoxFrame(vec3 p, vec3 b, float e) {
        p = abs(p) - b;
        vec3 q = abs(p + e) - e;
        return min(min(
            length(max(vec3(p.x, q.y, q.z), 0.0)) + min(max(p.x, max(q.y, q.z)), 0.0),
            length(max(vec3(q.x, p.y, q.z), 0.0)) + min(max(q.x, max(p.y, q.z)), 0.0)),
            length(max(vec3(q.x, q.y, p.z), 0.0)) + min(max(q.x, max(q.y, p.z)), 0.0));
    }

    float sdGyroid(vec3 p, float scale, float thickness) {
        p *= scale;
        return abs(dot(sin(p), cos(p.zxy))) / scale - thickness;
    }

    float sdMandelbulb(vec3 p) {
        vec3 z = p;
        float dr = 1.0, r = 0.0;
        float power = 6.0 + 2.0 * sin(u_time * 0.4);
        for (int i = 0; i < 6; i++) {
            r = length(z);
            if (r > 2.0) break;
            float theta = acos(clamp(z.z / r, -1.0, 1.0));
            float phi = atan(z.y, z.x);
            dr = pow(r, power - 1.0) * power * dr + 1.0;
            float zr = pow(r, power);
            theta *= power;
            phi *= power;
            z = zr * vec3(sin(theta) * cos(phi), sin(phi) * sin(theta), cos(theta)) + p;
        }
        return 0.5 * log(r) * r / dr;
    }

    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }

    float map(vec3 p) {
        p /= u_scale;
        p.yz *= rot(u_mouse.y * 2.5 + u_time * 0.35);
        p.xz *= rot(u_mouse.x * 2.5 + u_time * 0.5);

        if (abs(u_twist) > 0.001) p.xz *= rot(p.y * u_twist);

        float d = 1e5;
        if (u_shape == 0) d = sdSphere(p, 0.85);
        else if (u_shape == 1) d = sdTorus(p, vec2(0.7, 0.28));
        else if (u_shape == 2) d = sdOctahedron(p, 1.05);
        else if (u_shape == 3) d = sdBoxFrame(p, vec3(0.75), 0.08);
        else if (u_shape == 4) d = max(sdSphere(p, 0.95), sdGyroid(p + vec3(0.0, 0.0, u_time * 0.2), 5.5, 0.04));
        else if (u_shape == 5) {
            float oct = sdOctahedron(p, 1.0);
            p.xz *= rot(0.785);
            d = smin(oct, sdOctahedron(p * vec3(1.2, 0.7, 1.2), 0.85), 0.12);
        } else if (u_shape == 6) {
            float ring = sdTorus(p, vec2(0.85, 0.14));
            float core = sdGyroid(p + u_time * 0.3, 6.0, 0.03);
            d = smin(ring, max(sdSphere(p, 0.75), core), 0.15);
        } else {
            d = sdMandelbulb(p * 1.1) / 1.1;
        }

        if (u_op == 1) d = abs(d) - 0.04;
        else if (u_op == 2) d = max(d, -sdGyroid(p, 6.5, 0.035));
        else if (u_op == 3) {
            for (int i = 0; i < 3; i++) {
                float fi = float(i) * 2.094 + u_time;
                vec3 spPos = vec3(cos(fi), sin(fi * 0.7), sin(fi)) * 0.75;
                d = smin(d, sdSphere(p - spPos, 0.28), 0.25);
            }
        }

        if (u_displace > 0.001) {
            d += sin(p.x * 6.0 + u_time * 2.0) * sin(p.y * 6.0 + u_time * 1.7) * sin(p.z * 6.0) * u_displace;
        }
        return d * u_scale * 0.75;
    }

    vec3 calcNormal(vec3 p) {
        vec2 e = vec2(0.002, 0.0);
        return normalize(vec3(
            map(p + e.xyy) - map(p - e.xyy),
            map(p + e.yxy) - map(p - e.yxy),
            map(p + e.yyx) - map(p - e.yyx)
        ));
    }

    void main() {
        vec2 uv = (v_uv * u_res) / min(u_res.x, u_res.y);
        vec3 ro = vec3(0.0, 0.0, 2.65);
        vec3 rd = normalize(vec3(uv, -1.5));

        float t = 0.0, glowAcc = 0.0;
        bool hit = false;

        for (int i = 0; i < 72; i++) {
            vec3 p = ro + rd * t;
            float d = map(p);
            glowAcc += 0.012 / (0.015 + abs(d) * 6.0);
            if (d < 0.002) { hit = true; break; }
            if (t > 6.0) break;
            t += d;
        }

        vec3 col = vec3(0.0);
        float alpha = 0.0;

        if (hit) {
            vec3 p = ro + rd * t;
            vec3 n = calcNormal(p);
            vec3 l1 = normalize(vec3(1.0, 1.4, 1.2));
            vec3 l2 = normalize(vec3(-1.2, -0.8, 0.6));

            float diff1 = max(dot(n, l1), 0.0);
            float diff2 = max(dot(n, l2), 0.0);
            float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
            float spec = pow(max(dot(reflect(-l1, n), -rd), 0.0), 8.0 + u_shine * 48.0) * u_shine;

            vec3 baseCol = mix(u_col1, u_col2, 0.5 + 0.5 * n.y + fresnel * 0.4);
            vec3 envCol = mix(u_col2, u_col1, reflect(-rd, n).y * 0.5 + 0.5);

            col = mix(baseCol * (0.2 + diff1 * 0.8 + diff2 * 0.35), envCol * (0.6 + diff1 * 0.6), u_metal);
            col += spec * mix(vec3(1.0), u_col2, u_metal * 0.5);
            col += fresnel * u_col2 * (0.4 + u_glow * 0.4);
            alpha = 1.0;
        }

        if (u_glow > 0.01) {
            vec3 glowCol = mix(u_col1, u_col2, 0.5) * glowAcc * u_glow * 0.25;
            col += glowCol;
            alpha = clamp(alpha + length(glowCol), 0.0, 1.0);
        }

        outColor = vec4(col, alpha);
    }`;

    // Безопасный парсер сцен из MediaWiki:Custom-ShaderPark (поддерживает и key: val, и синтаксис функций)
    const parseSceneConfig = (blockText = '') => {
        const cfg = {};
        const clean = blockText.replace(/\/\/.*$/gm, '').trim();

        for (const [, key, val] of clean.matchAll(/([a-zA-Z0-9_-]+)\s*:\s*([^;\n]+)/g)) {
            cfg[key.toLowerCase()] = val.trim();
        }

        for (const [, fn, argsStr] of clean.matchAll(/([a-zA-Z0-9_]+)\s*\(([^)]*)\)/g)) {
            const name = fn.toLowerCase();
            const nums = argsStr.split(',').map(s => parseFloat(s.trim())).filter(Number.isFinite);
            if (name in SHAPES) {
                cfg.shape = name;
                if (nums[0]) cfg.scale = nums[0];
            } else if (name === 'metal' && nums[0] !== undefined) cfg.metal = nums[0];
            else if (name === 'shine' && nums[0] !== undefined) cfg.shine = nums[0];
            else if (name === 'displace' && nums[0] !== undefined) cfg.displace = nums[0];
            else if (name === 'twist' && nums[0] !== undefined) cfg.twist = nums[0];
            else if (name === 'glow' && nums[0] !== undefined) cfg.glow = nums[0];
            else if (name === 'color' && nums.length >= 3) {
                const to255 = v => Math.round(Math.min(1, Math.max(0, v)) * 255);
                cfg.color1 = `rgb(${to255(nums[0])} ${to255(nums[1])} ${to255(nums[2])})`;
            }
        }
        return cfg;
    };

    const fetchScenesRegistry = async () => {
        try {
            const cached = sessionStorage.getItem(CACHE_KEY);
            if (cached) return JSON.parse(cached);
        } catch {}

        try {
            const res = await fetch(`${CENTRAL_INDEX}?title=${encodeURIComponent(SCENES_PAGE)}&action=raw&ctype=text/plain`);
            if (!res.ok) return {};
            const raw = await res.text();
            const map = {};
            const parts = raw.split(/\/\*\s*@scene:\s*([a-zA-Z0-9_-]+)\s*\*\//);
            for (let i = 1; i < parts.length; i += 2) {
                map[parts[i].trim().toLowerCase()] = parseSceneConfig(parts[i + 1] ?? '');
            }
            try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(map)); } catch {}
            return map;
        } catch (e) {
            console.warn('[ShaderPark] Ошибка загрузки реестра сцен:', e);
            return {};
        }
    };

    const resolveColorVec3 = (el, rawColor, fallback = '#dac04d') => {
        const probe = document.createElement('span');
        probe.style.display = 'none';
        probe.style.color = rawColor || fallback;
        el.appendChild(probe);
        const rgb = getComputedStyle(probe).color;
        probe.remove();

        const nums = rgb.match(/\d+(\.\d+)?/g)?.map(Number);
        return nums?.length >= 3
            ? [nums[0] / 255, nums[1] / 255, nums[2] / 255]
            : [0.85, 0.75, 0.3];
    };

    const compileShader = (gl, type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    };

    try {
        const scenesMap = await fetchScenesRegistry();
        const mounted = new WeakSet();

        const mountScene = (el) => {
            if (mounted.has(el)) return;
            mounted.add(el);

            const sceneName = (el.dataset.scene || el.dataset.shader || 'default').toLowerCase();
            const cfg = { ...(scenesMap[sceneName] ?? {}), ...el.dataset };

            el.textContent = '';
            const canvas = document.createElement('canvas');
            canvas.style.cssText = 'width:100%;height:100%;display:block;border-radius:inherit;cursor:grab;touch-action:none;';
            el.appendChild(canvas);

            const gl = canvas.getContext('webgl2', { alpha: true, antialias: true, premultipliedAlpha: false });
            if (!gl) return;

            const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
            const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
            if (!vs || !fs) return;

            const prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

            const buf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

            const posLoc = gl.getAttribLocation(prog, 'a_pos');
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

            const u = Object.fromEntries(
                ['res', 'time', 'mouse', 'shape', 'op', 'scale', 'twist', 'displace', 'metal', 'shine', 'glow', 'col1', 'col2']
                    .map(name => [name, gl.getUniformLocation(prog, `u_${name}`)])
            );

            const shapeId = SHAPES[String(cfg.shape ?? 'gyroid').toLowerCase()] ?? 4;
            const opId = OPS[String(cfg.operation ?? cfg.op ?? 'none').toLowerCase()] ?? 0;
            const scaleVal = parseFloat(cfg.scale) || 1.0;
            const twistVal = parseFloat(cfg.twist) || 0.0;
            const dispVal = parseFloat(cfg.displace) || 0.05;
            const metalVal = Number.isFinite(parseFloat(cfg.metal)) ? parseFloat(cfg.metal) : 0.35;
            const shineVal = Number.isFinite(parseFloat(cfg.shine)) ? parseFloat(cfg.shine) : 0.75;
            const glowVal = Number.isFinite(parseFloat(cfg.glow)) ? parseFloat(cfg.glow) : 1.0;
            const speedVal = parseFloat(cfg.speed) || 1.0;

            const c1 = resolveColorVec3(el, cfg.color1 ?? 'var(--s)');
            const c2 = resolveColorVec3(el, cfg.color2 ?? 'var(--l)');

            let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
            let visible = false;
            const startTime = performance.now();

            canvas.addEventListener('pointermove', (e) => {
                const r = canvas.getBoundingClientRect();
                targetX = ((e.clientX - r.left) / r.width) * 2 - 1;
                targetY = ((e.clientY - r.top) / r.height) * 2 - 1;
            }, { passive: true });

            const render = (now) => {
                if (!visible) return;
                const w = canvas.width = el.clientWidth || 280;
                const h = canvas.height = el.clientHeight || 280;
                gl.viewport(0, 0, w, h);
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);

                mouseX += (targetX - mouseX) * 0.08;
                mouseY += (targetY - mouseY) * 0.08;

                gl.useProgram(prog);
                gl.uniform2f(u.res, w, h);
                gl.uniform1f(u.time, ((now - startTime) * 0.001) * speedVal);
                gl.uniform2f(u.mouse, mouseX, mouseY);
                gl.uniform1i(u.shape, shapeId);
                gl.uniform1i(u.op, opId);
                gl.uniform1f(u.scale, scaleVal);
                gl.uniform1f(u.twist, twistVal);
                gl.uniform1f(u.displace, dispVal);
                gl.uniform1f(u.metal, metalVal);
                gl.uniform1f(u.shine, shineVal);
                gl.uniform1f(u.glow, glowVal);
                gl.uniform3fv(u.col1, c1);
                gl.uniform3fv(u.col2, c2);

                gl.drawArrays(gl.TRIANGLES, 0, 6);
                requestAnimationFrame(render);
            };

            new IntersectionObserver(([entry]) => {
                const wasVisible = visible;
                visible = Boolean(entry?.isIntersecting);
                if (visible && !wasVisible) requestAnimationFrame(render);
            }).observe(el);
        };

        const mountAll = () => {
            document.querySelectorAll('.sp-wrapper').forEach(mountScene);
        };

        mountAll();
        new MutationObserver(mutations => {
            if (mutations.some(m => m.addedNodes.length > 0)) mountAll();
        }).observe(document.body, { childList: true, subtree: true });
    } catch (err) {
        console.error('[ShaderPark] Ошибка инициализации:', err);
    }
})();
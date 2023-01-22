(function ($, mw) {
    'use strict';

    var vertexShaderSource = (
        'attribute vec4 aPosition;'
        + 'uniform mat4 uMatrix;'
        + 'uniform mat4 uTextureMatrix;'
        + 'varying vec2 vTexcoord;'
        + 'void main () {'
        + '    gl_Position = uMatrix * aPosition;'
        + '    vTexcoord = (uTextureMatrix * aPosition).xy;'
        + '}'
    );

    var fragmentShaderSource = (
        'precision mediump float;'
        + 'varying vec2 vTexcoord;'
        + 'uniform sampler2D uTexture;'
        + 'uniform vec4 uAspectColor;'
        + 'void main() {'
        + '    if (vTexcoord.x < 0.0 || vTexcoord.x > 1.0 || vTexcoord.y < 0.0 || vTexcoord.y > 1.0) {'
        + '        discard;'
        + '    }'
        + '    gl_FragColor = texture2D(uTexture, vTexcoord) * uAspectColor;'
        + '    if (gl_FragColor.a < 0.003921569) {'
        + '        /* discard; */'
        + '    }'
        + '}'
    );
    
    /**
     * List of available aspects, their RGB colors, and their blend modes.
     */
    var aspects = {
        "aer":          { color: 0xffff7e, blend: 1 /* ONE */ },
        "terra":        { color: 0x56c000, blend: 1 /* ONE */ },
        "ignis":        { color: 0xff5a01, blend: 1 /* ONE */ },
        "aqua":         { color: 0x3cd4fc, blend: 1 /* ONE */ },
        "ordo":         { color: 0xd5d4ec, blend: 1 /* ONE */ },
        "perditio":     { color: 0x404040, blend: 0x0303 /* ONE_MINUS_SRC_ALPHA */ },
        "vacuos":       { color: 0x888888, blend: 0x0303 /* ONE_MINUS_SRC_ALPHA */ },
        "lux":          { color: 0xfff663, blend: 1 /* ONE */ },
        "tempestas":    { color: 0xffffff, blend: 1 /* ONE */ },
        "motus":        { color: 0xcdccf4, blend: 1 /* ONE */ },
        "gelum":        { color: 0xe1ffff, blend: 1 /* ONE */ },
        "vitreus":      { color: 0x80ffff, blend: 1 /* ONE */ },
        "victus":       { color: 0xde0005, blend: 1 /* ONE */ },
        "venenum":      { color: 0x89f000, blend: 1 /* ONE */ },
        "potentia":     { color: 0xc0ffff, blend: 1 /* ONE */ },
        "permutatio":   { color: 0x578357, blend: 1 /* ONE */ },
        "metallum":     { color: 0xb5b5cd, blend: 1 /* ONE */ },
        "mortuus":      { color: 0x887788, blend: 1 /* ONE */ },
        "volatus":      { color: 0xe7e7d7, blend: 1 /* ONE */ },
        "tenebrae":     { color: 0x222222, blend: 1 /* ONE */ },
        "spiritus":     { color: 0xebebfb, blend: 1 /* ONE */ },
        "sano":         { color: 0xff2f34, blend: 1 /* ONE */ },
        "iter":         { color: 0xe0585b, blend: 1 /* ONE */ },
        "alienis":      { color: 0x805080, blend: 1 /* ONE */ },
        "praecantatio": { color: 0x9700c0, blend: 1 /* ONE */ },
        "auram":        { color: 0xffc0ff, blend: 1 /* ONE */ },
        "vitium":       { color: 0x800080, blend: 1 /* ONE */ },
        "limus":        { color: 0x01f800, blend: 1 /* ONE */ },
        "herba":        { color: 0x01ac00, blend: 1 /* ONE */ },
        "arbor":        { color: 0x876531, blend: 1 /* ONE */ },
        "bestia":       { color: 0x9f6409, blend: 1 /* ONE */ },
        "corpus":       { color: 0xee478d, blend: 1 /* ONE */ },
        "exanimis":     { color: 0x3a4000, blend: 1 /* ONE */ },
        "cognitio":     { color: 0xffc2b3, blend: 1 /* ONE */ },
        "sensus":       { color: 0x0fd9ff, blend: 1 /* ONE */ },
        "humanus":      { color: 0xffd7c0, blend: 1 /* ONE */ },
        "messis":       { color: 0xe1b371, blend: 1 /* ONE */ },
        "perfodio":     { color: 0xdcd2d8, blend: 1 /* ONE */ },
        "instrumentum": { color: 0x4040ee, blend: 1 /* ONE */ },
        "meto":         { color: 0xeead82, blend: 1 /* ONE */ },
        "telum":        { color: 0xc05050, blend: 1 /* ONE */ },
        "tutamen":      { color: 0x00c0c0, blend: 1 /* ONE */ },
        "fames":        { color: 0x9a0305, blend: 1 /* ONE */ },
        "lucrum":       { color: 0xe6be44, blend: 1 /* ONE */ },
        "fabrico":      { color: 0x809d80, blend: 1 /* ONE */ },
        "pannus":       { color: 0xeaeac2, blend: 1 /* ONE */ },
        "machina":      { color: 0x8080a0, blend: 1 /* ONE */ },
        "vinculum":     { color: 0x9a8080, blend: 1 /* ONE */ }
    };

    /**
     * Utility for matrix manipulations.
     *
     * Adapted from https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
     */
    var m4 = {
        identity: function() {
            return [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
        },
        ortho: function(left, right, bottom, top, near, far) {
            return [
                2 / (right - left), 0, 0, 0,
                0, 2 / (top - bottom), 0, 0,
                0, 0, 2 / (near - far), 0,
                (left + right) / (left - right),
                (bottom + top) / (bottom - top),
                (near + far) / (near - far),
                1
            ];
        },
        multiply: function(a, b) {
            var b00 = b[0 * 4 + 0];
            var b01 = b[0 * 4 + 1];
            var b02 = b[0 * 4 + 2];
            var b03 = b[0 * 4 + 3];
            var b10 = b[1 * 4 + 0];
            var b11 = b[1 * 4 + 1];
            var b12 = b[1 * 4 + 2];
            var b13 = b[1 * 4 + 3];
            var b20 = b[2 * 4 + 0];
            var b21 = b[2 * 4 + 1];
            var b22 = b[2 * 4 + 2];
            var b23 = b[2 * 4 + 3];
            var b30 = b[3 * 4 + 0];
            var b31 = b[3 * 4 + 1];
            var b32 = b[3 * 4 + 2];
            var b33 = b[3 * 4 + 3];
            var a00 = a[0 * 4 + 0];
            var a01 = a[0 * 4 + 1];
            var a02 = a[0 * 4 + 2];
            var a03 = a[0 * 4 + 3];
            var a10 = a[1 * 4 + 0];
            var a11 = a[1 * 4 + 1];
            var a12 = a[1 * 4 + 2];
            var a13 = a[1 * 4 + 3];
            var a20 = a[2 * 4 + 0];
            var a21 = a[2 * 4 + 1];
            var a22 = a[2 * 4 + 2];
            var a23 = a[2 * 4 + 3];
            var a30 = a[3 * 4 + 0];
            var a31 = a[3 * 4 + 1];
            var a32 = a[3 * 4 + 2];
            var a33 = a[3 * 4 + 3];

            return [
                b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
                b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
                b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
                b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
                b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
                b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
                b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
                b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
                b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
                b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
                b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
                b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
                b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
                b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
                b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
                b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
            ];
        },
        translation: function(tx, ty, tz) {
            return [
                1,  0,  0,  0,
                0,  1,  0,  0,
                0,  0,  1,  0,
                tx, ty, tz, 1,
            ];
        },
        scaling: function(sx, sy, sz) {
            return [
                sx, 0,  0,  0,
                0, sy,  0,  0,
                0,  0, sz,  0,
                0,  0,  0,  1,
            ];
        },
        zRotation: function(rad) {
            var c = Math.cos(rad);
            var s = Math.sin(rad);
            return [
                c, s, 0, 0,
                -s, c, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ];
        },
        translate: function(m, tx, ty, tz) {
            return this.multiply(m, this.translation(tx, ty, tz));
        },
        scale: function(m, sx, sy, sz) {
            return this.multiply(m, this.scaling(sx, sy, sz));
        },
        rotateZ: function(m, rad) {
            return this.multiply(m, this.zRotation(rad));
        }
    };

    /**
     * Compiles a WebGL shader from a string containing WebGL source code.
     *
     * @param {WebGLRenderingContext} gl
     * @param {number} type
     * @param {string} source
     * @returns {WebGlShader}
     */
    function createShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    /**
     * Compiles shaders and attaches them to a WebGL program.
     *
     * @param {WebGLRenderingContext} gl
     * @param {WebGLShader} vertexShader
     * @param {WebGLShader} fragmentShader
     * @returns {WebGLProgram}
     */
    function createProgram(gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }

    /**
     * Creates a WebGL program and bundles it with its attributes and uniforms.
     *
     * @param {WebGLRenderingContext} gl
     * @returns {ProgramInfo}
     */
    function createProgramInfo(gl) {
        var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        var program = createProgram(gl, vertexShader, fragmentShader);

        return {
            program: program,
            attrib: {
                position: gl.getAttribLocation(program, 'aPosition')
            },
            uniform: {
                matrix: gl.getUniformLocation(program, 'uMatrix'),
                textureMatrix: gl.getUniformLocation(program, 'uTextureMatrix'),
                texture: gl.getUniformLocation(program, 'uTexture'),
                aspectColor: gl.getUniformLocation(program, 'uAspectColor')
            }
        };
    }

    /**
     * Creates a position buffer for a 2D quad.
     *
     * @param {WebGLRenderingContext} gl
     * @returns {WebGLBuffer}
     */
    function create2DQuadPositionBuffer(gl) {
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        var positions = [
            -0.5, -0.5,
            -0.5, 0.5,
            0.5, 0.5,

            -0.5, -0.5,
            0.5, 0.5,
            0.5, -0.5
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        return buffer;
    }

    /**
     * Sets the current active position buffer in a WebGL rendering context.
     *
     * @param {WebGLRenderingContext} gl
     * @param {ProgramInfo} programInfo
     * @param {WebGLBuffer} buffer
     */
    function setPositionBuffer(gl, programInfo, buffer) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(programInfo.attrib.position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(programInfo.attrib.position);
    }

    /**
     * Sets the current active uniforms in the WebGL rendering context.
     *
     * @param {WebGLRenderingContext} gl
     * @param {ProgramInfo} programInfo
     * @param {*} uniforms
     */
    function setUniforms(gl, programInfo, uniforms) {
        gl.uniformMatrix4fv(programInfo.uniform.matrix, false, uniforms.matrix);
        gl.uniformMatrix4fv(programInfo.uniform.textureMatrix, false, uniforms.textureMatrix);
        gl.uniform1i(programInfo.uniform.texture, uniforms.texture);
        gl.uniform4fv(programInfo.uniform.aspectColor, uniforms.aspectColor);
    }

    /**
     * Resets WebGL rendering context to make it clean for the next frame.
     *
     * @param {WebGLRenderingContext} gl
     * @param {ProgramInfo} programInfo
     */
    function resetCanvas(gl, programInfo) {
        gl.useProgram(programInfo.program);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.depthMask(false);
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
        gl.enable(gl.BLEND);
    }
        
    /**
     * Adds a new aspect to a given aspect halo list.
     *
     * @param {AspectHalo[]} haloList
     * @param {String} aspect
     * @param {Number} visQuantity
     */
    function addAspect(haloList, aspect, visQuantity) {
        haloList.push({
            aspect: aspect,
            visQuantity: visQuantity,
            buffer: null
        });
    }
    
    /**
     * Calculates the total amount of vis of all aspects combined for a given
     * halo list.
     * 
     * @param {AspectHalo[]} haloList
     * @returns {Number}
     */
    function getVisTotal(haloList) {
        var sum = 0;
        for (var i = 0; i < haloList.length; i++) {
            var halo = haloList[i];
            sum += halo.visQuantity;
        }
        return sum;
    }

    /**
     * Retrieves an RGBA color array for a given aspect and alpha value.
     * 
     * @param {String} aspect
     * @param {Number} alpha
     * @returns {Number[]}
     */
    function getColor(aspect, alpha) {
        var aspectColor = aspects[aspect].color;
        aspectColor >>>= 0;
        var b = (aspectColor & 0xFF) / 255,
            g = ((aspectColor & 0xFF00) >>> 8) / 255,
            r = ((aspectColor & 0xFF0000) >>> 16) / 255;
        return [r, g, b, alpha];
    }

    /**
     * Renders a new frame for a given WebGL rendering context, and requests
     * the next frame.
     * 
     * @param {WebGLRenderingContext} gl
     * @param {ProgramInfo} programInfo
     * @param {AspectHalo[]} aspectHalos
     * @param {WebGLTexture} nodeTexture
     * @param {WebGLBuffer} coreBuffer
     * @param {String} nodeType
     * @param {String} modifier
     * @param {Number} canvasSize
     * @param {Number} time
     */
    function render(gl, programInfo, aspectHalos, nodeTexture, coreBuffer, nodeType, modifier, canvasSize, time) {
        var frame = Math.floor(time / 48) % 32;
        var timeTicks = time / 5;

        resetCanvas(gl, programInfo);
        gl.useProgram(programInfo.program);

        var scale = 1;
        var angle = 0;
        var alpha = 0.7;
        switch (modifier) {
            case 'bright':
                alpha *= 1.5;
                break;
            case 'pale':
                alpha *= 0.66;
                break;
            case 'fading':
                alpha *= Math.sin(timeTicks / 30) * 0.25 + 0.33;
                break;
            default:
                // no-op
        }

        for (var i = 0; i < aspectHalos.length; i++) {
            var halo = aspectHalos[aspectHalos.length - (i + 1)];
            scale = (Math.sin(timeTicks / (14.0 - i) / 10) + 2.0) * 0.25;
            scale = 0.2 + scale * (halo.visQuantity / 50);
            angle = Math.PI * 2 * (timeTicks % (5000 + 500 * i)) / (5000 + (500 * i));
            
            var mat = m4.ortho(0, gl.canvas.clientWidth, gl.canvas.clientHeight, 0, -1, 1);
            mat = m4.translate(mat, gl.canvas.clientWidth / 2, gl.canvas.clientHeight / 2, 0);
            mat = m4.scale(mat, 512, 512, 1);
            mat = m4.scale(mat, (canvasSize / 256), (canvasSize / 256), 1);
            mat = m4.scale(mat, scale, scale, 1);
            mat = m4.rotateZ(mat, angle);
    
            var tmat = m4.identity(tmat);
            tmat = m4.scale(tmat, 0.03125, 0.125, 1);
            tmat = m4.translate(tmat, frame + 0.5, 7.5, 0);
    
            setPositionBuffer(gl, programInfo, halo.buffer);

            var useAlpha = alpha;
            if (aspects[halo.aspect].blend === gl.ONE_MINUS_SRC_ALPHA) {
                useAlpha *= 1.5;
            }

            setUniforms(gl, programInfo, {
                matrix: mat,
                textureMatrix: tmat,
                texture: nodeTexture,
                aspectColor: getColor(halo.aspect, useAlpha)
            });

            gl.blendFunc(gl.SRC_ALPHA, aspects[halo.aspect].blend);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }

        scale = 0.1 + (getVisTotal(aspectHalos) / aspectHalos.length) / 150.0;
        var coreTextureOffset = 0;
        switch (nodeType) {
            case 'normal':
            default:
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                coreTextureOffset = 6.5;
                break;
            case 'sinister':
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                coreTextureOffset = 5.5;
                break;
            case 'hungry':
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                scale *= 0.75;
                coreTextureOffset = 4.5;
                break;
            case 'pure':
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                coreTextureOffset = 3.5;
                break;
            case 'tainted':
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                coreTextureOffset = 2.5;
                break;
            case 'unstable':
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                coreTextureOffset = 1.5;
                break;

        }
        setPositionBuffer(gl, programInfo, coreBuffer);
        var mat = m4.ortho(0, gl.canvas.clientWidth, 0, gl.canvas.clientHeight, -1, 1);
        mat = m4.translate(mat, gl.canvas.clientWidth / 2, gl.canvas.clientHeight / 2, 0);
        mat = m4.scale(mat, 512, 512, 1);
        mat = m4.scale(mat, (canvasSize / 256), (canvasSize / 256), 1);
        mat = m4.scale(mat, scale, scale, 1);
        var tmat = m4.identity();
        tmat = m4.scale(tmat, 0.03125, 0.125, 1);
        tmat = m4.translate(tmat, frame + 0.5, coreTextureOffset, 0);
        setUniforms(gl, programInfo, {
            matrix: mat,
            textureMatrix: tmat,
            texture: nodeTexture,
            aspectColor: [1, 1, 1, 1]
        });
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    $.when( $.ready ).then(function() {
        /* Search for container divs that have a class indicating that an aura
        node canvas should be injected into them. */
        var containers = $('.aura-node-gl');
        if (containers.length === 0) {
            // No aura nodes to render.
            return;
        }

        /**
         * List of callbacks that will inject texture data into whatever
         * canvases we create.
         *
         * @type {Function[]}
         */
        var textureLoadCallbacks = [];

        // Loop over all found containers
        containers.each(function (index) {
            var container = $(this);
            var canvasId = 'aura-node-canvas-' + index;

            // Get aura node data
            var nodeType = container.data('type').trim().toLowerCase();
            var modifier = container.data('modifier').trim().toLowerCase();
            var aspectsEncoded = container.data('aspects').trim().toLowerCase().split(';');
            var canvasSize = container.data('size');
            var backgroundColor = container.data('background-color').trim().toLowerCase();

            // Parse out aspect halos
            /** @type {AspectHalo[]} */
            var haloList = [];
            for (var i = 0; i < aspectsEncoded.length; i++) {
                var tmp = aspectsEncoded[i].split(',');
                if (tmp.length !== 2) {
                    continue;
                }
                var aspect = tmp[0].trim();
                var visQty = Number(tmp[1].trim());
                if (!Object.keys(aspects).includes(aspect) || Number.isNaN(visQty) || visQty <= 0) {
                    continue;
                }
                addAspect(haloList, aspect, visQty);
            }
            if (haloList.length === 0) {
                // Empty node, skip
                return;
            }

            // Inject the canvas element
            $(this).html('<canvas id="' + canvasId + '" height="' + canvasSize + '" width="' + canvasSize + '" style="display:block"></canvas>');
            /** @type {HTMLCanvasElement} */
            var canvas = $('#' + canvasId)[0];

            // Set the background color of the container, if applicable
            switch (backgroundColor) {
                case 'black':
                    $(this).css('background-color', 'black');
                    break;
                case 'white':
                    $(this).css('background-color', 'white');
                    break;
                case 'transparent':
                default:
                    // no-op
            }

            // Set up the WebGL rendering context for the new canvas
            var gl = canvas.getContext('webgl');
            if (!gl) {
                // No WebGL
                return;
            }
            var programInfo = createProgramInfo(gl);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

            /* Create a new texture to hold texture data.
            It will be initialized as an all-black texture until the actual
            image data is fetched. */
            var nodeTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, nodeTexture);
            gl.texImage2D(
                gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255])
            );

            // Create position buffers for the node's core and halos
            var coreBuffer = create2DQuadPositionBuffer(gl);
            for (var i = 0; i < haloList.length; i++) {
                haloList[i].buffer = create2DQuadPositionBuffer(gl);
            }

            // Create a callback to inject the node texture when it's ready
            var textureLoadCallback = function (image) {
                gl.bindTexture(gl.TEXTURE_2D, nodeTexture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                gl.generateMipmap(gl.TEXTURE_2D);
            };
            textureLoadCallbacks.push(textureLoadCallback);

            // Start the animation loop for this context
            var renderCallback = function (time) {
                render(gl, programInfo, haloList, nodeTexture, coreBuffer, nodeType, modifier, canvasSize, time);
                requestAnimationFrame(renderCallback);
            };
            requestAnimationFrame(renderCallback);
        });

        // Load the node texture
        var image = new Image();
        image.addEventListener('load', function() {
            for (var i = 0; i < textureLoadCallbacks.length; i++) {
                textureLoadCallbacks[i](image);
            }
        });
        image.crossOrigin = 'anonymous';
        image.src = 'https://static.wikia.nocookie.net/thaumcraft-4/images/b/b9/Node_texture.png/revision/latest?cb=20221231231339&format=original';
    });
})(jQuery, mw);

/**
 * @typedef ProgramInfo
 * @property {WebGLProgram} program
 * @property {{
 *      position: number
 * }} attrib
 * @property {{
 *      matrix: number,
 *      textureMatrix: number,
 *      texture: number,
 *      aspectColor: number
 * }} uniform
 */

/**
 * @typedef AspectHalo
 * @property {String} aspect
 * @property {Number} visQuantity
 * @property {WebGLBuffer} buffer
 */
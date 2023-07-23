/* Any JavaScript here will be loaded for all users on every page load. */
window.tooltips_config = {
    offsetX: 0,
    offsetY: 0,
	noCSS: true,
}

    const canvas =document.querySelector(".main-container");

    // Получаем WebGL контекст
    const gl = canvas.getContext('webgl');

    // Проверяем поддержку WebGL
    if (!gl) {
      alert('WebGL не поддерживается в вашем браузере.');
    }

    // Определяем вершинные координаты для куба
    const vertices = [
      // Верхняя грань
      -0.5, 0.5, -0.5,
      0.5, 0.5, -0.5,
      0.5, 0.5, 0.5,
      -0.5, 0.5, 0.5,
      // Нижняя грань
      -0.5, -0.5, -0.5,
      0.5, -0.5, -0.5,
      0.5, -0.5, 0.5,
      -0.5, -0.5, 0.5
    ];

    // Определяем индексы вершин для формирования граней
    const indices = [
      0, 1, 2, 0, 2, 3, // Верхняя грань
      4, 5, 6, 4, 6, 7, // Нижняя грань
      0, 1, 5, 0, 5, 4, // Боковая грань
      3, 2, 6, 3, 6, 7, // Боковая грань
      1, 2, 6, 1, 6, 5, // Боковая грань
      0, 3, 7, 0, 7, 4  // Боковая грань
    ];

    // Создаем буферы вершин и индексов
    const vertexBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();

    // Заполняем буферы данными
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Загружаем шейдеры
    const vertexShaderSource = `
      attribute vec3 a_position;
      uniform mat4 u_modelViewMatrix;
      uniform mat4 u_projectionMatrix;

      void main() {
        gl_Position = u_projectionMatrix * u_modelViewMatrix * vec4(a_position, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;

      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Красный цвет
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Ошибка компиляции шейдера:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    // Создаем и компилируем вершинный и фрагментный шейдеры
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    // Создаем и линкуем программу шейдеров
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Ошибка создания программы шейдеров:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return;
    }

    // Используем созданную программу шейдеров
    gl.useProgram(program);

    // Получаем ссылки на атрибуты и униформы
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const modelViewMatrixUniformLocation = gl.getUniformLocation(program, 'u_modelViewMatrix');
    const projectionMatrixUniformLocation = gl.getUniformLocation(program, 'u_projectionMatrix');

    // Включаем атрибут позиции и указываем расположение вершин в буфере
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    // Задаем матрицы преобразований для 3D-отображения
    const modelViewMatrix = mat4.create();
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix, 45 * Math.PI / 180, canvas.clientWidth / canvas.clientHeight, 0.1, 100.0);
    mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -5.0]);

    // Функция для отрисовки кадра
    function draw() {
      // Очищаем canvas перед отрисовкой кадра
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Вращаем куб
      mat4.rotateX(modelViewMatrix, modelViewMatrix, 0.01);
      mat4.rotateY(modelViewMatrix, modelViewMatrix, 0.01);

      // Передаем матрицы преобразований в шейдер
      gl.uniformMatrix4fv(modelViewMatrixUniformLocation, false, modelViewMatrix);
      gl.uniformMatrix4fv(projectionMatrixUniformLocation, false, projectionMatrix);

      // Отрисовываем куб
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

      // Вызываем функцию для отрисовки следующего кадра
      requestAnimationFrame(draw);
    }

    // Начинаем анимацию
    draw();
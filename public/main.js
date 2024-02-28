const canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 800;

const gl = canvas.getContext('webgl');

if (!gl) {
  throw new Error('WebGL Not supported');
}

// Mengatur warna latar belakang menjadi putih
gl.clearColor(1.0, 1.0, 1.0, 1.0); // Ubah nilai RGBA menjadi (1.0, 1.0, 1.0, 1.0) untuk putih
gl.clear(gl.COLOR_BUFFER_BIT);

const pointsLines = [
  -0.5, 0.0,
  0.5, -0.0,
];

const pointsStrip = [
  -0.9, 0.9,
  -0.5, 0.5,
  -0.1, 0.9,
  0.3, 0.5,
  0.7, 0.9
];

const pointsLoop = [
  -0.9, -0.9,
  -0.5, -0.5,
  -0.1, -0.9,
  0.3, -0.5,
  0.7, -0.9,
  -0.9, -0.9 // Titik penutup
];

// Buat buffer untuk LINES
const positionBufferLines = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferLines);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointsLines), gl.STATIC_DRAW);

// Buat buffer untuk LINE_STRIP
const positionBufferStrip = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferStrip);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointsStrip), gl.STATIC_DRAW);

// Buat buffer untuk LINE_LOOP
const positionBufferLoop = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferLoop);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pointsLoop), gl.STATIC_DRAW);

const vertexShaderSource = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0); // Corrected spelling
}
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

const fragmentShaderSource = `
precision mediump float;

void main() {
  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
`;

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); // Use createShader
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
gl.enableVertexAttribArray(positionAttributeLocation);

// Gambar LINES
gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferLines);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.LINES, 0, 2);

// Gambar LINE_STRIP
gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferStrip);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.LINE_STRIP, 0, pointsStrip.length / 2);

// Gambar LINE_LOOP
gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferLoop);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
gl.drawArrays(gl.LINE_LOOP, 0, pointsLoop.length / 2);

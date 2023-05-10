const load = function () {
    Triangle()
    Hexagon()
}

const vertexShaderTxt = `
    precision mediump float;

    attribute vec2 vertPosition;
    attribute vec3 vertColor;

    varying vec3 fragColor;

    void main()
    {
        fragColor = vertColor;
        gl_Position = vec4(vertPosition, 0.0, 1.0);
    }
`

const fragmentShaderTxt = `
    precision mediump float;

    varying vec3 fragColor;

    void main()
    {
        gl_FragColor = vec4(fragColor, 1.0);
    }
`

const Triangle = function () {
    const canvas = document.getElementById("kwadrat-canvas");
    // console.log(canvas);
    const gl = canvas.getContext("webgl");

    if (!gl) {
        alert('no webgl');
    }

    gl.clearColor(0.5, 0.5, 0.9, 1.0);   // R,G,B, opacity
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderTxt);
    gl.shaderSource(fragmentShader, fragmentShaderTxt);

    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(vertexShader));
    }
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.detachShader(program, vertexShader); //https://www.khronos.org/opengl/wiki/Shader_Compilation#Before_linking
    gl.detachShader(program, fragmentShader);
 
    gl.validateProgram(program);

    let triangleVert = [
        // X, Y         RGB
        -0.25, 0.25,      1.0, 0.0, 0.0,
        -0.25, -0.25,     0.0, 1.0, 0.0,
        0.25, -0.25,      0.0, 0.0, 1.0,
        0.25, -0.25,      1.0, 0.0, 0.0,
        0.25, 0.25,       0.0, 1.0, 0.0,
        -0.25, 0.25,      0.0, 0.0, 1.0
    ]
    const triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVert), gl.STATIC_DRAW); // since everything in JS is 64 bit floating point we need to convert to 32 bits

    const posAttrLocation = gl.getAttribLocation(program, 'vertPosition');
    const colorAttrLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
        posAttrLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0,
    );

    gl.vertexAttribPointer(
        colorAttrLocation,    // attribute location
        3,// number of elements per attribute
        gl.FLOAT,// type of elements
        gl.FALSE,// if data is normalized
        5 * Float32Array.BYTES_PER_ELEMENT,// Size of individual vertex
        2 * Float32Array.BYTES_PER_ELEMENT,// offset from the beginnning  of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(posAttrLocation);
    gl.enableVertexAttribArray(colorAttrLocation);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    gl.drawArrays(gl.TRIANGLES, 3, 3)
} 

let centerColor = [1.0, 0.0, 0.0]

const Hexagon = function () {
    const canvas = document.getElementById("szesciokat-canvas");
    // console.log(canvas);
    const gl = canvas.getContext("webgl");

    if (!gl) {
        alert('no webgl');
    }

    gl.clearColor(0.5, 0.5, 0.9, 1.0);   // R,G,B, opacity
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderTxt);
    gl.shaderSource(fragmentShader, fragmentShaderTxt);

    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.log(gl.getShaderInfoLog(vertexShader));
    }
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.detachShader(program, vertexShader); //https://www.khronos.org/opengl/wiki/Shader_Compilation#Before_linking
    gl.detachShader(program, fragmentShader);
 
    gl.validateProgram(program);

    let triangleVert = [
        // X, Y                                                 RGB
        0.0, 0.0,              centerColor[0], centerColor[1], centerColor[2],
        0.25*Math.cos(0), 0.25*Math.sin(0),                     1.0, 0.0, 0.0,
        0.25*Math.cos(Math.PI/3), 0.25*Math.sin(Math.PI/3),     1.0, 0.0, 0.0,
        0.25*Math.cos(2*Math.PI/3), 0.25*Math.sin(2*Math.PI/3), 0.0, 1.0, 0.0,
        0.25*Math.cos(3*Math.PI/3), 0.25*Math.sin(3*Math.PI/3), 0.0, 0.0, 1.0,
        0.25*Math.cos(4*Math.PI/3), 0.25*Math.sin(4*Math.PI/3), 0.0, 1.0, 0.0,
        0.25*Math.cos(5*Math.PI/3), 0.25*Math.sin(5*Math.PI/3), 0.0, 1.0, 0.0,
        0.25*Math.cos(0), 0.25*Math.sin(0),                     1.0, 0.0, 0.0,
    ]
    const triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVert), gl.STATIC_DRAW); // since everything in JS is 64 bit floating point we need to convert to 32 bits

    const posAttrLocation = gl.getAttribLocation(program, 'vertPosition');
    const colorAttrLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
        posAttrLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0,
    );

    gl.vertexAttribPointer(
        colorAttrLocation,    // attribute location
        3,// number of elements per attribute
        gl.FLOAT,// type of elements
        gl.FALSE,// if data is normalized
        5 * Float32Array.BYTES_PER_ELEMENT,// Size of individual vertex
        2 * Float32Array.BYTES_PER_ELEMENT,// offset from the beginnning  of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(posAttrLocation);
    gl.enableVertexAttribArray(colorAttrLocation);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 8)
}

const randColor = function () {
    centerColor = [Math.random() % 256.0, Math.random() % 256.0, Math.random() % 256.0]
    Hexagon()
}
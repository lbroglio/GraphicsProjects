// Gets the canvas element to use as graphics context
function getGraphicsContext(canvasId) {
    // Use DOM to get canvas with the given ID
    let canvas = document.getElementById(canvasId);

    // Get graphics context
    let context = canvas.getContext("webgl2");

    // Log error if the context couldn't be retrieved
    if (!context) {
        console.log('Error: Could not get the rendering context for WebGL');
    }

    return context;
}

// Compile a new shader of a given type (vertex or fragment) with the given source code
function compileShader(gl, shaderType, shaderSource){
    // Create a shader object 
    let shader = gl.createShader(shaderType)

    // Log error if the shader couldn't be created 
    if (shader == null) {
        console.log('Error: Could not shader object');
        return null;
    }

    // Set the source code in the shader to the given source code
    gl.shaderSource(shader, shaderSource)

    // Compile  the shader
    gl.compileShader(shader)

    // Check the if the compilation was successful
    var successfulCompilation = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!successfulCompilation) {
        var error = gl.getShaderInfoLog(shader);
        console.log('Error: Could not compile shader. Root Cause: ' + error);
        gl.deleteShader(shader);
        return null;
    }
      
    return shader;
}

// Compile a vector and a fragment shader and combine them into a shader program
function createShaderProgram(gl, vshaderSource, fshaderSource) {

    // Compile the shader code
    var vShader = compileShader(gl, gl.VERTEX_SHADER, vshaderSource);
    var fShader = compileShader(gl, gl.FRAGMENT_SHADER, fshaderSource);
    if (!vShader || !fShader) {
        return null;
    }

    // Create a program object
    var program = gl.createProgram();
    if (!program) {
        return null;
    }

    // Attach the shader objects
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);

    // Link the program object 
    gl.linkProgram(program);

    // Check if the program object was succesfully linked
    var successfulLink = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!successfulLink) {
        var error = gl.getProgramInfoLog(program);
        console.log('Error: Could not link program. Root Cause: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return null;
    }
    
    return program;
}


  // Allocate a memory buffer on the GPU and add given data to it
  function createAndLoadBuffer(gl, data)
  {

    // Request a handle for a GPU memory buffer
    let buffer = gl.createBuffer();
    if (!buffer) {
        console.log('Error: Could not create the buffer object');
        return;
    }
  
    // Bind the new buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  
    // Load data into the created buffer
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  
    //  Unbind the buffer and return the handle
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
    return buffer;
  
  }

  function degreesToRadians(degrees){
    return degrees * (Math.PI / 180)
  }
  
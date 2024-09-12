const vSunShaderSource = `

attribute vec4 a_Position;
uniform mat4 transform;

attribute vec4 a_Color;
varying vec4 color;
void main()
{
    color = a_Color;
    gl_Position = transform * a_Position;
}
`

const fSunShaderSource = `
precision mediump float;

//uniform vec4 color;

varying vec4 color;
void main()
{

    gl_FragColor = color;
}

`

//GLOBALS

// Models
var sunModel;
var sunVerts;
var planetModel;

// Buffer handles
var sunVertexBuffer;
var sunColorBuffer;

// Compiled shader handles
var sunShader;


// Function run to draw the screen every frame
function draw(sunTransform, planetTransform, camTransform){
    // Clear the framebuffer
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BIT);

    // Draw the sun
    gl.useProgram(sunShader)

    // Get the index for the a_Position attribute in the shader
    var positionIndex = gl.getAttribLocation(sunShader, 'a_Position');
    if (positionIndex < 0) {
        console.log('Error: Could not get the storage location of a_Position');
        return;
    }

    // Enable attributes
    gl.enableVertexAttribArray(positionIndex);

    // Set the transform uniform
    var colorLoc = gl.getUniformLocation(sunShader, "transform");
    //console.log(sunTransform)
    gl.uniformMatrix4fv(colorLoc, false, sunTransform.elements)

    // Bind buffer holding the sun model 
    gl.bindBuffer(gl.ARRAY_BUFFER, sunVertexBuffer);
    //Associate data in buffer with position attribute
    gl.vertexAttribPointer(positionIndex, 3, gl.FLOAT, false, 0, 0);

    // Set the color attribute
    
    
    // get the index for the color attribute defined in the vertex shader
    var colorIndex = gl.getAttribLocation(sunShader, 'a_Color');
    if (positionIndex < 0) {
        console.log('Error: Could not get the storage location of a_Color');
        return;
    }
    
    // Enable color attribute
    gl.enableVertexAttribArray(colorIndex);
    // Bind color  buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, sunColorBuffer)
    //Associate data in buffer with attribute
    gl.vertexAttribPointer(colorIndex, 4, gl.FLOAT, false, 0, 0);
    

    gl.drawArrays(gl.TRIANGLES, 0, sunModel.length / 3 );

    // Disable attributes and unbind buffers and sun shader
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.disableVertexAttribArray(positionIndex)
    gl.disableVertexAttribArray(colorIndex)
    gl.useProgram(null)

}


// Entry point which starts animation
function main(){

    // Get canvas from page
    gl = getGraphicsContext("graphicsCanvas");

    // Get model for sun/planets
    sunData =  getSphereAndColor()
    sunModel = sunData[0]
    sunColor = sunData[1]
    
    // Load and compile shaders
    sunShader = createShaderProgram(gl, vSunShaderSource, fSunShaderSource);
    
    // Load model data onto GPU
    //console.log(sunModel)
    sunVertexBuffer = createAndLoadBuffer(gl, sunModel)
    sunColorBuffer =  createAndLoadBuffer(gl, sunColor)


    // Specify a fill color for clearing the framebuffer (This will be  the background)
    gl.clearColor(0.0, 0.0, 0.0, 1.0);


    gl.enable(gl.DEPTH_TEST);

    var rot = 0;

    // Define functions to call every animation frame
    var animate = function(){
        
        
        let sunTransform = new THREE.Matrix4().makeRotationY(rot)
        //sunTransform.multiply(new THREE.Matrix4().makeRotationX(rot))
        sunTransform.multiply(new THREE.Matrix4().makeScale(0.5, 0.5, 0.5))
        //console.log(sunTransform)

        draw(sunTransform, null, null)

        rot += 0.008

      // Run function again to draw the next fram when possible 
      requestAnimationFrame(animate);
    }

    animate()

    
}
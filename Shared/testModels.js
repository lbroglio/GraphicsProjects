// Returns a Float32Array with the vertices for a cube 
function getCubeVerticesArray(){
    var cubeVertsArr = new Float32Array(
        [
            // Front top triangle
            -0.25, -0.25, 0.25, 
            0.25, -0.25, 0.25, 
            0.25, 0.25, 0.25, 

            // Front bottom triangle
            0.25, 0.25, 0.25,
            -0.25, 0.25, 0.25,
            -0.25, -0.25, 0.25,

            // Top forward triangle
            -0.25, -0.25, 0.25,
            0.25, -0.25, 0.25,
            0.25, -0.25, -0.25,

            // Top back triangle
            0.25, -0.25, -0.25, 
            -0.25, -0.25, -0.25,
            -0.25, -0.25, 0.25,

            // Bottom forward triangle
            -0.25, 0.25, 0.25,
            0.25, 0.25, 0.25,
            0.25, 0.25, -0.25,

            // Bottom back triangle
            0.25, 0.25, -0.25, 
            -0.25, 0.25, -0.25,
            -0.25, 0.25, 0.25,

            // Back top triangle
            -0.25, -0.25, -0.25, 
            0.25, -0.25, -0.25, 
            0.25, 0.25, -0.25, 

            // Back bottom triangle
            0.25, 0.25, -0.25,
            -0.25, 0.25, -0.25,
            -0.25, -0.25, -0.25,

            // Left forward triangle
            -0.25, -0.25, 0.25,
            -0.25, 0.25, 0.25,
            -0.25, 0.25, -0.25,

            // left back triangle
            -0.25, 0.25, -0.25,
            -0.25, -0.25, -0.25,
            -0.25, -0.25, 0.25,

            
            // Right forward triangle
            0.25, -0.25, 0.25,
            0.25, 0.25, 0.25,
            0.25, 0.25, -0.25,

            // Right back triangle
            0.25, 0.25, -0.25,
            0.25, -0.25, -0.25,
            0.25, -0.25, 0.25,
        ]
    )

    return cubeVertsArr
}

// Returns a Float32Array with the vertices for a cube and different colors for each side included in the array
function getColoredCubeVerticesArray(){
    var cubeVertsArr = new Float32Array(
        [
            // Front top triangle
            /*Vertex*/ -0.25, -0.25, 0.25, /*Color*/ 1.0, 0.0, 0.0, 1.0,
            /*Vertex*/ 0.25, -0.25, 0.25, /*Color*/ 1.0, 0.0, 0.0, 1.0,
            /*Vertex*/ 0.25, 0.25, 0.25, /*Color*/ 1.0, 0.0, 0.0, 1.0,

            // Front bottom triangle
            /*Vertex*/ 0.25, 0.25, 0.25, /*Color*/ 1.0, 0.0, 0.0, 1.0,
            /*Vertex*/ -0.25, 0.25, 0.25, /*Color*/ 1.0, 0.0, 0.0, 1.0,
            /*Vertex*/ -0.25, -0.25, 0.25, /*Color*/ 1.0, 0.0, 0.0, 1.0,

            // Top forward triangle
            /*Vertex*/ -0.25, -0.25, 0.25, /*Color*/ 0.0, 0.0, 1.0, 1.0,
            /*Vertex*/ 0.25, -0.25, 0.25, /*Color*/ 0.0, 0.0, 1.0, 1.0,
            /*Vertex*/ 0.25, -0.25, -0.25,  /*Color*/ 0.0, 0.0, 1.0, 1.0,

            // Top back triangle
            /*Vertex*/ 0.25, -0.25, -0.25, /*Color*/ 0.0, 0.0, 1.0, 1.0,
            /*Vertex*/ -0.25, -0.25, -0.25, /*Color*/ 0.0, 0.0, 1.0, 1.0,
            /*Vertex*/ -0.25, -0.25, 0.25, /*Color*/ 0.0, 0.0, 1.0, 1.0,

            // Bottom forward triangle
            /*Vertex*/ -0.25, 0.25, 0.25, /*Color*/ 0.0, 0.0, 1.0, 1.0,
            /*Vertex*/ 0.25, 0.25, 0.25, /*Color*/ 0.0, 0.0, 1.0, 1.0,
            /*Vertex*/ 0.25, 0.25, -0.25, /*Color*/  0.0, 0.0, 1.0, 1.0,

            // Bottom back triangle
            /*Vertex*/ 0.25, 0.25, -0.25, /*Color*/ 0.0, 0.0, 1.0, 1.0,
            /*Vertex*/ -0.25, 0.25, -0.25, /*Color*/ 0.0, 0.0, 1.0, 1.0,
            /*Vertex*/ -0.25, 0.25, 0.25, /*Color*/ 0.0, 0.0, 1.0, 1.0,

            // Back top triangle
            /*Vertex*/ -0.25, -0.25, -0.25, /*Color*/ 1.0, 0.0, 0.0, 1.0,
            /*Vertex*/ 0.25, -0.25, -0.25, /*Color*/ 1.0, 0.0, 0.0, 1.0,
            /*Vertex*/ 0.25, 0.25, -0.25, /*Color*/ 1.0, 0.0, 0.0, 1.0,

            // Back bottom triangle
            /*Vertex*/ 0.25, 0.25, -0.25, /*Color*/ 1.0, 0.0, 0.0, 1.0,
            /*Vertex*/ -0.25, 0.25, -0.25, /*Color*/ 1.0, 0.0, 0.0, 1.0,
            /*Vertex*/ -0.25, -0.25, -0.25, /*Color*/ 1.0, 0.0, 0.0, 1.0,

            
            // Left forward triangle
            /*Vertex*/ -0.25, -0.25, 0.25, /*Color*/ 0.0, 1.0, 0.0, 1.0,
            /*Vertex*/ -0.25, 0.25, 0.25, /*Color*/ 0.0, 1.0, 0.0, 1.0,
            /*Vertex*/ -0.25, 0.25, -0.25, /*Color*/ 0.0, 1.0, 0.0, 1.0,

            // Left back triangle
            /*Vertex*/ -0.25, 0.25, -0.25, /*Color*/ 0.0, 1.0, 0.0, 1.0,
            /*Vertex*/ -0.25, -0.25, -0.25, /*Color*/ 0.0, 1.0, 0.0, 1.0,
            /*Vertex*/ -0.25, -0.25, 0.25, /*Color*/ 0.0, 1.0, 0.0, 1.0,

            // Right forward triangle
            /*Vertex*/ 0.25, -0.25, 0.25, /*Color*/ 0.0, 1.0, 0.0, 1.0,
            /*Vertex*/ 0.25, 0.25, 0.25, /*Color*/ 0.0, 1.0, 0.0, 1.0,
            /*Vertex*/ 0.25, 0.25, -0.25, /*Color*/ 0.0, 1.0, 0.0, 1.0,

            // Right back triangle
            /*Vertex*/ 0.25, 0.25, -0.25, /*Color*/ 0.0, 1.0, 0.0, 1.0,
            /*Vertex*/ 0.25, -0.25, -0.25, /*Color*/ 0.0, 1.0, 0.0, 1.0,
            /*Vertex*/ 0.25, -0.25, 0.25, /*Color*/ 0.0, 1.0, 0.0, 1.0
            
        ]
    )

    return cubeVertsArr
}
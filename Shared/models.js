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


// Parse a .obj file containg a sphere and return it as an JavaScript object
function getSphere(){
    // .obj model file containing the sphere
    return readInObj(sphereObj())

}

// Read the contents of an obj as a string and parse it and return it as a JavaScript object.
function readInObj(fileContents){
    // Return object
    let toReturn = {
        vertices: [],
        normals: [],
        textureVerts: []
    }

    // Split file by lines
    let byLines = fileContents.split('\n')

    // For each line
    for(var i =0; i < byLines.length; i++){
        // Split by white space
        var lineArr = byLines[i].split(' ');
        
        // If this line is a vertex (starts with 'v')
        if(lineArr[0] === 'v'){
            toReturn["vertices"].push(parseFloat(lineArr[1]))
            toReturn["vertices"].push(parseFloat(lineArr[2]))
            toReturn["vertices"].push(parseFloat(lineArr[3]))
        }
        // If this line is a vertex normal (starts with vn)
        else if(lineArr[0] === "vn"){
            toReturn["normals"].push(parseFloat(lineArr[1]))
            toReturn["normals"].push(parseFloat(lineArr[2]))
            toReturn["normals"].push(parseFloat(lineArr[3]))
        }
        // If this line is a texture vertex (starts with vt)
        else if (lineArr[0] == "vt"){
            toReturn["textureVerts"].push(parseFloat(lineArr[1]))
            toReturn["textureVerts"].push(parseFloat(lineArr[2]))
        }

    }

    return toReturn;
}
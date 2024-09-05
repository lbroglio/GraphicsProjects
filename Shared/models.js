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

// Return a list containing the model data for a Sphere in a Float32Array in index 0 if the array
//and the corresponding color data in a seperate Float32Array in index 1
function getSphereAndColor(){
    sphereData = readInObj(sphereObj())
    colorArr = []
    for(let i =0; i < sphereData.length / 3; i++){
        if(i < (sphereData.length / 6)){
            colorArr = colorArr.concat([1, 0, 0, 1])
        }
        else{
            colorArr = colorArr.concat([0, 0, 1, 1])
        }
    }
    console.log(colorArr)
    return [sphereData, new Float32Array(colorArr)]
}

// Read the contents of an obj as a string and parse it and return it as a Float32Array.
function readInObj(fileContents){
    // Store a vertex
    let vertex = class{
        x;
        y;
        z;
    }

    // Store Vertices and normals read in
    let obs = {
        vertices: [],
        normals: [],
        textureVerts: []
    }

    // Represent a face on the object
    let face = class {
        // Vertices stored as an index in the vertices array of an obs dict
        v1;
        v2;
        v3;
    }
    
    // Array of all faces
    let faces = []

    // Split file by lines
    let byLines = fileContents.split('\n')

    // For each line
    for(var i =0; i < byLines.length; i++){
        // Split by white space
        var lineArr = byLines[i].split(' ');
        
        // If this line is a vertex (starts with 'v')
        if(lineArr[0] === 'v'){
            v = new vertex()
            v.x = parseFloat(lineArr[1])
            v.y = parseFloat(lineArr[2])
            v.z = parseFloat(lineArr[3])

            obs["vertices"].push(v)
        }
        // If this line is a vertex normal (starts with vn)
        else if(lineArr[0] === "vn"){
            obs["normals"].push(parseFloat(lineArr[1]))
            obs["normals"].push(parseFloat(lineArr[2]))
            obs["normals"].push(parseFloat(lineArr[3]))
        }
        // If this line is a texture vertex (starts with vt)
        else if (lineArr[0] === "vt"){
            obs["textureVerts"].push(parseFloat(lineArr[1]))
            obs["textureVerts"].push(parseFloat(lineArr[2]))
        }
        // If this line is a face (start s with f)
        else if(lineArr[0] === "f"){
            let f = new face()
            
            // Handle texture verts and normals if they were given
            if(lineArr[1].includes("/")){
                posVert = lineArr[1].split()[0]
                f.v1 = obs["vertices"][parseInt(posVert) - 1]
                posVert = lineArr[2].split()[0]
                f.v2 = obs["vertices"][parseInt(posVert) - 1]
                posVert = lineArr[3].split()[0]
                f.v3 = obs["vertices"][parseInt(posVert) - 1]
            }
            else{
                f.v1 = obs["vertices"][parseInt[lineArr[1]  - 1]]
                f.v2 = obs["vertices"][parseInt[lineArr[2] - 1]]
                f.v3 = obs["vertices"][parseInt[lineArr[3]  - 1]]

            }

            faces.push(f)
        }
    }

    // Build a float 32 array of all vertices in order of faces 
    let returnArr = []
    for(let i=0; i < faces.length; i++){
        f = faces[i]
        returnArr.push(f.v1.x)
        returnArr.push(f.v1.y)
        returnArr.push(f.v1.z)

        returnArr.push(f.v2.x)
        returnArr.push(f.v2.y)
        returnArr.push(f.v2.z)

        returnArr.push(f.v3.x)
        returnArr.push(f.v3.y)
        returnArr.push(f.v3.z)
    }

    return new Float32Array(returnArr);
}
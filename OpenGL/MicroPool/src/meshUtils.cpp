#include "meshUtils.hpp"


Vertex::Vertex(): x(0.0), y(0.0), z(0.0){}
Vertex::Vertex(float x, float y): x(x), y(y), z(0.0){}
Vertex::Vertex(float x, float y, float z): x(x), y(y), z(z){}

Vertex polarToCartesian(float r, float theta){
    float xCord = r * std::cos(theta);
    float yCord = r * std::sin(theta);

    return Vertex(xCord, yCord);
}

/**
 * @brief Add the x, y, z coordinates making up a Vertex to a buffer held in vector.
 * The coordinats will be added in that order.
 * 
 * @param buffer The buffer to add the Vertex to 
 * @param toAdd The Vertex to add to the buffer.
 */
void addVertexToBuffer(std::vector<float>* buffer, Vertex toAdd){
    buffer->push_back(toAdd.x);
    buffer->push_back(toAdd.y);
    buffer->push_back(toAdd.z);
}

void buildUVSpherePole(std::vector<float>* meshBuffer, Vertex pole, Vertex sphereCenter, float yOffset, int numSlices){
    float sphereRadius = abs(sphereCenter.y - pole.y);

    // Caclulate the percentage of the total radius the specified y offset is
    float distancePercentage = abs(yOffset) / sphereRadius;
    // Multiple the percentage by 90 degrees (the total difference in degress between a point on the equator and the pole)
    float baseDegreeOffset = 90.0 * distancePercentage;

    // Use the degrees offset to calculate the distance between the vertices at the base
    // of the pole's triangles and the axis of the sphere
    float axisDist = polarToCartesian(sphereRadius, baseDegreeOffset).x;

    float baseYLoc = pole.y + yOffset;

    // The difference in degrees between each point in the stack 
    float degreeOffset = 360.0 / numSlices;
    for(int i=0; i < numSlices; i++){
        float currentDegreeOffset = degreeOffset * i;

        // Calculate the vertex at the current offset
        Vertex baseCirclePoint = polarToCartesian(axisDist, currentDegreeOffset);
        Vertex currentBaseVertexObjSpace = Vertex(baseCirclePoint.x + pole.x, baseYLoc, baseCirclePoint.z + pole.z);

        // Calculate the vertex at the next offset
        float nextDegreeOffset = degreeOffset * (i + 1);
        baseCirclePoint = polarToCartesian(axisDist, nextDegreeOffset);
        Vertex nextBaseVertexObjSpace = Vertex(baseCirclePoint.x + pole.x, baseYLoc, baseCirclePoint.z + pole.z);

        // Add a triangle for this offset
        addVertexToBuffer(meshBuffer, pole);
        addVertexToBuffer(meshBuffer, currentBaseVertexObjSpace);
        addVertexToBuffer(meshBuffer, nextBaseVertexObjSpace);
        
    }
}

std::vector<float> buildUVSphereMesh(int numSlices, int numStacks){
    std::vector<float> mesh;
    buildUVSpherePole(&mesh, Vertex(0, 1, 0), Vertex(), 0.15, 16);
    return mesh;
}
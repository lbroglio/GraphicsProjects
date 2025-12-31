#include<iostream>
#include <numbers>

#include "meshUtils.hpp"


Vertex::Vertex(): x(0.0), y(0.0), z(0.0){}
Vertex::Vertex(float x, float y): x(x), y(y), z(0.0){}
Vertex::Vertex(float x, float y, float z): x(x), y(y), z(z){}

std::ostream& operator<<(std::ostream& os, const Vertex& v){
        os << "Vertex(" << v.x << ", " << v.y << ", " << v.z << ")";
        return os;
}


float degreesToRadians(float degrees){
    return degrees * (std::numbers::pi / 180.0);
}

Vertex polarToCartesian(float r, float theta){
    float thetaRad = degreesToRadians(theta);

    float xCord = r * std::cos(thetaRad);
    float yCord = r * std::sin(thetaRad);

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

/**
 * @brief Add the triangles making up one pole of a UV sphere to a mesh buffer.
 * 
 * @param meshBuffer The buffer storing the mesh data.
 * @param pole The vertex representing the pole of the sphere.
 * @param sphereCenter The center vertex of the sphere.
 * @param yOffset The vertical offset from the pole to the base of the pole's triangles.
 * @param numSlices The number of slices around the sphere.
 */
void buildUVSpherePole(std::vector<float>* meshBuffer, Vertex pole, Vertex sphereCenter, float yOffset, int numSlices){
    float sphereRadius = abs(sphereCenter.y - pole.y);

    // Caclulate the percentage of the total radius the specified y offset is
    float distancePercentage = abs(yOffset) / sphereRadius;
    // Multiple the percentage by 90 degrees (the total difference in degress between a point on the equator and the pole)
    float baseDegreeOffset = 90.0 * distancePercentage;

    // Use the degrees offset to calculate the distance between the vertices at the base
    // of the pole's triangles and the axis of the sphere
    float axisDist = polarToCartesian(sphereRadius, baseDegreeOffset).y;

    float baseYLoc = pole.y + yOffset;

    // The difference in degrees between each point in the stack 
    float degreeOffset = 360.0 / numSlices;
    for(int i=0; i <= numSlices + 1; i++){
        float currentDegreeOffset = degreeOffset * i;

        // Calculate the vertex at the current offset
        Vertex baseCirclePoint = polarToCartesian(axisDist, currentDegreeOffset);
        Vertex currentBaseVertexObjSpace = Vertex(baseCirclePoint.x + pole.x, baseYLoc, baseCirclePoint.y + pole.z);
        
        // Calculate the vertex at the next offset
        float nextDegreeOffset = degreeOffset * (i + 1);
        baseCirclePoint = polarToCartesian(axisDist, nextDegreeOffset);
        Vertex nextBaseVertexObjSpace = Vertex(baseCirclePoint.x + pole.x, baseYLoc, baseCirclePoint.y + pole.z);

        // Add a triangle for this offset
        addVertexToBuffer(meshBuffer, pole);
        addVertexToBuffer(meshBuffer, currentBaseVertexObjSpace);
        addVertexToBuffer(meshBuffer, nextBaseVertexObjSpace);
        
    }
}

void addStackToUVSphereMesh(std::vector<float>* meshBuffer, int currentSliceNum, int numSlices, float stackOffset, Vertex topPole, Vertex sphereCenter){
    float sphereRadius = abs(sphereCenter.y - topPole.y);

    // Caclulate the percentage of the total sphere the vertices at the top of this stack are
    float topYOffset = stackOffset * currentSliceNum;
    float topDistancePercentage = abs(topYOffset) / (sphereRadius * 2);
    // Multiple the percentage by 180 degrees (the total difference in degress between each pole)
    float topBaseDegreeOffset = 180 * topDistancePercentage;

    // Use the degrees offset to calculate the distance between the vertices at top of this stack
    // and the axis of the sphere
    float topAxisDist = polarToCartesian(sphereRadius, topBaseDegreeOffset).y;

    // Do the same for the vertices at the bottom of the stack
    int bottomYOffset = stackOffset * (currentSliceNum + 1);
    float bottomDistancePercentage = abs(bottomYOffset) / (sphereRadius * 2);
    float bottomBaseDegreeOffset = 180 * bottomDistancePercentage;
    float bottomAxisDist = polarToCartesian(sphereRadius, bottomBaseDegreeOffset).y;

    float degreeOffset = 360.0 / numSlices;

    float topYOffsetObjSpace = topPole.y - topYOffset;
    float bottomYOffsetObjSpace = topPole.y - bottomYOffset;
    // Add the top triangles for the rectangles in this stack
    for(int i=0; i < numSlices; i++){
        float currentDegreeOffset = degreeOffset * i;

        // Calculate the top vertex at the current offset
        Vertex baseCirclePoint = polarToCartesian(topAxisDist, currentDegreeOffset);
        Vertex topCurrentVertexObjSpace = Vertex(baseCirclePoint.x + topPole.x, topYOffsetObjSpace, baseCirclePoint.y + topPole.z);
        
        // Calculate the top vertex at the next offset
        float nextDegreeOffset = degreeOffset * (i + 1);
        baseCirclePoint = polarToCartesian(topAxisDist, nextDegreeOffset);
        Vertex topNextVertexObjSpace = Vertex(baseCirclePoint.x + topPole.x, topYOffsetObjSpace, baseCirclePoint.y + topPole.z);

        // Calculate the bottom vertex at the current offset
        baseCirclePoint = polarToCartesian(bottomAxisDist, currentDegreeOffset);
        Vertex bottomCurrentVertexObjSpace = Vertex(baseCirclePoint.x + topPole.x, bottomYOffsetObjSpace, baseCirclePoint.y + topPole.z);

        // Add the vertices for this triangle to the buffer
        addVertexToBuffer(meshBuffer, topCurrentVertexObjSpace);
        addVertexToBuffer(meshBuffer, topNextVertexObjSpace);
        addVertexToBuffer(meshBuffer, bottomCurrentVertexObjSpace);
    }

    // Add the bottom triangles for the rectangles in this stack
    for(int i=0; i < numSlices; i++){
        float currentDegreeOffset = degreeOffset * i;

        // Calculate the top vertex at the current offset
        Vertex baseCirclePoint = polarToCartesian(topAxisDist, currentDegreeOffset);
        Vertex topCurrentVertexObjSpace = Vertex(baseCirclePoint.x + topPole.x, topYOffsetObjSpace, baseCirclePoint.y + topPole.z);
        
        // Calculate the top vertex at the next offset
        float nextDegreeOffset = degreeOffset * (i + 1);
        baseCirclePoint = polarToCartesian(topAxisDist, nextDegreeOffset);
        Vertex topNextVertexObjSpace = Vertex(baseCirclePoint.x + topPole.x, topYOffsetObjSpace, baseCirclePoint.y + topPole.z);

        // Calculate the bottom vertex at the current offset
        baseCirclePoint = polarToCartesian(bottomAxisDist, currentDegreeOffset);
        Vertex bottomCurrentVertexObjSpace = Vertex(baseCirclePoint.x + topPole.x, bottomYOffsetObjSpace, baseCirclePoint.y + topPole.z);

        // Add the vertices for this triangle to the buffer
        addVertexToBuffer(meshBuffer, topCurrentVertexObjSpace);
        addVertexToBuffer(meshBuffer, topNextVertexObjSpace);
        addVertexToBuffer(meshBuffer, bottomCurrentVertexObjSpace);
    }


}

std::vector<float> buildUVSphereMesh(int numSlices, int numStacks){
    std::vector<float> mesh;
    float stackHeightOffset = 1.0 / numStacks;

    // Add the top pole
    buildUVSpherePole(&mesh, Vertex(0, 1, 0), Vertex(), -1 * stackHeightOffset, numSlices);
    addStackToUVSphereMesh(&mesh, 1, numSlices, stackHeightOffset, Vertex(0, 1, 0), Vertex());



    return mesh;
}
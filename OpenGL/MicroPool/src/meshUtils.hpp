#ifndef MESH_UTILS
#define MESH_UTILS

#include<vector>

struct Vertex{
    float x;
    float y;
    float z;
    
    /**
     * @brief Construct a new Vertex object with all coordinates values set to 0.0.
     * 
     */
    Vertex();

    /**
     * @brief Construct a new Vertex object with a specified x and y value.
     * The z value will be set to 0.0
     * 
     * @param x 
     * @param y 
     */
    Vertex(float x, float y);
    /**
     * @brief Construct a new Vertex object with a specified x, y, and z value;
     * 
     * @param x 
     * @param y 
     * @param z 
     */
    Vertex(float x, float y, float z);
};


/**
 * @brief Get the Cartesian coordinates of a point specified in polar coordinates.
 * 
 * @param r 
 * @param theta 
 * @return Vertex The cartesian coordiantes of the point specified by r and theta.
 * Stored in the x and y values of the Vertex Object. z will be zero.
 */
Vertex polarToCartesian(float r, float theta);

/**
 * @brief Generate a Mesh of a UV Sphere with the specified number of slices and stacks.
 * 
 * @param numSlices The number of slices. The number of vertical divisions of the sphere. 
 * Also the number of vertices around the sphere.
 * @param numStacks The number of stacks. The number of horizontal divisions of the sphere.
 * Also the number of vertices going down the sphere.
 * @return std::vector<float> The vertices of the sphere in an OpenGL Vertex buffer style.
 */
std::vector<float> buildUVSphereMesh(int numSlices, int numStacks);

#endif
# A collection of small graphics programming projects 
This repository is a collection of small graphics programming projects I created to practice using different technologies and methods.

## ConwayGPU

This project is an implementation of [Conway's game of life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) I made in Unity engine to practice using ComputeShaders.
The implementation allows the user to enter the starting state of the grid and allows for the size of the grid to be changed within the Unity scene editor.

All of the logic for determing the state of cells for a given round is done on the GPU using Compute Shaders. 

<image src="docs/images/ConwayGPUOutput.png" alt="An image of the simulation while it is running" height=500px/>

*An image of the simulation while it is running*

## PointCloudRaytracer

This is a unity project renders a point cloud using a Raytracer. The point cloud to render is specified within a .ply file which is read in and passed into a ComputeShader 
which performs the raytracing logic. The shader outputs a texture which is used as the result of a frame in place of the result determined by Unity.

The raytracer itself works by for every pixel casting a ray from all of the points to the camera and checking if any of the rays pass through that pixel. If any rays do pass 
through the closest point is chosen and the pixel is set to the color of that point. 

<image src="docs/images//pointCloudRaytracerOutput.png" alt="A spherical point cloud rendered by this project" height=500px/>

*A spherical point cloud rendered by this project*

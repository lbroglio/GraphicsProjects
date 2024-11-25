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

## RadPost

In this Unity project I implemented a post processing effect which emulates the effect radiation has on cameras. The effect is created by a combination of two shaders. 

The first shader modifies the image being rendered by Unity to apply the effect by brightening randomly chosen pixels by an amount calculated from the strength of the radiation source, the distance between it and the player, and how much material is between the player and the radiation source.

The second shader is a compute shader which is dispatched before the first shader to calculate the amount of material between the player and each radiation source. The amount of material (in world coordinates) is determined by casting a ray from the source to the player and then checking if that ray intersects the axis aligned bounding box for each object making up the scene geometry (What objectes make up the scene is determined by a script applied to them in Unity). That amount of material is then modified based on the type of material it has been labeled as (More concrete is required to reduce radiation than lead). 




*An actual image affected by radiation for reference. Credit to BeneficialBad9166 on Reddit* 

| An actual image affected by radiation for reference. | The effect in Unity |
| :------------------------: | :-----------------------------------------------------------------------------------------: |
| <image src="https://preview.redd.it/radiation-damaged-photos-v0-t1zaf22i803c1.jpeg?width=562&format=pjpg&auto=webp&s=3fc68aebb717640e2026dbc4d783f24d901fe781" alt="An actual image affected by radiation for reference" height="500px"/> | <image src="docs/images//RadiationEffectDemo.png" alt="A unity scene with a random set of pixel brightened" width=600px/>  |
| *Credit to BeneficialBad9166 on Reddit* | | 







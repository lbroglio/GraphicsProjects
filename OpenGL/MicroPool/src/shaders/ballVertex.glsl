#version 410

uniform mat4 modelTransform;

attribute vec4 a_Position;

void main()
{
    gl_Position = model * a_Position;  
}
# This script reads in glsl shader files and generates C++ header files containing
# the shader source code as string literals.
import os
import sys
from pathlib import Path 

# Returns a string containing the header for a shader made from the template
def make_header_from_template(shaderName : str, shaderContents : str):
    return f"""
#ifndef SHADER_{shaderName.upper()}
#define SHADER_{shaderName.upper()}

const char* {shaderName.upper()}_SHADER_SRC = R"V0G0N({shaderContents})V0G0N";

#endif
    """


# Genereate a C++ header file for a specified glsl shader file
def generate_shader_header(shaderFilePath : str, buildRoot = "."):
    # Read in the shader and make a header for it
    shaderFile = open(shaderFilePath, 'r')
    shaderContents = shaderFile.read()
    shaderFile.close()

    shaderPathObj = Path(shaderFilePath)
    shaderName = shaderPathObj.stem
    shaderHeader = make_header_from_template(shaderName, shaderContents)

    # Ensure that the shader header directory exists
    shaderHeaderDirectory = buildRoot + "/bin/shaderHeaders"
    if(not os.path.isdir(shaderHeaderDirectory)):
        os.mkdir(shaderHeaderDirectory)
    
    # Write the header to a file
    shaderHeaderFile = open(shaderHeaderDirectory + f"/{shaderName}_shader.hpp", 'w')
    shaderHeaderFile.write(shaderHeader)
    shaderHeaderFile.close()


def main():
    # Get cmdline arguments
    shaderFilePath = sys.argv[1]
    buildRoot = None
    if(len(sys.argv) > 2):
        buildRoot = sys.argv[2]
    
    if(buildRoot is None):
        generate_shader_header(shaderFilePath)
    else:
        generate_shader_header(shaderFilePath, buildRoot)
    
if __name__ == "__main__":
    main()
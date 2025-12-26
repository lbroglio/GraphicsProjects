#include<vector>
#include<string>
#include<fstream>

#include "ioUtils.hpp"

void writeBufferToPly(std::vector<float> buffer, std::string filePath){
    std::fstream outFile(filePath);

    if(!outFile.is_open()){
        throw new std::invalid_argument("The file " + filePath + " could not be opened for writing");
    }

    // Write the header
    outFile << "ply";
    outFile << "ascii 1.0";
    outFile << "element vertex " << buffer.size() / 3;
    outFile << "property float x";
    outFile << "property float y";
    outFile << "property float z";

    // Write the elements 
    for(int i = 0; i < buffer.size(); i+=3){
        outFile << buffer[i] << " " << buffer[i+1] << " " << buffer[i+2];
    }
}
#include<vector>
#include<string>
#include<fstream>
#include<iostream>

#include "ioUtils.hpp"

void writeBufferToPly(std::vector<float> buffer, std::string filePath){
    std::ofstream outFile(filePath);
    if(!outFile.is_open()){
        throw new std::invalid_argument("The file " + filePath + " could not be opened for writing");
    }

    // Write the header
    outFile << "ply\n";
    outFile << "ascii 1.0\n";
    outFile << "element vertex " << buffer.size() / 3 << '\n';
    outFile << "property float x\n";
    outFile << "property float y\n";
    outFile << "property float z\n";

    // Write the elements 
    for(int i = 0; i < buffer.size(); i+=3){
        outFile << buffer[i] << " " << buffer[i+1] << " " << buffer[i+2] << '\n';
    }
}
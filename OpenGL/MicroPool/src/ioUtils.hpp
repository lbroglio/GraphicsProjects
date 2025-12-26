#ifndef IO_UTILS
#define IO_UTILS

#include<vector>
#include<string>


/**
 * @brief Write all of the vertices in a buffer to a ply file. 
 * Primarilu 
 * 
 * @param buffer 
 * @param filePath 
 */
void writeBufferToPly(std::vector<float> buffer, std::string filePath);


#endif
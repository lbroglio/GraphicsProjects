CXX := g++
APPNAME := micropool
SOURCES := $(wildcard **/*.cpp)
OBJECTS := $(patsubst src/%.cpp,bin/%.o,$(SOURCES))
SHADERS := vertex.hpp
FLAGS := -Wall -Werror -std=c++23

.phony: clean

$(APPNAME): $(OBJECTS)
	$(CXX) $(FLAGS) $< -o $@

$(OBJECTS): bin/%.o : src/%.cpp bin bin/shaderHeaders/$(SHADERS)
	$(CXX) $(FLAGS) -c $< -o $@

bin/shaderHeaders/$(SHADERS): bin/shaderHeaders/%.hpp : src/shaders/%.glsl bin 
	python3 tools/build/generate_shader_headers.py $<

bin: 
	mkdir bin

clean:
	rm -rf bin
	rm micropool

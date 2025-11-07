CXX := g++
APPNAME := micropool
SOURCES := $(wildcard src/*.cpp)
OBJECTS := $(patsubst src/%.cpp,bin/%.o,$(SOURCES))
SHADER_SOURCES := $(wildcard src/shaders/*.glsl)
SHADERS := $(patsubst src/shaders/%.glsl,bin/shaderHeaders/%.hpp,$(SHADER_SOURCES))
FLAGS := -Wall -Werror -std=c++23

.phony: clean

$(APPNAME): $(OBJECTS)
	$(CXX) $(FLAGS) $< -o $@

$(OBJECTS): bin/%.o : src/%.cpp bin $(SHADERS)
	$(CXX) $(FLAGS) -c $< -o $@

$(SHADERS): bin/shaderHeaders/%.hpp : src/shaders/%.glsl bin 
	python3 tools/build/generate_shader_headers.py $<

bin: 
	mkdir bin

clean:
	rm -rf bin
	rm micropool

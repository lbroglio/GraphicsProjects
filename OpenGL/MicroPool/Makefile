CXX := g++
APPNAME := micropool
SOURCES := $(wildcard src/*.cpp)
OBJECTS := $(patsubst src/%.cpp,bin/%.o,$(SOURCES))
SHADER_SOURCES := $(wildcard src/shaders/*.glsl)
SHADERS := $(patsubst src/shaders/%.glsl,bin/shaderHeaders/%_shader.hpp,$(SHADER_SOURCES))
FLAGS := -Wall -Werror -std=c++23
LDFLAGS := -L/opt/homebrew/lib -lglfw -framework OpenGL

.PHONY: clean

$(APPNAME): $(OBJECTS)
	$(CXX) $(FLAGS) $^ -o $@ $(LDFLAGS)

bin/%.o : src/%.cpp bin $(SHADERS)
	$(CXX) $(FLAGS) -c $< -o $@

$(SHADERS): bin/shaderHeaders/%_shader.hpp : src/shaders/%.glsl bin 
	python3 tools/build/generate_shader_headers.py $<

bin: 
	mkdir -p bin

clean:
	rm -rf bin
	rm -f micropool

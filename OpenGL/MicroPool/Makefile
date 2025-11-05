CC= g++
APPNAME= micropool
OBJECTS= micropool.o
SHADERS= vertex.hpp
FLAGS= -Wall -Werror -std=c++23

.phony: clean

$(APPNAME): bin/$(OBJECTS)
	$(CC) $(FLAGS) $< -o $@

bin/$(OBJECTS): bin/%.o : src/%.cpp bin bin/shaderHeaders/$(SHADERS)
	$(CC) $(FLAGS) -c $< -o $@

bin/shaderHeaders/$(SHADERS): bin/shaderHeaders/%.hpp : src/shaders/%.glsl bin 
	python3 tools/build/generate_shader_headers.py $<

bin: 
	mkdir bin

clean:
	rm -rf bin
	rm micropool

# bollcat

A 2d platform game written in js.  
The engine is made from scratch using WebGl2 for rendering
and Blender as a level editor.  
Python is used to export levels data and make all the assets available to the game.

## Structure of the project

- `data`: Contains all the assets for the game, including the sources and the conversions made for the engine.
    - `data/materials`: Each material is a single js file.
    - `data/scenes`: Each scene has a source '.blend' file, a js script, and the converted data (json disguised as js to make import simpler).
    - `data/scripts`: Scripts are js code that can be used in the game code.
    - `data/shaders`: Each shader program has its source glsl files, and the program/pipeline data in a js file.
    - `data/sounds`: Audio files directly used by the game.
    - `data/textures`: Textures used in shaders/materials.

- `gen`: Templates for code generation.

- `sh`: Various scripts used in development.

- `src`: The code for the engine.

## Workflow

Start a local server that will refresh generated code and assets on page reload:
```
./sh/start.sh
```
  
Level editing happens in Blender, data is them exported using `./sh/export_scene.sh`.

### Sources

- WebGl docs: 
    - https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API

- WebGl spec: 
    - https://www.khronos.org/registry/webgl/specs/latest/1.0/

- WebGl2 spec: 
    - https://www.khronos.org/registry/webgl/specs/latest/2.0/

- bad practices: 
    - https://webgl2fundamentals.org/webgl/lessons/webgl-anti-patterns.html

- VAOs: https
    - ://medium.com/@david.komer/dude-wheres-my-data-vao-s-in-webgl-896631783895

- WebGl1 triangle: 
    - https://aralroca.com/blog/first-steps-in-webgl#create-program-from-shaders

- OpenGl triangle: 
    - https://learnopengl.com/Getting-started/Hello-Triangle

- disable bilinear: 
    - https://stackoverflow.com/questions/7615009/disable-interpolation-when-scaling-a-canvas

- fullscreen: 
    - https://webgl2fundamentals.org/webgl/webgl-same-code-canvas-fullscreen.html

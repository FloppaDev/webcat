#version 300 es
precision mediump float;

uniform vec4 camera;
uniform sampler2D tex;

out vec4 color;

void main () {
    vec2 uv = gl_FragCoord.xy * camera.zw * .25;

    color = texture(tex, uv);
}

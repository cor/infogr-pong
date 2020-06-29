precision highp float;

#define M_PI 3.1415926535897932384626433832795

varying mediump vec2 screenPosition;

void main() {
    gl_FragColor = vec4(screenPosition, 1.0, 1.0);
}

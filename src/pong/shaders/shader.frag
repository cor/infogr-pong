precision highp float;

#define M_PI 3.1415926535897932384626433832795

varying mediump vec2 screenPosition;

vec4 colorAt(vec2 position)
{
    vec2 paddlePos = vec2(-0.9, 0);
    vec2 paddleSize = vec2(0.02, 0.12);

    vec2 delta = abs(paddlePos - position);

    if (delta.x < paddleSize.x && delta.y < paddleSize.y)
    {
        return vec4(1, 1, 1, 1);
    }

    return vec4(0, 0, 0, 1.0);
}

void main() {
    gl_FragColor = colorAt(screenPosition);
}

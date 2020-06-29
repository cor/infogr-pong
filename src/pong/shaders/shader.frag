precision highp float;

#define M_PI 3.1415926535897932384626433832795

varying mediump vec2 screenPosition;

vec2 ballPos = vec2(0.0, 0.0);
float ballRadius = 0.02;

vec2 paddleSize = vec2(0.02, 0.12);

vec2 paddle0Pos = vec2(-0.9, 0);
vec2 paddle1Pos = vec2(0.9, 0);

vec4 colorAt(vec2 position)
{
    vec2 delta0 = abs(paddle0Pos - position); // delta for paddle 0
    vec2 delta1 = abs(paddle1Pos - position); // delta for paddle 1

    bool isBall = length(abs(ballPos - position)) < ballRadius;
    bool isLine = abs(position.x) < 0.001;

    if (delta0.x < paddleSize.x && delta0.y < paddleSize.y ||
        delta1.x < paddleSize.x && delta1.y < paddleSize.y ||
        isBall ||
        isLine)
    {
        return vec4(1, 1, 1, 1);
    }

    return vec4(0, 0, 0, 1.0);
}

void main() {
    gl_FragColor = colorAt(screenPosition);
}

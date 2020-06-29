precision highp float;

#define M_PI 3.1415926535897932384626433832795

varying mediump vec2 screenPosition;

uniform vec2 ballPosition;
uniform vec2 leftPaddlePosition;
uniform vec2 rightPaddlePosition;

float ballRadius = 0.02;
vec2 paddleSize = vec2(0.02, 0.12);


vec4 colorAt(vec2 position)
{
    vec2 leftPaddleDelta = abs(leftPaddlePosition - position);  // delta for paddle 0
    vec2 rightPaddleDelta = abs(rightPaddlePosition - position); // delta for paddle 1

    bool isLeftPaddle = leftPaddleDelta.x < paddleSize.x && leftPaddleDelta.y < paddleSize.y;
    bool isRightPaddle = rightPaddleDelta.x < paddleSize.x && rightPaddleDelta.y < paddleSize.y;
//    bool isBall = length(abs(ballPosition - position)) < ballRadius;
    bool isBall = abs(ballPosition.x - position.x) < ballRadius && abs(ballPosition.y - position.y) < ballRadius;
    bool isLine = abs(position.x) < 0.001;

    if (isLeftPaddle || isRightPaddle || isBall || isLine)
    {
        return vec4(1, 1, 1, 1);
    }

    return vec4(0, 0, 0, 1.0);
}

void main() {
    gl_FragColor = colorAt(screenPosition);
}

precision highp float;

varying mediump vec2 screenPosition;

uniform vec2 score;

uniform vec2 ballPosition;
uniform vec2 leftPaddlePosition;
uniform vec2 rightPaddlePosition;

float ballRadius = 0.02;
vec2 paddleSize = vec2(0.04, 0.24);


bool isInRectangle(vec2 position, vec2 center, vec2 size)
{
    vec2 delta = abs(center - position);  // delta for paddle 0
    return delta.x < (size.x/2.0) && delta.y < (size.y/2.0);
}



vec4 colorAt(vec2 position)
{
    bool isLeftPaddle = isInRectangle(position, leftPaddlePosition, paddleSize);
    bool isRightPaddle = isInRectangle(position, rightPaddlePosition, paddleSize);
    bool isBall = isInRectangle(position, ballPosition, vec2(ballRadius * 2.0, ballRadius * 2.0));
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

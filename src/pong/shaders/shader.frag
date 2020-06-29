precision highp float;

varying mediump vec2 screenPosition;

uniform vec2 score;

uniform vec2 ballPosition;
uniform vec2 leftPaddlePosition;
uniform vec2 rightPaddlePosition;

float ballRadius = 0.02;
vec2 paddleSize = vec2(0.04, 0.24);

bool isInRect(vec2 position, vec2 center, vec2 size)
{
    vec2 delta = abs(center - position);  // delta for paddle 0
    return delta.x < (size.x/2.0) && delta.y < (size.y/2.0);
}

float pixelSize = 0.03;

// x
// x
// x
// x
// x
bool is1(vec2 position, vec2 pos)
{
    return isInRect(position, pos, vec2(pixelSize, pixelSize * 5.0));
}

// xxx
//   x
// xxx
// x
// xxx
bool is2(vec2 position, vec2 pos)
{
    return isInRect(position, pos, vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x, pos.y - 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x + 1.0 * pixelSize, pos.y + 1.0 * pixelSize), vec2(pixelSize, pixelSize)) ||
    isInRect(position, vec2(pos.x - 1.0 * pixelSize, pos.y - 1.0 * pixelSize), vec2(pixelSize, pixelSize));
}

// xxx
//   x
// xxx
//   x
// xxx
bool is3(vec2 position, vec2 pos)
{
    return isInRect(position, pos, vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x, pos.y - 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x + pixelSize, pos.y), vec2(pixelSize, 3.0 * pixelSize));
}

// x x
// x x
// xxx
//   x
//   x
bool is4(vec2 position, vec2 pos)
{
    return isInRect(position, pos, vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x - pixelSize, pos.y + pixelSize), vec2(pixelSize, 3.0 * pixelSize)) ||
    isInRect(position, vec2(pos.x + pixelSize, pos.y), vec2(pixelSize, 5.0 * pixelSize));
}

// xxx
// x
// xxx
//   x
// xxx
bool is5(vec2 position, vec2 pos)
{
    return isInRect(position, pos, vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x, pos.y - 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x - 1.0 * pixelSize, pos.y + 1.0 * pixelSize), vec2(pixelSize, pixelSize)) ||
    isInRect(position, vec2(pos.x + 1.0 * pixelSize, pos.y - 1.0 * pixelSize), vec2(pixelSize, pixelSize));
}

// xxx
// x
// xxx
// x x
// xxx

bool is6(vec2 position, vec2 pos)
{
    return isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x - 1.0 * pixelSize, pos.y), vec2(pixelSize, pixelSize * 4.0)) ||
    isInRect(position, vec2(pos.x, pos.y), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x, pos.y - 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x + 1.0 * pixelSize, pos.y - 1.0 * pixelSize), vec2(pixelSize, pixelSize * 3.0));
}

// xxx
//   x
//   x
//   x
//   x

bool is7(vec2 position, vec2 pos)
{
    return isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
        isInRect(position, vec2(pos.x + 1.0 * pixelSize, pos.y), vec2(pixelSize, pixelSize * 4.0));
}

// xxx
// x x
// xxx
// x x
// xxx

bool is8(vec2 position, vec2 pos)
{
    return isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x - 1.0 * pixelSize, pos.y), vec2(pixelSize, pixelSize * 4.0)) ||
    isInRect(position, vec2(pos.x, pos.y), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x, pos.y - 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x + 1.0 * pixelSize, pos.y), vec2(pixelSize, pixelSize * 4.0));
}

// xxx
// x x
// xxx
//   x
// xxx

bool is9(vec2 position, vec2 pos)
{
    return isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x - 1.0 * pixelSize, pos.y + 1.0 * pixelSize), vec2(pixelSize, pixelSize * 3.0)) ||
    isInRect(position, vec2(pos.x, pos.y), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x, pos.y - 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x + 1.0 * pixelSize, pos.y), vec2(pixelSize, pixelSize * 4.0));
}

vec4 colorAt(vec2 position)
{
    bool isLeftPaddle = isInRect(position, leftPaddlePosition, paddleSize);
    bool isRightPaddle = isInRect(position, rightPaddlePosition, paddleSize);
    bool isBall = isInRect(position, ballPosition, vec2(ballRadius * 2.0, ballRadius * 2.0));
    bool isLine = abs(position.x) < 0.001;

    if (isLeftPaddle || isRightPaddle || isBall || isLine || is9(position, vec2(0.1, 0.55)))
    {
        return vec4(1, 1, 1, 1);
    }

    return vec4(0, 0, 0, 1.0);
}

void main() {
    gl_FragColor = colorAt(screenPosition);
}

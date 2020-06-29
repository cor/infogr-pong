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

// xxx
// x x
// x x
// x x
// xxx
bool is0(vec2 position, vec2 pos)
{
    return
    isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x - 1.0 * pixelSize, pos.y), vec2(pixelSize, pixelSize * 4.0)) ||
    isInRect(position, vec2(pos.x, pos.y - 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x + 1.0 * pixelSize, pos.y), vec2(pixelSize, pixelSize * 4.0));
}


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
    return
    isInRect(position, pos, vec2(pixelSize * 3.0, pixelSize)) ||
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
    return
    isInRect(position, pos, vec2(pixelSize * 3.0, pixelSize)) ||
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
    return
    isInRect(position, pos, vec2(pixelSize * 3.0, pixelSize)) ||
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
    return
    isInRect(position, pos, vec2(pixelSize * 3.0, pixelSize)) ||
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
    return
    isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
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
    return
    isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x + 1.0 * pixelSize, pos.y), vec2(pixelSize, pixelSize * 4.0));
}

// xxx
// x x
// xxx
// x x
// xxx
bool is8(vec2 position, vec2 pos)
{
    return
    isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x - 1.0 * pixelSize, pos.y), vec2(pixelSize, pixelSize * 3.0)) ||
    isInRect(position, vec2(pos.x, pos.y), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x, pos.y - 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x + 1.0 * pixelSize, pos.y), vec2(pixelSize, pixelSize * 3.0));
}

// xxx
// x x
// xxx
//   x
// xxx
bool is9(vec2 position, vec2 pos)
{
    return
    isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x - 1.0 * pixelSize, pos.y + 1.0 * pixelSize), vec2(pixelSize, pixelSize * 3.0)) ||
    isInRect(position, vec2(pos.x, pos.y), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x, pos.y - 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x + 1.0 * pixelSize, pos.y), vec2(pixelSize, pixelSize * 4.0));
}

// xxx
// x x
// xxx
// x
// x
bool isP(vec2 position, vec2 pos)
{
    return
    isInRect(position, vec2(pos.x - pixelSize, pos.y), vec2(pixelSize, 5.0 * pixelSize)) ||
    isInRect(position, pos, vec2(pixelSize, pixelSize)) ||
    isInRect(position, vec2(pos.x + pixelSize, pos.y + pixelSize), vec2(pixelSize, 3.0 * pixelSize)) ||
    isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(pixelSize, pixelSize));
}

bool isO(vec2 position, vec2 pos)
{
    return is0(position, pos);
}

// xxx
// x x
// x x
// x x
// x x
bool isN(vec2 position, vec2 pos)
{
    return
    isInRect(position, vec2(pos.x - pixelSize, pos.y), vec2(pixelSize, 5.0 * pixelSize)) ||
    isInRect(position, vec2(pos.x + pixelSize, pos.y), vec2(pixelSize, 5.0 * pixelSize)) ||
    isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(3.0 * pixelSize, pixelSize));
}


// xxx
// x
// x|x
// x x
// xxx
bool isG(vec2 position, vec2 pos)
{
    return
    isInRect(position, vec2(pos.x, pos.y + 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x, pos.y - 2.0 * pixelSize), vec2(pixelSize * 3.0, pixelSize)) ||
    isInRect(position, vec2(pos.x - pixelSize, pos.y), vec2(pixelSize, pixelSize * 3.0)) ||
    isInRect(position, vec2(pos.x + pixelSize, pos.y - pixelSize), vec2(pixelSize, pixelSize)) ||
    isInRect(position, vec2(pos.x + 0.75 * pixelSize, pos.y), vec2(1.5 * pixelSize, pixelSize));
}


bool isPONG(vec2 position, vec2 pos)
{
    return
    isP(position, vec2(pos.x - 6.0 * pixelSize, pos.y)) ||
    isO(position, vec2(pos.x - 2.0 * pixelSize, pos.y)) ||
    isN(position, vec2(pos.x + 2.0 * pixelSize, pos.y)) ||
    isG(position, vec2(pos.x + 6.0 * pixelSize, pos.y));
}

bool isNumber(float number, vec2 position, vec2 numberPosition)
{   // GLSL is a beautiful language
    if (number == 0.0) { return is0(position, numberPosition); }
    if (number == 1.0) { return is1(position, numberPosition); }
    if (number == 2.0) { return is2(position, numberPosition); }
    if (number == 3.0) { return is3(position, numberPosition); }
    if (number == 4.0) { return is4(position, numberPosition); }
    if (number == 5.0) { return is5(position, numberPosition); }
    if (number == 6.0) { return is6(position, numberPosition); }
    if (number == 7.0) { return is7(position, numberPosition); }
    if (number == 8.0) { return is8(position, numberPosition); }
    if (number == 9.0) { return is9(position, numberPosition); }
    return false;
}

vec4 colorAt(vec2 position)
{
    bool isLeftPaddle = isInRect(position, leftPaddlePosition, paddleSize);
    bool isRightPaddle = isInRect(position, rightPaddlePosition, paddleSize);
    bool isBall = isInRect(position, ballPosition, vec2(ballRadius * 2.0, ballRadius * 2.0));
    bool isLine = abs(position.x) < 0.001;

    // if gamestate == start
    if (isPONG(position, vec2(0, 0.2)))
    {
        return vec4(1, 1, 1, 1);
    }
    return vec4(0, 0, 0, 1.0);

    // if gamestate == playing
    if (isLeftPaddle ||
    isRightPaddle ||
    isBall ||
    isLine ||
    isNumber(score.x, position, vec2(-0.1, 0.55)) ||
    isNumber(score.y, position, vec2(0.1, 0.55)))
    {
        return vec4(1, 1, 1, 1);
    }

    return vec4(0, 0, 0, 1.0);
}

void main() {
    gl_FragColor = colorAt(screenPosition);
}

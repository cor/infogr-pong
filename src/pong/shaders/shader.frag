precision highp float;

varying mediump vec2 screenPosition;

//
// GAME STATE
//
uniform vec2 score;
uniform vec2 ballPosition;
uniform vec2 leftPaddlePosition;
uniform vec2 rightPaddlePosition;
uniform float gameStage;
uniform vec2 oldPositions[30];
uniform float time;

//
// CURVE
//
vec2 curveAmount = vec2(0.8, 0.6);
float caseBorder = 0.0125;


float ballRadius = 0.02;
vec2 paddleSize = vec2(0.04, 0.24);


//
// DRAWING FUNCTIONS
//
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
    isInRect(position, vec2(pos.x + pixelSize, pos.y - pixelSize), vec2(pixelSize)) ||
    isInRect(position, vec2(pos.x + 0.75 * pixelSize, pos.y), vec2(1.5 * pixelSize, pixelSize));
}

// x
// x
// x
//
// x
bool isExclamationMark(vec2 position, vec2 pos)
{
    return
    isInRect(position, vec2(pos.x, pos.y + pixelSize), vec2(pixelSize, pixelSize * 3.0)) ||
    isInRect(position, vec2(pos.x, pos.y - 2.0 * pixelSize), vec2(pixelSize));
}


bool isPONG(vec2 position, vec2 pos)
{
    return
    isP(position, vec2(pos.x - 6.0 * pixelSize, pos.y)) ||
    isO(position, vec2(pos.x - 2.0 * pixelSize, pos.y)) ||
    isN(position, vec2(pos.x + 2.0 * pixelSize, pos.y)) ||
    isG(position, vec2(pos.x + 6.0 * pixelSize, pos.y));
}


bool isTriangle(vec2 position, vec2 size, vec2 pos)
{
    float top = pos.y + size.y;
    float bottom = pos.y - size.y;
    float start = pos.x;
    float end = pos.x + size.x;

    float slope = size.y/size.x;
    float relativeX = position.x - start;

    return
    position.x > start && position.x < end && // x within triangle
    (position.y < top - slope * relativeX && position.y > bottom + slope * relativeX); // y within triangle

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

bool isP1score(vec2 position) {
    return isNumber(score.x, position, vec2(-4.0 * pixelSize, 18.0 * pixelSize));
}

bool isP2score(vec2 position) {
    return isNumber(score.y, position, vec2(4.0 * pixelSize, 18.0 * pixelSize));
}

bool isLine(vec2 position) {
    return
        abs(position.x) < pixelSize / 2.0 &&
        mod(position.y - pixelSize * 1.5, pixelSize * 2.0) <= pixelSize;
}

bool isWinLine(vec2 position) {
    return isLine(position) &&
        (position.y > pixelSize * 3.0 || position.y < pixelSize * -3.0);
}

bool isPlayButton(vec2 position) {
    return isTriangle(position, vec2(0.16, 0.1), vec2(-0.06, 0));
}

//
// GAMESTAGE SPECIFIC RENDERING
//
vec4 welcome(vec2 position) { // GameStage.Welcome
    if (isPONG(position, vec2(0, 0.3)) ||
        isPlayButton(position))
    {
        return vec4(1, 1, 1, 1);
    }
    return vec4(0, 0, 0, 1.0);
}

vec4 playing(vec2 position) // GameStage.Playing
{
    bool isLeftPaddle = isInRect(position, leftPaddlePosition, paddleSize);
    bool isRightPaddle = isInRect(position, rightPaddlePosition, paddleSize);
    bool isBall = isInRect(position, ballPosition, vec2(ballRadius * 2.0, ballRadius * 2.0));

    if (isLeftPaddle ||
    isRightPaddle ||
    isBall ||
    isLine(position) ||
    isP1score(position) ||
    isP2score(position))
    {
        return vec4(1, 1, 1, 1);
    }

    // Render tail
    for (int i = 29; i >= 0; i--) {
        vec2 oldPos = oldPositions[i];
        float scale = float(i) / 30.0;
        if (isInRect(position, oldPos, vec2(ballRadius * 2.0 * scale))) {
            return vec4(scale, scale, scale, 1.0);
        }
    }

    return vec4(0, 0, 0, 1.0);
}

vec4 p1win(vec2 position) // GameStage.P1Win
{
    if (isP(position, vec2(-19.0 * pixelSize, 0)) ||
        is1(position, vec2(-16.0 * pixelSize, 0)) ||
        isExclamationMark(position, vec2(-14.0 * pixelSize, 0)) ||
        isP1score(position) ||
        isP2score(position) ||
        isWinLine(position) ||
        isPlayButton(position)
    )
    {
        return vec4(1, 1, 1, 1);
    }
    return vec4(0, 0, 0, 1.0);
}

vec4 p2win(vec2 position) // GameStage.P2Win
{
    if (isP(position, vec2(14.0 * pixelSize, 0)) ||
        is2(position, vec2(18.0 * pixelSize, 0)) ||
        isExclamationMark(position, vec2(21.0 * pixelSize, 0)) ||
        isP1score(position) ||
        isP2score(position) ||
        isWinLine(position) ||
        isPlayButton(position)
    )
    {
        return vec4(1, 1, 1, 1);
    }
    return vec4(0, 0, 0, 1.0);
}

vec4 scanline(vec4 color, vec2 position) {
    float lineHeight = 0.0104;
    float darkness = 0.9;
    float speed = 0.0104;

    float y = mod(position.y + (time / 60.0) * speed, lineHeight);
    if (y < lineHeight/2.0) {
        return color;
    } else {
        return vec4(color.x, color.y, color.z, darkness);
    }
}

vec4 colorAt(vec2 position) {
    // Map position from [0, 1] to [-1, 1] to get world space color
    position *= 2.0;
    position -= vec2(1.0);

    vec4 color;

    if (abs(position.y) > 0.666) { // out of render area
        return vec4(0, 0, 0, 1);
    }

    if (gameStage == 0.0) { // GameStage.Welcome
        color = welcome(position);
    } else if (gameStage == 1.0) { // GameStage.Playing
        color = playing(position);
    } else if (gameStage == 2.0) { // GameStage.P1Win
        color = p1win(position);
    } else if (gameStage == 3.0) { // GameStage.P2Win
        color = p2win(position);
    }

    // Apply scanline effect
    color = scanline(color, position);

    return color;
}


vec4 curve(vec2 position) {
    // Map position from [-1, 1] to [0, 1] for curve effect
    position += vec2(1.0);
    position /= 2.0;

    // Using this https://github.com/wessles/GLSL-CRT/blob/master/shader.frag algorithm
    float dx = abs(0.5 - position.x);
    float dy = abs(0.5 - position.y);
    dx *= dx;
    dy *= dy;

    position.x -= 0.5;
    position.x *= 1.0 + (dy * curveAmount.x);
    position.x += 0.5;

    position.y -= 0.5;
    position.y *= 1.0 + (dx * curveAmount.y);
    position.y += 0.5;

    // Draw color from world space
    vec4 color = colorAt(position);
    color += sin(position.y) * 0.02;

    if(position.y > 1.0 || position.x < 0.0 || position.x > 1.0 || position.y < 0.0)
        color = vec4(0, 0, 0, 1);

    return color;
}

void main() {
    gl_FragColor = curve(screenPosition);
}

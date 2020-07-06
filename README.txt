# infogr-pong

Authors: 
 - Cor Pruijs (6595154)
 - Karel Kubat (6913466)

## Work division

We pair programmed the entire application together. Cor did produce the actual sound files, and 
can be considered our lead designer. 

## Features

- Pong
- Scoring
- Character rendering
- Score rendering
- Ball tail
- Randomized start angle
- Ball speed up
- Interactive play button (pointer events)
- Start screen / Win screen
- WebGL
- VueJS app + hosting
- VHS effect
- Sound effects
- Screen curvature

## Running the game
Our entire game can be viewed [online](https://cor.github.io/infogr-pong)! 
Please view it in an updated version of Google Chrome or FireFox.

### Controls 
- Click the triangular play button to start
- W/S for Player 1 movement
- UpArrow/DownArrow for Player 2 movement

## Sources

StackOverflow sources are included in the actual code. We used snippets to determine mouse locations on the
HTML canvas, and [wessles](https://github.com/wessles/GLSL-CRT/blob/master/shader.frag) implementation of screen curvatures. 

The algorithm used to determine the angle that the ball makes when hitting the paddle is sourced from [Cor's previous
Pong implementation](https://github.com/cor/Ping)

Finally, we used official OpenGL and WebGL tutorials to create the app, 
and previous work by us on the [raytracer assignment](https://github.com/cor/infgr-ratyracer) as well.

## Project setup

This project requires a modern JavaScript environment, most likely [npm](https://www.npmjs.com/) and [node](https://nodejs.org/en/).

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

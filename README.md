# Three Tween Path

This module uses TweenJs to create a smooth path (Catmull-Rom) through the given JSON path data (includes vertices, duration and delay between segments).

## Usage
Import the library, your path data and TweenJs
```js
import TWEEN from "@tweenjs/tween.js";
import * as TweenRoute from "./index";
import { samplePath } from './samplePath';
```

Create a MultiTween with a given 3d object and the path data
```js
let myTween = TweenRoute.MultiTweenPath(my3dObject, samplePath);
myTween.start();
```

Run the TweenJs update function to keep your tween updated
```js
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  
  //update tween
  TWEEN.update();
};
```

## Path Data
The path data necessary for the module is in the following structure:
```js
const pathData = [
    {
        path: [
            {x: -40, y: 30, z: -17},
            {x: -43, y: 29, z: -16},
            {x: -42, y: 29, z: -15} //copy to next path for consistency
        ],
        delay: 2000,
        duration: 5000
    },
    {
        path: [
            {x: -42, y: 29, z: -15}, //be sure to include the last vector of the previous path
            {x: -41, y: 29.25, z: -15},
            {x: -18, y: 28, z: -3}
        ],
        delay: 2000,
        duration: 10000
    },
    {
        path: [
            {x: -18, y: 28, z: -3},
            {x: -16.5, y: 28, z: -5},
            {x: -6, y: 28, z: -6}
        ],
        delay: 1000,
        duration: 8000
    }
]
```
Always include the last vertices of the previous path in the subsequent path to avoid choppy transitions.
The duration and delay parameters are measured in milliseconds.

## Example
Clone the repository and run
```shell
npm i
npm start
```
The example is available under localhost:3000
![image](https://user-images.githubusercontent.com/64702286/121823139-87804c80-cca3-11eb-8408-69260f350d76.png)

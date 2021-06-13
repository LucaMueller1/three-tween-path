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

## Example
Clone the repository and run
```shell
npm i
npm start
```
The example is available under localhost:3000
![image](https://user-images.githubusercontent.com/64702286/121823139-87804c80-cca3-11eb-8408-69260f350d76.png)

import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

export const PointsPath = () => {
  const pointsPath = new THREE.CurvePath();

  let vectorArray = [];
  for (let pos of pathCrafting1) {
    vectorArray.push(new THREE.Vector3(pos.x, pos.y, pos.z));
  }

  const line = new THREE.CatmullRomCurve3(vectorArray);

  pointsPath.add(line);

  return pointsPath;
};

export const SingeTweenPath = (object, shape, duration) => {
  const options = {
    from: 0,
    to: 1,
    duration: shape.duration,
    start: true,
    yoyo: false,
    onStart: onStart ? onStart : () => {},
    onComplete: onComplete ? onComplete : () => {},
    onUpdate: () => {},
    smoothness: 100,
    easing: TWEEN.Easing.Linear.None,
  };

  options.duration = options.duration || shape.getLength();

  var tween = new TWEEN.Tween({ distance: options.from })
    .to({ distance: options.to }, options.duration)
    .easing(options.easing)
    .onStart(options.onStart)
    .onComplete(options.onComplete)
    .onUpdate(function () {
      var pathPosition = shape.getPoint(this._object.distance);

      object.position.set(pathPosition.x, pathPosition.y, pathPosition.z);

      object.updateMatrix();

      if (options.onUpdate) {
        options.onUpdate(this, shape);
      }
    })
    .yoyo(options.yoyo);

  if (options.yoyo) {
    tween.repeat(Infinity);
  }

  if (options.start) {
    tween.start();
  }

  return tween;
};

export const MultiTweenPath = (object, pathData, onStart, onComplete) => {
  let tweens = [];

  for (let path of pathData) {
    const options = {
      from: 0,
      to: 1,
      duration: path.duration,
      start: true,
      yoyo: false,
      onStart: onStart ? onStart : () => {},
      onComplete: onComplete ? onComplete : () => {},
      onUpdate: () => {},
      smoothness: 100,
      easing: TWEEN.Easing.Linear.None,
    };

    let shape = new THREE.CurvePath();

    let vectorArray = [];
    for (let pos of path.path) {
      vectorArray.push(new THREE.Vector3(pos.x, pos.y, pos.z));
    }

    let catmull = new THREE.CatmullRomCurve3(vectorArray);
    shape.add(catmull);

    let tween = new TWEEN.Tween({ distance: options.from })
      .to({ distance: options.to }, options.duration)
      .easing(options.easing)
      .onStart(options.onStart)
      .onComplete(options.onComplete)
      .delay(path.delay)
      .onUpdate(function () {
        let pathPosition = shape.getPoint(this._object.distance);

        object.position.copy(pathPosition);

        const up = new THREE.Vector3(0, 0, 1);
        const axis = new THREE.Vector3();

        const tangent = shape.getTangent(this._object.distance);
        axis.crossVectors(up, tangent).normalize();

        const radians = Math.acos(up.dot(tangent));

        object.quaternion.setFromAxisAngle(axis, radians);

        object.updateMatrix();

        if (options.onUpdate) {
          options.onUpdate(this, shape);
        }
      })
      .yoyo(options.yoyo);

    tweens.push(tween);
  }

  if (tweens.length === 0) {
    return;
  } else if (tweens.length === 1) {
    return tweens[0];
  }

  for (let i = 0; i < tweens.length - 1; i++) {
    tweens[i].chain(tweens[i + 1]);
  }

  let routeTween = tweens[0];

  console.log(routeTween);
  return routeTween;
};

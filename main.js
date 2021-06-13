import './style.css';
import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as TweenRoute from "./index";
import { samplePath } from './samplePath';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const geometry = new THREE.ConeGeometry( 1, 4, 32 );
geometry.rotateX(Math.PI / 2)
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh(geometry, material);
scene.add(cone);

const onSegmentStart = () => {
  console.log("Segment start!");
}

const onSegmentEnd = () => {
  console.log("Segment end!");
}

let sampleTween = TweenRoute.MultiTweenPath(cone, samplePath, onSegmentStart, onSegmentEnd);
sampleTween.start();

//the following is used to render a visible path in the scene
let pointsPath = TweenRoute.PointsPath(samplePath);
console.log(pointsPath);
let line = TweenRoute.LineGeometry(pointsPath);
scene.add(line);

//animate loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
  
  //update tween
  TWEEN.update();
};
animate();
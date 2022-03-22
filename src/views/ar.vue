<template>
  <!-- <div> ar page</div> -->
  <canvas id="app-canvas"></canvas>
</template>

<script setup>
import  * as THREE  from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { createAr } from '../libs/tools'
// console.log('sss', THREE, GLTFLoader)
let loader = new GLTFLoader()
console.log('sss',THREE, createAr, loader)
// var dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
// loader.setDRACOLoader( dracoLoader );

loader.load('/portal.glb', 
  function (gltf) {
    let model = gltf.scene
    model.scale.set(1, .5, 1)
    // model.position.x = 0
    // model.position.y = 0

    let canvas = document.querySelector('#app-canvas')
    let app = new createAr(canvas, model, gltf.animations)
    app.mixer.play('CatWalk')
  },
  undefined,
  function (error) {
    console.error(error)
  }
)
</script>

<script>

</script>

<style lang="less" scoped>
#app-canvas {
  width: 500px;
  height: 500px;
}
</style>
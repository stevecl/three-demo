<template>
  <!-- <div> ar page</div> -->
  <video id="video" autoplay controls>
    <source src="/sintel.ogv" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
    <!-- <source src="./1086x716.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'> -->
  </video>
  <canvas id="app-canvas"></canvas>
</template>

<script setup>
import  * as THREE  from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createModel } from './init'
import { onMounted } from 'vue'

onMounted(() => init())

const init = async () => {
  let canvas = document.querySelector('#app-canvas')
  let app = new createModel(canvas, getBox())
  let door = await getDoor()
  app.addModel(door)
}

const getBox = () => {
  //添加立方体
  var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
  
  var video = document.querySelector("#video");
  var texture = new THREE.VideoTexture(video);
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter;
  let material = new THREE.MeshBasicMaterial( { map: texture } );
  return new THREE.Mesh(geometry, material)
}

const getDoor = () => {
  return new Promise(resolve => {
    let loader = new GLTFLoader()
    loader.load('/portal.glb', 
      function (gltf) {
        let model = gltf.scene
        model.scale.set(1, .5, 1)
        resolve(model)
      },
      undefined,
      function (error) {
        console.error(error)
      }
    )
  })
}

</script>


<style lang="less" scoped>
canvas {
  display: block;
}

#video{
  position: fixed;
  left:0;
  bottom:0;
}
</style>
<template>
  <!-- <div> ar page</div> -->
  <video id="video" autoplay controls>
    <source src="/111.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
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
  var group = new THREE.Group();
  let door = await getDoor()
  let box = await getBox()
  group.add( door );
  group.add( box );
  door.add(box)
  let app = new createModel(canvas, door)
  // app.addModel(door)
}

const getBox = () => {
  var geometry = new THREE.SphereBufferGeometry(10, 60, 40)
  geometry.scale(-1, 1, 1)
  // var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
  
  var video = document.querySelector("#video");
  console.log('video', video)
  setTimeout(() => {
    video.play()
  }, 2000)
  var texture = new THREE.VideoTexture(video);
  // console.log('texture', texture)
  // texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  // texture.minFilter = THREE.LinearFilter;
  let material = new THREE.MeshBasicMaterial( { color: 0xffff00, map: texture } );
  return new THREE.Mesh(geometry, material)
}

const getDoor = () => {
  return new Promise(resolve => {
    let loader = new GLTFLoader()
    loader.load('/public/portal.glb', 
      function (gltf) {
        let model = gltf.scene
        model.scale.set(4, 4, 4)
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
  width: 400px;
}
</style>
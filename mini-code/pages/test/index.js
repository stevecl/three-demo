// pages/test/index.js
import * as THREE from '../../libs/three.weapp.js'
import gLTF from '../../libs/loaders/GLTFLoader'
let window = THREE.global
let GLTFLoader = gLTF(THREE)
import { createAr } from './initAr'
console.log('createAr', createAr)

const app = getApp();
var camera, scene, renderer, model;
var requestAnimationFrame; // 动画回调函数

Page({
  data: {},
  onLoad: function () {
    let that = this;

    var query = wx.createSelectorQuery();
    query.select('#webgl').node().exec((res) => {
      var canvas = new THREE.global.registerCanvas(res[0].node)
      // that.render(canvas, THREE)
      var gl = canvas.getContext('webgl', { alpha: true });

      if (canvas != undefined) {
        //  canvas.width 和canvas.style都需要设置，否则无法显示渲染
        canvas.width = canvas._width;
        canvas.height = canvas._height;
        //获取系统信息，包括屏幕分辨率，显示区域大小，像素比等
        var info = wx.getSystemInfoSync();
        this._sysInfo = info;
        //设置canvas的大小，这里需要用到窗口大小与像素比乘积来定义
        canvas.width = this._sysInfo.windowWidth * this._sysInfo.pixelRatio;
        canvas.height = this._sysInfo.windowHeight * this._sysInfo.pixelRatio;
        //设置canvas的样式
        // canvas.style = {};
        // canvas.style.width = canvas.width.width;
        // canvas.style.height = canvas.width.height;
        //设置显示层canvas绑定的样式style数据，页面层则直接用窗口大小来定义
        this.setData({
          canvasWidth: this._sysInfo.windowWidth,
          canvasHeight: this._sysInfo.windowHeight
        });
        that.init(canvas);
      }
    });
  },

  init: function(canvas){
    let that = this;
    //加载外部模型
    var loader = new GLTFLoader();
    // loader.load('https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb', function (gltf) {
    loader.load('https://pre.maytek.cn/market_mall/mxlink/portal.glb', function (gltf) {
    // loader.load('https://cdn.liubaiwenhua.com/201812/ctree/resource/model/scene.glb', function (gltf) {
    // loader.load('/pages/test/portal.glb', function (gltf) {
      model = gltf.scene;
      // scene.add(model);
      let app = new createAr(THREE, canvas, model)
    }, undefined, function (e) {
      console.error(e);
    });
    // //创建Cube几何体
    // var cubeGeo = new THREE.CubeGeometry(30, 30, 30);
    // //创建材质，设置材质为基本材质（不会反射光线，设置材质颜色为绿色）
    // var mat = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
    // //创建Cube的Mesh对象
    // var cube = new THREE.Mesh(cubeGeo, mat);
    // //设置Cube对象的位置
    // cube.position.set(0, 0, -100);
    // //将Cube加入到场景中
    // new createAr(THREE, canvas, cube)
  },
})
// pages/test/index.js
import * as THREE from '../../libs/three.weapp.js'
import gLTF from '../../libs/loaders/GLTFLoader'
let window = THREE.global
let GLTFLoader = gLTF(THREE)
import { createAr, events } from './initAr'

const app = getApp();

Page({
  ...events,
  data: {},
  onLoad: function () {
  },
  onReady: function () {
    let that = this;
    var query = wx.createSelectorQuery();
    query.select('#webgl').node().exec(async (res) => {
      var canvas = new THREE.global.registerCanvas(res[0].node)
      // var gl = canvas.getContext('webgl', { alpha: true });
      if (canvas != undefined) {
        canvas.width = canvas._width;
        canvas.height = canvas._height;
        var info = wx.getSystemInfoSync();
        this._sysInfo = info;
        canvas.width = this._sysInfo.windowWidth * this._sysInfo.pixelRatio;
        canvas.height = this._sysInfo.windowHeight * this._sysInfo.pixelRatio;
        this.setData({
          canvasWidth: this._sysInfo.windowWidth,
          canvasHeight: this._sysInfo.windowHeight
        });
        // that.init(canvas);
        // let model = await this.getDoor()
        setTimeout(async () => {
          let model = await this.getBox()
          let app = new createAr(THREE, canvas, model)
        }, 2000)
      }
    });
  },
  lifetimes: {
    attached: function() {
      console.log('attached')
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  getDoor () {
    let that = this;
    return new Promise(resolve => {
      //加载外部模型
      var loader = new GLTFLoader();
      loader.load('https://pre.maytek.cn/market_mall/mxlink/portal.glb', function (gltf) {
        resolve(gltf.scene)
      }, undefined, function (e) {
        console.error(e);
      });
    })
  },
  getBox () {
    let geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    let video = wx.createVideoContext('video', this)
    let texture = new THREE.VideoTexture(video);
    // texture = new THREE.TextureLoader().load('./pikachu.png');
    let material = new THREE.MeshBasicMaterial( { map: texture } );
    return new THREE.Mesh(geometry, material)
  }
})
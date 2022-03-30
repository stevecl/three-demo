import * as THREE from '../../libs/three.weapp.js'
import { OrbitControls } from '../../libs/controls/OrbitControls.js'
// import { createScopedThreejs } from 'threejs-miniprogram';
let requestAnimationFrame
export class createAr {
  constructor(THREE1, canvas, model, animations) {
    // THREE = createScopedThreejs(canvas)
    requestAnimationFrame = canvas.requestAnimationFrame
    // THREE = THREE1
    this.scene = createAr.createScene()
        .add(model)
        .add(createAr.createAmbientLight())
        .add(createAr.createDirectionlLight())
    this.camera = createAr.createCamera()
    this.renderer = createAr.createRenderer(canvas)
    this.controls = createAr.initControls(this.camera, this.renderer)
    this.update()
  }

  static createScene () {
    let scene = new THREE.Scene()
    // scene.background = new THREE.Color(0x336495)
    return scene
  }

  static createAmbientLight () {
    return new THREE.AmbientLight(0xffffff, 1)
  }

  static createDirectionlLight () {
    let light = new THREE.DirectionalLight(0xffffff, 2)
    light.position.set(0, 400, 350)
    return light
  }

  static createCamera () {
    let camera = new THREE.PerspectiveCamera(
      45,
      500 / 300,
      .1,
      1000
    )
    camera.position.set(0, 0, 2)
    return camera
  }

  static createRenderer (canvas) {
    let renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    // renderer.setPixelRatio(window.devicePixelRatio)
    // renderer.toneMapping = THREE.ReinhardToneMapping
    // renderer.toneMappingExposure = 2.0
    return renderer
  }

  static initControls(camera, renderer) {
    let controls = new OrbitControls(camera, renderer.domElement);
    //设置控制器的中心点
    //controls.target.set( 0, 5, 0 );
    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //controls.dampingFactor = 0.25;  //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 1;
    controls.maxDistance = 2000;
    controls.enablePan = true;
    return controls
  }

  update () {
    this.resize()
    this.renderer.render(this.scene, this.camera)
    this.controls.update()
    requestAnimationFrame(() => { 
      // model.rotateY(0.01);//每次绕y轴旋转0.01弧度
      this.update() 
    })
  }

  resize() {
    // let canvasSize = this.renderer.getSize(new THREE.Vector2())
    // // let windowSize = new THREE.Vector2(window.innerWidth, window.innerHeight)
    // if (!canvasSize.equals(windowSize)) {
    //   // console.log('canvasSize', canvasSize, windowSize)
    //   // this.renderer.setSize(windowSize.x, windowSize.y, false)
    //   // this.camera.aspect = windowSize.x / windowSize.y
    //   // this.camera.updateProjectionMatrix()
    // }
  }
}

export const events = {
  touchStart(e) {
    console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
  },
  touchMove(e) {
    console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
  },
  touchEnd(e) {
    console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
  },
  touchCancel(e) {
    // console.log('canvas', e)
  },
  longTap(e) {
    // console.log('canvas', e)
  },
  tap(e) {
    // console.log('canvas', e)
  },
  documentTouchStart(e) {
    // console.log('document',e)
  },
  documentTouchMove(e) {
    // console.log('document',e)
  },
  documentTouchEnd(e) {
    // console.log('document',e)
  },
}
import  * as THREE  from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class createModel {
  constructor(canvas, model) {
    this.scene = createModel.initScene()
        .add(model)
        .add(createModel.initAmbientLight())
        .add(createModel.initDirectionlLight())
    this.camera = createModel.initCamera()
    this.renderer = createModel.initRenderer(canvas)
    this.controls = createModel.initControls(this.camera, this.renderer)
    this.update(model)
  }

  static initScene () {
    let scene = new THREE.Scene()
    var helper = new THREE.AxesHelper(50);
    scene.add(helper);
    // scene.background = new THREE.Color(0x336495)
    return scene
  }

  static initAmbientLight () {
    return new THREE.AmbientLight(0x444444, 1)
  }

  static initDirectionlLight () {
    let light = new THREE.DirectionalLight(0xffffff, 2)
    light.position.set(0, 20, 20)
    light.castShadow = true;
    light.shadow.camera.top = 10;
    light.shadow.camera.bottom = -10;
    light.shadow.camera.left = -10;
    light.shadow.camera.right = 10;

    //告诉平行光需要开启阴影投射
    light.castShadow = true;
    return light
  }

  static initCamera () {
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000)
    camera.position.set(0, 0, -.5)
    return camera
  }

  static initRenderer (canvas) {
    let renderer = new THREE.WebGLRenderer({ canvas })
    // renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee);
    renderer.shadowMap.enabled = true;
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
    // controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 1;
    controls.maxDistance = 2000;
    controls.enablePan = true;
    return controls
  }

  addModel (model) {
    this.scene.add(model)
    this.update()
  }

  update () {
    this.resize()
    this.renderer.render(this.scene, this.camera)
    this.controls.update()
    requestAnimationFrame(() => this.update())
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
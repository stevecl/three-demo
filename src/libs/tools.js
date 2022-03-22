import  * as THREE  from 'three'

export class createAr {
  constructor(canvas, model, animations) {
    this.scene = createAr.createScene()
        .add(model)
        .add(createAr.createAmbientLight())
        .add(createAr.createDirectionlLight())
    this.camera = createAr.createCamera()
    this.renderer = createAr.createRenderer(canvas)
    this.mixer = new AnimationMixer(model, animations)
    this.update(model)
  }

  static createScene () {
    let scene = new THREE.Scene()
    scene.background = new THREE.Color(0x336495)
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
      50,
      window.innerWidth / window.innerHeight,
      .1,
      1000
    )
    camera.position.z = 2
    camera.position.x = .5
    camera.position.y = .3
    return camera
  }

  static createRenderer (canvas) {
    let renderer = new THREE.WebGLRenderer({ canvas })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 2.0
    return renderer
  }

  update (model) {
    this.resize()
    this.mixer.update()
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(() => { 
      // model.rotateY(0.01);//每次绕y轴旋转0.01弧度
      this.update() 
    })
  }

  resize() {
    let canvasSize = this.renderer.getSize(new THREE.Vector2())
    let windowSize = new THREE.Vector2(window.innerWidth, window.innerHeight)
    if (!canvasSize.equals(windowSize)) {
      console.log('canvasSize', canvasSize, windowSize)
      this.renderer.setSize(windowSize.x, windowSize.y, false)
      // this.camera.aspect = windowSize.x / windowSize.y
      // this.camera.updateProjectionMatrix()
    }
  }
}

export class AnimationMixer {
  constructor (model, animations) {
    this.clock = new THREE.Clock()
    this.mixer = new THREE.AnimationMixer(model)
    this.animations = animations
  }

  play (clip) {
    console.log('clip', clip)
    let animation = this.animations.find(a => a.name === clip)
    if (animation) {
      this.mixer.stopAllAction()
      this.mixer.clipAction(animation).pplay()
      this.clip = clip
    }
  }

  update () {
    let delta = this.clock.getDelta()
    this.mixer.update(delta)
  }
}
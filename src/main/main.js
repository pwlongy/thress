/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-08-03 14:41:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-08-04 17:15:51
 */
import * as THREE from 'three'


// 使用控制器查看3d物体
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 导入动画库
import gsap from 'gsap'








// 了解threejs最基本的内容


// 1. 创建一个场景
const scene = new THREE.Scene()

// 2. 创建相机
/**
 * @name: 
 * @test: test font
 * @msg: 
 * @return {*}
 */
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000)
// 设置相机位置
camera.position.set(0,0,10)

scene.add(camera)

// 添加物体
// 创建几何体
const cubeGemometry = new THREE.BoxGeometry(1,1,1)
// 设置材质
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00})

// 根据几何体的材质创建物体
const cube = new THREE.Mesh(cubeGemometry, cubeMaterial)
// 修改物体的位置
// cube.position.set(x ,y ,z)
// cube.position.x = xxxx
// 修改的缩放
// cube.scale.set(x, y, z)
// cube.scale.x = xxxxx
// 修改物体的旋转
// cube.rotation.set(Math.PI / 4, 0 , 0)
// cube.rotation.x = xxxxx




// 将几何体添加到场景当中
scene.add(cube)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  //增加下面两个属性，可以抗锯齿
  antialias:true,
  alpha:true
})
console.log(renderer)

// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)

// 将webgl渲染的cancas内容渲染到body中
document.body.appendChild(renderer.domElement)

// 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera)

// 创建轨道控制器
const orbitControls = new OrbitControls(camera, renderer.domElement)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// clock 跟踪对象
// 设置 时钟
const clock = new THREE.Clock()



  // 使用动画库，设置动画
  let animate = gsap.to(cube.position, {
    x : 5,  // 结束位置
    y : 5,
    z : 5,
    yoyo : true, // 往返运动
    delay: 2, // 延迟时间
    duration: 5, // 结束时间
    ease: 'power1.inOut', // 动画速率
    repeat: 2,    // 重复次数， 无限次循环就是-1
    onComplete: () =>  {
      console.log("动画完成回调函数")
    },
    onStart: () => {
      console.log("动画开始回调函数")
    }})

    // 暂停动画
    window.addEventListener("dblclick", () => {
      animate.pause()
    })

function render() {

  let T = clock.getElapsedTime()
  // 获取自oldTime设置后到当前的秒数。同时将oldTime设置为当前时间
  // oldTime 存储时钟最后一次调用start， getElapsedTime, 或者getDelta方法的时间

  // let delta = clock.getDelta()
  // console.log("获取时钟启动后的秒数", T)
  // console.log("获取两次获取时间间隔时间", delta)


  // cube.position.x += 0.01
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  // cube.rotation.z += 0.01
  

  // let t = T % 5
  // cube.position.x = t * 1

  // if(cube.position.x >= 5){
  //   cube.position.x = 0
  // }


  renderer.render(scene, camera)
  // 浏览器自带方法，当渲染下一帧的时候会自动触发
  requestAnimationFrame(render)
}

render()

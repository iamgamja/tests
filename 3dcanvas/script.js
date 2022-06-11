;(function setup() {
  const canvas = document.createElement('canvas')
  canvas.id = 'textcanvas2048'
  canvas.style.display = 'none'
  canvas.setAttribute('width', 150)
  canvas.setAttribute('heght', 150)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#f75f3b'
  ctx.fillRect(0,0,canvas.width,canvas.height)
  ctx.font = '40px "Clear Sans"'
  ctx.textAlign = 'center'
  ctx.fillStyle = 'white'
  ctx.fillText('2048', canvas.width/2, canvas.height/2)
  document.body.appendChild( canvas )
})()

const pressedKeys = {}
window.onkeyup = function(e) { pressedKeys[e.key] = false }
window.onkeydown = function(e) { pressedKeys[e.key] = true }

;(function() {
  document.onmousemove = function handleMouseMove(event) {
    var eventDoc, doc, body

    event = event || window.event // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
      eventDoc = /*(event.target && event.target.ownerDocument) ||*/ document
      doc = eventDoc.documentElement
      body = eventDoc.body

      event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0)
      event.pageY = event.clientY +
        (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
        (doc && doc.clientTop  || body && body.clientTop  || 0)
    }

    // Use event.pageX / event.pageY here
    setradWS(  -((event.pageX / document.documentElement.clientWidth) - 0.5) * 2 * 10  )
    setradAD(  ((event.pageY / document.documentElement.clientHeight) - 0.5) * 2 * 10  )

  }
})();

Math.r2d = r => r * 180 / Math.PI
Math.d2r = d => d / 180 * Math.PI

let radWS = 0
const setradWS = (a) => { radWS = Math.d2r(a) }

let radAD = 0
const setradAD = (a) => { radAD = Math.d2r(a) }

import * as THREE from 'three'
import Cube from './cube.js'

// Create Objects
const scene = new THREE.Scene()
scene.background = new THREE.Color('white')

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.z = 10

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize( window.innerWidth, window.innerHeight )
// renderer.outputEncoding = THREE.sRGBEncoding
document.body.appendChild( renderer.domElement )

// Create a Light
const AllLight = new THREE.AmbientLight( 0xffffff )
scene.add( AllLight )


const cubes = [
  [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
]

cubes[0][0][0] = new Cube( 2048, 0, 0, 0, scene )

// Set an Animation Function
function animate() {
	requestAnimationFrame( animate )

  for (let a of cubes)
    for (let b of a)
      for (let cube of b)
        if (cube) console.log()
          // cube.cube.rotation.y += 0.02

  

  camera.position.y = Math.sin(radAD)*10
  // camera.position.z = Math.cos(radWS)*10
  
  camera.position.x = Math.sin(radWS)*10
  // camera.position.z = Math.cos(radAD)*10
  camera.lookAt( 0, 0, 0 )

	renderer.render( scene, camera )
}
animate()

import * as THREE from 'three'

class Cube {
  constructor(number, x, y, z, scene) {
    this.number = number
    this.x = x
    this.y = y
    this.z = z

    const text = new THREE.CanvasTexture( document.querySelector('#textcanvas2048') )
    const geometry = new THREE.BoxGeometry( 1, 1, 1 )
    const materials = [
      new THREE.MeshStandardMaterial({ map: text }),
      new THREE.MeshStandardMaterial({ map: text }),
      new THREE.MeshStandardMaterial({ map: text }),
      new THREE.MeshStandardMaterial({ map: text }),
      new THREE.MeshStandardMaterial({ map: text }),
      new THREE.MeshStandardMaterial({ map: text }),
    ]
    this.cube = new THREE.Mesh( geometry, materials )
    this.cube.position.set( this.x, this.y, this.z )

    scene.add( this.cube )
  }

  move(x, y, z) {
    this.x = x
    this.y = y
    this.z = z

    this.cube.position.set( this.x, this.y, this.z )
  }
}

export default Cube

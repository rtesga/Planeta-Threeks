import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls"
import {Pane} from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.3/dist/tweakpane.min.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';


const pane = new Pane();

const loader = new OBJLoader();
loader.load(
	// resource URL
	'objetos/Base.obj',
	// called when resource is loaded
	function ( object ) {
		scene.add( object );

	},
)



const options = {
    planeX: 0
}
pane.addBinding(options, "planeX")

console.log(OrbitControls)
const scene = new THREE.Scene()
console.log(THREE)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(
    45, 
    sizes.width / sizes.height, 
    1, 
    1000
);


//camara
camera.position.z = 5
//camera.position.y = 5
camera.lookAt(0,0,0)
scene.add(camera)

//-------------------------------------//
//mesh
const geometry = new THREE.BoxGeometry(1,1,1)
//const material = new THREE.MeshBasicMaterial({color: 0x00ff55, wireframe: false})
const material = new THREE.MeshMatcapMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
//------------------------------------//


const planeGeometry = new THREE.PlaneGeometry(5,5);
const planeMeterial = new THREE.MeshStandardMaterial({color: 0xff0000});
const plane = new THREE.Mesh(planeGeometry,planeMeterial);

plane.position.z = -2;
scene.add(plane);
//light
const luz = new THREE.AmbientLight(0x404040,5);
scene.add(luz);

const directionaLight = new THREE.DirectionalLight(0xffffff,0.5);
scene.add(directionaLight)
/*
windows.addEventListener("resize", () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix()
})*/

//renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width,sizes.height)
renderer.setClearColor("#111")
renderer.setPixelRatio(Math.min(window.devicePixelRatio),2)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera,renderer.domElement);

const clock = new THREE.Clock()
function animated(){
    const tiempo = clock.getElapsedTime()
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    plane.position.x = options.planeX
    //cube.position.y = Math.sin(tiempo)
    requestAnimationFrame(animated)
    renderer.render(scene,camera)
    
}

animated()


window.addEventListener('dblclick', () => {
    if(!document.fullscreenElement){
        renderer.domElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }

})

console.log(scene)
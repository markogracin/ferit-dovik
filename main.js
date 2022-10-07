import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import gsap from 'gsap';

// Scena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// ambient light
const light = new THREE.AmbientLight( 0x999999 ); // soft white light
scene.add( light );

// point light
const pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
pointLight.position.set( 20, 20, 20 );
scene.add( pointLight );

// Kocka
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshStandardMaterial( { color: 0x888888 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// model
const loader = new GLTFLoader();
loader.load( '/model/scene.gltf', function ( gltf ) {
    scene.add( gltf.scene );
})

camera.position.z = 5;
// const controls = new OrbitControls( camera, renderer.domElement );

// camera movement
let cameraPosition = 2
const text1 = document.querySelector('.text-1');
const text2 = document.querySelector('.text-2');
const toggleCameraPosition = () => {

    // camera 2
    if(cameraPosition === 1) {
        gsap.to(camera.position, {
            x: 0.749543494363149,
            y: 0.904880342780265,
            z: 0.30163494824387305
        })

        gsap.to(camera.rotation, {
            x: 1.008937272974832,
            y: 0.8977812034533977,
            z: -0.8929550506047362
        })
        cameraPosition = 2;

        text1.classList.remove('show');
        text2.classList.add('show');

        return
    }

    // camera 1
    gsap.to(camera.position, {
        x: -0.020649441511226496,
        y: 1.283385554639807,
        z: 1.045621187920982
    })

    gsap.to(camera.rotation, {
        x: -0.5605847680007029,
        y: -0.8298557770678997,
        z: -0.4337651200872493
    })

    cameraPosition = 1

    text2.classList.remove('show');
    text1.classList.add('show');
}

window.addEventListener('keyup', (e) => {
    if(e.code === 'Space') {
        toggleCameraPosition()
    }
})


// Animacija
function animate() {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();

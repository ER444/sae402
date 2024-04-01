import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

// Créer une scène Three.js
let obj;
const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0xffffff); // lumière blanche
scene.add(light);


const mtlLoader = new MTLLoader();
mtlLoader.load('3D/mask.mtl', function (materials) {
    materials.preload();

    const loader = new OBJLoader();
    loader.setMaterials(materials);

    loader.load('3D/mask.obj', function (object) {
        obj = object;
        scene.add(obj);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% chargé');
    },
    // Gestion des erreurs
    function (error) {
        console.error( error);
    }
    )
})

// Créer un rendu
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const threejsContainer = document.getElementById('threejs-container');
threejsContainer.appendChild(renderer.domElement);


// Créer une caméra
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 2 ;

// Animation de rendu
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    obj.rotation.y += 0.01;
}


animate();


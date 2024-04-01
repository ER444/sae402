import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// Créer une scène Three.js
const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0xffffff); // lumière blanche
        scene.add(light);

// Créer un chargeur GLTFLoader
const loader = new GLTFLoader();

// Charger l'objet glTF
loader.load(
    '3D/mask.glb',
    function (gltf) {
        // Ajouter l'objet chargé à la scène
        scene.add(gltf.scene);
    },
    // Progression du chargement
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% chargé');
    },
    // Gestion des erreurs
    function (error) {
        console.error( error);
    }
);

// Créer un rendu
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Créer une caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Animation de rendu
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();


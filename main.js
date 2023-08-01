import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { generatePlanet } from './modules/planet.js';
import { setupGameplay } from './modules/gameplay.js';
import { setupResources } from './modules/resources.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

camera.position.z = 5;

function setupGame() {
    // Create the planet
    const terrainData = fetchTerrainData();
    const atmosphereData = fetchAtmosphereData();
    const planet = generatePlanet(terrainData, atmosphereData);
    scene.add(planet);

    // Create the resources
    const resourcesData = fetchResourcesData();
    const resources = setupResources(resourcesData, planet);
    resources.forEach(resource => scene.add(resource));

    // Setup gameplay
    const gameplay = setupGameplay(scene, planet, camera, resources);

    // Handle tool selection
    document.getElementById('tool-raise').addEventListener('click', () => {
        gameplay.changeTool('raise');
    });

    document.getElementById('tool-lower').addEventListener('click', () => {
        gameplay.changeTool('lower');
    });

    document.getElementById('tool-plant').addEventListener('click', () => {
        gameplay.changeTool('plant');
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('title-screen').style.display = 'none';
    setupGame();
});

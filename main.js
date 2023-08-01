import { setupScene, animate } from './modules/sceneSetup.js';
import { setupTerrain } from './modules/terrain.js';
import { setupAtmosphere } from './modules/atmosphere.js';
import { setupResources } from './modules/resources.js';
import { setupGameplay } from './modules/gameplay.js';

// Set up the scene, camera, renderer, and controls
const { scene, camera, renderer, controls } = setupScene();

// Add the terrain, atmosphere, and resources to the scene
const terrain = setupTerrain(scene);
setupAtmosphere(scene);
setupResources(scene, terrain);

// Set up the gameplay mechanics
setupGameplay(scene, terrain, camera);

// Start the animation loop
animate(renderer, scene, camera);

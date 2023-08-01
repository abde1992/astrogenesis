import * as THREE from 'three';

export function setupAtmosphere(scene) {
    fetch('/atmosphere-data-url')
        .then(response => response.json())
        .then(data => {
            scene.fog = new THREE.FogExp2(data.fogColor, data.fogDensity);
            const light = new THREE.AmbientLight(data.lightColor, data.lightIntensity);
            scene.add(light);
        });
}

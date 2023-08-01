import * as THREE from 'three';

export function setupTerrain(scene) {
    let terrain;

    fetch('/terrain-data-url')
        .then(response => response.json())
        .then(data => {
            const geometry = new THREE.PlaneBufferGeometry(800, 800, data.width - 1, data.height - 1);
            geometry.rotateX(- Math.PI / 2);
            const vertices = geometry.attributes.position.array;
            for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
                vertices[j + 1] = data.heightData[i] * 10;
            }
            const material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
            terrain = new THREE.Mesh(geometry, material);
            scene.add(terrain);
        });

    return terrain;
}

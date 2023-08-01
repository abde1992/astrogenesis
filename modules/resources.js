import * as THREE from 'three';

export function setupResources(scene, terrain) {
    fetch('/resource-data-url')
        .then(response => response.json())
        .then(data => {
            // Trees
            data.trees.forEach(treeData => {
                const geometry = new THREE.ConeGeometry(0.2, 0.5);
                const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 });

                const tree = new THREE.Mesh(geometry, material);
                tree.position.x = treeData.position.x;
                tree.position.y = treeData.position.y;
                tree.position.z = treeData.position.z;

                scene.add(tree);
            });

            // Vegetation
            data.vegetation.forEach(vegData => {
                const geometry = new THREE.CircleGeometry(0.1, 32);
                const material = new THREE.MeshBasicMaterial({ color: 0x32CD32 });

                const vegetation = new THREE.Mesh(geometry, material);
                vegetation.position.x = vegData.position.x;
                vegetation.position.y = vegData.position.y;
                vegetation.position.z = vegData.position.z;

                scene.add(vegetation);
            });

            // Water bodies
            data.waterBodies.forEach(waterBodyData => {
                const shape = new THREE.Shape();
                waterBodyData.points.forEach((point, index) => {
                    if (index === 0) {
                        shape.moveTo(point.x, point.z);
                    } else {
                        shape.lineTo(point.x, point.z);
                    }
                });

                const extrudeSettings = {
                    steps: 1,
                    depth: 0.1,
                    bevelEnabled: false
                };

                const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                const material = new THREE.MeshPhongMaterial({ color: 0x4682B4 });
                const waterBody = new THREE.Mesh(geometry, material);

                waterBody.rotation.x = Math.PI / 2;
                waterBody.position.y = waterBodyData.avgHeight;

                scene.add(waterBody);
            });
        });
}

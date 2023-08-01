import * as THREE from 'three';

export function setupGameplay(scene, terrain, camera) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('click', onTerrainClick, false);

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    function onTerrainClick() {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(terrain);

        if (intersects.length > 0) {
            const intersect = intersects[0];

            // Use an easing function to smoothly change the height over time
            let startHeight = intersect.face.vertexNormals[0].y;
            let endHeight = startHeight + 0.1;
            let startTime = Date.now();
            let duration = 1000; // Change will occur over 1 second

            function updateHeight() {
                let time = Date.now();
                let timeFraction = (time - startTime) / duration;

                if (timeFraction < 1) {
                    requestAnimationFrame(updateHeight);
                } else {
                    timeFraction = 1;
                }

                let height = startHeight + (endHeight - startHeight) * timeFraction;
                intersect.face.vertexNormals[0].y = height;
                intersect.face.vertexNormals[1].y = height;
                intersect.face.vertexNormals[2].y = height;

                terrain.geometry.normalsNeedUpdate = true;
                terrain.geometry.verticesNeedUpdate = true;
            }

            updateHeight();
        }
    }
}

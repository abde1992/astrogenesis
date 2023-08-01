import * as THREE from 'three';

export function setupGameplay(scene, terrain, camera, resources) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let inventory = {
        seeds: 10, // Player starts with 10 seeds
        tool: 'raise' // Default tool is the 'raise' tool
    };

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

            // Perform action based on current tool
            if (inventory.tool === 'raise' || inventory.tool === 'lower') {
                let startHeight = intersect.face.vertexNormals[0].y;
                let endHeight = inventory.tool === 'raise' ? startHeight + 0.1 : startHeight - 0.1;
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
            } else if (inventory.tool === 'plant' && inventory.seeds > 0) {
                // Use the resource placement code to add a new tree
                const geometry = new THREE.ConeGeometry(0.2, 0.5);
                const material = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
                const tree = new THREE.Mesh(geometry, material);
                tree.position.copy(intersect.point);

                scene.add(tree);
                resources.trees.push(tree);

                // Reduce the number of seeds in the inventory
                inventory.seeds--;
                updateInventory();
            }
        }
    }

    // Function to change the current tool
    function changeTool(newTool) {
        if (['raise', 'lower', 'plant'].includes(newTool)) {
            inventory.tool = newTool;
        }
    }

    // Function to add seeds to the inventory
    function addSeeds(number) {
        inventory.seeds += number;
        updateInventory();
    }

    // Function to update the inventory display
    function updateInventory() {
        document.getElementById('seeds-count').textContent = inventory.seeds;
    }

    return { changeTool, addSeeds };
}

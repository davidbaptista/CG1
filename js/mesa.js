let camera, renderer, scene;

let geometry, material, mesh;


function addCylinder(obj, x, y, z, rx, ry, rz) {
    'use strict'

    geometry = new THREE.CylinderGeometry(5, 5, 20, 64);
    material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = rx;
    mesh.rotation.y = ry;
    mesh.rotation.z = rz;
    mesh.position.set(x, y, z);

    obj.add(mesh);
}


function createPole() {
    'use strict'

    let pole = new THREE.Object3D();


    addCylinder(pole, 0, 0, 0, 0, 0, 0);
    addCylinder(pole, 0, 20, -2, Math.PI / 20 * -1, 0, 0);

    pole.position.set(0, 0, 0);

    scene.add(pole);    
}

function createScene() {
    'use strict'
    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));
    createPole();
}

function createCamera() {
    'use strict'
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.x = 35;
    camera.position.y = 35;
    camera.position.z = 35;
    camera.lookAt(scene.position);
}

function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    case 69:  //E
    case 101: //e
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    }
}

function render() {
    'use strict'
    renderer.render(scene, camera);
}

function init() {
    'use strict'
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

    render();

    window.addEventListener("keydown", onKeyDown);
}

function animate() {
    'use strict';

    render();

    requestAnimationFrame(animate);
}
let camera, renderer, scene;

let geometry, material, mesh;


function createCylinder(obj, h) {
    'use strict'

	geometry = new THREE.CylinderGeometry(0.1, 0.1, h, 64);
    material = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});
    mesh = new THREE.Mesh(geometry, material);
	
	mesh.position.set(0, 0, 0);
	obj.add(mesh);

	return mesh;
}

function translateMesh(obj, x, y, z) {
	obj.translateX(x);
	obj.translateY(y);
	obj.translateZ(z);
}

function rotateMesh(obj, x, y, z) {
	obj.rotateX(x);
	obj.rotateY(y);
	obj.rotateZ(z);
}

function createSkeletonLower() {
    'use strict'

    let skeleton = new THREE.Object3D();

	let c1 = createCylinder(skeleton, 4);
	translateMesh(c1, 0, -2, 0);

	let c2 = createCylinder(skeleton, 12);
	translateMesh(c2, 0, -4, 0);
	rotateMesh(c2, 0, 0, Math.PI / 2.5);
	translateMesh(c2, 0, -4, 0);

	

    skeleton.position.set(0, 0, 0);

    scene.add(skeleton);    
}

function createScene() {
    'use strict'
    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(150));
    createSkeletonLower();
}

function createCamera() {
    'use strict'
    camera = new THREE.OrthographicCamera(window.innerWidth / - 36, window.innerWidth / 36, window.innerHeight / 36, window.innerHeight / - 36, 1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 10;
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
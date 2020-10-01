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

function createOctahedron(obj, r) {
	'use strict'

	geometry = new THREE.OctahedronGeometry(r);
	material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0, 0, 0);
	obj.add(mesh);

	return mesh;
}

function createSphere(obj, r) {
	'use strict'

	geometry = new THREE.SphereGeometry(r, 64, 64)
	material = new THREE.MeshBasicMaterial({color: 0x06a94d, wireframe: true});
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0, 0, 0);
	obj.add(mesh);

	return mesh;
}

function createCone(obj, r) {
	'use strict'

	geometry = new THREE.ConeGeometry(r, 1.5, 64)
	material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0, 0, 0);
	obj.add(mesh);

	return mesh;
}

function createBox(obj, h) {
	'use strict'

	geometry = new THREE.BoxGeometry(h, h, h)
	material = new THREE.MeshBasicMaterial({color: 0xffa500, wireframe: true});
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

	let o1 = createOctahedron(skeleton, 1);
	translateMesh(o1, 0, -4, 0);
	rotateMesh(o1, 0, 0, Math.PI / 2.5);
	translateMesh(o1, 0, -11, 0);

	let s1 = createSphere(skeleton, 0.75);
	translateMesh(s1, 0, -4, 0);
	rotateMesh(s1, 0, 0, Math.PI / 2.5);
	translateMesh(s1, 0, 2.75, 0);

	skeleton.position.set(0, 0, 0);
		
	return skeleton;
}

function createSkeletonMiddle() {
	'use strict'

	let skeleton = new THREE.Object3D();

	let lowerSkeleton = createSkeletonLower();

	let c1 = createCylinder(skeleton, 2);
	translateMesh(c1, 0, -1, 0);

	let c2 = createCylinder(skeleton, 16);
	translateMesh(c2, 0, -2, 0);
	rotateMesh(c2, 0, 0, Math.PI / -2.5);
	translateMesh(c2, 0, -6, 0);

	let o1 = createOctahedron(skeleton, 1);
	translateMesh(o1, 0, -2, 0);
	rotateMesh(o1, 0, 0, Math.PI / -2.5);
	translateMesh(o1, 0, -15, 0);

	let s1 = createSphere(skeleton, 0.75);
	translateMesh(s1, 0, -2, 0);
	rotateMesh(s1, 0, 0, Math.PI / -2.5);
	translateMesh(s1, 0, 2.75, 0);

	skeleton.add(lowerSkeleton);
	translateMesh(lowerSkeleton, 0, -2, 0);
	rotateMesh(lowerSkeleton, 0, 0, Math.PI / -2.5);
	translateMesh(lowerSkeleton, 0, -8, 0);
	rotateMesh(lowerSkeleton, 0, 0, Math.PI / 2.5);

	skeleton.position.set(0, 0, 0);

	return skeleton;
}

function createSkeletonUpper() {
	'use strict'

	let skeleton = new THREE.Object3D();

	let middleSkeleton = createSkeletonMiddle();

	let c1 = createCylinder(skeleton, 10);
	translateMesh(c1, 0, -5, 0);

	let c2 = createCylinder(skeleton, 4);
	translateMesh(c2, 0, -5, 0);
	rotateMesh(c2, 0, 0, Math.PI / -2.5);
	translateMesh(c2, 0, 2, 0);

	let c3 = createCylinder(skeleton, 6);
	translateMesh(c3, 0, -8, 0);
	rotateMesh(c3, 0, 0, Math.PI / 2.5);
	translateMesh(c3, 0, 3, 0);

	let c4 = createCylinder(skeleton, 16);
	translateMesh(c4, 0, -10, 0);
	rotateMesh(c4, 0, 0, Math.PI / 2);

	let c5 = createCylinder(skeleton, 1);
	translateMesh(c5, -2, -10.5, 0);

	let c6 = createCylinder(skeleton, 2);
	translateMesh(c6, -4, -11, 0);

	let c7 = createCylinder(skeleton, 3);
	translateMesh(c7, -6, -11.5, 0);

	let o1 = createOctahedron(skeleton, 1);
	translateMesh(o1, 9, -10, 0);

	let o2 = createOctahedron(skeleton, 1);
	translateMesh(o2, -9, -10, 0);

	let co1 = createCone(skeleton, 0.75);
	translateMesh(co1, -2, -11.75, 0);

	let co2 = createCone(skeleton, 0.75);
	translateMesh(co2, -4, -12.75, 0);
	
	let co3 = createCone(skeleton, 0.75);
	translateMesh(co3, -6, -13.75, 0);

	let b1 = createBox(skeleton, 1.5);
	translateMesh(b1, 0, -8, 0);
	rotateMesh(b1, 0, 0, Math.PI / 2.5);
	translateMesh(b1, 0, 6.75, 0);

	let b2 = createBox(skeleton, 1.5);
	translateMesh(b2, 0, -5, 0);
	rotateMesh(b2, 0, 0, Math.PI / -2.5);
	translateMesh(b2, 0, 4.75, 0);

	skeleton.add(middleSkeleton);
	translateMesh(middleSkeleton, 5, -10, 0);


	scene.add(skeleton);

}

function createScene() {
    'use strict'
    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(150));
    createSkeletonUpper();
}

function createCamera() {
    'use strict'
    camera = new THREE.OrthographicCamera(window.innerWidth / - 60, window.innerWidth / 60, window.innerHeight / 60, window.innerHeight / - 60, 1, 1000);
    camera.position.x = 0;
    camera.position.y = -11;
    camera.position.z = 10;
    camera.lookAt(0, -10, 0);
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
	case 49: //1
		camera.position.x = 0;
		camera.position.y = -11;
		camera.position.z = 10;
		break;
	case 50: //2
		camera.position.x = 10;
		camera.position.y = -11;
		camera.position.z = 0;
		break;
	case 51: //3
		camera.position.x = 0;
		camera.position.y = 10;
		camera.position.z = 0;
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
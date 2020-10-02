let camera, renderer, scene;

let geometry, material, mesh;

let skeletonUpper, skeletonMiddle, skeletonLower;

let rotateUpper = 0, rotateMiddle = 0; rotateLower = 0; // 0 is stationary, -1 is counter clockwise 1 is clockwise

let clock = new THREE.Clock();

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

	geometry = new THREE.SphereGeometry(r, 16, 16)
	material = new THREE.MeshBasicMaterial({color: 0x06a94d, wireframe: true});
	mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(0, 0, 0);
	obj.add(mesh);

	return mesh;
}

function createCone(obj, r) {
	'use strict'

	geometry = new THREE.ConeGeometry(r, 1.5, 32)
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

	skeletonLower = createSkeletonLower();

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

	skeleton.add(skeletonLower);
	translateMesh(skeletonLower, 0, -2, 0);
	rotateMesh(skeletonLower, 0, 0, Math.PI / -2.5);
	translateMesh(skeletonLower, 0, -8, 0);
	rotateMesh(skeletonLower, 0, 0, Math.PI / 2.5);

	skeleton.position.set(0, 0, 0);

	return skeleton;
}

function createSkeletonUpper() {
	'use strict'

	let skeleton = new THREE.Object3D();

	skeletonMiddle = createSkeletonMiddle();

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

	skeleton.add(skeletonMiddle);
	translateMesh(skeletonMiddle, 5, -10, 0);

	scene.add(skeleton);

	return skeleton;	
}

function createScene() {
    'use strict'
    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(150));
    skeletonUpper = createSkeletonUpper();
}

function createCamera() {
	'use strict'
	let aspectRatio = window.innerHeight/window.innerWidth;

    camera = new THREE.OrthographicCamera(-32, 32, 32*aspectRatio, -32*aspectRatio, 1, 1000);
    camera.position.set(0, -11.5, 30);
    camera.lookAt(new THREE.Vector3(0,-11.5,0));
}

function onKeyUp(e) {
	'use strict'

	switch(e.keyCode) {
			case 81: //Q
			case 113: //q
			case 87: //W
			case 119: //w
				rotateUpper = 0;
				break;
			case 65: //A
			case 97: //a
			case 68: //D
			case 100: //d
				rotateMiddle = 0;
				break;
			case 90: //Z
			case 122: //z
			case 67: //C
			case 99: //c
				rotateLower = 0
				break;
	}
}


function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
	case 81: //Q
	case 113: //q
		rotateUpper = -1;
		break;
	case 87: //W
	case 119: //w
		rotateUpper = 1
		break;
    case 65: //A
    case 97: //a
		rotateMiddle = -1;
		break;
	case 68: //D
	case 100: //d
		rotateMiddle = 1;
		break;
	case 90: //Z
	case 122: //z
		rotateLower = -1;
		break;
	case 67: //C
	case 99: //c
		rotateLower = 1;
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
		camera.position.y = -11.5;
		camera.position.z = 30;
		camera.lookAt(new THREE.Vector3(0,-11.5,0));
		break;
	case 50: //2
		camera.position.x = 30;
		camera.position.y = -11.5;
		camera.position.z = 0;
		camera.lookAt(new THREE.Vector3(0,-11.5,0));
		break;
	case 51: //3
		camera.position.x = 0;
		camera.position.y = 10;
		camera.position.z = 0;
		camera.lookAt(new THREE.Vector3(0,-11.5,0));
		break;
	case 52: //4
		scene.traverse(function (node) {
			if (node instanceof THREE.Mesh) {
				node.material.wireframe = !node.material.wireframe;
		}
	});
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
	window.addEventListener("keyup", onKeyUp);
}

function animate() {
    'use strict';
	let speed = Math.PI;
	let delta = 0;

	delta = clock.getDelta();

	if(rotateUpper == -1) {
		console.log(delta);
		rotateMesh(skeletonUpper, 0, speed * -delta, 0);
	}
	else if(rotateUpper == 1) {
		rotateMesh(skeletonUpper, 0, speed * delta , 0);
	}

	if(rotateMiddle == -1) {
		rotateMesh(skeletonMiddle, 0, speed * -delta, 0);
	}
	else if(rotateMiddle == 1) {
		rotateMesh(skeletonMiddle, 0, speed * delta, 0);
	}

	if(rotateLower == -1) {
		rotateMesh(skeletonLower, 0, speed * -delta, 0);
	}
	else if(rotateLower == 1) {
		rotateMesh(skeletonLower, 0, speed * delta, 0);
	}

	render();

    requestAnimationFrame(animate);
}

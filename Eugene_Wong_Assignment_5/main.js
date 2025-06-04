import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const fov = 45;
  const aspect = 2;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  //bfc5ff f2b274
  const directionalLight = new THREE.DirectionalLight(0xc94f30, 6);
  directionalLight.position.set(5, 10, 2);
  directionalLight.castShadow = true;

  directionalLight.shadow.camera.left = -30;
  directionalLight.shadow.camera.right = 30;
  directionalLight.shadow.camera.top = 30;
  directionalLight.shadow.camera.bottom = -30;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 100;

  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.bias = -0.001;

  scene.add(directionalLight);
  const ambientLight = new THREE.AmbientLight(0xbfc5ff, 2.3);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x68a6ab, 25, 10); // color, intensity, distance
  pointLight.position.set(-43, 5, 12); // x, y, z
  pointLight.castShadow = true;

  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.bias = -0.005;

  scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xbfc5ff, 20, 20); 
pointLight2.position.set(-22, 5, 9);
pointLight2.castShadow = true;
pointLight2.shadow.mapSize.width = 1024;
pointLight2.shadow.mapSize.height = 1024;
pointLight2.shadow.bias = -0.005;
scene.add(pointLight2);

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2);
// scene.add(pointLightHelper2);

const pointLight3 = new THREE.PointLight(0xbfc5ff, 20, 20); 
pointLight3.position.set(-30, 4, -8);
pointLight3.castShadow = true;
pointLight3.shadow.mapSize.width = 1024;
pointLight3.shadow.mapSize.height = 1024;
pointLight3.shadow.bias = -0.005;
scene.add(pointLight3);

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3);
// scene.add(pointLightHelper3);

  const gltfLoader = new GLTFLoader();

  const modelsToLoad = [
    'tower.glb', 'wallTower.glb', 'debris1.glb', 'debris2.glb', 'debris3.glb', 'debris4.glb', 'debris5.glb', 'debris6.glb',
    'border1.glb', 'border2.glb', 'wall3.glb', 'wall2.glb', 'wall1.glb', 'wall.glb', 'wings.glb','border3.glb', 'pillar1.glb', 'pillar2.glb',
    'door.glb', 'floor2.glb', 'halfWall.glb', 'gear1.glb', 'gear2.glb', 'shaft1.glb', 'shaft2.glb', 'dargon.glb',
  ];

  let doorMesh = null;

  modelsToLoad.forEach(modelName => {
    gltfLoader.load(modelName, (gltf) => {
      const root = gltf.scene;

      root.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(root);

      if (modelName === 'door.glb') {
        doorMesh = root;
        directionalLight.target = doorMesh;
        scene.add(directionalLight.target);
      }
    });
  });

  {
    const planeSize = 40;
    const normalMap = new THREE.TextureLoader().load('normal_mapping_normal_map.png');
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;
    normalMap.repeat.set(planeSize / 10, planeSize / 10);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x270e0f,
      side: THREE.DoubleSide,
      normalMap: normalMap,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.position.z = 9;
    mesh.position.x = -13;
    mesh.rotation.x = Math.PI * -0.5;
    mesh.scale.y = 1.12;
    mesh.scale.x = 1.2;
    mesh.receiveShadow = true;
    scene.add(mesh);
  }

  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(4, 4, 4);
    const cubeMat = new THREE.MeshPhongMaterial({ color: '#696868' });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    mesh.position.x = -43;
    mesh.position.z = 11.6;
    mesh.scale.x = 0.5;
    mesh.scale.y = 0.8; 
    mesh.scale.z = 0.5;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
  }
  
  {
    const cubeSize = 4;
    const cubeGeo1 = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat1 = new THREE.MeshPhongMaterial({ color: '#696868' });
    const mesh = new THREE.Mesh(cubeGeo1, cubeMat1);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    mesh.position.x = -43;
    mesh.position.y = 1;
    mesh.position.z = 11.6;
    mesh.scale.x = .65;
    mesh.scale.y = 0.17; 
    mesh.scale.z = .65;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
  }

  {
    const cubeSize = 4;
    const cubeGeo2 = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat2 = new THREE.MeshPhongMaterial({ color: '#696868' });
    const mesh = new THREE.Mesh(cubeGeo2, cubeMat2);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    mesh.position.x = -43;
    mesh.position.y = 200;
    mesh.position.z = 11.6;
    mesh.scale.x = .65;
    mesh.scale.y = 0.17; 
    mesh.scale.z = .65;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
  }

  {
    const cubeSize = 4;
    const cubeGeo3 = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat3 = new THREE.MeshPhongMaterial({ color: '#696868' });
    const mesh = new THREE.Mesh(cubeGeo3, cubeMat3);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    mesh.position.x = -43;
    mesh.position.y = 3.7;
    mesh.position.z = 11.6;
    mesh.scale.x = .65;
    mesh.scale.y = 0.17; 
    mesh.scale.z = .65;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
  }

    const textureLoader = new THREE.TextureLoader();

    const colorTexture = textureLoader.load('360_F_797746146_R4zl4AzFciwsLT5mpFYmY51xFNf49f6i.jpg'); 

    const normalMap = textureLoader.load('download(1).png'); 

    const material = new THREE.MeshStandardMaterial({
    map: colorTexture,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(1, 1) 
    });
    
    {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        'sky.png',
        'sky.png',
        'topsky.png',
        'botsky.png',
        'sky.png',
        'sky.png',
    ]);
    scene.background = texture;
    }

    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.set(-43,6,11.7);
    scene.add(cube);

    const wheel1Geo = new THREE.CylinderGeometry(1, 1, 2, 16);
    const wheel1Mat = new THREE.MeshStandardMaterial({ color: 0x403e3e});
    const wheel1 = new THREE.Mesh(wheel1Geo, wheel1Mat);
    wheel1.castShadow = true;
    wheel1.receiveShadow = true;
    wheel1.position.set(-33.8,0.2,-6.45);
    wheel1.rotation.set(Math.PI/2,0,Math.PI/2);
    wheel1.scale.set(.4,.3,.4);
    scene.add(wheel1);

    const wheel2Geo = new THREE.CylinderGeometry(1, 1, 2, 16);
    const wheel2Mat = new THREE.MeshStandardMaterial({ color: 0x403e3e});
    const wheel2 = new THREE.Mesh(wheel2Geo, wheel2Mat);
    wheel2.castShadow = true;
    wheel2.receiveShadow = true;
    wheel2.position.set(-33.8,0.2,-11.7);
    wheel2.rotation.set(Math.PI/2,0,Math.PI/2);
    wheel2.scale.set(.4,.3,.4);
    scene.add(wheel2);

    const wheel3Geo = new THREE.CylinderGeometry(1, 1, 2, 16);
    const wheel3Mat = new THREE.MeshStandardMaterial({ color: 0x403e3e});
    const wheel3 = new THREE.Mesh(wheel3Geo, wheel3Mat);
    wheel3.castShadow = true;
    wheel3.receiveShadow = true;
    wheel3.position.set(-31.1,0.2,-11.7);
    wheel3.rotation.set(Math.PI/2,0,Math.PI/2);
    wheel3.scale.set(.4,.3,.4);
    scene.add(wheel3);

    const wheel4Geo = new THREE.CylinderGeometry(1, 1, 2, 16);
    const wheel4Mat = new THREE.MeshStandardMaterial({ color: 0x403e3e});
    const wheel4 = new THREE.Mesh(wheel4Geo, wheel4Mat);
    wheel4.castShadow = true;
    wheel4.receiveShadow = true;
    wheel4.position.set(-31.1,0.2,-6.45);
    wheel4.rotation.set(Math.PI/2,0,Math.PI/2);
    wheel4.scale.set(.4,.3,.4);
    scene.add(wheel4);

    const supportGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const supportMaterial = new THREE.MeshStandardMaterial({ color: 0x6e502d });
    const support = new THREE.Mesh(supportGeo, supportMaterial);
    support.castShadow = true;
    support.receiveShadow = true;
    support.position.set(-33.8,.45,-9);
    support.scale.set(.6,.6,3.5);
    scene.add(support);

    const support1Geo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const support1Material = new THREE.MeshStandardMaterial({ color: 0x6e502d });
    const support1 = new THREE.Mesh(support1Geo, support1Material);
    support1.castShadow = true;
    support1.receiveShadow = true;
    support1.position.set(-31,.45,-9);
    support1.scale.set(.6,.6,3.5);
    scene.add(support1);

    const support2Geo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const support2Material = new THREE.MeshStandardMaterial({ color: 0x6e502d });
    const support2 = new THREE.Mesh(support2Geo, support2Material);
    support2.castShadow = true;
    support2.receiveShadow = true;
    support2.position.set(-32.35,1.3,-10);
    support2.scale.set(2,.6,.9);
    scene.add(support2);

    const support3Geo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const support3Material = new THREE.MeshStandardMaterial({ color: 0x6e502d });
    const support3 = new THREE.Mesh(support3Geo, support3Material);
    support3.castShadow = true;
    support3.receiveShadow = true;
    support3.position.set(-32.35,1.3,-7.5);
    support3.scale.set(2,.6,.3);
    scene.add(support3);
    
    const support4Geo = new THREE.CylinderGeometry(1, 1, 2, 8);
    const support4Material = new THREE.MeshStandardMaterial({ color: 0x403e3e});
    const support4 = new THREE.Mesh(support4Geo, support4Material);
    support4.castShadow = true;
    support4.receiveShadow = true;
    support4.position.set(-32.35,1.8,-10);
    support4.rotation.set(0,0,Math.PI/2);
    support4.scale.set(.3,1.6,.3);
    scene.add(support4);

    const whickGeo = new THREE.CylinderGeometry(1, 1, 2, 8);
    const whickMaterial = new THREE.MeshStandardMaterial({ color: 0x787777});
    const whick = new THREE.Mesh(whickGeo, whickMaterial);
    whick.castShadow = true;
    whick.receiveShadow = true;
    whick.position.set(-32.35,2.7,-11.3);
    whick.rotation.set(-.5,0,0);
    whick.scale.set(.15,0.5,.15);
    scene.add(whick);

    const barrelGeo = new THREE.CylinderGeometry(1, 1, 2, 7);
    const barrelMaterial = new THREE.MeshStandardMaterial({ color: 0x141414 });
    const barrel = new THREE.Mesh(barrelGeo, barrelMaterial);
    barrel.castShadow = true;
    barrel.receiveShadow = true;
    barrel.position.set(-32.35,2,-9);
    barrel.rotation.set(Math.PI/2,0,0);
    barrel.scale.set(.7,2.5,.7);
    scene.add(barrel);

    const barrelBGeo = new THREE.SphereGeometry(1, 7, 7);
    const barrelBMaterial = new THREE.MeshStandardMaterial({ color: 0x141414 });
    const barrelB = new THREE.Mesh(barrelBGeo, barrelBMaterial);
    barrelB.castShadow = true;
    barrelB.receiveShadow = true;
    barrelB.position.set(-32.35,2.04,-11.5);
    barrelB.scale.set(.6,.6,.4);
    scene.add(barrelB);

    const barrelBBGeo = new THREE.SphereGeometry(1, 7, 7);
    const barrelBBMaterial = new THREE.MeshStandardMaterial({ color: 0x141414 });
    const barrelBB = new THREE.Mesh(barrelBBGeo, barrelBBMaterial);
    barrelBB.castShadow = true;
    barrelBB.receiveShadow = true;
    barrelBB.position.set(-32.35,2.04,-12);
    barrelBB.scale.set(.3,.3,.3);
    scene.add(barrelBB);

    const ballGeo = new THREE.SphereGeometry(1, 7, 7);
    const ballMat = new THREE.MeshStandardMaterial({ color: 0x141414 });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    ball.castShadow = true;
    ball.receiveShadow = true;
    ball.position.set(-29.5,.6,-11);
    ball.scale.set(.7,.7,.7);
    scene.add(ball);

    const ball1Geo = new THREE.SphereGeometry(1, 7, 7);
    const ball1Mat = new THREE.MeshStandardMaterial({ color: 0x141414 });
    const ball1 = new THREE.Mesh(ball1Geo, ball1Mat);
    ball1.castShadow = true;
    ball1.receiveShadow = true;
    ball1.position.set(-29.5,.6,-9.8);
    ball1.scale.set(.7,.7,.7);
    scene.add(ball1);

    const ball2Geo = new THREE.SphereGeometry(1, 7, 7);
    const ball2Mat = new THREE.MeshStandardMaterial({ color: 0x141414 });
    const ball2 = new THREE.Mesh(ball2Geo, ball2Mat);
    ball2.castShadow = true;
    ball2.receiveShadow = true;
    ball2.position.set(-28.2,.6,-9.8);
    ball2.scale.set(.7,.7,.7);
    scene.add(ball2);

    const ball3Geo = new THREE.SphereGeometry(1, 7, 7);
    const ball3Mat = new THREE.MeshStandardMaterial({ color: 0x141414 });
    const ball3 = new THREE.Mesh(ball3Geo, ball3Mat);
    ball3.castShadow = true;
    ball3.receiveShadow = true;
    ball3.position.set(-28.2,.6,-11);
    ball3.scale.set(.7,.7,.7);
    scene.add(ball3);

    const ball4Geo = new THREE.SphereGeometry(1, 7, 7);
    const ball4Mat = new THREE.MeshStandardMaterial({ color: 0x141414 });
    const ball4 = new THREE.Mesh(ball4Geo, ball4Mat);
    ball4.castShadow = true;
    ball4.receiveShadow = true;
    ball4.position.set(-28.8,1.5,-10.3);
    ball4.scale.set(.7,.7,.7);
    scene.add(ball4);

    const geometry1 = new THREE.TorusGeometry(2, 0.4, 16, 7);
    const material1 = new THREE.MeshStandardMaterial({ color: 0x141414 });
    const torus = new THREE.Mesh(geometry1, material1);
    torus.castShadow = true;
    torus.receiveShadow = true;
    torus.position.set(-32.35,2,-6)
    torus.scale.set(.35,.35,2)
    scene.add(torus);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();

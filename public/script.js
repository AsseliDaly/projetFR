// script.js

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Add a directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

// Add ambient light for softer lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

// Add a sand-textured floor
const textureLoader = new THREE.TextureLoader();
const sandTexture = textureLoader.load('./textures/sand.jpg'); // Replace with the path to your sand texture
sandTexture.wrapS = sandTexture.wrapT = THREE.RepeatWrapping; // Repeat texture
sandTexture.repeat.set(50, 50); // Scale the texture

const floorGeometry = new THREE.PlaneGeometry(500, 500); // Large floor
const floorMaterial = new THREE.MeshStandardMaterial({ map: sandTexture });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
scene.add(floor);

// Add a skybox (use a texture for the sky)
const skyTexture = textureLoader.load('./textures/sky.jpg'); // Replace with the path to your sky texture
scene.background = skyTexture;

// Load the GLTF scene
const loader = new THREE.GLTFLoader();
loader.load(
  './models/scene.gltf', // Path to the GLTF file
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1); // Adjust the scale if needed
    model.position.set(0, 0, 0); // Adjust the position if needed
    scene.add(model);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Progress
  },
  (error) => {
    console.error('An error occurred while loading the model:', error);
  }
);

// Camera position
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Movement controls using ZSQD keys
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
const speed = 0.2; // Movement speed

// Event listeners for key presses
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'z': // Move forward
      moveForward = true;
      break;
    case 's': // Move backward
      moveBackward = true;
      break;
    case 'q': // Move left
      moveLeft = true;
      break;
    case 'd': // Move right
      moveRight = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'z': // Stop moving forward
      moveForward = false;
      break;
    case 's': // Stop moving backward
      moveBackward = false;
      break;
    case 'q': // Stop moving left
      moveLeft = false;
      break;
    case 'd': // Stop moving right
      moveRight = false;
      break;
  }
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update camera position based on movement
  if (moveForward) camera.position.z -= speed;
  if (moveBackward) camera.position.z += speed;
  if (moveLeft) camera.position.x -= speed;
  if (moveRight) camera.position.x += speed;

  renderer.render(scene, camera);
}

animate();

// Adjust the scene on window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
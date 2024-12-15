// script.js

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Add a light source
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 20, 10);
scene.add(light);

// Add ambient light for softer lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

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

// Set the camera position
camera.position.z = 10;
camera.position.y = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Optional: Rotate the scene for a dynamic view
  scene.rotation.y += 0.005;

  renderer.render(scene, camera);
}

animate();

// Adjust the scene on window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
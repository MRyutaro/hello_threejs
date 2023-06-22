// Three.jsの初期設定
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

// 円の半径と分割数
const radius = 10;
const segments = 64;

// 円のジオメトリとマテリアル
const circleGeometry = new THREE.CircleGeometry(radius, segments);
const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);

// 円の位置を設定
circleMesh.position.set(0, 0, 0);

// 円の向きを設定
// 単位はrad（ラジアン）で指定
// 軸を中心として回転させる感じ
circleMesh.rotation.set(0, 0, 0);

// シーンに円を追加
scene.add(circleMesh);

// カメラの位置を設定
camera.position.z = 50;

// ウィンドウのリサイズイベントを監視
window.addEventListener('resize', onWindowResize);

// レンダラーとカメラのサイズを更新する関数
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 初回実行時にレンダラーとカメラのサイズを設定
onWindowResize();

// アニメーションループ
function animate() {
  requestAnimationFrame(animate);

  // 円を回転させる
  circleMesh.rotation.z += 0.01;

  // シーンとカメラをレンダリング
  renderer.render(scene, camera);
}

// アニメーションを開始
animate();

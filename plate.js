// シーンの作成
const scene = new THREE.Scene();

// カメラの作成
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// レンダラーの作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 平面のジオメトリを作成
// 形
const geometryWidth = 1.2;
const geometryHeight = 1.6;
const geometry = new THREE.PlaneGeometry(geometryWidth, geometryHeight);

// 平面のマテリアルを作成
// 色
const material = new THREE.MeshBasicMaterial(
    { 
        color: 0x00ff00,
        side: THREE.DoubleSide,
        transparent: true,  // 透明にするために true を設定
        opacity: 0.5  // 透明度を指定 (0.0 ～ 1.0 の範囲で設定)
    }
);

// 平面のメッシュを作成し、配置
const planeNum = 10;
// 中心の円の半径
const radius = 3;
// 間の角度
const angle = 2 * Math.PI / planeNum;

const planes = [];
for (var i = 0; i < planeNum; i++) {
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(
        radius * Math.cos(i * angle - Math.PI / 2),
        0,
        radius * Math.sin(i * angle - Math.PI / 2)
    );
    plane.rotation.set(0, - i * angle, 0);
    planes.push(plane);
    scene.add(plane);
}

// カメラの位置を設定
camera.position.z = 5;

// マウスの状態を追跡する変数
var isMouseRightPressed = false;
var previousMousePosition = { x: 0, y: 0 };

// マウスイベントのリスナーを設定
document.addEventListener('mousedown', event => {
    if (event.button === 0) {
        isMouseRightPressed = true;
        previousMousePosition.x = event.clientX;
    }
});

document.addEventListener('mousemove', event => {
    if (isMouseRightPressed) {
        const mouseDeltaX = event.clientX - previousMousePosition.x;

        planes.forEach(plane => {
            // 現在のx, z座標を取得
            const currentX = plane.position.x;
            const currentZ = plane.position.z;
            // 角速度を定義
            const omega = mouseDeltaX / radius;
            // x, z座標を更新
            plane.position.set(
                currentX * Math.cos(omega * 0.01) + currentZ * Math.sin(omega * 0.01),
                0,
                - currentX * Math.sin(omega * 0.01) + currentZ * Math.cos(omega * 0.01)
            );
            // 現在の平面の角度を取得
            const currentAngle = plane.rotation.y;
            // 平面の角度を更新
            plane.rotation.set(0, currentAngle + omega * 0.01, 0);
        });

        previousMousePosition.x = event.clientX;
    }
});

document.addEventListener('mouseup', event => {
    if (event.button === 0) {
        isMouseRightPressed = false;
    }
});

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

// アニメーションのループ
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// アニメーションを開始
animate();

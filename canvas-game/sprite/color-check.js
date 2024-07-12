/* canvas颜色点击 */

// 假设有两个物体，分别用红色和绿色表示
var object1Color = [255, 0, 0]; // 红色
var object2Color = [0, 255, 0]; // 绿色

// 绘制场景
function drawScene() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  // 绘制物体1
  ctx.fillStyle = 'rgb(' + object1Color.join(',') + ')';
  ctx.fillRect(50, 50, 100, 100);

  // 绘制物体2
  ctx.fillStyle = 'rgb(' + object2Color.join(',') + ')';
  ctx.fillRect(200, 50, 100, 100);
}

// 监听鼠标点击事件
canvas.addEventListener('click', function (event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;

  // 获取点击位置的像素颜色
  var ctx = canvas.getContext('2d');
  var pixelData = ctx.getImageData(x, y, 1, 1).data;

  // 根据像素颜色匹配物体
  if (compareColors(pixelData, object1Color)) {
    // 点击了物体1
    console.log('点击了物体1');
  } else if (compareColors(pixelData, object2Color)) {
    // 点击了物体2
    console.log('点击了物体2');
  }
});

// 比较两个颜色是否相等
function compareColors(color1, color2) {
  return color1[0] === color2[0] &&
    color1[1] === color2[1] &&
    color1[2] === color2[2];
}

// 渲染场景
drawScene();

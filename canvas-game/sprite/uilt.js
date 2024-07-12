export function checkCollision() {
  // 获取四边形和六边形的边
  const quadEdges = getEdges(quadPoints);
  const hexEdges = getEdges(hexPoints);

  // 获取四边形和六边形的法向量
  const quadNormals = getNormals(quadEdges);
  const hexNormals = getNormals(hexEdges);

  // 检查四边形和六边形的所有边是否分离
  if (isSeparating(quadPoints, hexPoints, quadNormals.concat(hexNormals))) {
    return false; // 分离，没有碰撞
  }
  // 没有找到分离轴，发生碰撞
  return true;
}

// 获取多边形的边
export function getEdges(points) {
  const edges = [];
  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    edges.push({ x: p2.x - p1.x, y: p2.y - p1.y });
  }
  return edges;
}

// 获取边的法向量
export function getNormals(edges) {
  const normals = [];
  for (const edge of edges) {
    const normal = { x: -edge.y, y: edge.x };
    normals.push(normalize(normal));
  }
  return normals;
}

// 归一化向量
export function normalize(vector) {
  const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  return { x: vector.x / magnitude, y: vector.y / magnitude };
}

// 检查两个多边形是否分离
export function isSeparating(points1, points2, axes) {
  for (const axis of axes) {
    const projection1 = project(points1, axis);
    const projection2 = project(points2, axis);
    if (!overlap(projection1, projection2)) {
      return true; // 分离，没有碰撞
    }
  }
  return false; // 没有找到分离轴，有碰撞
}

// 在给定轴上投影多边形
export function project(points, axis) {
  let min = Infinity;
  let max = -Infinity;
  for (const point of points) {
    const projection = point.x * axis.x + point.y * axis.y;
    min = Math.min(min, projection);
    max = Math.max(max, projection);
  }
  return { min, max };
}

// 检查两个投影是否重叠
export function overlap(projection1, projection2) {
  return (
    (projection1.min <= projection2.max && projection1.max >= projection2.min) ||
    (projection2.min <= projection1.max && projection2.max >= projection1.min)
  );
}

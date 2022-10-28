import RoughPolygon from "./RoughPolygon";

class RoughStar extends RoughPolygon.view {
}

class RoughStarModel extends RoughPolygon.model {
  initNodeData(data) {
    super.initNodeData(data);
    this.points = [
      [0, 36.67],
      [38.32, 36.67],
      [50, 0],
      [61.68, 36.67],
      [100, 36.67],
      [69.47, 61.22],
      [81.58, 100],
      [50, 76],
      [18.42, 100],
      [30.53, 61.22],
    ]
  }
  getDefaultAnchor(): { x: number; y: number; id: string; }[] {
    const {
      x, y, width, height, points,
    } = this;
    return points.filter((p, index) => index % 2 === 0).map(([x1, y1], idx) => ({
      x: x + x1 - width / 2,
      y: y + y1 - height / 2,
      id: `${this.id}_${idx}`,
    }));
  }
}

export default {
  type: 'rough-star',
  model: RoughStarModel,
  view: RoughStar,
}

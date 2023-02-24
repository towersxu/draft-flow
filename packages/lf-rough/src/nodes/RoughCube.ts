import { PolygonNode, PolygonNodeModel, h, PointTuple } from "@logicflow/core";
import rough from 'roughjs';
import { pathToLfElement } from "../roughUtil";

export declare module RoughCube {
  export interface model extends PolygonNodeModel {}
  export interface view extends PolygonNode {}
  export const type = 'rough-cube'
}

class RoughCubeNode extends PolygonNode {
  strokePath: string;
  fillPath: string;
  shape: h.JSX.Element;
  constructor(props) {
    super(props);
    this.shape = this.getStrokeShape(props);
  }
  /**
   * 设置边框样式
   */
  public getStrokeShape (props): h.JSX.Element {
    let paths: h.JSX.Element[] = []
    const style = props.model.getNodeStyle()
    const path= 'M 1479 347 L 1524 368.61 L 1524 425.39 L 1479 447 L 1434 425.39 L 1434 368.61 Z'
    paths = paths.concat(pathToLfElement(path, style));
    const path2 = 'M 1434 368.61 L 1479 390.21 L 1524 368.61 M 1479 390.21 L 1479 447'
    paths = paths.concat(pathToLfElement(path2, style));
    return h('g', {
      transform: `matrix(1, 0, 0, 1, -1430, -345)`,
    }, paths)
  }
  getShape(): h.JSX.Element {
    const { model } = this.props; 
    const { x, y, width, height } = model;
    const points = model.points.map(([x, y]) => ([x, y]))
    return h('g', {
      transform: `matrix(1 0 0 1 ${x - width / 2} ${y - height / 2})`,
    }, [
      h('polyline', {
        stroke: 'transparent',
        fill: 'transparent',
        points: points.map(([x, y]) => `${x},${y}`).join(' '),
      }),
      this.shape,
    ]);
  }
}

class RoughCubeModel extends PolygonNodeModel {
  getOutlineStyle () {
    const style = super.getOutlineStyle();
    style.stroke = 'none';
    if (style.hover) {
      style.hover.stroke = 'none';
    }
    return style;
  }
  initNodeData(data: any): void {
    super.initNodeData(data);
    const width = 150;
    const height = 150;
    const x = 50;
    const y = 50;
    const pointList: PointTuple[] = [
      [x, y - 0.5 * height],
      [x + 0.425 * width, y - 0.275 * height],
      [x + 0.425 * width, y],
      [x + 0.425 * width, y + 0.275 * height],
      [x, y + 0.5 * height],
      [x - 0.425 * width, y + 0.275 * height],
      [x - 0.425 * width, y],
      [x - 0.425 * width, y - 0.275 * height]
    ];
    this.points = pointList;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.strokeWidth = 3;
    style.fill = '#FFE6CC';
    style.fillStyle = 'solid'
    style.hachureAngle = 60, // 设置设置roughjs的属性
    style.hachureGap = 8
    return style;
  }
  // getDefaultAnchor(): { x: number; y: number; id: string; }[] {
  //     return []
  // }
}

export default {
  type: 'rough-cube',
  view: RoughCubeNode,
  model: RoughCubeModel,
}

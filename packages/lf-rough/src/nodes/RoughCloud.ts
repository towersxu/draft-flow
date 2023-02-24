import { PolygonNode, PolygonNodeModel, h } from "@logicflow/core";
import { NodeTextTheme } from "@logicflow/core/types/constant/DefaultTheme";
import rough from 'roughjs';
import { pathToLfElement } from "../roughUtil";

export declare module RoughCloud {
  export interface model extends PolygonNodeModel {}
  export interface view extends PolygonNode {}
  export const type = 'rough-cloud'
}

class RoughCloudNode extends PolygonNode {
  strokePath: string;
  fillPath: string;
  shape: h.JSX.Element;
  constructor(props) {
    super(props);
    this.shape = this.getStrokeShape();
  }
  /**
   * 设置边框样式
   */
  public getStrokeShape () {
    const path= 'M 1464 419 C 1440 419 1434 439 1453.2 443 C 1434 451.8 1455.6 471 1471.2 463 C 1482 479 1518 479 1530 463 C 1554 463 1554 447 1539 439 C 1554 423 1530 407 1509 415 C 1494 403 1470 403 1464 419 Z'
    const paths = pathToLfElement(path);
    return h('g', {
      transform: `matrix(1, 0, 0, 1, -1445, -390)`,
    }, paths)
  }
  getShape() {
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

class RoughCloudNodeModel extends PolygonNodeModel {
  getOutlineStyle () {
    const style = super.getOutlineStyle();
    style.stroke = 'none';
    if (style.hover) {
      style.hover.stroke = 'none';
    }
    return style;
  }
  getTextStyle(): NodeTextTheme {
    const style = super.getTextStyle();
    style.fontSize = 20;
    style.fontWeight = 'bold';
    return style;
  }
  getDefaultAnchor(): { x: number; y: number; id: string; }[] {
      return []
  }
}

export default {
  type: 'rough-cloud',
  view: RoughCloudNode,
  model: RoughCloudNodeModel,
}

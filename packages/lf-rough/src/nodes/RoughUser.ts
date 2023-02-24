import { PolygonNode, PolygonNodeModel, h } from "@logicflow/core";
import { NodeTextTheme } from "@logicflow/core/types/constant/DefaultTheme";
import rough from 'roughjs';
import { pathToLfElement } from "../roughUtil";

export declare module RoughUser {
  export interface model extends PolygonNodeModel {}
  export interface view extends PolygonNode {}
  export const type = 'rough-user'
}

class RoughUserNode extends PolygonNode {
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
    const style = props.model.getNodeStyle()
    const path = 'M 1455.5 303.77 C 1465.31 303.77 1473.23 311.67 1473.23 321.47 C 1473.23 331.28 1465.31 339.19 1455.5 339.19 C 1445.68 339.19 1437.77 331.28 1437.77 321.47 C 1437.77 311.67 1445.68 303.77 1455.5 303.77 Z M 1444.42 339.79 C 1447.67 341.76 1451.44 342.96 1455.5 342.96 C 1459.16 342.96 1462.57 341.95 1465.6 340.33 C 1466.22 340.66 1467.29 341.31 1468.36 342.56 C 1469.73 344.16 1470.94 346.43 1471.29 349.13 C 1470.98 357.37 1470.72 365.45 1467.89 372.51 C 1467.67 373.01 1467.2 373.38 1466.35 374.2 C 1465.49 375 1464.4 376.32 1464 378.28 L 1464 378.28 L 1463.99 378.29 C 1463.65 380.04 1462.83 384.51 1461.53 388.65 C 1460.89 390.73 1460.12 392.7 1459.31 394.11 C 1458.54 395.45 1457.77 396.09 1457.41 396.22 L 1452.11 396.15 C 1451.73 396.09 1451.19 395.78 1450.51 394.81 C 1449.83 393.83 1449.13 392.31 1448.51 390.51 C 1447.28 386.91 1446.31 382.23 1445.43 378.13 L 1445.43 378.12 L 1445.43 378.11 C 1444.97 375.98 1443.83 374.69 1443.03 374.05 C 1442.23 373.42 1441.97 373.38 1441.43 372.14 L 1441.43 372.14 L 1441.43 372.14 C 1438.94 366.42 1438.46 357.83 1438.21 348.8 C 1438.57 344.9 1441.62 341.76 1444.42 339.79 Z'
    const paths = pathToLfElement(path, style);
    return h('g', {
      transform: `matrix(1, 0, 0, 1, -1400, -300)`,
    }, [
      paths
    ])
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

class RoughUserNodeModel extends PolygonNodeModel {
  initNodeData(data: any): void {
    if (!data.text) {
      data.text = '';
    }
    if (typeof data.text === 'string') {
      data.text = {
        value: data.text,
        x: data.x,
        y: data.y - 60,
      };
    }
    super.initNodeData(data);
    this.text.editable = false
  }
  getOutlineStyle () {
    const style = super.getOutlineStyle();
    style.stroke = 'none';
    if (style.hover) {
      style.hover.stroke = 'none';
    }
    return style;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.strokeWidth = 3;
    style.roughness = 0.3;
    style.fillStyle = 'solid';
    // style.bowing = 3;
    style.fill = '#FFE6CC';
    return style;
  }
  getTextStyle(): NodeTextTheme {
    const style = super.getTextStyle();
    style.fontSize = 32;
    return style;
  }
  // getDefaultAnchor(): { x: number; y: number; id: string; }[] {
  //     return []
  // }
}

export default {
  type: 'rough-user',
  view: RoughUserNode,
  model: RoughUserNodeModel,
}

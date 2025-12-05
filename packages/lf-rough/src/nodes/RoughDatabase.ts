import { PolygonNode, PolygonNodeModel, h, LogicFlow } from "@logicflow/core";
import rough from 'roughjs';
import { pathToLfElement } from "../roughUtil";

type PointTuple = LogicFlow.PointTuple;

export declare module RoughDataBase {
  export interface model extends PolygonNodeModel {}
  export interface view extends PolygonNode {}
  export const type = 'rough-database'
}

class RoughDatabaseNode extends PolygonNode {
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
    return h('g', {
      transform: `matrix(1, 0, 0, 1, -1415, -330)`,
    }, [
      h('path', {
        ...style,
        d: 'M 1434 354 C 1434 345.72 1447.43 339 1464 339 C 1471.96 339 1479.59 340.58 1485.21 343.39 C 1490.84 346.21 1494 350.02 1494 354 L 1494 404 C 1494 412.28 1480.57 419 1464 419 C 1447.43 419 1434 412.28 1434 404 Z',
      }),
      h('path', {
        ...style,
        d: 'M 1494 354 C 1494 362.28 1480.57 369 1464 369 C 1447.43 369 1434 362.28 1434 354',
        fill: 'none'
      })
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

class RoughDatabaseNodeModel extends PolygonNodeModel {
  initNodeData(data: any): void {
    if (!data.text) {
      data.text = '';
    }
    if (typeof data.text === 'string') {
      data.text = {
        value: data.text,
        x: data.x,
        y: data.y - 80,
      };
    }
    super.initNodeData(data);
    const width = 120;
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
    style.strokeWidth = 4;
    style.fill = '#FFE6CC';
    return style;
  }
  getTextStyle(): LogicFlow.TextNodeTheme {
    const style = super.getTextStyle();
    style.fontSize = 32;
    return style;
  }
  // getDefaultAnchor(): { x: number; y: number; id: string; }[] {
  //     return []
  // }
}

export default {
  type: 'rough-database',
  view: RoughDatabaseNode,
  model: RoughDatabaseNodeModel,
}

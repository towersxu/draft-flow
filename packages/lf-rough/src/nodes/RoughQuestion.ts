import { PolygonNode, PolygonNodeModel, h } from "@logicflow/core";
import rough from 'roughjs';

export declare module RoughQuestion {
  export interface model extends PolygonNodeModel {}
  export interface view extends PolygonNode {}
  export const type = 'rough-question'
}

class RoughQuestionNode extends PolygonNode {
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
  public getStrokeShape (): h.JSX.Element {
    const svg =window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const rc = rough.svg(svg);
    const r = rc.path('M 1458.39 385.85 C 1436.16 377.27 1434 363.14 1453.43 353.5 C 1472.86 343.86 1507.26 342 1532.17 349.25 C 1557.08 356.49 1564 370.37 1548.01 381.01 C 1532.02 391.65 1498.58 395.42 1471.46 389.65 C 1465.35 396.8 1455.52 401.34 1444.73 402 C 1451.51 398.07 1456.35 392.35 1458.39 385.85 Z', { fill: 'none' });
    const paths: any[] = []
    if (r.childNodes.length > 0) {
      r.childNodes.forEach((item: any) => {
        paths.push(h('path', {
          d: item.getAttribute('d'),
          stroke: item.getAttribute('stroke'),
          strokeWidth: item.getAttribute('stroke-width'),
          fill: item.getAttribute('fill')
        }))
      })
    }
    return h('g', {
      transform: `matrix(1, 0, 0, 1, -1443, -320)`,
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

class RoughQuestionNodeModel extends PolygonNodeModel {
  getOutlineStyle () {
    const style = super.getOutlineStyle();
    style.stroke = 'none';
    if (style.hover) {
      style.hover.stroke = 'none';
    }
    return style;
  }
  getTextStyle() {
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
  type: 'rough-question',
  view: RoughQuestionNode,
  model: RoughQuestionNodeModel,
}

import rough from 'roughjs';
import { PolylineEdge, PolylineEdgeModel, h } from "@logicflow/core";
import { pathToLfElement } from '../roughUtil';

export declare module RoughPolyline {
  export interface model extends PolylineEdgeModel {}
  export interface view extends PolylineEdge {}
  export const type = 'rough-polyline'
}

class RoughPolylineEdge extends PolylineEdge {
  getEndArrow(): h.JSX.Element {
    const { model } = this.props;
    const {
      id,
      properties: { arrowType },
    } = model;
    const { stroke, strokeWidth } = this.getArrowStyle();
    const pathAttr = {
      stroke,
      strokeWidth,
    };
    return h("path", {
      ...pathAttr,
      d: "M -2.35 0 L -14 8 L 3 0 L -14 -8 Z",
    });
  }
  getEdge(): h.JSX.Element {
    const { model } = this.props;
    const { pointsList } = model;
    const style = model.getEdgeStyle();
    const { x, y } = pointsList[0];
    let d = `M${x} ${y}`;
    const { arrowConfig } = model;
    for (let i = 1; i < pointsList.length; i++) {
      const { x, y } = pointsList[i];
      d += `L${x} ${y}`;
    }
    console.log(arrowConfig, style)
    const elements = pathToLfElement(d, {
      ...style,
      ...arrowConfig
    });
    return h('g', {} ,elements)
  }
}

class RoughPolylineEdgeModel extends PolylineEdgeModel {
  getEdgeStyle () {
    const style = super.getEdgeStyle()
    style.strokeWidth = 3;
    // style.stroke = '#31B317'
    return style
  }
}

export default {
  type: 'rough-polyline',
  view: RoughPolylineEdge,
  model: RoughPolylineEdgeModel,
}

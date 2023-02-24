import { RectNode, RectNodeModel, h } from "@logicflow/core";
import { rectangle, patternFillPolygons } from 'roughjs/bin/renderer';
import { ResolvedOptions, OpSet } from 'roughjs/bin/core';
import { getRoughOption, roughOpsToPath } from "../roughUtil";

export declare module RoughPolygon {
  export interface model extends RectNodeModel {}
  export interface view extends RectNode {}
  export const type = 'rough-rect'
}

class RoughRectNode extends RectNode {
  getShape(): h.JSX.Element {
    const { model } = this.props; 
    const { x, y } = model;
    let { width, height } = model;
    width = width - 20;
    height = height - 12;
    const style = model.getNodeStyle();
    const roughOption = {
      stroke: '#FFC6CC',
      strokeWidth: 5,
      hachureAngle: 60,
      hachureGap: 10
    }
    const option = getRoughOption(roughOption)
    const ops = rectangle(
      x - width / 2,
      y - height / 2,
      width,
      height,
      option
    )
    const path = roughOpsToPath(ops, false)
    const PADDING = 6;
    const path2 = roughOpsToPath(patternFillPolygons([
      [
        [
          x - width / 2 + PADDING,
          y - height / 2 + PADDING
        ],
        [
          x + width / 2 - PADDING,
          y - height / 2 + PADDING
        ],
        [
          x + width / 2 - PADDING,
          y + height / 2 - PADDING
        ],
        [
          x - width / 2 + PADDING,
          y + height / 2 - PADDING
        ]
      ]
    ], option));
    return h('g', {}, [
      h('rect', {
        x: x - width / 2,
        y: y - height / 2,
        width,
        height,
        fill: 'transparent',
        stroke: 'transparent',
      }),
      h("path", {
        stroke: style.stroke,
        strokeWidth: 3,
        d: path,
      }),
      h("path", {
        ...option,
        d: path2,
      })
    ]);
  }
}

class RoughRectNodeModel extends RectNodeModel {
  initNodeData(data): void {
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
    this.width = 120;
    this.height = 80;
  }
  getTextStyle() {
    const style = super.getTextStyle();
    style.fontSize = 32;
    return style;
  }
  getOutlineStyle () {
    const style = super.getOutlineStyle();
    style.stroke = 'none';
    style.hover.stroke = 'none';
    return style;
  }
  getNodeStyle(): { [x: string]: any; width?: number; height?: number; radius?: number; fill?: string; stroke?: string; strokeWidth?: number; } {
    const style = super.getNodeStyle();
    style.strokeWidth = 3;
    return style;
  }
}

export default {
  type: 'rough-rect',
  view: RoughRectNode,
  model: RoughRectNodeModel,
}
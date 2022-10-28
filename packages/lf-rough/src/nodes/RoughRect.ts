import { RectNode, RectNodeModel, h } from "@logicflow/core";
import { rectangle, patternFillPolygons } from 'roughjs/bin/renderer';
import { ResolvedOptions, OpSet } from 'roughjs/bin/core';
import { getRoughOption, roughOpsToPath } from "../roughUtil";

class RoughRectNode extends RectNode {
  getShape() {
    const { model } = this.props; 
    const { x, y, width, height } = model;
    const style = model.getNodeStyle();
    const { roughOption = {
      stroke: style.stroke,
      strokeWidth: style.strokeWidth,
      hachureAngle: 60,
      hachureGap: 8
    }} = model.getProperties();
    const option = getRoughOption(roughOption)
    const ops = rectangle(
      x - width / 2,
      y - height / 2,
      width,
      height,
      option
    )
    const path = roughOpsToPath(ops, false)
    const PADDING = 4;
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
        strokeWidth: style.strokeWidth,
        d: path,
      }),
      h("path", {
        stroke: style.fill,
        strokeWidth: option.strokeWidth,
        d: path2,
      })
    ]);
  }
}

class RoughRectNodeModel extends RectNodeModel {
  getOutlineStyle () {
    const style = super.getOutlineStyle();
    style.stroke = 'none';
    style.hover.stroke = 'none';
    return style;
  }
}

export default {
  type: 'rough-rect',
  view: RoughRectNode,
  model: RoughRectNodeModel,
}
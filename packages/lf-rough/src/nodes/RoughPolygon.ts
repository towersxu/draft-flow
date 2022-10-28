import { PolygonNode, PolygonNodeModel, h } from "@logicflow/core";
import { polygon, patternFillPolygons } from 'roughjs/bin/renderer';
import { getRoughOption, roughOpsToPath } from "../roughUtil";

class RoughPolygonNode extends PolygonNode {
  strokePath: string;
  fillPath: string;
  private getStrokeShape () {
    const { model } = this.props; 
    const style = model.getNodeStyle();
    if (!this.strokePath) {
      const { roughOption = {
        stroke: style.stroke,
        strokeWidth: style.strokeWidth,
        hachureAngle: 60,
        hachureGap: 8
      }} = model.getProperties();
      const option = getRoughOption(roughOption)
      const points = model.points.map(([x, y]) => ([x, y]))
      const ops = polygon(
        [
          ...points
        ],
        option
      )
      const path = roughOpsToPath(ops, false)
      this.strokePath = path
    }
    return h("path", {
      stroke: style.stroke,
      strokeWidth: style.strokeWidth,
      d: this.strokePath,
    })
  }
  private getFillShape () {
    const { model } = this.props; 
    const style = model.getNodeStyle();
    const { roughOption = {
      stroke: style.stroke,
      strokeWidth: style.strokeWidth,
      hachureAngle: 60,
      hachureGap: 8
    }} = model.getProperties();
    const option = getRoughOption(roughOption)
    if (!this.fillPath) {
      const points = model.points.map(([x, y]) => ([x, y]))
      const path2 = roughOpsToPath(patternFillPolygons([
        [
          ...points
        ]
      ], option));
      this.fillPath = path2
    }
    return h("path", {
      stroke: style.fill,
      strokeWidth: option.strokeWidth,
      d: this.fillPath,
    })
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
      this.getFillShape(),
      this.getStrokeShape()
    ]);
  }
}

class RoughPolygonNodeModel extends PolygonNodeModel {
  getOutlineStyle () {
    const style = super.getOutlineStyle();
    style.stroke = 'none';
    if (style.hover) {
      style.hover.stroke = 'none';
    }
    return style;
  }
}

export default {
  type: 'rough-polygon',
  view: RoughPolygonNode,
  model: RoughPolygonNodeModel,
}
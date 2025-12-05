import rough from 'roughjs';
import { ResolvedOptions, Options, OpSet } from 'roughjs/bin/core';
import { h } from "@logicflow/core";

export const getRoughOption = (option?: Options): ResolvedOptions => {
  const defaultOption: ResolvedOptions = {
    maxRandomnessOffset: 2,
    roughness: 1,
    bowing: 0.85,
    stroke: '#000',
    strokeWidth: 1,
    curveTightness: 0,
    curveFitting: 0.95,
    curveStepCount: 9,
    fillStyle: 'hachure',
    fillWeight: 1,
    hachureAngle: -21,
    hachureGap: 5,
    dashOffset: -1,
    dashGap: -1,
    zigzagOffset: 0,
    preserveVertices: false,
    disableMultiStroke: false,
    disableMultiStrokeFill: false,
    seed: 1,
    fillShapeRoughnessGain: 0.8
  }
  return {
    ...defaultOption,
    ...option
  };
}

export const roughOpsToPath = (drawing: OpSet, joinPaths: boolean = false): string => {
  let path = '';
  for (const item of drawing.ops) {
    const data = item.data;
    switch (item.op) {
      case 'move':
        if (joinPaths && path) {
          break;
        }
        path += `M${data[0]} ${data[1]} `;
        break;
      case 'bcurveTo':
        path += `C${data[0]} ${data[1]}, ${data[2]} ${data[3]}, ${data[4]} ${data[5]} `;
        break;
      case 'lineTo':
        path += `L${data[0]} ${data[1]} `;
        break;
    }
  }
  return path.trim();
}

export const pathToLfElement = (path: string, option: Options = { fill: 'none' }): h.JSX.Element[] => {
  const svg =window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const rc = rough.svg(svg);
  const r = rc.path(path, option);
  const paths = []
  const svgAttributesMap = {
    d: 'd',
    stroke: 'stroke',
    strokeWidth: 'stroke-width',
    fill: 'fill',
    markerEnd: 'marker-end',
    markerStart: 'marker-start'
  }
  if (r.childNodes.length > 0) {
    r.childNodes.forEach((item: any) => {
      const attributes = {}
      for (const key in svgAttributesMap) {
        if (item.hasAttribute(svgAttributesMap[key])) {
          attributes[key] = item.getAttribute(svgAttributesMap[key])
        } else if (option[key]) {
          attributes[key] = option[key]
        }
      }
      paths.push(h('path', attributes))
    })
  }
  return paths
}
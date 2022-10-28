import { ResolvedOptions, Options, OpSet } from 'roughjs/bin/core';

export const getRoughOption = (option?: Options): ResolvedOptions => {
  const defaultOption = {
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
    seed: 1
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


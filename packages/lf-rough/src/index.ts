import { LogicFlow } from '@logicflow/core';
import RoughRect from './nodes/RoughRect';
import RoughPolygon from './nodes/RoughPolygon';
import RoughStar from './nodes/RoughStar';

export default class LfRough {
  static pluginName = 'LfRough'
  lf: LogicFlow;
  constructor({ lf }) {
    this.lf = lf;
    this.lf.register(RoughRect);
    this.lf.register(RoughPolygon);
    this.lf.register(RoughStar);
  }
}

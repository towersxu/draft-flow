import { LogicFlow } from '@logicflow/core';
import RoughRect from './nodes/RoughRect';
import RoughPolygon from './nodes/RoughPolygon';
import RoughStar from './nodes/RoughStar';
import RoughCloud from './nodes/RoughCloud';
import RoughQuestion from './nodes/RoughQuestion';
import RoughCube from './nodes/RoughCube';
import RoughPolyline from './edges/RoughPolyline';
import RoughUser from './nodes/RoughUser';
import RoughDatabase from './nodes/RoughDatabase';

export default class LfRough {
  static pluginName = 'LfRough'
  lf: LogicFlow;
  constructor({ lf }) {
    this.lf = lf;
    this.lf.register(RoughRect);
    this.lf.register(RoughPolygon);
    this.lf.register(RoughStar);
    this.lf.register(RoughCloud);
    this.lf.register(RoughQuestion);
    this.lf.register(RoughCube);
    this.lf.register(RoughDatabase);
    this.lf.register(RoughUser);
    this.lf.register(RoughPolyline);
    this.lf.setDefaultEdgeType(RoughPolyline.type);
  }
}

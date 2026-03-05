import { applyShapeTransform } from '../../modules/transform-utils.js';

export default class {

  static draw({ Helpers, path, skew = { Y: { phi: 0 } } }) {
    applyShapeTransform(path, Helpers, { skew });
  }

}

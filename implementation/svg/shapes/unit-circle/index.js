import { applyShapeTransform } from '../../modules/transform-utils.js';

export default class {

  static draw({ Helpers, path }) {
    const { width } = path?.getBoundingClientRect() ?? {};
    applyShapeTransform(path, Helpers, { offsetX: width / 2 });
  }

}
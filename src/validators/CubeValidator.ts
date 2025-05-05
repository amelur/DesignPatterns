import { Cube } from '../shapes/Cube';

export class CubeValidator {
  static validate(cube: Cube): boolean {
    return cube.getVolume() > 0 && cube.getArea() > 0;
  }

  static isBaseOnAxisPlane(cube: Cube): boolean {
    const originZ = cube['origin'].z;
    return originZ === 0;
  }
}

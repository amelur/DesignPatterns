import { Triangle } from '../shapes/Triangle';

export class TriangleValidator {
  static validate(triangle: Triangle): boolean {
    return triangle.isValidTriangle();
  }

  static isEquilateral(triangle: Triangle): boolean {
    return triangle.isEquilateral();
  }

  static isIsosceles(triangle: Triangle): boolean {
    return triangle.isIsosceles();
  }

  static isRightAngled(triangle: Triangle): boolean {
    return triangle.isRightAngled();
  }

  static isAcute(triangle: Triangle): boolean {
    return triangle.isAcute();
  }

  static isObtuse(triangle: Triangle): boolean {
    return triangle.isObtuse();
  }
}

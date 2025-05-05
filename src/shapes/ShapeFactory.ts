import { Triangle } from './Triangle';
import { Cube } from './Cube';

export type AnyShape = Triangle | Cube;

export class ShapeFactory {
  static createShape(type: string, data: string[]): AnyShape | null {
    switch (type.toLowerCase()) {
      case 'triangle':
        return Triangle.fromData(data);
      case 'cube':
        return Cube.fromData(data);
      default:
        return null;
    }
  }
}

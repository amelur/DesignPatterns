import { Point } from '../entities/Point';
import { ShapeError } from '../exceptions/ShapeError';

export class Cube {
  constructor(
    public readonly id: string,
    private origin: Point,
    private edge: number
  ) {
    if (edge <= 0) throw new ShapeError('Invalid cube edge');
  }

  static fromData(data: string[]): Cube {
    if (data.length < 4) throw new ShapeError('Invalid data for Cube');
    const coords = data.map(Number);
    if (coords.some(isNaN)) throw new ShapeError('Non-numeric data');
    const [x, y, z, edge] = coords;
    return new Cube('cube', new Point(x, y, z), edge);
  }

  getArea(): number {
    return 6 * this.edge ** 2;
  }

  getPerimeter(): number {
    return 12 * this.edge;
  }

  getVolume(): number {
    return this.edge ** 3;
  }

  intersectsOneAxis(): boolean {
    const { x, y, z } = this.origin;
    const crossesX = x < 0 && x + this.edge > 0;
    const crossesY = y < 0 && y + this.edge > 0;
    const crossesZ = z < 0 && z + this.edge > 0;

    const axisCrosses = [crossesX, crossesY, crossesZ].filter(Boolean).length;
    return axisCrosses === 1;
  }

  getVolumeRatiosOnPlaneCut(): [number, number] | null {
    const { x, y, z } = this.origin;
    const e = this.edge;

    if (z < 0 && z + e > 0) {
      const h1 = -z;
      const h2 = e - h1;
      return [h1 / e, h2 / e];
    }

    if (y < 0 && y + e > 0) {
      const h1 = -y;
      const h2 = e - h1;
      return [h1 / e, h2 / e];
    }

    if (x < 0 && x + e > 0) {
      const h1 = -x;
      const h2 = e - h1;
      return [h1 / e, h2 / e];
    }

    return null;
  }

  isBaseOnCoordinatePlane(): boolean {
    const { x, y, z } = this.origin;
    return x === 0 || y === 0 || z === 0;
  }
}

import { Point } from '../entities/Point';
import { ShapeError } from '../exceptions/ShapeError';

export class Triangle {
  constructor(
    public readonly id: string,
    private a: Point,
    private b: Point,
    private c: Point
  ) {}

  static fromData(data: string[]): Triangle {
    if (data.length < 6) throw new ShapeError('Invalid data for Triangle');
    const coords = data.map(Number);
    if (coords.some(isNaN)) throw new ShapeError('Non-numeric data');
    const [x1, y1, x2, y2, x3, y3] = coords;
    const triangle = new Triangle(
      'triangle',
      new Point(x1, y1),
      new Point(x2, y2),
      new Point(x3, y3)
    );
    if (!triangle.isValidTriangle()) {
      throw new ShapeError('Points are collinear (area = 0)');
    }
    return triangle;
  }

  getArea(): number {
    const { a, b, c } = this;
    return (
      0.5 * Math.abs(a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y))
    );
  }

  getPerimeter(): number {
    const { a, b, c } = this;
    const ab = Math.hypot(b.x - a.x, b.y - a.y);
    const bc = Math.hypot(c.x - b.x, c.y - b.y);
    const ca = Math.hypot(a.x - c.x, a.y - c.y);
    return ab + bc + ca;
  }

  isValidTriangle(): boolean {
    const area = this.getArea();
    return area > 0;
  }

  private getSides(): [number, number, number] {
    const { a, b, c } = this;
    const ab = Math.hypot(b.x - a.x, b.y - a.y);
    const bc = Math.hypot(c.x - b.x, c.y - b.y);
    const ca = Math.hypot(a.x - c.x, a.y - c.y);
    return [ab, bc, ca];
  }

  isEquilateral(): boolean {
    const [ab, bc, ca] = this.getSides();
    return (
      this.isValidTriangle() &&
      Math.abs(ab - bc) < 1e-6 &&
      Math.abs(bc - ca) < 1e-6
    );
  }

  isIsosceles(): boolean {
    const [ab, bc, ca] = this.getSides();
    return (
      this.isValidTriangle() &&
      (Math.abs(ab - bc) < 1e-6 ||
        Math.abs(bc - ca) < 1e-6 ||
        Math.abs(ca - ab) < 1e-6)
    );
  }

  isRightAngled(): boolean {
    const [ab, bc, ca] = this.getSides().sort((x, y) => x - y);
    return (
      this.isValidTriangle() && Math.abs(ab ** 2 + bc ** 2 - ca ** 2) < 1e-6
    );
  }

  isAcute(): boolean {
    const [ab, bc, ca] = this.getSides().sort((x, y) => x - y);
    return this.isValidTriangle() && ab ** 2 + bc ** 2 > ca ** 2;
  }

  isObtuse(): boolean {
    const [ab, bc, ca] = this.getSides().sort((x, y) => x - y);
    return this.isValidTriangle() && ab ** 2 + bc ** 2 < ca ** 2;
  }

  intersectsOneAxis(): boolean {
    const xs = [this.a.x, this.b.x, this.c.x];
    const ys = [this.a.y, this.b.y, this.c.y];

    const crossesX = xs.some((x) => x < 0) && xs.some((x) => x > 0);
    const crossesY = ys.some((y) => y < 0) && ys.some((y) => y > 0);

    return crossesX !== crossesY && (crossesX || crossesY);
  }
}

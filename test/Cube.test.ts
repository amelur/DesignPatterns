import { Cube } from '../src/shapes/Cube';
import { Point } from '../src/entities/Point';

describe('Cube', () => {
  const cube = new Cube('test-cube', new Point(0, 0, 0), 2);

  test('should calculate surface area correctly', () => {
    const area = cube.getArea();
    expect(area).toBe(24);
    expect(area).toBeGreaterThan(0);
  });

  test('should calculate volume correctly', () => {
    const volume = cube.getVolume();
    expect(volume).toBe(8);
    expect(volume).toBeGreaterThan(0);
  });

  test('should calculate perimeter correctly', () => {
    const perimeter = cube.getPerimeter();
    expect(perimeter).toBe(24);
    expect(perimeter).toBeGreaterThan(0);
  });
});

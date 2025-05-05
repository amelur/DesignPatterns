import { Triangle } from '../src/shapes/Triangle';
import { Point } from '../src/entities/Point';

describe('Triangle', () => {
  const triangle = new Triangle(
    'test-triangle',
    new Point(0, 0),
    new Point(3, 0),
    new Point(0, 4)
  );

  test('should calculate area correctly', () => {
    const area = triangle.getArea();
    expect(area).toBeCloseTo(6);
    expect(area).toBeGreaterThan(0);
  });

  test('should calculate perimeter correctly', () => {
    const perimeter = triangle.getPerimeter();
    expect(perimeter).toBeCloseTo(12);
    expect(perimeter).toBeGreaterThan(0);
  });

  test('should identify as valid triangle', () => {
    expect(triangle.isValidTriangle()).toBe(true);
  });

  test('should be right-angled triangle', () => {
    expect(triangle.isRightAngled()).toBe(true);
  });

  test('should be isosceles = false', () => {
    expect(triangle.isIsosceles()).toBe(false);
  });

  test('should be acute = false', () => {
    expect(triangle.isAcute()).toBe(false);
  });

  test('should be obtuse = false', () => {
    expect(triangle.isObtuse()).toBe(false);
  });
});

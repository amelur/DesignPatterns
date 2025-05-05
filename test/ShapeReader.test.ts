import fs from 'fs';
import path from 'path';
import { ShapeReader } from '../src/services/ShapeReader';
import { Triangle } from '../src/shapes/Triangle';
import { Cube } from '../src/shapes/Cube';

describe('ShapeReader', () => {
  const testFilePath = path.join(__dirname, '../data/test_shapes.txt');

  beforeAll(() => {
    const content = `
      triangle 0 0 3 0 0 4
      cube 1 1 1 2
      triangle 1 1 2 2 3 3
      cube 0 0 0 -2
      triangle a b c d e f
    `;
    fs.writeFileSync(testFilePath, content.trim());
  });

  afterAll(() => {
    fs.unlinkSync(testFilePath);
  });

  test('should parse valid shapes and skip invalid ones', () => {
    const shapes = ShapeReader.readShapesFromFile(testFilePath);

    expect(shapes.length).toBe(2);
    expect(shapes[0]).toBeInstanceOf(Triangle);
    expect(shapes[1]).toBeInstanceOf(Cube);
  });
});

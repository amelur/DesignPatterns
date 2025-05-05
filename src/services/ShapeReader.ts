import fs from 'fs';
import path from 'path';
import { logger } from '../logger/logger';
import { ShapeFactory, AnyShape } from '../shapes/ShapeFactory';
import { ShapeError } from '../exceptions/ShapeError';

export class ShapeReader {
  static readShapesFromDataFolder(filename: string): AnyShape[] {
    const filePath = path.join(__dirname, '../../data', filename);
    return ShapeReader.readShapesFromFile(filePath);
  }

  static readShapesFromFile(filePath: string): AnyShape[] {
    const shapes: AnyShape[] = [];
    const absPath = path.resolve(filePath);

    if (!fs.existsSync(absPath)) {
      logger.error(`File not found: ${absPath}`);
      return shapes;
    }

    const lines = fs.readFileSync(absPath, 'utf-8').split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const [type, ...data] = trimmed.split(/\s+/);

      try {
        const shape = ShapeFactory.createShape(type, data);
        if (shape) {
          shapes.push(shape);
          logger.info(`Shape created: ${type}`);
        } else {
          logger.warn(`Unknown shape type: ${type}`);
        }
      } catch (error) {
        if (error instanceof ShapeError) {
          logger.warn(`Invalid shape data: "${line}" — ${error.message}`);
        } else {
          logger.error(
            `Unexpected error while parsing: "${line}" — ${String(error)}`
          );
        }
      }
    }

    return shapes;
  }
}

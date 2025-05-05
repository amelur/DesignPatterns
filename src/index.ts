import { ShapeReader } from './services/ShapeReader';
import { Cube } from './shapes/Cube';
import { Triangle } from './shapes/Triangle';

const shapes = ShapeReader.readShapesFromDataFolder('shapes.txt');

for (const shape of shapes) {
  console.log('---------------------');
  console.log('Shape ID:', shape.id);
  if ('getArea' in shape) console.log('Area:', shape.getArea());
  if ('getPerimeter' in shape) console.log('Perimeter:', shape.getPerimeter());

  if (shape instanceof Cube) {
    console.log('Surface Area:', shape.getArea());
    console.log('Volume:', shape.getVolume());
    const ratio = shape.getVolumeRatiosOnPlaneCut();
    console.log(
      'Volume ratio on plane cut:',
      ratio ? ratio.map((r) => r.toFixed(2)) : 'Not cut'
    );
    console.log('Base on coordinate plane:', shape.isBaseOnCoordinatePlane());
  }

  if (shape instanceof Triangle) {
    console.log('Valid Triangle:', shape.isValidTriangle());
    console.log('Equilateral:', shape.isEquilateral());
    console.log('Isosceles:', shape.isIsosceles());
    console.log('Right-angled:', shape.isRightAngled());
    console.log('Acute:', shape.isAcute());
    console.log('Obtuse:', shape.isObtuse());
  }
}

export default function newShape(Shapes, setShape, dragCoordinatesRef) {
  const shapeForms = Object.keys(Shapes);
  const newRndShape = Math.floor(Math.random() * shapeForms.length);
  const shapeKey = shapeForms[newRndShape];
  setShape(Shapes[shapeKey]);
  dragCoordinatesRef.current = { x: 1, y: 9 };
}

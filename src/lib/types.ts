export type CoordPartial = number;
export type Coords = [CoordPartial, CoordPartial];
export type CellProps = { coords: Coords; cell: number; flagged: boolean; bomb: boolean };

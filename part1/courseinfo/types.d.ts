declare interface Part {
  id: number;
  name: string;
  exercises: number;
}
declare interface Course {
  id: number;
  name: string;
  parts: Array<Part>;
}

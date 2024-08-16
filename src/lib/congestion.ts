export enum CongestionLevel {
  Low,
  Moderate,
  High,
}

export interface Data {
  length: number
  data: CongestionLevel[]
}

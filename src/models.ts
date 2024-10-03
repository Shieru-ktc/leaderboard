export interface TypingMetadata {
  misses: number;
  cleared: number;
  correct: number;
  avg_kps: number;
}
export interface ShootingMetadata {}
export interface RankedRecord {
  rank: number;
  record: Record;
}
export interface Record {
  score: number;
  name: string;
  type: "TYPING" | "SHOOTING";
  id: string;
  timestamp: number;
}
export interface TypingRecord extends Record {
  metadata: TypingMetadata;
}
export interface ShootingRecord extends Record {
  metadata: ShootingMetadata;
}

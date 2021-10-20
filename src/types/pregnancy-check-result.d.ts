export interface PregnancyCheckResult {
  id: string;
  pregnancyCheckId: string;
  weight?: number;
  height?: number;
  bloodPressure?: number;
  lila?: number;
  fundusUteriHeight?: number;
  ironTabletsAmount?: number;
  hbAmount?: number;
  note?: string;
}

export interface CreatePregnancyCheckResultRequest
  extends PregnancyCheckResult {}

export interface UpdatePregnancyCheckResultRequest
  extends PregnancyCheckResult {}

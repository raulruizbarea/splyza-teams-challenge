export class Team {
  id: string;
  members: Members;
  plan: Plan;
}

export class Members {
  total: number;
  administrators: number;
  managers: number;
  editors: number;
  members: number;
  supporters: number;
}

export class Plan {
  memberLimit: number;
  supporterLimit: number;
}

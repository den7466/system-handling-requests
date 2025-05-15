export type Status = 'new' | 'work' | 'completed' | 'canceled';

export interface IHandling {
  createDate: Date;
  updateDate?: Date;
  completionDate?: Date;
  title: string;
  text?: string;
  resolution?: string;
  reasonCancellation?: string;
  status: Status;
}

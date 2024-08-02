import { Branch } from "../../../entities";

export class CreateOffScheduleDto{
  branch_id: string;
  start_time: string;
  end_time: string;
  start_date: Date;
  end_date: Date;
  loop_week: number;
}
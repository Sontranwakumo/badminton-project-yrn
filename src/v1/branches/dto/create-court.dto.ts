import { CourtStatus } from "src/commons/enums/CourtStatus.enum.js";

export class CreateCourtDto {
    name_of_court: string;
    description: string;
    status: CourtStatus;
}

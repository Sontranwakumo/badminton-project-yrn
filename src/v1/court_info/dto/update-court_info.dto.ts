import { CourtStatus } from "../../../commons/enums/CourtStatus.enum.js";

export interface UpdateCourtInfoDto {
    name?: string;
    description?: string;
    status?: CourtStatus;
}
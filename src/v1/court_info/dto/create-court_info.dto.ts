import { CourtStatus } from "../../../commons/enums/CourtStatus.enum.js";

export interface CreateCourtInfoDto {
    name: string;
    id_branch?: string;
    description: string;
    status?: CourtStatus;
}
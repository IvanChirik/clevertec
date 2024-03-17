import { TrainingName } from "@src/types/training.types";
import { DropdownProps } from "antd";


export type CalendarDropdownType = DropdownProps & {
    closeCategoryModal: () => void;
    writedTrainings: TrainingName[];
}
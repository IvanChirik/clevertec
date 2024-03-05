import { IFeedbackResponseData } from "@types/feedback.types";

export const sortedData = (data: IFeedbackResponseData[]) => {
    const clonedData = [...data]
    return clonedData.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        if (dateA < dateB) return -1;
        if (dateA < dateB) return 1;
        return 0;
    })
}
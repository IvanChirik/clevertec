import { ChangeEvent } from "react";

export type BlockContent = { name: string, approaches: number, weight: number, replays: number }
export type CalendarInputBlockType = {
    index: number;
    blockContent: BlockContent;
    handleChange: (e: ChangeEvent<HTMLInputElement>, index: number, rowType: keyof BlockContent) => void
}
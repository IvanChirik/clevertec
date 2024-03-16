

export const enum ColorOfTraining {
    Red = 'red',
    Yellow = 'yellow',
    Cyan = 'cyan',
    Green = 'green',
    Orange = 'orange',
    Magenta = 'magenta',
}
export const colorTraining = {
    [TrainingName.Legs]: ColorOfTraining.Red,
    [TrainingName.Power]: ColorOfTraining.Yellow,
    [TrainingName.Hands]: ColorOfTraining.Cyan,
    [TrainingName.Chest]: ColorOfTraining.Green,
    [TrainingName.Back]: ColorOfTraining.Orange,
    [TrainingName.Cardio]: ColorOfTraining.Magenta
}

export type ExerciseData = {
    _id?: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation?: boolean;
}

export type TrainingParameters = {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants: string[];
}
export const enum TrainingName {
    Legs = 'Ноги',
    Power = 'Силовая',
    Back = 'Спина',
    Hands = 'Руки',
    Chest = 'Грудь',
    Cardio = 'Кардио',
}
export type TrainingData = {
    _id: string;
    name: TrainingName;
    date: string;
    isImplementation?: boolean;
    userId: string;
    parameters?: TrainingParameters;
    exercises: ExerciseData[]
}

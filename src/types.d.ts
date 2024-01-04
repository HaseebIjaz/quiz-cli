export interface ICallResponse {
    response_code: number;
    results:       Result[];
}

export interface Result {
    type:              Type;
    difficulty:        Difficulty;
    category:          Category;
    question:          string;
    correct_answer:    string;
    incorrect_answers: string[];
}

export enum Category {
    GeneralKnowledge = "General Knowledge",
}

export enum Difficulty {
    Easy = "easy",
    Hard = "hard",
    Medium = "medium",
}

export enum Type {
    Boolean = "boolean",
    Multiple = "multiple",
}
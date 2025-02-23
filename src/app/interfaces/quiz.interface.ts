export interface IQuiz {
    title: string;
    questions: IQuestion[];
    results: IResults;
}

export interface IQuestion {
    id: number;
    question: string;
    options: IOption[];
}

export interface IOption {
    id: number;
    name: string;
    alias: string;
}

export interface IResults {
    A: string;
    B: string;
}

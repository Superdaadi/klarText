



export interface Sentence {
    splittedSentence: string;
    simplified: string;
    wordExpl: WordExpl[] | null;
}


export interface WordExpl {
    word: string;
    expl: string;
}



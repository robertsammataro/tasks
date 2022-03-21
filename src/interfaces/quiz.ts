import { Question } from "./question";

/***
 * A representation of a quiz for Quizzer
 */
export interface Quiz {
    /** Name of the quiz */
    name: string;

    /** Unique ID Associated with the quiz */
    id: number;

    /** Array of Questions that will be used */
    questions: Question[];

    /** Description of what the quiz is for */
    description: string;
}

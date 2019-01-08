import { Experience } from '../enums/experience.enum';
import { Availability } from '../enums/availability.enum';
import { Question } from './question.model';

export class Application {
    public id: string;
    public name: string;
    public position: string;
    public applied: string;
    public experience: Experience;
    public availability: {[day: string]: Availability};
    public questions: Question[];
    public favorite: boolean;
}
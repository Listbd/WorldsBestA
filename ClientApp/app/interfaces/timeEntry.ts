import { Project } from './project';
import { ProjectTask } from './projectTask';

export interface TimeEntry {
    ProjectRoleId: number;
    ProjectTaskId: number;
    Billable: boolean;
    TimeIn: string;
    TimeOut: string;
    Hours: number;
    Comment: string;
    SelectedTask: ProjectTask | null; // this is stupid!!!! i should be able to make it null w/o the union
    SelectedProject: Project | null;
}
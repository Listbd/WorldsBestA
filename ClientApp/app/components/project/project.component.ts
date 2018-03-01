import { Component, Inject } from '@angular/core';
import { Project } from '../../interfaces/project';
import { ProjectTask } from '../../interfaces/projectTask';
import { TimeTrackerService } from '../../timeTrackerService';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'project',
    templateUrl: './project.component.html'
})
export class ProjectComponent {

    project: Project;
    blankProjectTask: ProjectTask;

    constructor() {
        // todo
        this.project = {
            Name: '',
            ExternalSystemKey: '',
            ProjectId: 0,
            ProjectTasks: [],
            ProjectRoles: []
        }
    }
}

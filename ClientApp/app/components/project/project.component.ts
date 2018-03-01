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

    constructor(private route: ActivatedRoute) {
        // todo
        this.project = {
            Name: '',
            ExternalSystemKey: '',
            ProjectId: 0,
            ProjectTasks: [],
            ProjectRoles: []
        }
    }

    private ngOnInit() {
        this.route.params.subscribe(params => {
            let id = +params['id']; // (+) converts string 'id' to a number

            TimeTrackerService.getProject(id).then(response => {
                this.project = response.data;
                //alert(this.project.Name);

                //this.name = response.data.Name;
                //this.projectTasks = response.data.ProjectTasks;
                //debugger;
            }).catch(error => {
                debugger;
            });

        });
    }
}

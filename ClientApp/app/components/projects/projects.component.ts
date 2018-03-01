import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import axios from 'axios';
import { Project } from '../../interfaces/project';
import { TimeTrackerService } from '../../timeTrackerService';

@Component({
    selector: 'projects',
    templateUrl: './projects.component.html'
})
export class ProjectsComponent {
    public projects: Project[];
    public blankProject: Project;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {

        TimeTrackerService.getProjects().then(response => {
            this.projects = response.data;
        }).catch(error => {
            debugger;
            });

        this.initializeBlankProject();

        //http.get('https://b-timeback.azurewebsites.net/api/projects?format=json', ).subscribe(result =>
        //{
        //    this.projects = result.json() as Project[];
        //},
        //error => console.error(error));
    }

    initializeBlankProject() {
        this.blankProject = {
            Name: '',
            ExternalSystemKey: '',
            ProjectId: 0,
            ProjectTasks: [],
            ProjectRoles: []
        };
    }

    addProject() {
        console.log(this.blankProject);
        TimeTrackerService.addProject(this.blankProject).then(response => {
            let newProject = response.data;
            // it doesn't have tasks yet so give it a blank array
            newProject.ProjectTasks = [];
            this.projects.push(newProject);
            this.initializeBlankProject();
        }).catch(error => {
            // TODO - toastr or something
            console.log(error.response);
        });
    }

    deleteProject(project: Project, event: any) {
        TimeTrackerService.deleteProject(project.ProjectId).then(response => {
            // remove this one from the array
            // vue doesn't have find, so use filter
            this.projects = this.projects.filter(item => {
                if (item.ProjectId !== project.ProjectId) return item;
            });
        })
    }

    openProject(project: Project) {
        //alert(project.Name);
        //this.$router.push({ name: 'project', params: { id: `${project.ProjectId}` } });
        //this.$router.push(`project/${project.ProjectId}`);
        debugger;
    }


}

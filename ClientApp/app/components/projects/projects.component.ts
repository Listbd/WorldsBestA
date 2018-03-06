import { Component, Inject } from '@angular/core';
//import { Http } from '@angular/http';
import { Project } from '../../interfaces/project';
import { TimeTrackerService, TTService } from '../../timeTrackerService';
import { Router } from '@angular/router';

@Component({
    selector: 'projects',
    templateUrl: './projects.component.html'
})
export class ProjectsComponent {
    public projects: Project[];
    public blankProject: Project;

    constructor(/*http: Http, @Inject('BASE_URL') baseUrl: string*/
        private _router: Router, private _ttService: TTService
    ) {

        this.projects = _ttService.getProjects();
        

        //TimeTrackerService.getProjects().then(response => {
        //    this.projects = response.data;
        //}).catch(error => {
        //    debugger;
        //});

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

    async addProject() {
        console.log(this.blankProject);

        let newProject = await this._ttService.addProject(this.blankProject);
        if (newProject !== null) {
            // it doesn't have tasks yet so give it a blank array
            newProject.ProjectTasks = [];
            this.projects.push(newProject);
            this.initializeBlankProject();
        }
    }

    async deleteProject(project: Project, event: any) {
        if (await this._ttService.deleteProject(project.ProjectId)) {
            // remove this one from the array
            this.projects = this.projects.filter(item => {
                if (item.ProjectId !== project.ProjectId) return item;
            });
        }
    }

    openProject(project: Project) {
        //alert(project.Name);
        //this.$router.push({ name: 'project', params: { id: `${project.ProjectId}` } });
        //this.$router.push(`project/${project.ProjectId}`);
        this._router.navigate(['/project', project.ProjectId]);
        debugger;
    }


}

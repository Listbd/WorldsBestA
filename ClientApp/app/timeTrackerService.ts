import axios from 'axios';
import { Project } from './interfaces/project';
import { ProjectTask } from './interfaces/projectTask';
import { TimeEntry } from "./interfaces/timeEntry";
import { ProjectRole } from "./interfaces/projectRole";

// TODO - this feels like a poor man's service implementation

import { Injectable } from '@angular/core';
@Injectable()
export class TTService {
    //static url: string = 'https://b-timeback.azurewebsites.net/api/';
    static apiUrl: string = 'http://localhost:57214/api/';

    constructor() {
        // [SEED IT] if (typeof window !== 'undefined') localStorage.setItem('hackauth2', btoa(`test:test`));
    }

    async getProjects(): Promise<Project[]> {
        // I don't totally get this, but localStorage is undefined if window is undefined;
        // and window is undefined b/c there is some server side rending happening for
        // efficiency? So, I guess it will run this code on the server side at some point
        // before we actually need it on the client side?? - BDL
        if (typeof window === 'undefined') {
            console.log("window is undefined in getProjects"); // check it out, this won't show up!
            return [];
        }
        console.log('but this will');
        let url = TTService.apiUrl + 'projects';

        try {
            let response = await axios.get(url, { headers: this.getHeaders() });
            return <Project[]>response.data;
        }
        catch (error) {
            // todo - toast?
            return [];
        }
    }

    async addProject(project: Project): Promise<Project | null> {
        let url = TTService.apiUrl + "projects?format=json&callId=" + TimeTrackerService.generateGuid();
        try {
            let response = await axios.post(url, project, { headers: this.getHeaders() });
            return <Project>response.data;
        }
        catch (error) {
            // todo - toast
            return null;
        }
    }

    async deleteProject(projectId: number): Promise<boolean> {
        let url = `${TTService.apiUrl}projects/${projectId}?format=json&callId=${TimeTrackerService.generateGuid()}`;
        try {
            let response = await axios.delete(url, { headers: this.getHeaders() });
            return true;
        }
        catch (error) {
            // todo - toast
            return false;
        }
    }

    private getHeaders(): any {
        let auth = localStorage.getItem('hackauth2');
        let headers = { 'Authorization': 'Basic ' + auth };
        return headers;
    }
}


export abstract class TimeTrackerService {
    //static url: string = 'https://b-timeback.azurewebsites.net/api/';
    static apiUrl: string = 'http://localhost:57214/api/';

    static getProjects() {
        // [SEED IT] if (typeof window !== 'undefined') localStorage.setItem('hackauth2', btoa(`test:test`));
        let auth = (typeof window === 'undefined') ? null : localStorage.getItem('hackauth2');
        let headers = { 'Authorization': 'Basic ' + auth };
        let url = TimeTrackerService.apiUrl + 'projects';
        return axios.get(url, { headers: headers });
    }

    static addProject(project: Project) {
        let auth = localStorage.getItem('hackauth2');
        let headers = { 'Authorization': 'Basic ' + auth };
        let url = TimeTrackerService.apiUrl + "projects?format=json&callId=" + TimeTrackerService.generateGuid();
        return axios.post(url, project, { headers: headers });
    }

    static deleteProject(projectId: number) {
        let url = `${TimeTrackerService.apiUrl}projects/${projectId}?format=json&callId=${TimeTrackerService.generateGuid()}`;
        let auth = localStorage.getItem('hackauth2');
        let headers = { 'Authorization': 'Basic ' + auth };
        return axios.delete(url, { headers: headers });
    }

    static getProject(id: number) {
        let auth = localStorage.getItem('hackauth2');
        let headers = { 'Authorization': 'Basic ' + auth };
        let url = TimeTrackerService.apiUrl + 'projects/' + id;
        return axios.get(url, { headers: headers });
    }

    static addProjectTask(projectTask: ProjectTask) {
        let auth = localStorage.getItem('hackauth2');
        let headers = { 'Authorization': 'Basic ' + auth };
        let url = TimeTrackerService.apiUrl + "projecttasks?format=json&callId=" + TimeTrackerService.generateGuid();
        return axios.post(url, projectTask, { headers: headers });
    }

    static deleteProjectTask(projectTaskId: number) {
        let url = `${TimeTrackerService.apiUrl}projecttasks/${projectTaskId}?format=json&callId=${TimeTrackerService.generateGuid()}`;
        let auth = localStorage.getItem('hackauth2');
        let headers = { 'Authorization': 'Basic ' + auth };
        return axios.delete(url, { headers: headers });
    }

    static getTimeEntriesForDate(timeDate: string) {
        let url = `${TimeTrackerService.apiUrl}timeentries/date/${timeDate}?format=json&callId=${TimeTrackerService.generateGuid()}`;
        let auth = localStorage.getItem('hackauth2');
        let headers = { 'Authorization': 'Basic ' + auth };
        return axios.get(url, { headers: headers });
    }

    static postTimeEntry(timeEntry: TimeEntry) {
        let auth = localStorage.getItem('hackauth2');
        let headers = { 'Authorization': 'Basic ' + auth };
        let url = TimeTrackerService.apiUrl + "timeentries?format=json&callId=" + TimeTrackerService.generateGuid();
        return axios.post(url, timeEntry, { headers: headers });
    }

    static postProjectRole(role: ProjectRole) {
        let auth = localStorage.getItem('hackauth2');
        let headers = { 'Authorization': 'Basic ' + auth };
        let url = TimeTrackerService.apiUrl + "projectroles?format=json&callId=" + TimeTrackerService.generateGuid();
        return axios.post(url, role, { headers: headers });
    }

    static s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    static generateGuid() {
        return TimeTrackerService.s4() + TimeTrackerService.s4() + '-' + TimeTrackerService.s4() + '-' + TimeTrackerService.s4() + '-' +
            TimeTrackerService.s4() + '-' + TimeTrackerService.s4() + TimeTrackerService.s4() + TimeTrackerService.s4();
    }
}
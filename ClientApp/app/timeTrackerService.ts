﻿import axios from 'axios';
import { Project } from './interfaces/project';
import { ProjectTask } from './interfaces/projectTask';
import { TimeEntry } from "./interfaces/timeEntry";
import { ProjectRole } from "./interfaces/projectRole";

// TODO - this feels like a poor man's service implementation

//import { Injectable } from '@angular/core';
//@Injectable()
//export class TTService {
//    constructor() {
//
//    }
//
//    getProjects(): Project[] {
//        let projects: any = null;
//        TimeTrackerService.getProjects().then(response => {
//            projects = return response.data;
//        }).catch(error => {
//            return new Project[];
//        });
//        
//    }
//}


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
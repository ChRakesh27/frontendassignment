import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './model/task';
import { HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AppService {

  headers: HttpHeaders;
  API_HOST: string = 'http://localhost:3000/api';

  constructor(private readonly httpClient: HttpClient) {
    this.headers = new HttpHeaders({ 'content-type': 'application/json' })
  }
  createTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.API_HOST + '/tasks', task)
  }

  getTaskList(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.API_HOST + '/tasks')
  }

  getTaskById(id: string): Observable<Task> {
    return this.httpClient.get<Task>(this.API_HOST + '/tasks/' + id)
  }

  updateTaskById(task: Task): Observable<any> {
    return this.httpClient.put<Task>(this.API_HOST + '/tasks/' + task._id, task)
  }

  deleteTaskById(id: string): Observable<any> {
    return this.httpClient.delete<Task>(this.API_HOST + '/tasks/' + id)
  }
}

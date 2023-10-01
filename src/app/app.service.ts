import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './model/task';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AppService {

  API_HOST: string = 'http://localhost:3000/api';

  constructor(private readonly httpClient: HttpClient) {
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

  updateTaskById(id: string, task: Task): Observable<Task> {
    return this.httpClient.put<Task>(this.API_HOST + '/tasks/' + id, task)
  }

  deleteTaskById(id: string): Observable<any> {
    return this.httpClient.delete<Task>(this.API_HOST + '/tasks/' + id)
  }
}

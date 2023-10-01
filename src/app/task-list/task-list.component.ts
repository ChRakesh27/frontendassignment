import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Task } from '../model/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Moment from 'moment';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  moment = Moment
  taskForm: FormGroup;

  badgeStyle = {
    "Open": "text-bg-secondary",
    "Pending": "text-bg-primary",
    "OnHold": "text-bg-warning",
    "Completed": "text-bg-success"
  }

  taskList: Task[] = [];

  constructor(private readonly service: AppService) {
  }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      dueDate: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    })
    this.service.getTaskList().subscribe((data: Task[]) => {
      this.taskList = data;
    });
  }

  clear() {
    this.taskForm.reset();
  }

  createTask() {

    this.service.createTask(this.taskForm.value).subscribe((data) => {
      // this.addTask = false
      this.taskList.push(data)
      this.clear();
    })
  }

  deleteTask(task: Task) {
    this.service.deleteTaskById(task._id).subscribe(() => {
      this.taskList = this.taskList.filter((ele) => ele._id != task._id)

    })
  }

}

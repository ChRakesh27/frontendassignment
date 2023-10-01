import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Task } from '../model/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  task: Task

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
    this.clear()
    this.service.getTaskList().subscribe((data: Task[]) => {
      this.taskList = data;
    });
  }
  clear() {
    this.task = {
      title: '',
      description: '',
      dueDate: '',
      status: 'Open'
    }
  }
  createTask(task: Task) {
    this.service.createTask(task).subscribe((data) => {
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

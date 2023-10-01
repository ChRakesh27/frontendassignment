import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Task } from '../model/task';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task: Task = {
    _id: '',
    title: '',
    description: '',
    dueDate: '',
    status: ''
  }
  id: string;
  editMode: boolean = false;
  constructor(private readonly service: AppService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getTaskById(this.id).subscribe((data) => {
      this.task = data;
    })
  }
  update(task: Task) {
    this.service.updateTaskById(task).subscribe(() => {
      this.editMode = false
    })
  }
}

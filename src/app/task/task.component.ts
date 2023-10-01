import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Task } from '../model/task';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Moment from 'moment';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  moment = Moment
  task: Task;
  taskForm: FormGroup;
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
  onEdit() {
    this.taskForm = new FormGroup({
      title: new FormControl(this.task.title, Validators.required),
      description: new FormControl(this.task.description, Validators.required),
      dueDate: new FormControl(this.moment(this.task.dueDate).format('YYYY-MM-DDThh:mm'), Validators.required),
      status: new FormControl(this.task.status, Validators.required),
    })
    this.editMode = true
  }

  update() {
    this.service.updateTaskById(this.id, this.taskForm.value).subscribe((res) => {
      this.editMode = false
      this.task = res
      this.taskForm.reset();
    })
  }
}

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  newTaskName: string = ""

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  // this function checks if the arrow icon should appear to be disabled based on the stage and arrow side (back/forward)
  arrowIsDisabled = (stage, side) => {
    const disabledIn = {
      back: stage === 0,
      forward: stage === this.stagesNames.length - 1,
    };
    return disabledIn[side];
  }

  createTask = () => {
    if (!this.newTaskName) return null
    this.tasks.push({
      name: this.newTaskName,
      stage: 0,
    });
    this.newTaskName = ""
    this.configureTasksForRendering();
  }

  // Moves 'name' task to the stage on the specified 'side' (back/forward)
  moveTask = (name, side) => {
    const increment = {
      back: -1,
      forward: +1,
    };
    const index = this.tasks.findIndex(task => task.name === name);
    this.tasks[index].stage += increment[side];
    this.configureTasksForRendering();
  }

  deleteTask = (name) => {
    this.tasks = this.tasks.filter(task => task.name !== name);
    this.configureTasksForRendering();
  }
}

interface Task {
  name: string;
  stage: number;
}
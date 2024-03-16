import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})

export class LabsComponent {
  welcome = 'Welcome to Labs';
  tasks = [
    'Create a new Angular Project',
    'Create a new Component',
    'Create a new Service',
    'Create a new Module'
  ];
}

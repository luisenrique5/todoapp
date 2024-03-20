import { Component, signal } from '@angular/core';
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
  tasks = signal([
    'Create a new Angular Project',
    'Create a new Component',
    'Create a new Service',
    'Create a new Module'
  ]);

  name = signal('luisito');
  age = 21;
  disabled = true;
  img = "https://static.vecteezy.com/system/resources/previews/025/463/773/original/hacker-logo-design-a-mysterious-and-dangerous-hacker-illustration-vector.jpg"

  person = {
    name: 'Luis Enrique',
    age: 21,
    avatar: 'https://static.vecteezy.com/system/resources/previews/025/463/773/original/hacker-logo-design-a-mysterious-and-dangerous-hacker-illustration-vector.jpg'
  };

  clickHanlder() {
    alert('Hello World');
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keyupHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  
}

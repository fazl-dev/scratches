import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NotesContainerComponent } from './notes-container/notes-container.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent,NotesContainerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'notorg';
  appName = "Notes Maker...";
  
}

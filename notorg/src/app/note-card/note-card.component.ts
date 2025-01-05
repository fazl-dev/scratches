import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgIf } from '@angular/common';
import {Note, NoteAction} from '../note.types'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'note-card',
  imports: [NgIf,FormsModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {
  @Input() noteType:string = 'BUTTON';
  @Input() note!:Note
  @Input() noteIndex!:number;
  @Output() noteAction = new EventEmitter<{type:'ADD'|'EDIT'|'DELETE',data:Note,index?:number}>();
  allowEdit:boolean = false;
  sendNoteAction(action:NoteAction){
    this.noteAction.emit({
      type:action,
      index:this.noteIndex,
      data: {
        _id: action == 'EDIT' ? this.note._id :  Date.now().toString(36) + Math.random().toString(36).substring(2, 8).substring(0, 6),
        title: action == 'EDIT' ? this.note.title : "New Note_" + Date.now(),
        content: action == 'EDIT' ? this.note.content : "New note content",
        tags:[],
        createdAt: action == 'EDIT' ? this.note.createdAt : new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
        modifiedAt:  action == 'EDIT' ? new Date().toLocaleDateString('en-GB').replace(/\//g, '-') : '',
      },
    });
  }
}

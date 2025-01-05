import { Component, Input, OnInit } from '@angular/core';
import { NoteCardComponent } from '../note-card/note-card.component';
import { NgFor } from '@angular/common';
import { Note, NoteAction } from '../note.types';
import { CommonService } from '../common.service';

@Component({
  selector: 'notes-container',
  imports: [NoteCardComponent, NgFor],
  templateUrl: './notes-container.component.html',
  styleUrl: './notes-container.component.scss'
})
export class NotesContainerComponent implements OnInit {

  constructor(private commonService: CommonService) {
    this.notes = this.commonService.getNotes();
  }

  ngOnInit(): void {
    this.getNotesInSession();
    this.setNotesInSession();
    this.commonService.searchValue.subscribe((searchTerm) => {
      if (!searchTerm) {
        this.notes = this.commonService.getNotes();
      } else {
        this.notes = this.commonService.getNotes().filter(note => {

          return (note.title?.toLowerCase()).includes(searchTerm?.toLowerCase()) || (note.content?.toLowerCase()).includes(searchTerm?.toLowerCase());
        });

      }
    })

    this.commonService.uploadedFile.subscribe((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const result = JSON.parse(reader.result as string);
          this.notes = result;
          file = null;
          this.setNotesInSession();
        } catch (e) {
          console.error('Error while reading file', e);
        }
      };
      reader.readAsText(file);
    });

  }

  notes: Array<Note> = [];

  captureNoteActionAndProceed(note: { type: NoteAction, data: Note },index?: number) {
    switch (note.type) {
      case 'ADD':
        this.notes.push(note.data);
        break;
      case 'EDIT':
        this.notes[index!] = note.data;
        break;
      case 'DELETE':
        this.notes.splice(index!, 1);
        break;
    }
    this.setNotesInSession();
  }

  setNotesInSession() {
    try {
      sessionStorage.setItem('notes', (JSON.stringify(this.notes)));
    } catch (error) {
      console.error('Error while setting notes in session', error);
    }
   
  }

  getNotesInSession() {
    try {
      this.notes = JSON.parse((sessionStorage.getItem('notes') as string));
      if (!this.notes || !this?.notes.length) {
          this.notes = [];
      }
      this.commonService.setNotes(this.notes);
    } catch (error) {
      console.error('Error while getting notes from session', error);
    }
   
  }

}

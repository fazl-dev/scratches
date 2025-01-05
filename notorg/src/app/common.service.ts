import { Injectable } from '@angular/core';
import { Note } from './note.types';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private notes: Note[] = [];

  getNotes(): Note[] {
    return this.notes;
  }

  setNotes(notes: Note[]): void {
    this.notes = notes;
  }

  searchValue = new BehaviorSubject<string>('');
  uploadedFile = new Subject<any>();

  downloadFile(data: string, type: string, title: string) {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = title; // Specify the file name
    a.click();
    URL.revokeObjectURL(url); // Cleanup
  }

  getUploadedFile() {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const result = JSON.parse(reader.result as string);
          this.setNotes(result);
         return {data:result,status:true};
        } catch (e) {
          return {data:null,status:false};
        }
      };
  }

}

import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { Note } from '../note.types';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'notorg-header',
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
searchTerm:string = '';


  constructor(private commonService: CommonService) {
  
   }
  downloadNotes() {
    if (!this.notes.length) {
      return;
    }
    this.commonService.downloadFile(JSON.stringify(this.notes), 'application/json', 'Note_maker_' + Date.now() + '.json');
  }
  uploadNotes(event:Event):void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type !== 'application/json') {
        return alert('Invalid file type');
      }
      this.commonService.uploadedFile.next(file);
    }
  }
  searchNotes() {
    this.searchTerm = this.searchTerm.trim();
    this.commonService.searchValue.next(this.searchTerm);
  }

  ngOnDestroy() {
    this.commonService.searchValue.complete();
  }

  get notes() {
    return this.commonService.getNotes()
  }

  clearFile(uploadedFile:any): void {
    uploadedFile.value = null; // Clear the file input
  }
}

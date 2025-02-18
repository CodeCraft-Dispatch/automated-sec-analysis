import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileCaptureComponent } from './file-capture.component';

@Component({
  imports: [CommonModule, FileCaptureComponent],
  selector: 'app-fa_portal_file_capture-entry',
  template: `<app-file-capture-root></app-file-capture-root>`,
})
export class RemoteEntryComponent { }

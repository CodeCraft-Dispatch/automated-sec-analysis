import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileCaptureTimingComponent } from './domain/file-capture-timing.component';

@Component({
  selector: 'app-file-capture-root',
  imports: [CommonModule, FileCaptureTimingComponent],
  template: `
    <div class="wrapper">
      <div class="container">
        <!--  WELCOME  -->
        <div id="welcome">
          <h1>Welcome File Capture</h1>
        </div>
        <!--  FILE CAPTURE TIMING  -->
        <div class="file-capture-timing">
          <domain-file-capture-timing></domain-file-capture-timing>
        </div>
      </div>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class FileCaptureComponent { }

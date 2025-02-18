import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'domain-file-capture-timing',
    imports: [CommonModule],
    template: `
    <div class="wrapper">
      <span data-test="target-file-capture-timing">Every Saturday at 5 am. CST</span>
    </div>
  `,
    styles: [],
    encapsulation: ViewEncapsulation.None,
})
export class FileCaptureTimingComponent { }

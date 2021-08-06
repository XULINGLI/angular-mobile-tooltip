import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('tooltipContainer', { read: ElementRef }) container: ElementRef;
  @ViewChild('content', { read: ElementRef }) tooltip: ElementRef;

  public showTooltips = false;

  private mouseMoveListener: Subscription;

  constructor() {}

  ngOnInit(): void {}

  showTooltipContent(event: MouseEvent): void {
    this.showTooltips = true;

    this.mouseMoveListener = fromEvent(document, 'mousemove').subscribe(
      (e: MouseEvent) => this.getTooltipPosition(e)
    );
  }

  hideTooltipContent(): void {
    this.showTooltips = false;
    this.mouseMoveListener.unsubscribe();
  }

  getTooltipPosition(event: MouseEvent): void {
    if (!this.showTooltips) {
      return;
    }
    console.log(this.container.nativeElement.offsetHeight);
  }
}

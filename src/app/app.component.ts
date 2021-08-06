import {
  Component,
  ElementRef,
  Renderer2,
  VERSION,
  ViewChild
} from '@angular/core';
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

  constructor(private renderer: Renderer2) {}

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
    const tooltipLeft =
      event.clientX -
      this.container.nativeElement.getBoundingClientRect().left -
      40;
    const tooltipTop =
      event.clientY -
      this.container.nativeElement.getBoundingClientRect().top -
      this.tooltip.nativeElement.offsetHeight -
      12;
    const tooltipEle = document.getElementsByClassName('tooltip');
    this.renderer.setStyle(tooltipEle[0], 'top', `${tooltipTop}px`);
    this.renderer.setStyle(tooltipEle[0], 'left', `${tooltipLeft}px`);
  }
}

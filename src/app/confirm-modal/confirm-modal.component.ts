import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent {
  showModal = false;
  @Input() message: string = 'Are you sure?';

  @Output() confirm = new EventEmitter<boolean>();

  public open(): void {
    console.log('Opening modal');
    this.showModal = true;
  }

  close() {
    this.showModal = false;
  }

  onConfirm() {
    this.confirm.emit(true);
    this.close();
  }

  onCancel() {
    this.confirm.emit(false);
    this.close();
  }
}

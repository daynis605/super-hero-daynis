import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-delete',
  templateUrl: './confirmation-delete.component.html',
  styleUrls: ['./confirmation-delete.component.scss'],
})
export class ConfirmationDeleteComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDeleteComponent>) {}
}

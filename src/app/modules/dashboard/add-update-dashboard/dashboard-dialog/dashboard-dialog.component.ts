import { Component, inject, OnInit } from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import {
  Dashboard,
  DashboardProps,
  DashboardType,
} from '../../../../shared/models/dashboard.model'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'

@Component({
  selector: 'poc-dashboard-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDividerModule,
  ],
  templateUrl: './dashboard-dialog.component.html',
  styleUrl: './dashboard-dialog.component.scss',
})
export class DashboardDialogComponent implements OnInit {
  titleDialog = 'Adicionar nova Pasta'
  DashboardType = DashboardType
  editMode = false

  readonly data = inject<Dashboard & { editMode: boolean }>(MAT_DIALOG_DATA)
  readonly dialogRef = inject(MatDialogRef<DashboardDialogComponent>)

  form: FormGroup = new FormGroup({})

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.editMode = this.data.editMode ?? false

    this.titleDialog =
      this.data.type === DashboardType.FOLDER
        ? this.editMode
          ? 'Atualizar Pasta'
          : 'Adicionar nova Pasta'
        : this.editMode
          ? 'Atualizar Dashboard'
          : 'Adicionar novo Dashboard'

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      alias: ['', [Validators.required]],
      folderParentId: [''],
      embeddedLink: [''],
      type: [DashboardType.FOLDER],
    })
    this.form.reset()

    if (this.editMode) {
      this.form.get('name')?.setValue(this.data.name)
      this.form.get('alias')?.setValue(this.data.alias)
    }

    this.form.get('type')?.setValue(this.data.type)
    this.form.get('folderParentId')?.setValue(this.data.folderParentId)

    if (this.data.type === DashboardType.ITEM) {
      this.form.get('embeddedLink')?.setValidators(Validators.required)
    } else {
      this.form.get('embeddedLink')?.setValidators(null)
    }
  }

  cancelarAcao() {
    this.dialogRef.close()
  }

  incluirAcao() {
    if (!this.form.valid) {
      this.form.markAllAsTouched()
      return
    }

    this.dialogRef.close({ ...this.form.getRawValue() } as DashboardProps)
  }
}

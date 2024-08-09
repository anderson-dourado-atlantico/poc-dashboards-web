import { Component, inject, model, OnInit } from '@angular/core'
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

  modelData: DashboardProps = {
    name: '',
    alias: '',
    folderParentId: '',
    type: DashboardType.FOLDER,
  }

  readonly data = inject<Dashboard>(MAT_DIALOG_DATA)
  readonly dialogRef = inject(MatDialogRef<DashboardDialogComponent>)

  readonly name = model(this.modelData.name)
  readonly alias = model(this.modelData.alias)

  form: FormGroup = new FormGroup({})

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.titleDialog =
      this.data.type === DashboardType.FOLDER
        ? 'Adicionar nova Pasta'
        : 'Adicionar novo Dashboard'

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      alias: ['', [Validators.required]],
      folderParentId: [''],
      embeddedLink: [''],
      type: [DashboardType.FOLDER],
    })
    this.form.reset()

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

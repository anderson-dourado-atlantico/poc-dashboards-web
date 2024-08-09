import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDashboardComponent } from './add-update-dashboard.component';

describe('AddUpdateDashboardComponent', () => {
  let component: AddUpdateDashboardComponent;
  let fixture: ComponentFixture<AddUpdateDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUsersFormComponent } from './manager-users-form.component';

describe('ManagerUsersFormComponent', () => {
  let component: ManagerUsersFormComponent;
  let fixture: ComponentFixture<ManagerUsersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerUsersFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerUsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

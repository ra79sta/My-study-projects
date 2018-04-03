import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRightComponent } from './task-right.component';

describe('TaskRightComponent', () => {
  let component: TaskRightComponent;
  let fixture: ComponentFixture<TaskRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

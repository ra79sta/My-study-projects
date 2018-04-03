import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskLeftComponent } from './task-left.component';

describe('TaskLeftComponent', () => {
  let component: TaskLeftComponent;
  let fixture: ComponentFixture<TaskLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTestFormComponent } from './start-test-form.component';

describe('StartTestFormComponent', () => {
  let component: StartTestFormComponent;
  let fixture: ComponentFixture<StartTestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartTestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

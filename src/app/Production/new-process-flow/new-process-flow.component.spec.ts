import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProcessFlowComponent } from './new-process-flow.component';

describe('NewProcessFlowComponent', () => {
  let component: NewProcessFlowComponent;
  let fixture: ComponentFixture<NewProcessFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProcessFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProcessFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

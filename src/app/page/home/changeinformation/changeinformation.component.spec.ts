import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeinformationComponent } from './changeinformation.component';

describe('ChangeinformationComponent', () => {
  let component: ChangeinformationComponent;
  let fixture: ComponentFixture<ChangeinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeinformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

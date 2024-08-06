import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationaccountComponent } from './informationaccount.component';

describe('InformationaccountComponent', () => {
  let component: InformationaccountComponent;
  let fixture: ComponentFixture<InformationaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationaccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

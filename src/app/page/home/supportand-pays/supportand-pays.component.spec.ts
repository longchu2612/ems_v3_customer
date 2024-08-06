import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportandPaysComponent } from './supportand-pays.component';

describe('SupportandPaysComponent', () => {
  let component: SupportandPaysComponent;
  let fixture: ComponentFixture<SupportandPaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportandPaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportandPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

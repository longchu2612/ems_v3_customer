import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationorderComponent } from './notificationorder.component';

describe('NotificationorderComponent', () => {
  let component: NotificationorderComponent;
  let fixture: ComponentFixture<NotificationorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

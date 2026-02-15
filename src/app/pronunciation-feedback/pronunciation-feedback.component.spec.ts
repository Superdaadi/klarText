import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PronunciationFeedbackComponent } from './pronunciation-feedback.component';

describe('PronunciationFeedbackComponent', () => {
  let component: PronunciationFeedbackComponent;
  let fixture: ComponentFixture<PronunciationFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PronunciationFeedbackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PronunciationFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

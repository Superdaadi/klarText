import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplifyAiComponent } from './simplify-ai.component';

describe('SimplifyAiComponent', () => {
  let component: SimplifyAiComponent;
  let fixture: ComponentFixture<SimplifyAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimplifyAiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimplifyAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

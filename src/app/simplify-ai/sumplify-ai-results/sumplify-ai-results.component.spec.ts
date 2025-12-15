import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumplifyAiResultsComponent } from './sumplify-ai-results.component';

describe('SumplifyAiResultsComponent', () => {
  let component: SumplifyAiResultsComponent;
  let fixture: ComponentFixture<SumplifyAiResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumplifyAiResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumplifyAiResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

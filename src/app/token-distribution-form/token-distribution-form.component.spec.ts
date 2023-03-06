import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenDistributionFormComponent } from './token-distribution-form.component';

describe('TokenDistributionFormComponent', () => {
  let component: TokenDistributionFormComponent;
  let fixture: ComponentFixture<TokenDistributionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenDistributionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenDistributionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

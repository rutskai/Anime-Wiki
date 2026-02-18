import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormPage } from './register-form-page';

describe('RegisterFormPage', () => {
  let component: RegisterFormPage;
  let fixture: ComponentFixture<RegisterFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

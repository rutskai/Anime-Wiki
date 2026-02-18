import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnime } from './form-anime';

describe('FormAnime', () => {
  let component: FormAnime;
  let fixture: ComponentFixture<FormAnime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAnime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAnime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

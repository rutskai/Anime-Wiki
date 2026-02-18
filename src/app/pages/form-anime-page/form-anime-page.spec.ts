import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnimePage } from './form-anime-page';

describe('FormAnimePage', () => {
  let component: FormAnimePage;
  let fixture: ComponentFixture<FormAnimePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAnimePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAnimePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

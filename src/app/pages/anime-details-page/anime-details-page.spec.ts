import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeDetailsPage } from './anime-details-page';

describe('AnimeDetailsPage', () => {
  let component: AnimeDetailsPage;
  let fixture: ComponentFixture<AnimeDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

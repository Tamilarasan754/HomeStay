import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSlideComponent } from './home-page-slide.component';

describe('HomePageSlideComponent', () => {
  let component: HomePageSlideComponent;
  let fixture: ComponentFixture<HomePageSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

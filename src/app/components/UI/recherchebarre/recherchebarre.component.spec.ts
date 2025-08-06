import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecherchebarreComponent } from './recherchebarre.component';

describe('RecherchebarreComponent', () => {
  let component: RecherchebarreComponent;
  let fixture: ComponentFixture<RecherchebarreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecherchebarreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecherchebarreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShppingCartComponent } from './shopping-cart.component';

describe('ShppingCartComponent', () => {
  let component: ShppingCartComponent;
  let fixture: ComponentFixture<ShppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShppingCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

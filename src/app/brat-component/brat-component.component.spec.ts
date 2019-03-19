import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BratComponentComponent } from './brat-component.component';

describe('BratComponentComponent', () => {
  let component: BratComponentComponent;
  let fixture: ComponentFixture<BratComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BratComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BratComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaList } from './sla-list';

describe('SlaList', () => {
  let component: SlaList;
  let fixture: ComponentFixture<SlaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlaList],
    }).compileComponents();

    fixture = TestBed.createComponent(SlaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

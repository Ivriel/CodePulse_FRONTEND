import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpostAdd } from './blogpost-add';

describe('BlogpostAdd', () => {
  let component: BlogpostAdd;
  let fixture: ComponentFixture<BlogpostAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogpostAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogpostAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

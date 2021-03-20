import { TestBed } from '@angular/core/testing';

import { KeyboardGeneratorService } from './keyboard-generator.service';

describe('KeyboardGeneratorService', () => {
  let service: KeyboardGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

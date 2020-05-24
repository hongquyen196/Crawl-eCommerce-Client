import { TestBed } from '@angular/core/testing';

import { SendoService } from './sendo.service';

describe('SendoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendoService = TestBed.get(SendoService);
    expect(service).toBeTruthy();
  });
});

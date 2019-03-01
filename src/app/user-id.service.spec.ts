import { TestBed } from '@angular/core/testing';

import { UserIdService } from './user-id.service';

describe('UserIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserIdService = TestBed.get(UserIdService);
    expect(service).toBeTruthy();
  });
});

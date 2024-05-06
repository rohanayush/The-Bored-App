import { TestBed } from '@angular/core/testing';

import { FetchActivitiesService } from './fetch-activities.service';

describe('FetchActivitiesService', () => {
  let service: FetchActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import * as fromRegistration from './registration.reducer';
import { selectRegistrationState } from './registration.selectors';

describe('Registration Selectors', () => {
  it('should select the feature state', () => {
    const result = selectRegistrationState({
      [fromRegistration.registrationFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});

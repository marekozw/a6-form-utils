import { FormUtilsModule } from './form-utils.module';

describe('FormUtilsModule', () => {
  let formUtilsModule: FormUtilsModule;

  beforeEach(() => {
    formUtilsModule = new FormUtilsModule();
  });

  it('should create an instance', () => {
    expect(formUtilsModule).toBeTruthy();
  });
});

import { fileCaptureDsl } from '../support/dsl/domain/file-capture/dsl';

describe('fa_portal_file_capture-e2e', () => {
  const dsl = fileCaptureDsl;

  it('should provide target file capture timing', () => {
    dsl.given().targetFileCaptureTimingIsDefined();
    dsl.when().accessesFileCapture();
    dsl.then().targetFileCaptureTimingIsProvided();
  });
});

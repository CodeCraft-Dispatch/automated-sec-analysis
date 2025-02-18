import { fileCaptureDsl } from '../support/dsl/domain/file-capture/dsl';

describe('File Capture Landing', () => {
  const dsl = fileCaptureDsl;

  it('should provide target file capture timing', () => {
    dsl.given().targetFileCaptureTimingIsDefined();
    dsl.when().accessesFileCapture();
    dsl.then().targetFileCaptureTimingIsProvided();
  });

  it('should display file capture header', () => {
    dsl.given().fileCaptureHeaderIsDefined();
    dsl.when().accessesFileCapture();
    dsl.then().fileCaptureHeaderIsProvided();
  });
});

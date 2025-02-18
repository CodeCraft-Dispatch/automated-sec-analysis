
export const navigateToFileCapture = () => {
    cy.log('Navigate to default File Capture page.');
    cy.visit('/');
}

export const getTargetFileCaptureTiming = () => {
    cy.log('Get the Target File Capture Timing.');
    return cy.get('[data-test="target-file-capture-timing"]');
}
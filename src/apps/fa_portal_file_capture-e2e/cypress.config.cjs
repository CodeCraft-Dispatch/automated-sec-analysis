const { nxE2EPreset } = require('@nx/cypress/plugins/cypress-preset');
const { defineConfig } = require('cypress');

//export default defineConfig({
module.exports = defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run fa_portal_file_capture:serve',
        production: 'npx nx run fa_portal_file_capture:serve-static',
      },
      ciWebServerCommand: 'npx nx run fa_portal_file_capture:serve-static',
      ciBaseUrl: 'http://localhost:4200',
    }),
    baseUrl: 'http://localhost:4201',
  },
});

import { ModuleFederationConfig, SharedFunction, SharedLibraryConfig } from '@nx/module-federation';

const sharedFunction: SharedFunction = (libraryName: string, sharedConfig: SharedLibraryConfig) => {
  const sharedLibraries = ['@angular/core', '@angular/common', '@angular/router', '@angular/material'];
  if (sharedLibraries.includes(libraryName)) {
    return { singleton: true, strictVersion: true, requiredVersion: 'auto' };
  }
  return sharedConfig;
};

const config: ModuleFederationConfig = {
  name: 'fa-portal-host',
  /**
   * To use a remote that does not exist in your current Nx Workspace
   * You can use the tuple-syntax to define your remote
   *
   * remotes: [['my-external-remote', 'https://nx-angular-remote.netlify.app']]
   *
   * You _may_ need to add a `remotes.d.ts` file to your `src/` folder declaring the external remote for tsc, with the
   * following content:
   *
   * declare module 'my-external-remote';
   *
   */
  remotes: ['fa_portal_file_capture'],
  shared: sharedFunction
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;

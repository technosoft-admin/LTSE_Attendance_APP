// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiMaster:'1',
  apiKey:'qwertyuiop',
  // apiUrl:'https://app.lalittutorials.com/api/student',
  //  apiUrl:'http://localhost:4000/api/staff-attendance',
   apiUrl:'http://192.168.235.18:4000/api/staff-attendance',

  // fileUrl:'http://localhost:4000/',
//  fileUrl:'https://app.lalittutorials.com/',
 fileUrl:'https://192.168.235.18:4000/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/**
 * Constant variable which saves server default data configuration like Server Urls and endpoints.
 */
export const SERVER = (function() {
  const URL = {
   BASE: 'http://localhost:9090/api'
  };
  const AUTHENTICATE = 'authenticate';
  const ACCOUNT = 'account';
  const UPLOAD = 'upload';
  const CONTEST = 'contests';
  const CREATE_CODE = 'create/code';
  const TESTCASE = 'test-cases';
  const PROBLEM = 'problems';
  const PROBLEMSEARCH = 'problems/search';
  const SUBMISSION = 'submissions';
  const CODER = 'coders';
  const USER = 'users';
  const AUTHORITIES = 'authorities';
  // users / authorities
  const RESET_PASSWORD_INIT = 'reset-password/init';
  const RESET_PASSWORD_FINISH = 'reset-password/finish';

  return {
    URL_BASE: URL.BASE,
    AUTHENTICATE: `${URL.BASE}/${AUTHENTICATE}`,
    ACCOUNT: `${URL.BASE}/${ACCOUNT}`,
    UPLOAD: `${URL.BASE}/${UPLOAD}`, 
    CREATE_CODE: `${URL.BASE}/${CREATE_CODE}`, 
    CONTEST: `${URL.BASE}/${CONTEST}` ,
    TESTCASE: `${URL.BASE}/${TESTCASE}`,
    PROBLEM: `${URL.BASE}/${PROBLEM}` ,
    PROBLEMSEARCH : `${URL.BASE}/${PROBLEMSEARCH}` ,
    SUBMISSION: `${URL.BASE}/${SUBMISSION}/all`,
    CODER: `${URL.BASE}/${CODER}`,
    USER: `${URL.BASE}/${USER}`,
    AUTHORITIES: `${URL.BASE}/${USER}/${AUTHORITIES}`,
    RESET_PASSWORD_INIT: `${URL.BASE}/${RESET_PASSWORD_INIT}`,
    RESET_PASSWORD_FINISH: `${URL.BASE}/${RESET_PASSWORD_FINISH}`,
  };
}) ();
/*
          _  _
         ( MOS )
          .---.      
         /   6_6        
         \_  (__\       
         //   \\        
        ((     ))      
  =======""===""========
           |||            
            |              

                 -It's programmer monkey 1.0
*/

/*  
+ ------------------------------------------------------------+
 | Module Name: classMonkey |
 | Module Purpose: emulate a monkey |
 | Inputs: Bananas |
 | Outputs: Grunts |
 | Throws: Poop |
  +------------------------------------------------------------+
*/

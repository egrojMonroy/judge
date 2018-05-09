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
    CODER: `${URL.BASE}/${CODER}`
  };
}) ();

/**
 * Constant variable which saves server default data configuration like Server Urls and endpoints.
 */
export const SERVER = (function() {
  const URL = {
    // BASE_SERVER: 'http://13.58.142.191:9090/',
   // BASE: 'http://190.181.30.3:8080/api'
   BASE: 'http://localhost:9090/api'
  };
  const AUTHENTICATE = 'authenticate';
  const ACCOUNT = 'account';
  const UPLOAD = 'upload';
  const CONTEST = 'contests';
  const POST = 'post';
  const TESTCASE = 'test-cases';
  const PROBLEM = 'problems';
  const PROBLEMSEARCH = 'problems/search';
  return {
    URL_BASE: URL.BASE,
    AUTHENTICATE: `${URL.BASE}/${AUTHENTICATE}`,
    ACCOUNT: `${URL.BASE}/${ACCOUNT}`,
    UPLOAD: `${URL.BASE}/${UPLOAD}`, 
    POST: `${URL.BASE}/${POST}`, 
    CONTEST: `${URL.BASE}/${CONTEST}` ,
    TESTCASE: `${URL.BASE}/${TESTCASE}`,
    PROBLEM: `${URL.BASE}/${PROBLEM}` ,
    PROBLEMSEARCH : `${URL.BASE}/${PROBLEMSEARCH}` 
  };
}) ();

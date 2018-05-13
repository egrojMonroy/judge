import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { AuthorizationService } from './authorization.service';
import { SERVER } from '../../config/server.config';
import { Observable } from 'rxjs/Observable';

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

@Injectable()
export class UserService {

  constructor(
    private webService: WebService,
    private authorization: AuthorizationService
  ) { }

  allUsers() {
    return this.webService.get(SERVER.USER,
      this.webService.getAuthHeaders(this.authorization.getToken())).map(
      (ok) => {
        return ok.json();
      }
    );
  }

  authoritiesUser() {
    return this.webService.get(SERVER.AUTHORITIES, this.webService.getAuthHeaders(this.authorization.getToken())).map(
      (ok) => {
        return ok.json();
      }
    );
  }

  createUser(user) {
    return this.webService.post(SERVER.USER, user,
    this.webService.getAuthHeaders(this.authorization.getToken())).
    map(
      (ok) => {
        return ok.json();
      }
    );
  }

  updateUser(user) {
    return this.webService.put(SERVER.USER, user,
    this.webService.getAuthHeaders(this.authorization.getToken())).
    map(
    (ok) => {
      return ok.json();
      }
    );
  }

  deleteUser(id: any) {
    const urlmodific = SERVER.USER + '/' + id;
    return this.webService.delete(`${urlmodific}`,
      this.webService.getAuthHeaders(this.authorization.getToken()));
  }

}

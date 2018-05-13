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

export class User {
    public id?: any;
    public login?: string;
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public activated?: Boolean;
    public authorities?: any[];

    constructor(
        id?: any,
        login?: string,
        firstName?: string,
        lastName?: string,
        email?: string,
        activated?: Boolean,
        authorities?: any[]
    ) {
        this.id = id ? id : null;
        this.login = login ? login : null;
        this.firstName = firstName ? firstName : '';
        this.lastName = lastName ? lastName : '';
        this.email = email ? email : null;
        this.activated = activated ? activated : false;
        this.authorities = authorities ? authorities : null;
    }
}

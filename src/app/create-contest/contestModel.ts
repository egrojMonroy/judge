export class contestModel {
    name: String;
    startdate: any;
    starttime: any;
    enddate: any;
    endtime: any;
    type: String;
    problem = [];
    password?:String; 
    active = true;
    constructor(    
       name, 
       startdate,
       starttime,
       enddate,
       endtime,
       type
    ) { }
}
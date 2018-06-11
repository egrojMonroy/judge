export class problemModel {
        id?: Number;
        name: String;
        // definition: String;
        // inputDef: String;
        // outputDef: String;
        timelimit: Number;
        level:Number;
        active = true;
        constructor(timelimit,level ) {
                this.timelimit = timelimit;
                this.level = level;
        }
}
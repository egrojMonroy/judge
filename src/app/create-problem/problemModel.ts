export class problemModel {
        id?: Number;
        name: String;
        // definition: String;
        // inputDef: String;
        // outputDef: String;
        timelimit: Number;
        timelimitjava: Number;
        level:Number;
        active = true;
        constructor(timelimit, timelimitjava,level ) {
                this.timelimit = timelimit;
                this.timelimitjava = timelimitjava;
                this.level = level;
        }
}
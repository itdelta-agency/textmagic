type CarSpecItem = {
   name: string, 
   values: string[]
};

type CarSpec = CarSpecItem[];

// export default class CarSpec {
//    fields: string[];

//    constructor(fields: string[]) {
//       this.fields = fields;
//    }
// }

export { 
   CarSpecItem,
   CarSpec
};
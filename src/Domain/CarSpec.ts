type CarSpecItem = {
   name: string,
   type: string, // todo enum
   values: string[]|string
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
enum SpecType {
   ARRAY = 'array',
   BOOLEAN = 'boolean',
   STRING = 'string'
}

type CarSpecItem = {
   name: string,
   type: SpecType,
   values: string[] | string
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
   CarSpec,
   SpecType
};
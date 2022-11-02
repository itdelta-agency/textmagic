type key = string;

export interface ISpec {
   [index: key]: string;
}

export default class Car {
   id: number;
   name: string;
   spec: ISpec;

   constructor(id: number, name: string, spec: ISpec) {
      this.id = id;
      this.name = name;
      this.spec = spec;
   }

   // getSpecFields(): string[] {
   //    return Object.keys(this.spec);
   // }
}
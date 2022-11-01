import Car, { ISpec } from '../Domain/Car';
import CarSpec from '../Domain/CarSpec';

let data: Car[] = [
   new Car('1','Car1', {color: 'black',spec2: 'spec2'}),
   new Car('2','Car2', {color: 'white',spec2: 'spec2'}),
   new Car('3','Car3', {}),
];

const spec:CarSpec = 
   [
      'color',
      'spec2',
      'spec3'
   ];

export default class CarService {

   getCars(): Promise<Car[]> {
      return new Promise<Car[]>((resolve, reject) => {
         resolve(data);
      })
   }

   getCar(id: any): Promise<Car> {
      return new Promise<Car>((resolve, reject) => {
         const car:Car|undefined = data.find(e => e.id == id);
         if (car)
            resolve(car)
         else
            reject(new Error('Car not found'));
      });
   }

   createCar(car: Car): Promise<string> {
      return new Promise<string>((resolve, reject) => {
         resolve('4'); // new id
      });
   }

   updateCar(car: Car): Promise<boolean> {
      console.log(car);
      return new Promise<boolean>((resolve, reject) => {
         data = [...data.filter(e => e.id !== car.id), car];
         resolve(true);
      });
   }



   getCarSpec(): Promise<CarSpec> {
      return new Promise<CarSpec>((resolve, reject) => {
         resolve(spec);
      })
   }

   addCarSpec(val: string): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
         spec.push(val);
         resolve(true);
      })
   }
}
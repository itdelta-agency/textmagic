import Car, { ISpec } from '../Domain/Car';
import {CarSpec, CarSpecItem} from '../Domain/CarSpec';

let data: Car[] = [
   new Car(1,'Car1', {Color: 'black',Engine: 'V6 3.5L'}),
   new Car(2,'Car2', {Color: 'white',Engine: 'V4 2.0L'}),
   new Car(3,'Car3', {}),
];

let spec:CarSpec = 
   [
      {
         name: 'Color',
         values: ['black', 'white']
      },
      {
         name: 'Engine',
         values: ['V6 3.5L', 'V4 2.0L']
      },
      {
         name: 'Weel',
         values: ['20', '21']
      }
   ];

export default class CarService {

   getCars(): Promise<Car[]> {
      return new Promise<Car[]>((resolve, reject) => {
         resolve(data);
      })
   }

   getCar(id: number): Promise<Car> {
      return new Promise<Car>((resolve, reject) => {
         const car:Car|undefined = data.find(e => e.id == id);
         if (car)
            resolve(car)
         else
            reject(new Error('Car not found'));
      });
   }

   createCar(car: Car): Promise<number> {
      return new Promise<number>((resolve, reject) => {
         const lastId = Math.max(...data.map(e => e.id));
         const newId = lastId + 1;
         car.id = newId;
         data.push(car);
         resolve(car.id);

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

   addCarSpec(val: CarSpecItem): Promise<boolean> {
      return new Promise<boolean>((resolve, reject) => {
         spec = [...spec.filter(e => e.name !== val.name), val];
         resolve(true);
      })
   }
}
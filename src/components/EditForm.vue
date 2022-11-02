<template>
    <div v-if="car?.name">

      <div class="col-span-6 sm:col-span-4">
        <label for="email-address" class="text-left block text-sm font-medium text-gray-700">Name: </label>
        <input v-model="name" type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
      </div>

      <ul>
        <li v-for="field in spec" :key="field">

          <div class="my-5 col-span-6 sm:col-span-4">
            <label class="text-left block text-sm font-medium text-gray-700">{{field.name}}: </label>

            <select v-if="field.type === 'array'" @change="addField($event, field.name)" v-model="this.fields[field.name]" name="specs" id="pet-select" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option v-for="val in field.values" :value="val" :key="val">{{val}}</option>
            </select>
            <input 
              @change="addField($event, field.name, true)" 
              v-model="this.fields[field.name]" 
              type="checkbox" 
              v-if="field.type === 'boolean'" />
            <input 
              @change="addField($event, field.name)" 
              v-model="this.fields[field.name]" 
              type="text" 
              v-if="field.type === 'string'" 
              class="w-full"/>
            <!-- <div v-if="!field.type"> -->
              <!-- <input v-model="fields[field]" type="text" name="{{field.name}}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/> -->
            <!-- </div> -->
            <!-- <div v-if="">

            </div> -->
          </div>

        </li>
      </ul>

      <button @click="saveData" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Save
      </button>
      <button @click="updateData" class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Update
      </button>

          
      <div class="bg-gray-50 px-4 py-3 text-center sm:px-6">
        <input v-model="newSpec" type="text" autocomplete="given-name" 
          class="mt-4 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
          <button @click="addSpec" class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Add Spec
          </button>

      </div>

    </div>

</template>

<script lang="ts">
import Car, { ISpec } from '../Domain/Car';
// import {ISpec} from '../Domain/Car';
import {CarSpec} from '../Domain/CarSpec';
import CarService from '../App/CarService';
import { defineComponent } from 'vue';
import { PropType } from 'vue'

export default defineComponent({
  name: 'EditForm',

  props: {
    car: {
      type: Car,
      required: true
    },
    spec: Object as PropType<CarSpec>
  },

  data: () => ({
    id: 0,
    name: '',
    newSpec: '',
    fields: [] as ISpec[],
  }),

  methods: {
    addField(e: any, field: any, checkbox: Boolean = false) {
      this.fields[field] = e.target.value
      if (checkbox) {
        this.fields[field] = e.target.checked
      }
    },  

    saveData() {
      const carService = new CarService();
 
      carService.createCar(new Car(
        0,
        this.name,
        // @ts-ignore
        this.fields
      ));
      this.$emit('newCar');
    },
    updateData() {
      const carService = new CarService();

      carService.updateCar(new Car(
        this.car.id,
        this.name,
         // @ts-ignore
        this.fields
      ))
      this.$emit('newCar');
    },

    addSpec() {
      const carService = new CarService();
      if (this.newSpec) {
        carService.addCarSpec({
          name: this.newSpec,
          type: 'array',
          values: ['empty value']
        });
        this.newSpec = '';
        this.$emit('newSpec');
      }
    },

    // async getCarSpecValues(name: string) {
    //   const carService = new CarService();
    //   return await carService.getCarSpecValues(name);
    // }
  },

  emits: ['newSpec', 'newCar'],
  mounted() {
    this.id = this.$props.car?.id ?? 0;
    this.name = this.$props.car?.name ?? '';
    // for (let e in this.$props.spec ?? {}) {
    //   // @ts-ignore
    //   const item = this.$props.spec[e];
    //   this.getCarSpecValues(item).then(type => {
    //     // @ts-ignore
    //     this.fields[item] = {
    //       values: type,
    //       value: this.$props?.car?.spec[item]
    //     };
    //   });
    // }


    this.$props.spec?.forEach(e => {
      // @ts-ignore
      this.fields[e.name] = this.$props?.car?.spec[e.name];
    })
    console.log(this.fields)
  }
})

</script>
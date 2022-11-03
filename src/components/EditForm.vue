<template>
    <div v-if="car?.name">

      <div class="col-span-6 sm:col-span-4">
        <label for="email-address" class="text-left block text-sm font-medium text-gray-700">Name: </label>
        <input v-model="name" type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
      </div>

      <ul>
        <li v-for="field in spec" :key="field.name">

          <div class="my-5 col-span-6 sm:col-span-4 text-left">
            <label :for="isCheckbox(field) ? 'checkbox' : ''" :class="[`text-left text-sm font-medium text-gray-700`, isCheckbox(field) ? '' : 'block']">{{field.name}}: </label>

            <select 
              v-if="field.type === 'array'" 
              @change="addField($event, field.name)" 
              v-model="fields[field.name]" 
              name="specs" 
              id="pet-select" 
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option v-for="val in field.values" :value="val" :key="val">
                {{val}}
              </option>
            </select>
            <input 
              @change="addField($event, field.name, true)" 
              v-model="fields[field.name]"
              id="checkbox"
              type="checkbox" 
              v-if="isCheckbox(field)" />
            <input 
              @change="addField($event, field.name)" 
              v-model="fields[field.name]" 
              type="text" 
              v-if="field.type === 'string'" 
              class="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>

        </li>
      </ul>

      <button @click="saveData" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Save
      </button>
      <button @click="updateData" class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Update
      </button>
    </div>

</template>

<script lang="ts">
import Car, { ISpec } from '../Domain/Car';
// import {ISpec} from '../Domain/Car';
import {CarSpec, CarSpecItem, SpecType} from '../Domain/CarSpec';
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
    showForm: false,
    fields: {} as ISpec,
  }),

  methods: {
    isCheckbox(field: CarSpecItem) {
      return field.type === SpecType.BOOLEAN;
    },
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
        this.fields
      ));
      this.$emit('newCar');
    },
    updateData() {
      const carService = new CarService();
      
      carService.updateCar(new Car(
        this.car.id,
        this.name,
        this.fields
      ))
      this.$emit('newCar');
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
  }
})

</script>
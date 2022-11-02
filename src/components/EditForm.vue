<template>
    <div v-if="car?.name">

      <div class="col-span-6 sm:col-span-4">
        <label for="email-address" class="text-left block text-sm font-medium text-gray-700">Name: </label>
        <input v-model="name" type="text" name="email-address" id="email-address" autocomplete="email" 
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
      </div>

      <ul>
        <li v-for="field in spec" :key="field">

          <div class="my-5 col-span-6 sm:col-span-4">
            <label for="email-address" class="text-left block text-sm font-medium text-gray-700">{{field}}: </label>
            <input v-model="fields[field]" type="text" name="{{field}}" id="email-address" autocomplete="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          </div>

        </li>
      </ul>

      <button @click="saveData" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Save
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
import Car from '../Domain/Car';
// import {ISpec} from '../Domain/Car';
import CarSpec from '../Domain/CarSpec';
import CarService from '../App/CarService';
import { defineComponent } from 'vue';
import { PropType } from 'vue'

export default defineComponent({
  name: 'EditForm',

  props: {
    car: Car,
    spec: Object as PropType<CarSpec>
  },

  data: () => ({
    id: '',
    name: '',
    newSpec: '',
    fields: {} //Object as PropType<ISpec>,
  }),

  methods: {
    saveData() {
      const carService = new CarService();
      carService.updateCar(new Car(
        this.id,
        this.name,
        this.fields
      ));
      this.$emit('updateCar');
    },

    addSpec() {
      const carService = new CarService();
      if (this.newSpec) {
        carService.addCarSpec(this.newSpec);
        this.newSpec = '';
        this.$emit('newSpec');
      }
    }
  },

  emits: ['newSpec', 'updateCar'],
  mounted() {
    this.id = this.$props.car?.id ?? '';
    this.name = this.$props.car?.name ?? '';
    this.$props.spec?.forEach(e => {
      // @ts-ignore
      this.fields[e] = this.$props?.car?.spec[e];
    })
  }
})

</script>
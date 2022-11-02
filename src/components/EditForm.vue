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

            <select name="specs" id="pet-select">
              <option v-for="val in field.values" value="val" :key="val">{{val}}</option>
          </select>
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
import {CarSpec} from '../Domain/CarSpec';
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
      carService.createCar(new Car(
        "",
        this.name,
        this.fields
      ));
    },

    addSpec() {
      const carService = new CarService();
      if (this.newSpec) {
        carService.addCarSpec({
          name: this.newSpec,
          values: ['empty value']
        });
        this.$emit('newSpec');
      }
    },

    // async getCarSpecValues(name: string) {
    //   const carService = new CarService();
    //   return await carService.getCarSpecValues(name);
    // }
  },

  emits: ['newSpec'],

  mounted() {
    this.id = this.$props.car?.id ?? '';
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

    console.log(this.fields);

    this.$props.spec?.forEach(e => {
      // @ts-ignore
      this.fields[e] = this.$props?.car?.spec[e];
    })
  }
})

</script>
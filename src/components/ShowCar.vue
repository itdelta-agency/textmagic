<template>
  <div v-if="car?.name" class="mx-auto flex flex-col justify-center bg-white rounded-lg border border-gray-200 w-48 text-gray-900 text-sm font-medium">
    <div>
        <span class="block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg bg-blue-700 text-white cursor-pointer">id: {{car.id}}</span>
    </div>
    <div class="bg-white rounded-lg border border-gray-200 w-48 text-gray-900 text-sm font-medium">
        <span class="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700">name: {{car.name}}</span>
    </div>
    <ul>
        <li v-for="field in spec" :key="field.name" class="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
          {{field.name}}: {{car.spec[field.name]}}
        </li>
    </ul>
  </div>
</template>

<script lang="ts">

import CarService from '../App/CarService';

import Car from '../Domain/Car';
import {CarSpec} from '../Domain/CarSpec';
import { defineComponent } from 'vue';
import { PropType } from 'vue'

export default defineComponent({
  name: 'ShowCar',

  props: {
    id: {
      type: Number,
      required: true
    },
    update: Boolean,
    show: Boolean,
    spec: Object as PropType<CarSpec>
  },
  data() {
    return {
      car: {} as Car,
    }
  },
  watch: {
    update() {
      this.getCar(this.id)
    }
  },

  methods: {
    async getCar(id: number) {
      const carService = new CarService();
      this.car = JSON.parse(JSON.stringify(await carService.getCar(id)));
    },
  },
  mounted() {
    this.getCar(this.id)
  }

})

</script>
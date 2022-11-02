<template>
  <div v-if="car?.name" class="mx-auto flex flex-col justify-center bg-white rounded-lg border border-gray-200 w-48 text-gray-900 text-sm font-medium">
    <div>
        <span class="block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg bg-blue-700 text-white cursor-pointer">id: {{car.id}}</span>
    </div>
    <div class="bg-white rounded-lg border border-gray-200 w-48 text-gray-900 text-sm font-medium">
        <span class="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700">name: {{car.name}}</span>
    </div>
    <ul>
      <li v-for="field in spec" :key="field" class="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
        {{field}}: {{ car.spec[field] }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import CarSpec from '../Domain/CarSpec';
import CarService from '../App/CarService';

import { defineComponent } from 'vue';
import { PropType } from 'vue'

export default defineComponent({
  name: 'ShowCar',

  props: {
    id: {
      type: Number,
      required: true
    },
    show: Boolean,
    spec: Object as PropType<CarSpec>
  },
  data() {
    return {
      car: {},
      fields: {}
    }
  },

  methods: {
    async getCar(id: number) {
      const carService = new CarService();
      this.car = await carService.getCar(id);
    },
  },
  mounted() {
    this.getCar(this.id)
    this.$props.spec?.forEach(e => {
      // @ts-ignore
      this.fields[e] = this.$props?.car?.spec[e];
    })
  }

})

</script>
<template>
  <div v-if="car?.name">
    <hr>
    <div>
        id: {{car.id}}
      </div>
    <div class="hello">
      name: {{ car.name }}
    </div>
    <ul>
      <li v-for="field in spec" :key="field">
        {{field}}: {{ car.spec[field] }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Car from '../Domain/Car';
import CarSpec from '../Domain/CarSpec';
import { defineComponent } from 'vue';
import { PropType } from 'vue'

export default defineComponent({
  name: 'ShowCar',

  props: {
    car: Car,
    spec: Object as PropType<CarSpec>
  },

})

</script>
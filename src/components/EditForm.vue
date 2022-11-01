<template>
    <div v-if="car?.name">

      <hr>
      <div class="hello">
        name: <input v-model="name" />
      </div>
      <ul>
        <li v-for="field in spec" :key="field">
          {{field}}: <input v-model="fields[field]" />
        </li>
      </ul>
      <button @click="saveData">Save</button>

      <p>
        <input v-model="newSpec" /> &nbsp;
        <button @click="addSpec">Add Spec</button>
      </p>
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
    },

    addSpec() {
      const carService = new CarService();
      if (this.newSpec) {
        carService.addCarSpec(this.newSpec);
        this.$emit('newSpec');
      }
    }
  },

  emits: ['newSpec'],

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
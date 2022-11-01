<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul id="array-rendering">
      <li v-for="item in cars" :key="item.name">
        <div @click="setCar(item.id)">{{ item.name }}</div>
      </li>
    </ul>
  </div>
  <div>
    <ShowCar @new-spec="null" :car="currentCar" :spec="this.spec" :key="currentCar"/>
  </div>
  <div>
    <EditForm :car="currentCar" :spec="this.spec" :key="currentCar"/>
  </div>
</template>

<script lang="ts">
import Car from '../Domain/Car';
import CarSpec from '../Domain/CarSpec';
import CarService from '../App/CarService';
import { defineComponent, onMounted } from 'vue';
import { ref } from 'vue';
import ShowCar from './ShowCar.vue';
import EditForm from './EditForm.vue';

export default defineComponent({
  components: { ShowCar, EditForm },

  name: 'MainPage',

  props: {
    msg: String
  },

  data: () => {
    return {
      currentCar: {},
    }
  },

  methods: {
    async setCar(id: string) {
      const carService = new CarService();
      this.currentCar = await carService.getCar(id);
    }
  },

  setup() {
    const carService = new CarService();

    let cars = ref<Car[]>([]);
    const getCars = async () => {
      cars.value = await carService.getCars();
    }

    let spec = ref<CarSpec>();
    const getSpec = async () => {
      spec.value = await carService.getCarSpec();
    }

    onMounted(()=>{
      getCars();
      getSpec();
    });

    return {
      cars,
      spec
    } 
  },

})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

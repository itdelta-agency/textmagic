<template>

<div class="hidden sm:block" aria-hidden="true">
  <div class="py-5">
    <div class="border-t border-gray-200"></div>
  </div>
</div>

<div class="mt-10 sm:mt-0">
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="md:col-span-1">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Cars Information</h3>
        <p class="mt-1 text-sm text-gray-600">Select the car:</p>
      </div>


      <ul class="my-4 flex flex-col justify-start">
        <li v-for="item in cars" :key="item.name" class="pt-2">
          <button @click="setCar(item.id)" type="button" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {{ item.name }}
          </button>
          <div class="my-6" v-if="isDetailOpen(item.id)">
              <ShowCar :update="updateShowing" :id="item.id" :spec="spec"/>
          </div>
        </li>
      </ul>

    </div>
    

    <div class="mt-5 md:col-span-1 justify-self-center md:mt-0">
        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="bg-white px-4 py-5 sm:p-6">
            <div class="w-96 text-center">
              <EditForm @newSpec="getSpec()" @newCar="handleUpdate()" :car="currentCar" :spec="spec" :key="currentCar"/>
            </div>
          </div>

        </div>
    </div>

    <div class="mt-5 md:col-span-1 justify-self-center md:mt-0">
        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="bg-white px-4 py-5 sm:p-6">
            <div class="w-96 text-center">
              <AddSpec :show="true" @newSpec="getSpec()"/>

            </div>
          </div>

        </div>
    </div>


  </div>
</div>

</template>

<script lang="ts">
import Car from '../Domain/Car';
import {CarSpec} from '../Domain/CarSpec';
import CarService from '../App/CarService';
import { defineComponent, onMounted } from 'vue';
import { ref } from 'vue';
import ShowCar from './ShowCar.vue';
import EditForm from './EditForm.vue';
import AddSpec from './AddSpec.vue';
export default defineComponent({
  components: { ShowCar, EditForm, AddSpec },

  name: 'MainPage',

  props: {
    // msg: String
  },

  data: () => {
    return {
      currentCar: {} as Car,
      showDetail: [] as Boolean[],
      updateShowing: false
    }
  },

  methods: {
    handleUpdate() {
      this.getCars();
      this.updateShowing = !this.updateShowing
    },
    async setCar(id: number) {
      const carService = new CarService();
      this.showDetail[id] = !this.showDetail[id];
      this.showDetail.forEach((value: Boolean, i: number) => {
        if (i !== id) {
          this.showDetail[i] = false; 
        }
      })
      this.currentCar = await carService.getCar(id);
    },
    isDetailOpen(id: number) {
      return this.showDetail[id] === true;
    },
  },
  mounted() {
    this.getSpec();
  },  

  setup() {
    const carService = new CarService();

    let cars = ref<Car[]>([]);
    const getCars = async () => {
      cars.value = JSON.parse(JSON.stringify(await carService.getCars()));
    }

    let spec = ref<CarSpec>();
    const getSpec = async () => {
      spec.value = JSON.parse(JSON.stringify(await carService.getCarSpec()));
    }

    onMounted(()=>{
      getCars();
      getSpec()
    });

    return {
      cars,
      spec,
      getCars,
      getSpec
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

<template>
    <h2>Add specification</h2>
  <div class="px-4 py-3 text-center sm:px-6" v-if="show">
    <div>
      <label class="text-left block text-sm font-medium text-gray-700"
        >Name:
      </label>
      <input
        v-model="newSpec.name"
        type="text"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
    <div>
      <label class="text-left block text-sm font-medium text-gray-700"
        >Choose type:
      </label>
      <select
        v-model="newSpec.type"
        name="spec"
        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option v-for="(val, i) in types" :value="i" :key="val">
          {{ val }}
        </option>
      </select>
    </div>
    <div v-if="newSpec?.type === 'ARRAY'">
      <div v-for="(len, i) in newSpec.valuesLength" :key="len" class="flex flex-col">
        <label class="text-left block text-sm font-medium text-gray-700"
          >Value #{{i + 1}}:
        </label>
        <div class="flex items-center">
            <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" @change="addSpecValue($event)" />
            <div
                class="cursor-pointer text-xl bg-red-100 rounded-[50%] flex w-5 h-5 ml-2 items-center justify-center"
                @click="newSpec.valuesLength++"
                v-if="newSpec.valuesLength === i + 1">+</div>
        </div>
      </div>
    </div>
    <button
      @click="addSpec"
      class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Save
    </button>
  </div>
</template>
<script lang="ts">
import { SpecType } from "../Domain/CarSpec";
import CarService from "../App/CarService";

import { defineComponent } from "vue";
export default defineComponent({
  name: 'AddSpec',
  
  props: {
    show: Boolean,
  },
  data: () => ({
    newSpec: {
      name: '',
      type: null,
      values: [],
      valuesLength: 1
    },
    types: SpecType,
  }),
  methods: {
    addSpec() {
      const carService = new CarService();

      if (this.newSpec.name && this.newSpec.type) {
        carService.addCarSpec({
          name: this.newSpec.name,
          type: SpecType[this.newSpec.type],
          values: this.newSpec.values ?? "",
        });

        this.newSpec = {
          name: '',
          type: null,
          values: [],
          valuesLength: 1
        };

        this.$emit("newSpec");
      }
    },
    addSpecValue(e: any) {
        const value = e.target.value.trim();
        this.newSpec.values?.push(value);
    }
  },
  emits: ["newSpec"],
});
</script>

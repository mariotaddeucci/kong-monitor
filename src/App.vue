<script setup lang="ts">
import ServiceTable from "./components/ServiceTable.vue";
import UpstreamTable from "./components/UpstreamTable.vue";
import Header from "./components/Header.vue";

import { useKongStore } from "./stores/kongStore";

async function delay(ms: number) {
  // return await for better async stack trace support in case of errors.
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

const kongStore = useKongStore();
let run = async () => {
  while (true) {
    await kongStore.loadData();
    await delay(5000);
  }
};
run();
</script>

<template>
  <div class="container">
    <Header></Header>
    <UpstreamTable :upstreams="kongStore.upstreams" />
    <ServiceTable :services="kongStore.services" />
  </div>
</template>

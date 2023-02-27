<script setup lang="ts">
import { useKongStore } from "./../stores/kongStore";

const kongStore = useKongStore();
</script>

<template>
  <div class="row">
    <div class="col-6">
      <h2 class="drac-heading drac-heading-xl drac-text-white">Kong Monitor</h2>
    </div>

    <div class="col-6">
      <input
        placeholder="API Url"
        class="drac-input drac-input-white drac-text-white"
        v-model="kongStore.kongApiEndpoint"
      />
    </div>
    <div class="col-12" v-if="kongStore.failedToLoadKongApiData">
      <div class="drac-box drac-card drac-bg-red drac-p-sm">
        <span class="drac-text drac-line-height drac-text-black">
          Failed to load kong API Data. Please check the API endpoint used.
        </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
h2 {
  padding: 4px 0px;
}
</style>

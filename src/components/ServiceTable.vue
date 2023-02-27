<script setup lang="ts">
interface ServiceData {
  id: string;
  name: string;
  host: string;
  protocol: string;
  port: number;
  path: string;
  retries: number;
}

defineProps<{ services: ServiceData[] }>();
</script>

<template>
  <div class="row" v-if="services.length > 0">
    <div class="col-12">
      <table class="drac-table">
        <thead>
          <tr>
            <th class="drac-text drac-text-white">Service</th>
            <th class="drac-text drac-text-white">Host</th>
            <th class="drac-text drac-text-white">Protocol</th>
            <th class="drac-text drac-text-white">Port</th>
            <th class="drac-text drac-text-white">Path</th>
            <th class="drac-text drac-text-white">Retries</th>
          </tr>
        </thead>
        <tbody class="drac-bg-black-secondary">
          <tr v-for="service in services" :key="service.id">
            <td class="drac-text drac-text-white">{{ service.name }}</td>
            <td class="drac-text drac-text-white">{{ service.host }}</td>
            <td class="drac-text drac-text-white drac-text-center">
              {{ service.protocol.toUpperCase() }}
            </td>
            <td class="drac-text drac-text-white drac-text-center">
              {{ service.port }}
            </td>
            <td class="drac-text drac-text-white drac-text-center">
              {{ service.path || "/" }}
            </td>
            <td class="drac-text drac-text-white drac-text-center">
              {{ service.retries }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

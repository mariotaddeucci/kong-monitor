<script setup lang="ts">
interface UpstreamNode {
  id: string;
  target: string;
  health: string;
  weight: number;
}

interface UpstreamData {
  id: string;
  name: string;
  algorithm: string;
  nodes: UpstreamNode[];
}

defineProps<{ upstreams: UpstreamData[] }>();

function* generateTableRows(upstreams: UpstreamData[]) {
  for (const upstream of upstreams) {
    for (var i = 0; i < upstream.nodes.length; ++i) {
      yield {
        ...upstream,
        ...upstream.nodes[i],
        isFirstNode: i == 0,
        rowSpan: upstream.nodes.length,
      };
    }
  }
}
</script>

<template>
  <div class="row" v-if="upstreams.length > 0">
    <div class="col-12">
      <table class="drac-table">
        <thead>
          <tr>
            <th class="drac-text drac-text-white">Upstream</th>
            <th class="drac-text drac-text-white">algorithm</th>
            <th class="drac-text drac-text-white">target</th>
            <th class="drac-text drac-text-white">Status</th>
            <th class="drac-text drac-text-white">Weight</th>
          </tr>
        </thead>
        <tbody class="drac-bg-black-secondary">
          <tr v-for="node in generateTableRows(upstreams)" :key="node.id">
            <td
              class="drac-text drac-text-white"
              :rowspan="node.rowSpan"
              v-if="node.isFirstNode"
            >
              {{ node.name }}
            </td>
            <td
              class="drac-text drac-text-white"
              :rowspan="node.rowSpan"
              v-if="node.isFirstNode"
            >
              {{ node.algorithm }}
            </td>
            <td class="drac-text drac-text-white">{{ node.target }}</td>
            <td class="drac-text drac-text-white drac-text-center">
              <span
                :class="
                  node.health == 'HEALTHY' ? 'drac-text-green' : 'drac-text-red'
                "
                >{{ node.health }}</span
              >
            </td>
            <td class="drac-text drac-text-white drac-text-center">
              {{ node.weight }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

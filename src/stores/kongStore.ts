import { defineStore } from "pinia";
import { Upstream, UpstreamNode } from "@/core/models/Upstream";
import { Service } from "@/core/models/Service";

import { useStorage } from "@vueuse/core";

function trimChar(string: string, charToRemove: string) {
  while (string.charAt(0) == charToRemove) {
    string = string.substring(1);
  }

  while (string.charAt(string.length - 1) == charToRemove) {
    string = string.substring(0, string.length - 1);
  }

  return string;
}

export const useKongStore = defineStore({
  id: "kong",
  state: () => ({
    upstreamsData: [] as Upstream[],
    servicesData: [] as Service[],
    kongApiEndpoint: useStorage("kongApiEndpoint", "/api/"),
    failedToLoadKongApiData: false,
  }),
  getters: {
    services: (state) => state.servicesData,
    upstreams: (state) => state.upstreamsData,
  },
  actions: {
    async loadData() {
      try {
        await Promise.all([this.loadServiceData(), this.loadUpstreams()]);
        this.failedToLoadKongApiData = false;
      } catch (e) {
        this.failedToLoadKongApiData = true;
        this.servicesData = [];
        this.upstreamsData = [];
        console.log(e);
      }
    },

    async loadUpstreams() {
      const upstreamUrl = `${trimChar(this.kongApiEndpoint, "/")}/upstreams`;
      const response = await fetch(upstreamUrl);

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const upstreams: Upstream[] = data.data.map(
        (upstream: any) => new Upstream(upstream),
      );

      await Promise.all(
        upstreams.map(async (upstream) => {
          const response = await fetch(`${upstreamUrl}/${upstream.id}/health`);
          if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
          const data = await response.json();

          const nodes = data.data.map(
            (node: any) => new UpstreamNode(node),
          ) as UpstreamNode[];

          upstream.nodes = nodes.sort((v1, v2) =>
            v1.target > v2.target ? 1 : -1,
          );
        }),
      );

      this.upstreamsData = upstreams.sort((v1, v2) =>
        v1.name > v2.name ? 1 : -1,
      );
    },

    async loadServiceData() {
      const url = `${trimChar(this.kongApiEndpoint, "/")}/services/`;
      const response = await fetch(url);

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const services = data.data.map(
        (service: any) => new Service(service),
      ) as Service[];
      this.servicesData = services.sort((v1, v2) =>
        v1.name > v2.name ? 1 : -1,
      );
    },
  },
});

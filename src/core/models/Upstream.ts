export class UpstreamNode {
  public id: string;
  public target: string;
  public health: string;
  public weight: number;

  constructor(payload: any) {
    this.id = payload.id;
    this.target = payload.target;
    this.health = payload.health;
    this.weight = payload.weight;
  }
}

export class Upstream {
  public id: string;
  public name: string;
  public algorithm: string;
  public nodes: Array<UpstreamNode> = [];

  get healthPercentage(): number {
    const resume = this.nodes.reduce(
      (accumulator, node) => {
        accumulator["tot"] += node.weight;
        if (node.health == "HEALTHY") accumulator["up"] += node.weight;
        return accumulator;
      },
      { tot: 0, up: 0 }
    );
    return resume["up"] / resume["tot"];
  }

  get healthStatus(): string {
    const health = this.healthPercentage;
    if (health == 0) return "Down";
    else if (health == 1) return "Healthy";
    return "Unhealthy";
  }

  constructor(payload: any) {
    this.id = payload.id;
    this.name = payload.name;
    this.algorithm = payload.algorithm;
    this.nodes = payload.nodes;
  }
}

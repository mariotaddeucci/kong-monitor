export class Service {
  public id: string;
  public name: string;
  public host: string;
  public port: number;
  public protocol: string;
  public path: string;
  public retries: number;
  public created_at: Date;

  constructor(payload: any) {
    this.id = payload.id;
    this.name = payload.name;
    this.host = payload.host;
    this.port = payload.port;
    this.protocol = payload.protocol;
    this.path = payload.path;
    this.retries = payload.retries;
    this.created_at = new Date(payload.created_at);
  }
}

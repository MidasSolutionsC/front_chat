import { Model } from "./model";

export class ResponseApi extends Model{
  public code: number;
  public status: string;
  public message: string;
  public data: any;
  public errors: any;

  constructor(data?: object){
    super(data);
    this.code = this.code || 200;
    this.status = this.status || '';
    this.message = this.message || '';
    this.data = this.data || '';
    this.errors = this.errors || '';
  }

  public static cast(data: object): ResponseApi{
    return new ResponseApi(data);
  }

}

export class Link extends Model{
  public url: string;
  public label: string;
  public active: boolean;

  constructor(data?: object){
    super(data);
    this.url = this.url || '';
    this.label = this.label || '';
    this.active = this.active || false;
  }

  public static cast(data: object): Link{
    const {url, label, active} = new Link(data);
    return {url, label, active};
  }

}

export class Pagination extends Model{
  public total: number;
  public results: any[];

  constructor(data?: object){
    super(data);
    this.total = this.total || 0;
    this.results = this.results || [];
  }

  public static cast(object: object): Pagination{
    const obj = new Pagination(object);
    return {
      total: obj.total,
      results: obj.results,
    }
  }

}


export class ResponsePagination extends Model{
  public code: number;
  public status: string;
  public message: string;
  public data: Pagination | null;
  public errors: any;

  constructor(data?: object){
    super(data);
    this.code = this.code || 200;
    this.status = this.status || '';
    this.message = this.message || '';
    this.data = this.data || null;
    this.errors = this.errors || '';
  }

  public static cast(data: object): ResponseApi{
    return new ResponseApi(data);
  }

}
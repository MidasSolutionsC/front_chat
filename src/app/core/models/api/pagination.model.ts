import { Model } from "./model";

export class Pagination extends Model{
  public page: number;
  public limit: number;
  public search: string;
  public column: string;
  public order: 'asc' | 'desc';

  constructor(data?: object){
    super(data);
    this.page = this.page || 1;
    this.limit = this.limit || 10;
    this.search = this.search || null;
    this.column = this.column || null;
    this.order = this.order || 'desc';
  }

  public static cast(object: object): Pagination{
    const obj = new Pagination(object);
    return {
      page: obj.page,
      limit: obj.limit,
      search: obj.search,
      column: obj.column,
      order: obj.order,
    }
  }
}

export class PaginationResult extends Model{
  public total: number;
  public results: any[];

  constructor(data?: object){
    super(data);
    this.total = this.total || 0;
    this.results = this.results || [];
  }

  public static cast(object: object): PaginationResult{
    const obj = new PaginationResult(object);
    return {
      total: obj.total,
      results: obj.results,
    }
  }
}


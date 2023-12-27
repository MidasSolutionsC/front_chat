import { group } from "@angular/animations";
import { Model } from "../model";

export class Coordination extends Model{
  public _id?: string;
  public nombre: string;
  public descripcion: string;
  public campusId: any;
  public typeStatusId: string;
  public integrantes: any[];
  // public createdUserId?: string;
  // public updatedUserId?: string;
  // public deletedUserId?: string;
  // public createdAt?: string;
  // public updatedAt?: string;
  // public deletedAt?: string;

  constructor(data?: object){
    super(data);
    this._id = this._id || null;
    this.nombre = this.nombre || null;
    this.descripcion = this.descripcion || null;
    this.campusId = this.campusId || null;
    this.typeStatusId = this.typeStatusId || null;
    this.integrantes = this.integrantes || [];
  }

  public static cast(data: object): Coordination{
    const obj = new Coordination(data);
    
    return {
      _id: obj._id,
      nombre: obj.nombre,
      descripcion: obj.descripcion,
      campusId: obj.campusId,
      integrantes: obj.integrantes,
      typeStatusId: obj.typeStatusId,
    }
  }

  public static casts(dataArray: object[]): Coordination[]{
    return dataArray.map((data) => Coordination.cast(data));
  }
}

export class CoordinationList extends Model{
  public _id: string;
  public nombre: string;
  public descripcion: string;
  public countryId?: any;
  public campusId: any;
  public integrantes: any[];
  public typeStatusId: any;
  public createdUserId?: string;
  public updatedUserId?: string;
  public deletedUserId?: string;
  public createdAt?: string;
  public updatedAt?: string;
  public deletedAt?: string;

  constructor(data?: object){
    super(data);
    this._id = this._id || null;
    this.nombre = this.nombre || null;
    this.descripcion = this.descripcion || null;
    this.countryId = this.countryId || null;
    this.campusId = this.campusId || null;
    this.typeStatusId = this.typeStatusId || null;
    this.integrantes = this.integrantes || [];
  }

  public static cast(data: object): CoordinationList{
    const obj = new CoordinationList(data);
    return {
      _id: obj._id,
      nombre: obj.nombre,
      descripcion: obj.descripcion,
      countryId: obj.countryId,
      campusId: obj.campusId,
      integrantes: obj.integrantes,
      typeStatusId: obj.typeStatusId,
    }
  }

  public static casts(dataArray: object[]): CoordinationList[]{
    return dataArray.map((data) => CoordinationList.cast(data));
  }
}
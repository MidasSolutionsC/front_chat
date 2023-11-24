import { Model } from "../model";

export class TypeDocument extends Model{
  public _id: string;
  public codigo: string;
  public nombre: string;
  public typeStatusId: string;
  public color: string;

  constructor(data?: object){
    super(data);
    this._id = this._id || null;
    this.nombre = this.nombre || '';
    this.typeStatusId = this.typeStatusId || '';
    this.color = this.color || null;
  }

  public static cast(data: object): TypeDocument{
    const typeDocument = new TypeDocument(data);
    return {
      _id: typeDocument._id,
      codigo: typeDocument.codigo,
      nombre: typeDocument.nombre,
      typeStatusId: typeDocument.typeStatusId,
      color: typeDocument.color,
    }
  }

  public static casts(dataArray: object[]): TypeDocument[]{
    return dataArray.map((data) => TypeDocument.cast(data));
  }
}

export class TypeDocumentList extends Model{
  public _id: string;
  public codigo: string;
  public nombre: string;
  public typeStatusId: any;
  public color: string;

  constructor(data?: object){
    super(data);
    this._id = this._id || null;
    this.nombre = this.nombre || '';
    this.typeStatusId = this.typeStatusId || null;
    this.color = this.color || null;
  }

  public static cast(data: object): TypeDocumentList{
    const typeDocument = new TypeDocumentList(data);
    return {
      _id: typeDocument._id,
      codigo: typeDocument.codigo,
      nombre: typeDocument.nombre,
      typeStatusId: typeDocument.typeStatusId,
      color: typeDocument.color,
    }
  }

  public static casts(dataArray: object[]): TypeDocumentList[]{
    return dataArray.map((data) => TypeDocumentList.cast(data));
  }
}
import { Model } from "../model";

export class Campus extends Model{
  public _id: string;
  public ubigeoId: string
  public inei: string
  public ubigeo: string
  public nombre: string;
  public descripcion: string;
  public direccion: string;
  public telefono: string;
  public correo: string;
  public fechaApertura: string;
  public logo: any;
  public typeStatusId: string;

  constructor(data?: object){
    super(data);
    this._id = this._id || null;
    this.ubigeoId = this.ubigeoId || null;
    this.inei = this.inei || '';
    this.ubigeo = this.ubigeo || '';
    this.nombre = this.nombre || '';
    this.descripcion = this.descripcion || '';
    this.direccion = this.direccion || '';
    this.telefono = this.telefono || '';
    this.correo = this.correo || '';
    this.fechaApertura = this.fechaApertura || '';
    this.logo = this.logo || null;
    this.typeStatusId = this.typeStatusId || null;
  }

  public static cast(data: object): Campus{
    const campus = new Campus(data);
    return {
      _id: campus._id,
      ubigeoId: campus.ubigeoId,
      inei: campus.inei,
      ubigeo: campus.ubigeo,
      nombre: campus.nombre,
      descripcion: campus.descripcion,
      direccion: campus.direccion,
      telefono: campus.telefono,
      correo: campus.correo,
      fechaApertura: campus.fechaApertura,
      logo: campus.logo,
      typeStatusId: campus.typeStatusId,
    }
  }

  public static casts(dataArray: object[]): Campus[]{
    return dataArray.map((data) => Campus.cast(data));
  }
}


export class CampusList extends Model{
  public _id: string;
  public ubigeoId: string
  public inei: string
  public ubigeo: string
  public nombre: string;
  public descripcion: string;
  public direccion: string;
  public telefono: string;
  public correo: string;
  public fechaApertura: string;
  public logo: any;
  public typeStatusId: any;

  constructor(data?: object){
    super(data);
    this._id = this._id || null;
    this.ubigeoId = this.ubigeoId || null;
    this.inei = this.inei || '';
    this.ubigeo = this.ubigeo || '';
    this.nombre = this.nombre || '';
    this.descripcion = this.descripcion || '';
    this.direccion = this.direccion || '';
    this.telefono = this.telefono || '';
    this.correo = this.correo || '';
    this.fechaApertura = this.fechaApertura || '';
    this.logo = this.logo || null;
    this.typeStatusId = this.typeStatusId || null;
  }

  public static cast(data: object): CampusList{
    const campus = new CampusList(data);
    return {
      _id: campus._id,
      ubigeoId: campus.ubigeoId,
      inei: campus.inei,
      ubigeo: campus.ubigeo,
      nombre: campus.nombre,
      descripcion: campus.descripcion,
      direccion: campus.direccion,
      telefono: campus.telefono,
      correo: campus.correo,
      fechaApertura: campus.fechaApertura,
      logo: campus.logo,
      typeStatusId: campus.typeStatusId,
    }
  }

  public static casts(dataArray: object[]): CampusList[]{
    return dataArray.map((data) => CampusList.cast(data));
  }
}


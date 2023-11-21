 import { Address } from "./address.model";
import { Contact } from "./contact.model";
import { IdentificationDocument, IdentificationDocumentList } from "./identification-document.model";
import { Model } from "./model";

export class Person extends Model{
  public id?: string;
  public ubigeoId?: string;
  public ubigeo?: string;
  public nombres?: string;
  public apellidoPaterno?: string;
  public apellidoMaterno?: string;
  public typeDocumentId?: string;
  public nroDocumento?: string;
  public fechaNacimiento?: string;
  public genero?: 'M' | 'F' | 'O';
  public correo?: string;
  public telefono?: string;
  public direccion?: string;
  

  constructor(data?: object){
    super(data);
    this.id = this.id || null;
    this.ubigeoId = this.ubigeoId || null;
    this.ubigeo = this.ubigeo || null;
    this.nombres = this.nombres || null;
    this.apellidoPaterno = this.apellidoPaterno || '';
    this.apellidoMaterno = this.apellidoMaterno || '';
    this.typeDocumentId = this.typeDocumentId || null;
    this.nroDocumento = this.nroDocumento || null;
    this.fechaNacimiento = this.fechaNacimiento || null;
    this.genero = this.genero || null;
    this.correo = this.correo || null;
    this.telefono = this.telefono || null;
    this.direccion = this.direccion || null;
  }

  public static cast(data: object): Person{
    const obj = new Person(data);
    return {
      id: obj.id, 
      ubigeoId: obj.ubigeoId,
      ubigeo: obj.ubigeo,
      nombres: obj.nombres,
      apellidoPaterno: obj.apellidoPaterno,
      apellidoMaterno: obj.apellidoMaterno,
      typeDocumentId: obj.typeDocumentId,
      nroDocumento: obj.nroDocumento,
      fechaNacimiento: obj.fechaNacimiento,
      genero: obj.genero,
      correo: obj.correo,
      telefono: obj.telefono,
      direccion: obj.direccion,
    };
  }

  public static casts(dataArray: object[]): Person[]{
    return dataArray.map((data) => Person.cast(data));
  }
}

export class PersonList extends Model{
  public id?: string;
  public ubigeoId?: string;
  public ubigeo?: string;
  public nombres?: string;
  public apellidoPaterno?: string;
  public apellidoMaterno?: string;
  public typeDocumentId?: string;
  public nroDocumento?: string;
  public fechaNacimiento?: string;
  public genero?: 'M' | 'F' | 'O';
  public correo?: string;
  public telefono?: string;
  public direccion?: string;
  

  constructor(data?: object){
    super(data);
    this.id = this.id || null;
    this.ubigeoId = this.ubigeoId || null;
    this.ubigeo = this.ubigeo || null;
    this.nombres = this.nombres || null;
    this.apellidoPaterno = this.apellidoPaterno || '';
    this.apellidoMaterno = this.apellidoMaterno || '';
    this.typeDocumentId = this.typeDocumentId || null;
    this.nroDocumento = this.nroDocumento || null;
    this.fechaNacimiento = this.fechaNacimiento || null;
    this.genero = this.genero || null;
    this.correo = this.correo || null;
    this.telefono = this.telefono || null;
    this.direccion = this.direccion || null;
  }

  public static cast(data: object): PersonList{
    const obj = new PersonList(data);
    return {
      id: obj.id, 
      ubigeoId: obj.ubigeoId,
      ubigeo: obj.ubigeo,
      nombres: obj.nombres,
      apellidoPaterno: obj.apellidoPaterno,
      apellidoMaterno: obj.apellidoMaterno,
      typeDocumentId: obj.typeDocumentId,
      nroDocumento: obj.nroDocumento,
      fechaNacimiento: obj.fechaNacimiento,
      genero: obj.genero,
      correo: obj.correo,
      telefono: obj.telefono,
      direccion: obj.direccion,
    };
  }

  public static casts(dataArray: object[]): PersonList[]{
    return dataArray.map((data) => PersonList.cast(data));
  }
}
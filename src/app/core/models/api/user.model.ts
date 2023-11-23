import { IdentificationDocument, IdentificationDocumentList } from "./identification-document.model";
import { Model } from "./model";

export class User extends Model {
  public id: string;
  public personasId: string;
  public typeUserId: string;
  public usuario: string;
  public clave: string;
  public perfiles: any[];
  public portadas: any[];

  constructor(data?: object) {
    super(data);
    this.id = this.id || null;
    this.personasId = this.personasId || null;
    this.typeUserId = this.typeUserId || null;
    this.usuario = this.usuario || '';
    this.clave = this.clave || '';
    this.perfiles = this.perfiles || [];
    this.portadas = this.portadas || [];
  }

  public static cast(data: object): User {
    const obj = new User(data);
    return {
      id: obj.id,
      personasId: obj.personasId,
      typeUserId: obj.typeUserId,
      usuario: obj.usuario,
      clave: obj.clave,
      perfiles: obj.perfiles,
      portadas: obj.portadas,
    }
  }

  public static casts(dataArray: object[]): User[] {
    return dataArray.map((data) => User.cast(data));
  }
}

export class UserList extends Model {
  public _id: string;
  public personId: any;
  public typeUserId: any;
  public usuario: string;
  public clave: string;
  public perfiles: any[];
  public portadas: any[];

  constructor(data?: object) {
    super(data);
    this._id = this._id || null;
    this.personId = this.personId || null;
    this.typeUserId = this.typeUserId || null;
    this.usuario = this.usuario || '';
    this.clave = this.clave || '';
    this.perfiles = this.perfiles || [];
    this.portadas = this.portadas || [];
  }

  public static cast(data: object): UserList {
    const obj = new UserList(data);
    return {
      _id: obj._id,
      personId: obj.personId,
      typeUserId: obj.typeUserId,
      usuario: obj.usuario,
      clave: obj.clave,
      perfiles: obj.perfiles,
      portadas: obj.portadas,
    }
  }

  public static casts(dataArray: object[]): UserList[] {
    return dataArray.map((data) => UserList.cast(data));
  }
}

// Desde el inicio
export class UserPersonSignup extends Model {
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
  public usuario?: string;
  public clave?: string;
  public typeUserId?: string;

  constructor(data?: object) {
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
    this.usuario = this.usuario || null;
    this.clave = this.clave || null;
    this.typeUserId = this.typeUserId || null;
  }

  public static cast(data: object): UserPersonSignup {
    const obj = new UserPersonSignup(data);
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
      usuario: obj.usuario,
      clave: obj.clave,
      typeUserId: obj.typeUserId,
    };
  }

  public static casts(dataArray: object[]): UserPersonSignup[] {
    return dataArray.map((data) => UserPersonSignup.cast(data));
  }
}

// Desde el main
export class UserPerson extends Model {
  public _id?: string;
  public ubigeoId?: string;
  public ubigeo?: string;
  public personId?: string;
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
  public usuario?: string;
  public clave?: string;
  public typeUserId?: string;

  constructor(data?: object) {
    super(data);
    this._id = this._id || null;
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
    this.usuario = this.usuario || null;
    this.clave = this.clave || null;
    this.typeUserId = this.typeUserId || null;
  }

  public static cast(data: object): UserPerson {
    const obj = new UserPerson(data);
    return {
      _id: obj._id, 
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
      usuario: obj.usuario,
      clave: obj.clave,
      typeUserId: obj.typeUserId,
    };
  }

  public static casts(dataArray: object[]): UserPerson[] {
    return dataArray.map((data) => UserPerson.cast(data));
  }
}


export class UserPersonList extends Model {
  public _id?: string;
  public ubigeoId?: string;
  public ubigeo?: string;
  public nombres?: string;
  public apellidoPaterno?: any;
  public apellidoMaterno?: any;
  public typeDocumentId?: any;
  public nroDocumento?: string;
  public fechaNacimiento?: string;
  public genero?: 'M' | 'F' | 'O';
  public correo?: string;
  public telefono?: string;
  public direccion?: string;
  public usuario?: string;
  public clave?: string;
  public typeUserId?: string;

  constructor(data?: object) {
    super(data);
    this._id = this._id || null;
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
    this.usuario = this.usuario || null;
    this.clave = this.clave || null;
    this.typeUserId = this.typeUserId || null;
  }

  public static cast(data: object): UserPersonList {
    const obj = new UserPersonList(data);
    return {
      _id: obj._id, 
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
      usuario: obj.usuario,
      clave: obj.clave,
      typeUserId: obj.typeUserId,
    };
  }

  public static casts(dataArray: object[]): UserPersonList[] {
    return dataArray.map((data) => UserPersonList.cast(data));
  }
}
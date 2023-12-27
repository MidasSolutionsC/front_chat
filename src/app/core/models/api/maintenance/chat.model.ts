import { Model } from "../model";
import { Member } from "./member.model";

export class Chat extends Model{
  public _id?: string;
  public campusId?: string;
  public coordinationId?: string;
  public tipo?: string | 'individual' | 'grupal' | 'coordinación' | 'comunidad';
  public nombre?: string;
  public descripcion?: string;
  public logo?: any;
  public integrantes: Member[];
  public mensajes?: Message[];
  public typeStatusId?: string;
  public color?: string;

  constructor(data?: object){
    super(data);
    this._id = this._id || null;
    this.campusId = this.campusId || null;
    this.coordinationId = this.coordinationId || null;
    this.tipo = this.tipo || null;
    this.nombre = this.nombre || null;
    this.descripcion = this.descripcion || null;
    this.logo = this.logo || null;
    this.integrantes = this.integrantes || null;
    this.typeStatusId = this.typeStatusId || null;
    this.color = this.color || null;
  }

  public static cast(data: object): Chat{
    const chat = new Chat(data);
    return {
      _id: chat._id,
      campusId: chat.campusId,
      coordinationId: chat.coordinationId,
      tipo: chat.tipo,
      nombre: chat.nombre,
      descripcion: chat.descripcion,
      logo: chat.logo,
      integrantes: chat.integrantes,
      typeStatusId: chat.typeStatusId,
      color: chat.color,
    }
  }

  public static casts(dataArray: object[]): Chat[]{
    return dataArray.map((data) => Chat.cast(data));
  }
}


export class Message extends Model{
  public _id?: string;
  public personId?: string;
  public userId?: string;
  public mensaje?: string;
  public archivos?: string;
  public vistos?: string;
  public leidos?: string;
  public fecha?: string;
  public hora?: string;
  public typeStatusId?: string;

  constructor(data: object){
    super(data)
    this._id = this._id || null;
    this.personId = this.personId || null;
    this.userId = this.userId || null;
    this.mensaje = this.mensaje || null;
    this.archivos = this.archivos || null;
    this.vistos = this.vistos || null;
    this.leidos = this.leidos || null;
    this.fecha = this.fecha || null;
    this.hora = this.hora || null;
    this.typeStatusId = this.typeStatusId || null;
  }

  public static cast(data: object): Message{
    const obj = new Message(data);
    return {
      _id: obj._id,
      personId: obj.personId,
      userId: obj.userId,
      mensaje: obj.mensaje,
      archivos: obj.archivos,
      vistos: obj.vistos,
      leidos: obj.leidos,
      fecha: obj.fecha,
      hora: obj.hora,
      typeStatusId: obj.typeStatusId,
    }
  }

  public static casts(dataArray: object[]): Message[]{
    return dataArray.map((data) => Message.cast(data));
  }
}

export class MessageList extends Model{
  public _id?: string;
  public personId?: string;
  public userId?: string;
  public mensaje?: string;
  public archivos?: string;
  public vistos?: string;
  public leidos?: string;
  public fecha?: string;
  public hora?: string;
  public typeStatusId?: string;
  public createdAt?: string;
  public updatedAt?: string;
  public deletedAt?: string;

  constructor(data: object){
    super(data)
    this._id = this._id || null;
    this.personId = this.personId || null;
    this.userId = this.userId || null;
    this.mensaje = this.mensaje || null;
    this.archivos = this.archivos || null;
    this.vistos = this.vistos || null;
    this.leidos = this.leidos || null;
    this.fecha = this.fecha || null;
    this.hora = this.hora || null;
    this.typeStatusId = this.typeStatusId || null;
    this.createdAt = this.createdAt || null;
    this.updatedAt = this.updatedAt || null;
    this.deletedAt = this.deletedAt || null;
  }

  public static cast(data: object): MessageList{
    const obj = new MessageList(data);
    return {
      _id: obj._id,
      personId: obj.personId,
      userId: obj.userId,
      mensaje: obj.mensaje,
      archivos: obj.archivos,
      vistos: obj.vistos,
      leidos: obj.leidos,
      fecha: obj.fecha,
      hora: obj.hora,
      typeStatusId: obj.typeStatusId,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
      deletedAt: obj.deletedAt,
    }
  }

  public static casts(dataArray: object[]): MessageList[]{
    return dataArray.map((data) => MessageList.cast(data));
  }
}
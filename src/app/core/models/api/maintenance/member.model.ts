import { IdentificationDocumentList } from "../identification-document.model";
import { Model } from "../model";

export class Member extends Model{
  public _id: string;
  public codigo: string;
  public nombres: string;
  public apellidoPaterno: string;
  public apellidoMaterno: string;
  public personId: string;
  public userId: string;
  public typeStatusId: string;

  constructor(data?: object){
    super(data);
    this._id = this._id || null;
    this.codigo = this.codigo || null;
    this.nombres = this.nombres || null;
    this.apellidoPaterno = this.apellidoPaterno || null;
    this.apellidoMaterno = this.apellidoMaterno || null;
    this.personId = this.personId || null;
    this.userId = this.userId || null;
    this.typeStatusId = this.typeStatusId || null;
  }

  public static cast(data: object): Member{
    const member = new Member(data);
    return {
      _id: member._id,
      codigo: member.codigo,
      nombres: member.nombres,
      apellidoPaterno: member.apellidoPaterno,
      apellidoMaterno: member.apellidoMaterno,
      personId: member.personId,
      userId: member.userId,
      typeStatusId: member.typeStatusId
    }
  }

  public static casts(dataArray: object[]): Member[]{
    return dataArray.map((data) => Member.cast(data));
  }
}

export class MemberList extends Model{
  public _id: string;
  public codigo: string;
  public nombres: string;
  public apellidoPaterno: string;
  public apellidoMaterno: string;
  public personId: any;
  public userId: any;
  public typeStatusId: any;
  public createdUserId?: any;
  public updatedUserId?: any;
  public deletedUserId?: any;
  public createdAt?: any;
  public updatedAt?: any;
  public deletedAt?: any;

  constructor(data?: object){
    super(data);
    this._id = this._id || null;
    this.codigo = this.codigo || null;
    this.nombres = this.nombres || null;
    this.apellidoPaterno = this.apellidoPaterno || null;
    this.apellidoMaterno = this.apellidoMaterno || null;
    this.personId = this.personId || null;
    this.userId = this.userId || null;
    this.typeStatusId = this.typeStatusId || null;
    this.createdUserId = this.createdUserId || null;
    this.updatedUserId = this.updatedUserId || null;
    this.deletedUserId = this.deletedUserId || null;
    this.createdAt = this.createdAt || null;
    this.updatedAt = this.updatedAt || null;
    this.deletedAt = this.deletedAt || null;
  }


  public static cast(data: object): MemberList{
    const member = new MemberList(data);
    return {
      _id: member._id,
      codigo: member.codigo,
      nombres: member.nombres,
      apellidoPaterno: member.apellidoPaterno,
      apellidoMaterno: member.apellidoMaterno,
      personId: member.personId,
      userId: member.userId,
      typeStatusId: member.typeStatusId,
      createdUserId: member.createdUserId,
      updatedUserId: member.updatedUserId,
      deletedUserId: member.deletedUserId,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      deletedAt: member.deletedAt,
    }
  }

  public static casts(dataArray: object[]): MemberList[]{
    return dataArray.map((data) => MemberList.cast(data));
  }
}
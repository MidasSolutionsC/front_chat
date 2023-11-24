import { Model } from "./model";

export class Country extends Model{
  public _id: string;
  public isoCode: string;
  public nombre: string;

  constructor(data?: object){
    super(data);
    this._id = this._id || null;
    this.isoCode = this.isoCode || '';
    this.nombre = this.nombre || '';
  }

  public static cast(data: object): Country{
    const country = new Country(data);
    const {_id, nombre, isoCode} = country;
    return {_id, nombre, isoCode};
  }

  public static casts(dataArray: object[]): Country[]{
    return dataArray.map((data) => Country.cast(data));
  }
}

export class CountryList extends Model{
  public _id: string;
  public isoCode: string;
  public nombre: string;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt: string;

  constructor(data?: object){
    super(data);
    this._id = this._id || null;
    this.isoCode = this.isoCode || '';
    this.nombre = this.nombre || '';
    this.createdAt = this.createdAt || '';
    this.updatedAt = this.updatedAt || '';
    this.deletedAt = this.deletedAt || '';
  }

  public static cast(data: object): CountryList{
    const countryList = new CountryList(data);
    return {
      _id: countryList._id,
      isoCode: countryList.isoCode,
      nombre: countryList.nombre,
      createdAt: countryList.createdAt,
      updatedAt: countryList.updatedAt,
      deletedAt: countryList.deletedAt,
    }
  }

  public static casts(dataArray: object[]): CountryList[]{
    return dataArray.map((data) => CountryList.cast(data));
  }
}
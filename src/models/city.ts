import mongoose, { Schema, Document } from 'mongoose';

interface District {
  DISTID: string;
  DISTNAME: string;
}

interface City {
  _id: string;
  cityname: string;
  cityid: string;
  DISTRICT: District[];
}

const districtSchema = new Schema<District>({
  DISTID: String,
  DISTNAME: String,
});

const citySchema = new Schema<City>({
  _id: String,
  cityname: String,
  cityid: String,
  DISTRICT: [districtSchema],
}, {
  collection: 'CityAndDistricts', 
  autoCreate: false,
});

const CityModel = mongoose.model<City>('CityAndDistricts', citySchema);

export default CityModel;

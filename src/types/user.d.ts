export interface ShownUser {
  id: string;
  fullName: string;
  profilePict?: string;
  phoneNumber?: string;
}

export interface UserPersonalInformation {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  address?: string;
  addressLatitude?: number;
  addressLongitude?: number;
  subDistrict?: string;
  district?: string;
  city?: string;
  province?: string;
  phoneNumber?: string;
  profilePict?: string;
  bloodType?: string;
  varitas?: string;
  childAmount?: string;
  hpht?: string;
  estimatedLaborDate?: string;
  weight?: string;
  height?: string;
}

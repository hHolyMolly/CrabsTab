export interface IUserModel {
  email: string;
  avatarURL: string;
  fullName: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Not specified';
  role: 'User' | 'Admin';
  location: {
    address: string;
    state: string;
    city: string;
    zipCode: string;
  };
}

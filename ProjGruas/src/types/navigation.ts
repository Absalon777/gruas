export type RootStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  PhoneVerification: { phoneNumber: string };
  ProfileSetup: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Services: undefined;
  Request: undefined;
  Activity: undefined;
  Account: undefined;
};

export interface AccountName {
  fname: string;
  lname: string;
}

export interface AccountPreferences {
  sendSpam: boolean;
  moarButtons: boolean;
}

export interface Account {
  name: AccountName;
  preferences: AccountPreferences;
  timestamp: number;
}

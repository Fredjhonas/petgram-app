import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IUser {
  email: string;
  token: string;
}

const key = 'user';

class UserHandler {
  private user: IUser | null | Promise<IUser | null> | any;

  constructor() {
    this.user = this.getData();
  }

  public async getData(): Promise<IUser | null> {
    const userValue = await AsyncStorage.getItem(key);
    return userValue != null ? JSON.parse(userValue) : userValue;
  }

  public async notifyLogin(newUser: IUser) {
    await AsyncStorage.setItem(key, JSON.stringify(newUser));
    this.user = newUser;
  }

  public isLogged(): boolean {
    return !!this.user;
  }

  public async getUser() {
    return await this.user;
  }

  public async logout() {
    await AsyncStorage.removeItem(key);
    this.user = null;
  }
}

export default new UserHandler();

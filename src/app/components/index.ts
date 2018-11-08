import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const OBJECT_COMPONENTS = {
  DashboardLayoutComponent,
  LoginComponent,
  HomeComponent
};

export const ALL_COMPONENTS = importToArray(OBJECT_COMPONENTS);

export function importToArray<Key extends string, PropType>(importObject: Record<Key, PropType>): PropType[] {
  const keys = Object.getOwnPropertyNames(importObject);

  // ES6 / TypeScript exports contain a __esModule property. Don't include that.
  return keys.filter(key => key.indexOf("__") !== 0).map(key => importObject[key]);
}

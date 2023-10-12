import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VendorInterface {
  id?: string;
  description?: string;
  location?: string;
  contact_number?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;

  user?: UserInterface;
  _count?: {};
}

export interface VendorGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  location?: string;
  contact_number?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}

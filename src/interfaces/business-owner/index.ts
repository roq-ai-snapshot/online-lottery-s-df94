import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BusinessOwnerInterface {
  id?: string;
  user_id: string;
  business_name?: string;
  business_description?: string;
  business_location?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface BusinessOwnerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  business_name?: string;
  business_description?: string;
  business_location?: string;
}

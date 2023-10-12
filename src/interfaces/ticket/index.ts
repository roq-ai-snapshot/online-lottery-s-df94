import { LotteryInterface } from 'interfaces/lottery';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TicketInterface {
  id?: string;
  lottery_id: string;
  user_id: string;
  ticket_number?: number;
  is_winner?: boolean;
  created_at?: any;
  updated_at?: any;

  lottery?: LotteryInterface;
  user?: UserInterface;
  _count?: {};
}

export interface TicketGetQueryInterface extends GetQueryInterface {
  id?: string;
  lottery_id?: string;
  user_id?: string;
}

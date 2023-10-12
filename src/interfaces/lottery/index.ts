import { TicketInterface } from 'interfaces/ticket';
import { GetQueryInterface } from 'interfaces';

export interface LotteryInterface {
  id?: string;
  name: string;
  description?: string;
  draw_date?: any;
  total_tickets?: number;
  sold_tickets?: number;
  created_at?: any;
  updated_at?: any;
  ticket?: TicketInterface[];

  _count?: {
    ticket?: number;
  };
}

export interface LotteryGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
}

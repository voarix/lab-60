export interface Message {
  _id: string;
  message: string;
  author: string;
  datetime: string;
}

export interface MessageMutation {
  message: string;
  author: string;
  datetime: string;
}

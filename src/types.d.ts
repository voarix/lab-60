export interface Message {
  _id: string;
  message: string;
  author: string;
  datetime: string;
}

export interface MessageMutation {
  author: string;
  message: string;
}

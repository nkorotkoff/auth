export interface sendEmail {
  email: string;
  subject: string;
  payload: {
    name: string;
    link?: string;
  };
  template: any;
}

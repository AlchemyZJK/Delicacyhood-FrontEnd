export class Content {
  postid: string;
  page: string;
  name: string;
  flag: number;
}
export class Music {
  title: string;
  source: string;
  coverImg: string;
  text: string;
  createdAt: Date;
  authorId: string;
  tag: string;
}
export class Pictxt {
  title: string;
  coverImg: string;
  content: [
    {
      imageFlag: boolean,
      text: string
    }
    ]
  createdAt: Date;
  authorId: string;
  tag: string;
}
export class Menu {
  title: string;
  coverImg: string;
  intro: [
    {
      imageFlag: boolean,
      text: string
    }
    ]
  content: [
    {
      imageFlag: boolean,
      text: string
    }
    ]
  fruit: [
    {
      imageFlag: boolean,
      text: string
    }
    ]
  createdAt: Date;
  authorId: string;
  tag: string;
}
export class Vedio {
  title: string;
  source: string;
  coverImg: string;
  text: string;
  createdAt: Date;
  authorId: string;
  tag: string;
}
export class Card {
  title: string;
  coverImg: string;
  postid: string;
  path: string;
  collectionNum: number;
  remarkNum: number;
}
export class Data {
  imageFlag: boolean;
  text: string;
}

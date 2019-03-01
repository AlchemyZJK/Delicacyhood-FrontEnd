export class Content {
  imageFlag: boolean;
  text: string;
}

export class VedioSubmitRequest {
  type: number;
  userId: string;
  data: VedioData;
}

export class VedioData {
  authorId: string;
  title: string;
  source: string; // 视频资源URL
  coverImg: string; // 封面资源URL
  text: string; // 简介
  tag: string[];
}

export class PicTextSubmitRequest {
  type: number;
  userId: string;
  data: PicTextData;
}

export class PicTextData {
  authorId: string;
  title: string;
  coverImg: string;
  content: Content[];
  tag: string[];
}

export class MenuSubmitRequest {
  type: number;
  userId: string;
  data: MenuData;
}

export class MenuData {
  authorId: string;
  title: string;
  coverImg: string;
  intro: Content[];
  content: Content[];
  fruit:Content[];
  tag: string[];
}

export class AsmrSubmitRequest {
  type: number;
  userId: string;
  data: AsmrData;
}

export class AsmrData {
  authorId: string;
  title: string;
  source: string; // 音频资源URL
  coverImg: string; // 封面资源URL
  text: string; // 简介
  tag: string[];
}

export class PicSubmitRequest {
  type: number;
  userId: string;
  data: PicData;
}

export class PicData {
  authorId: string;
  title: string;
  coverImg: string; // 单图URL
  tag: string[];
}

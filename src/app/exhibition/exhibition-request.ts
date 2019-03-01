import {Condition} from '../condition';

export class ExhibitionRequest {
  condition: Condition[];
  keyword: string;
  offset: number ;
  limit: number ;
}

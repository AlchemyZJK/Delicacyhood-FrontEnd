import { Condition } from '../condition';

export class SearchRequest {
  condition: Condition[];
  keyword: string;
  limit: number;
  offset: number;
}

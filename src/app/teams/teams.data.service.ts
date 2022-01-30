import { Injectable } from '@angular/core';
import {
  RequestInfo,
  InMemoryDbService,
  STATUS,
  ResponseOptions,
} from 'angular-in-memory-web-api';
import Utils from '../utils/utils';
import { Team } from './teams.model';

@Injectable({
  providedIn: 'root',
})
export class TeamsDataService implements InMemoryDbService {
  constructor() {}

  createDb(): { teams: Team[] } {
    return {
      teams: t,
    };
  }

  post(requestInfo: RequestInfo) {
    const collectionName = requestInfo.collectionName;
    if (collectionName === 'teams') {
      //const data = requestInfo.utils.getJsonBody(requestInfo.req);
      //const collection = requestInfo.collection;

      const options: ResponseOptions = {
        body: { url: Utils.generateURL(13) },
        status: STATUS.OK,
        headers: requestInfo.headers,
        url: requestInfo.url,
      };

      return requestInfo.utils.createResponse$(() => options);
    }

    return undefined;
  }
}

const t: Team[] = [
  {
    // empty
    id: '57994f271ca5dd20847b910c',
    members: {
      total: 17,
      administrators: 1,
      managers: 2,
      editors: 3,
      members: 10,
      supporters: 1,
    },
    plan: {
      memberLimit: 100,
      supporterLimit: 5,
    },
  },
  {
    // full
    id: '65244x241ca5dd20847b915d',
    members: {
      total: 10,
      administrators: 1,
      managers: 0,
      editors: 1,
      members: 3,
      supporters: 5,
    },
    plan: {
      memberLimit: 5,
      supporterLimit: 5,
    },
  },
  {
    // no supporters and empty members
    id: '33114f271ca5dd20847b915d',
    members: {
      total: 14,
      administrators: 1,
      managers: 0,
      editors: 3,
      members: 10,
      supporters: 0,
    },
    plan: {
      memberLimit: 50,
      supporterLimit: 0,
    },
  },
  {
    // no supporters and full members
    id: '11253a271ca5dd20847b915d',
    members: {
      total: 6,
      administrators: 1,
      managers: 1,
      editors: 1,
      members: 3,
      supporters: 0,
    },
    plan: {
      memberLimit: 6,
      supporterLimit: 0,
    },
  },
  {
    // full supporters and empty members
    id: '10131v971ca5dd20847b915d',
    members: {
      total: 11,
      administrators: 1,
      managers: 1,
      editors: 1,
      members: 1,
      supporters: 7,
    },
    plan: {
      memberLimit: 20,
      supporterLimit: 7,
    },
  },

  {
    // empty supporters and full members
    id: '99131k171wd5kn20847b915d',
    members: {
      total: 22,
      administrators: 1,
      managers: 1,
      editors: 1,
      members: 10,
      supporters: 9,
    },
    plan: {
      memberLimit: 13,
      supporterLimit: 10,
    },
  },
];

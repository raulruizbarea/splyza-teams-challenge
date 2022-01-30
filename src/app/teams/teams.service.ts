import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Role } from '../roles/role.enum';
import { Team } from './teams.model';

interface LinkResponse {
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private teamsUrl = 'api/teams/';
  private teamsId: string[] = [
    '57994f271ca5dd20847b910c',
    '33114f271ca5dd20847b915d',
    '11253a271ca5dd20847b915d',
    '65244x241ca5dd20847b915d',
    '10131v971ca5dd20847b915d',
    '99131k171wd5kn20847b915d',
  ];

  constructor(private http: HttpClient) {}

  getRandomId() {
    return this.teamsId[Math.floor(Math.random() * this.teamsId.length)];
  }

  getTeam(teamId: string): Observable<Team> {
    return this.http
      .get<Team>(`${this.teamsUrl}${teamId}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getInvitationLink(team_id: string, role: Role): Observable<LinkResponse> {
    return this.http
      .post<LinkResponse>(`${this.teamsUrl}${team_id}/invites`, {
        role: role,
      })
      .pipe(retry(2), catchError(this.handleError));
  }

  calculateTotalMembers(team: Team) {
    if (!team) {
      return null;
    }

    return (
      team.members.administrators +
      team.members.editors +
      team.members.members +
      team.members.managers
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    if (!errorRes.error) {
      return throwError(() => errorRes.message);
    }
    //TODO Error handling switch
    return throwError(() => errorRes.message);
  }
}

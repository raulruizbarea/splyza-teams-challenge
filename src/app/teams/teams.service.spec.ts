import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Role } from '../roles/role.enum';
import { TeamsDataService } from './teams.data.service';
import { Team } from './teams.model';
import { TeamsService } from './teams.service';

describe('TeamsService', () => {
  let teamsService: TeamsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(TeamsDataService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        }),
      ],
      declarations: [],
    });
    teamsService = TestBed.inject(TeamsService);
  });

  it('should return expected team', (done: DoneFn) => {
    const teamId: string = '57994f271ca5dd20847b910c';
    const expectedTeam: Team = {
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
    };
    teamsService.getTeam(teamId).subscribe({
      next: (team) => {
        expect(team).withContext('expected teams').toEqual(expectedTeam);
        done();
      },
      error: done.fail,
    });
  });

  it('should return empty team if id does not exist', (done: DoneFn) => {
    const teamId: string = '57994f271ca5dd20847bxxxx';

    teamsService.getTeam(teamId).subscribe({
      next: (team) => {
        done.fail;
      },
      error: (error) => {
        done();
      },
    });
  });

  it('should return an invitation link', (done: DoneFn) => {
    const teamId: string = '57994f271ca5dd20847b910c';
    const role: Role = Role.COACH;

    teamsService.getInvitationLink(teamId, role).subscribe({
      next: (data) => {
        expect(data.url)
          .withContext('url start with')
          .toContain('https://example.com/ti/');
        done();
      },
      error: done.fail,
    });
  });
});

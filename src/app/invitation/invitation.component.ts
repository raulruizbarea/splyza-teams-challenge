import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Role } from '../roles/role.enum';
import { Roles } from '../roles/roles.model';
import { RolesService } from '../roles/roles.service';
import { Team } from '../teams/teams.model';
import { TeamsService } from '../teams/teams.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class InvitationComponent implements OnInit {
  teamId: string;
  team: Team;
  totalMembers: number;
  roles: Roles[];
  selectedRole: Roles;
  invitationForm: FormGroup;
  displayDialog: boolean;
  isLoading: boolean;
  isTeamFull: boolean;

  constructor(
    private teamsService: TeamsService,
    private rolesService: RolesService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.teamId = this.teamsService.getRandomId();
    this.roles = this.rolesService.getRoles();
    this.displayDialog = false;
    this.isTeamFull = false;
    this.isLoading = true;

    this.teamsService.getTeam(this.teamId).subscribe({
      next: (resData) => {
        this.team = resData;
        this.totalMembers = this.teamsService.calculateTotalMembers(this.team);
        if (
          this.team.plan.memberLimit == this.totalMembers &&
          this.team.plan.supporterLimit == this.team.members.supporters
        ) {
          this.isTeamFull = true;
          return;
        }

        this.initRoles();
        this.initForm();
      },
      error: (errorMessage) => {},
      complete: () => {},
    });
  }

  initRoles() {
    if (this.totalMembers == this.team.plan.memberLimit) {
      this.rolesService.setInactiveRole(this.roles, Role.COACH);
      this.rolesService.setInactiveRole(this.roles, Role.PLAYER);
      this.rolesService.setInactiveRole(this.roles, Role.PLAYER_COACH);
    }

    if (this.team.members.supporters == this.team.plan.supporterLimit) {
      this.rolesService.setInactiveRole(this.roles, Role.SUPPORTER);
    }

    if (this.team.plan.supporterLimit == 0) {
      this.roles = this.rolesService.excludeRole(this.roles, Role.SUPPORTER);
    }
  }

  initForm() {
    this.selectedRole = this.roles.find((role) => role.inactive == false);

    this.invitationForm = new FormGroup({
      invitationRole: new FormControl({
        value: this.selectedRole,
        disabled: this.isTeamFull,
      }),
      invitationLink: new FormControl({
        value: this.selectedRole ? this.setInvitationLink() : null,
        disabled: true,
      }),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onInvitationPermissionsChange(event: any) {
    this.selectedRole = event.value;
    this.setInvitationLink();
  }

  setInvitationLink() {
    this.isLoading = true;
    this.teamsService
      .getInvitationLink(this.teamId, this.selectedRole.role)
      .subscribe({
        next: (res) => {
          this.invitationForm.get('invitationLink').setValue(res.url);
          this.isLoading = false;
        },
        error: (errorMessage) => {},
        complete: () => {},
      });
  }

  copyInviteLink() {
    this.clipboard.copy(this.invitationForm.get('invitationLink').value);

    this.messageService.add({
      key: 'copyToast',
      severity: 'custom',
      detail: this.translateService.instant('invitation.url-copied'),
      life: 5000,
    });
  }

  sendEmail() {
    this.displayDialog = true;
  }

  onCloseDialog() {
    this.invitationForm.get('email').setValue(null);
  }

  onSubmit() {
    let invitationLink = this.invitationForm.get('email');
    window.location.href =
      'mailto:' +
      invitationLink.value +
      '?subject=Invitation link&body=Your invitation link.';
    this.displayDialog = false;
    invitationLink.reset();
  }
}

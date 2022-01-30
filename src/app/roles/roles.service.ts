import { Injectable } from '@angular/core';
import { Role } from '../roles/role.enum';
import { Roles } from './roles.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private roles: Roles[] = [
    { role: Role.COACH, inactive: false },
    { role: Role.PLAYER_COACH, inactive: false },
    { role: Role.PLAYER, inactive: false },
    { role: Role.SUPPORTER, inactive: false },
  ];

  getRoles() {
    return this.roles.slice();
  }

  setInactiveRole(roles: Roles[], inactiveRole: Role) {
    roles.find((role) => role.role == inactiveRole).inactive = true;
  }

  excludeRole(roles: Roles[], excludedRole: Role): Roles[] {
    return roles.filter((role) => role.role != excludedRole);
  }
}

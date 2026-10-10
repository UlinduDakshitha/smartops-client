export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
}

export interface Team {
  id: string;
  name: string;
  avatar: string;
  status: 'active' | 'inactive';
  description: string;
  membersCount: number;
  lead?: string;
  members?: TeamMember[];
}

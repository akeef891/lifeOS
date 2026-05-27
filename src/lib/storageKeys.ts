export const storageKeys = {
  tasks: "lifeos.tasks.v1",
  notes: "lifeos.notes.v1",
  notifications: "lifeos.notifications.v1",
  profile: "lifeos.profile.v1",
} as const;

export interface UserProfile {
  displayName: string;
  email: string;
}

export const defaultProfile: UserProfile = {
  displayName: "LifeOS User",
  email: "you@lifeos.app",
};


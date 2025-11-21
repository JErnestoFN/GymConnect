export const USER_VERIFICATION_REQUESTED = 'USER_VERIFICATION_REQUESTED' as const;

export interface UserVerificationPayload {
  userId: string;
  email: string;
}

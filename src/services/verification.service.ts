import {
  USER_VERIFICATION_REQUESTED,
  type UserVerificationPayload,
} from '@/events/user.events';

export class VerificationService {
  static async requestVerification(payload: UserVerificationPayload) {
    // TODO: integrate with real notification/event system.
    return { type: USER_VERIFICATION_REQUESTED, payload };
  }
}

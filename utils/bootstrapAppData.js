import { getCurrentUser, getUserInstitutions } from '../services/auth-client';

async function bootstrapAppData() {
  const user = await getCurrentUser();

  if (!user) {
    return { user: null };
  }
  const userId = user.data._id;
  const institutions = await getUserInstitutions(userId);

  return { user, institutions };
}

export { bootstrapAppData };

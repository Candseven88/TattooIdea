// Authentication service has been removed
// This file is kept as a placeholder to avoid import errors

// Dummy functions to avoid import errors
export const registerWithEmail = async () => ({ error: 'Authentication service has been removed' });
export const signInWithEmail = async () => ({ error: 'Authentication service has been removed' });
export const signInWithGoogle = async () => ({ error: 'Authentication service has been removed' });
export const signOut = async () => ({ success: false, error: 'Authentication service has been removed' });
export const createUserDocument = async () => null;
export const resendVerificationEmail = async () => ({ error: 'Authentication service has been removed' });
export const resetPassword = async () => ({ error: 'Authentication service has been removed' });
export const getCurrentUser = () => Promise.resolve(null);
export const onAuthStateChange = () => (() => {}); 
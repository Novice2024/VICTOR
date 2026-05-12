// Base44 removed - standalone mode
export const base44 = {
  auth: {
    me: async () => ({ name: "Victor", email: "victor@example.com" }),
    logout: () => {},
    redirectToLogin: () => {}
  }
};

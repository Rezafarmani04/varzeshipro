export {};

declare global {
  var pendingUsers: Map<
    string,
    {
      name: string;
      email: string;
      password: string;
      code: string;
      expiresAt: number;
    }
  >;
}

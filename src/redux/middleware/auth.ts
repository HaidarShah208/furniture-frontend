export function setAuthCookie(token: string): void {
  const maxAge = 7 * 24 * 60 * 60;
  document.cookie = `admin_token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function removeAuthCookie(): void {
  document.cookie = "admin_token=; path=/; max-age=0";
}

export function getAuthToken(): string {
  if (typeof window === "undefined") return "";
  return document.cookie.replace(/(?:(?:^|.*;\s*)admin_token\s*=\s*([^;]*).*$)|^.*$/, "$1");
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

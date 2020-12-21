// mock login and logout
export function setAuthData(values) {
    // add cookie
    window.sessionStorage.setItem('userData', JSON.stringify(values));

}
export function logout() {
// delete cookie
    document.cookie = "swr-test-token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
  
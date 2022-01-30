export default class Utils {
  static generateURL(length: number) {
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let url = 'https://example.com/ti/';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      url += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return url;
  }
}

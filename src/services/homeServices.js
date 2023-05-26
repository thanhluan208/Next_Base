import httpService from './httpService';

class homeServices {
  getListComment() {
    return httpService.get('https://jsonplaceholder.typicode.com/comments');
  }
}

export default new homeServices();

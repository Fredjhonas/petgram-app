import {API_BASE} from '@env'

class CategoryService {
   async getCategories() {
       try {
           let categories = await fetch(`${API_BASE}/categories`);
           return categories.json().then(data => data);
       } catch (error) {
           console.log('Error categories: ', error);
           return { error: true}
       }
   }
}

export default new CategoryService();
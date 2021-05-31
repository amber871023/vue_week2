const url = 'https://vue3-course-api.hexschool.io/'; 
const path = 'amber-hexschool';

const app = {
  data: {
  products: [],      
},
//取得產品
  getData(){
    axios.get(`${url}api/${path}/admin/products`)
    .then(res =>{
      console.log(res);
      if(res.data.success){
        this.data.products = res.data.products;
        console.log(this.data.products);
        this.render();
      } else {
        alert(res.data.message);
        window.location = 'index.html';
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },

  render(){
    const productListDom = document.querySelector('#productList');
    const productCount = document.querySelector("#productCount");
    let str = '';
    this.data.products.forEach((item,index) =>{
      str+= `
      <tr>
      <td>${item.title}</td>
      <td width="120">
      ${item.origin_price}
      </td>
      <td width="120">
      ${item.price}
      </td>
      <td width="100">
      <div class="form-check form-switch">
      <input class="form-check-input isEnabled" type="checkbox" data-event="status" data-id="${item.id}" ${item.is_enabled ? 'checked' : ''}>
      <label class="form-check-label" for="enabled${index}">${item.is_enabled ? '啟用' : '未啟用'}</label>
</div>
      </td>
      <td width="120">
        <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
      </td>
    </tr>`;
    });
    productListDom.innerHTML = str;
    productCount.textContent = this.data.products.length;

    const delBtns = document.querySelectorAll(".deleteBtn");
    delBtns.forEach(item => {
      item.addEventListener('click', this.deleteData.bind(this));
    })

    const enabledChecks = document.querySelectorAll('.isEnabled');
    enabledChecks.forEach(item => {
      item.addEventListener('click', this.changeEnabled.bind(this));
    })
  },
//刪除單一產品
  deleteData(e){
    const productId = e.target.dataset.id;
    axios.delete(`${url}api/${path}/admin/product/${productId}`)
      .then(res =>{
        if (res.data.success) {
          this.getData(); //this指向不同 若要使用this.getData() 行52要加.bind(this)
      } else {
          alert(res.data.message);
      }
  })
  .catch(err => {
      console.log(err);
  });
  },
  //更改產品狀態
  changeEnabled(e){
    const productId = e.target.dataset.id;
    this.data.products.forEach(item => {
      if (item.id == productId) {
        item.is_enabled = !item.is_enabled;
      };
        axios.put(`${url}api/${path}/admin/product/${productId}`)
          .then(res => {
           if (res.data.success) {
             this.render();
           } else {
             alert(res.data.message);
           }
         })
         .catch(err => {
           console.log(err);
          });
      });
  },
      
  created(){
     // 取得 token，將 token 放到 header 傳送驗證
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;

    this.getData();
  }
}
app.created();
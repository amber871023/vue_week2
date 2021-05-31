const url = 'https://vue3-course-api.hexschool.io/'; 
const path = 'amber-hexschool';

const usernameInput = document.querySelector('#username');
const pwInput = document.querySelector('#password');
const loginBtn = document.querySelector('#login');

loginBtn.addEventListener('click', login);

  function login() {
    const username = usernameInput.value;
    const password = pwInput.value;
    const user = {
      username,
      password
    }

    axios.post(`${url}admin/signin`,user) 
      .then(res =>{
        console.log(res);
        if(res.data.success){
          const token= res.data.token;
          const expired = res.data.expired;
          //const {token,expired} = res.data
          console.log(token,expired); 
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          window.location ='product.html';
        }else{
          alert(res.data.message);
        }
      }).catch(err =>{
        console.log(err);
      });
  }
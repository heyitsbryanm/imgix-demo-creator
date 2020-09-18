let axios = require('axios');

myFunc = () => {
    return axios.get('http://bryansandbox.imgix.net/_static/images/img02.jpg?w=300&auto=compress').then(response=>{
        console.log(response.headers["content-length"])
    })
}

myFunc();
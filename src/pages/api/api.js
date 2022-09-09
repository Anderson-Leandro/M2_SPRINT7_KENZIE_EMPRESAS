export class Api {
      static baseUrl = "http://localhost:6278"
      static headers = {
            "Content-Type": "application/json"
      }


      static async createUser(data) {
            const userCreate = fetch(`${this.baseUrl}/auth/register/user`, {
                  method: "POST",
                  headers: this.headers,
                  body: JSON.stringify(data)
            })
                  // .then(resp => {
                  //       console.log(resp)
                  //       if (resp.ok) {
                  //             return resp.json()
                  //       }
                  //       else {
                  //             resp.json().then((response) => {
                  //                   Toastify({
                  //                         text: `Error: \n ${response.error}`,
                  //                         duration: 3000,
                  //                         close: false,
                  //                         gravity: "top", // `top` or `bottom`
                  //                         position: "center", // `left`, `center` or `right`
                  //                         stopOnFocus: true, // Prevents dismissing of toast on hover
                  //                         style: {
                  //                               background: "red",
                  //                         }
                  //                   }).showToast();
                  //             })
                  //       }
                  // })
                  // .then(resp => {
                  //       if (resp) {
                  //             console.log(resp)
                  //             Toastify({
                  //                   text: `Cadastro realizado com sucesso`,
                  //                   duration: 3000,
                  //                   close: false,
                  //                   gravity: "top", // `top` or `bottom`
                  //                   position: "center", // `left`, `center` or `right`
                  //                   stopOnFocus: true, // Prevents dismissing of toast on hover
                  //                   style: {
                  //                         background: "green",
                  //                   }
                  //             }).showToast();
                  //       }

                  //       return resp
                  // })

                  .then(resp => resp.json())
                  .then(resp => {
                        console.log(resp)
                        return resp
                  })
                  .catch(err => console.log(err))

            return userCreate
      }





      static async login(data) {
            const userLogin = fetch(`${this.baseUrl}/auth/login`, {
                  method: "POST",
                  headers: this.headers,
                  body: JSON.stringify(data)
            })
                  .then(resp => {
                        if (resp.ok) {
                              return resp.json()
                        }
                        else {
                              resp.json().then((response) => {
                                    Toastify({
                                          text: `Error: \n ${response.error}`,
                                          duration: 3000,
                                          close: false,
                                          gravity: "top", // `top` or `bottom`
                                          position: "center", // `left`, `center` or `right`
                                          stopOnFocus: true, // Prevents dismissing of toast on hover
                                          style: {
                                                background: "red",
                                          }
                                    }).showToast();
                              })
                        }
                  })
                  .then(resp => {
                        if (resp) {
                              localStorage.setItem("KenzieEmpresas:token", resp.token)
                              localStorage.setItem("KenzieEmpresas:uuid", resp.uuid)
                              Toastify({
                                    text: `Login realizado com sucesso`,
                                    duration: 3000,
                                    close: false,
                                    gravity: "top", // `top` or `bottom`
                                    position: "center", // `left`, `center` or `right`
                                    stopOnFocus: true, // Prevents dismissing of toast on hover
                                    style: {
                                          background: "green",
                                    }
                              }).showToast();

                             setTimeout(() => window.location.replace("src/pages/dashboard/dashboard.html"), 2800) 
                        }

                        return resp
                  })

            return userLogin
      }


      static listCompanies(sector = "") {
            const companies = fetch(`${this.baseUrl}/companies/${sector}`, {
                  method: "GET",
                  headers: this.headers
            })
                  .then(resp => resp.json())
                  .then(resp => resp)
                  .catch(err => console.log(err))

            return companies
      }




}
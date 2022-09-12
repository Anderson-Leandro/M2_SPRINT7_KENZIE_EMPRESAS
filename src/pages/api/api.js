export class Api {
      static baseUrl = "http://localhost:6278"
      static headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("KenzieEmpresas:token")}`
      }


      static async createUser(data) {
            const userCreate = fetch(`${this.baseUrl}/auth/register/user`, {
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
                              Toastify({
                                    text: `Cadastro realizado com sucesso`,
                                    duration: 3000,
                                    close: false,
                                    gravity: "top", // `top` or `bottom`
                                    position: "center", // `left`, `center` or `right`
                                    stopOnFocus: true, // Prevents dismissing of toast on hover
                                    style: {
                                          background: "green",
                                    }
                              }).showToast();
                        }

                        return resp
                  })



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



      static registerCompanie(data) {
            console.log(data)
            const companie = fetch(`${this.baseUrl}/companies`, {
                  method: "POST",
                  headers: this.headers,
                  body: JSON.stringify(data)
            })
                  .then(resp => {
                        console.log(resp)
                        return resp.json()
                  })
                  .then(resp => {
                        console.log(resp)
                        return resp
                  })
                  .catch(err => console.log(err))

            return companie
      }


      static listSectors() {
            const sectors = fetch(`${this.baseUrl}/sectors`, {
                  method: "GET",
                  headers: this.headers
            })
                  .then(resp => resp.json())
                  .then(resp => resp)
                  .catch(err => console.log(err))

            return sectors
      }


      static listDepartments(companieId = "") {
            const sectors = fetch(`${this.baseUrl}/departments/${companieId}`, {
                  method: "GET",
                  headers: this.headers
            })
                  .then(resp => resp.json())
                  .then(resp => resp)
                  .catch(err => console.log(err))

            return sectors
      }


      static listUsers() {
            const users = fetch(`${this.baseUrl}/users`, {
                  method: "GET",
                  headers: this.headers
            })
                  .then(resp => resp.json())
                  .then(resp => resp)
                  .catch(err => console.log(err))

            return users
      }

      static createDepartment(data) {

            const department = fetch(`${this.baseUrl}/departments`, {
                  method: "POST",
                  headers: this.headers,
                  body: JSON.stringify(data)
            })
                  .then(resp => {
                        console.log(resp)
                        return resp.json()
                  })
                  .then(resp => {
                        console.log(resp)
                        return resp
                  })
                  .catch(err => console.log(err))

            return department

      }


      static editDepartment(data, departmentId) {

            const department = fetch(`${this.baseUrl}/departments/${departmentId}`, {
                  method: "PATCH",
                  headers: this.headers,
                  body: JSON.stringify(data)
            })
                  .then(resp => {
                        console.log(resp)
                        return resp.json()
                  })
                  .then(resp => {
                        console.log(resp)
                        return resp
                  })
                  .catch(err => console.log(err))

            return department

      }


      static deleteDepartment(departmentId) {

            const department = fetch(`${this.baseUrl}/departments/${departmentId}`, {
                  method: "Delete",
                  headers: this.headers,

            })
                  .then(resp => {
                        console.log(resp)
                        return resp
                  })
                  .catch(err => console.log(err))

            return department

      }


      static avaliableEmployes() {
            const employes = fetch(`${this.baseUrl}/admin/out_of_work`, {
                  method: "GET",
                  headers: this.headers
            })
                  .then(resp => resp.json())
                  .then(resp => resp)
                  .catch(err => console.log(err))

            return employes
      }


      static hireEmploye(data) {

            const employe = fetch(`${this.baseUrl}/departments/hire`, {
                  method: "PATCH",
                  headers: this.headers,
                  body: JSON.stringify(data)
            })
                  .then(resp => {
                        console.log(resp)
                        return resp.json()
                  })
                  .then(resp => {
                        console.log(resp)
                        return resp
                  })
                  .catch(err => console.log(err))

            return employe

      }



      static editEmploy(data, employeId) {

            const employe = fetch(`${this.baseUrl}/admin/update_user/${employeId}`, {
                  method: "PATCH",
                  headers: this.headers,
                  body: JSON.stringify(data)
            })
                  .then(resp => {
                        console.log(resp)
                        return resp.json()
                  })
                  .then(resp => {
                        console.log(resp)
                        return resp
                  })
                  .catch(err => console.log(err))

            return employe

      }


      static fireEmploye(employeId){
            const employe = fetch(`${this.baseUrl}/departments/dismiss/${employeId}`, {
                  method: "PATCH",
                  headers: this.headers
            })
                  .then(resp => {
                        console.log(resp)
                        return resp.json()
                  })
                  .then(resp => {
                        console.log(resp)
                        return resp
                  })
                  .catch(err => console.log(err))

            return employe
      }


}
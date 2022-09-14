import { Api } from "../api/api.js"

class Home {
      static modalController() {
            const modalBtn = document.querySelector("header")

            modalBtn.addEventListener("click", (event) => {
                  const target = event.target

                  if (target.tagName == "SPAN" && target.innerText == "Login") {
                        Home.modalHome()
                  }
                  else if (target.tagName == "SPAN" && target.innerText == "Cadastre-se") {
                        Home.modalHome("SignUp")
                  }
            })
      }


      static modalHome(type) {
            const section = document.createElement("section")
            section.classList = "modal"
            section.id = "modalHome"

            const div = document.createElement("div")

            const h2 = document.createElement("h2")
            h2.classList = "font-title-2 color-grey-2"
            h2.innerText = "Login"

            const buttonClose = document.createElement("button")
            buttonClose.classList = "button-close"
            buttonClose.id = "closeModalHome"
            buttonClose.innerText = "X"
            buttonClose.addEventListener("click", () => {
                  document.querySelector("#modalHome").remove()
            })

            const form = document.createElement("form")
            form.id = "formlogin"

            const inputEmail = document.createElement("input")
            inputEmail.name = "email"
            inputEmail.type = "email"
            inputEmail.classList = "input-default input-2"
            inputEmail.placeholder = "Digite seu email..."


            const inputPassword = document.createElement("input")
            inputPassword.name = "password"
            inputPassword.type = "password"
            inputPassword.classList = "input-default input-2"
            inputPassword.placeholder = "Digite sua senha..."


            const button = document.createElement("button")
            button.classList = "button-default button-3 button-width"
            button.type = "submit"
            button.id = "btnLogin"
            button.innerText = "Entrar"


            if (type == "SignUp") {
                  const inputProfessionalLevel = document.createElement("input")
                  inputProfessionalLevel.name = "professional_level"
                  inputProfessionalLevel.classList = "input-default input-2"
                  inputProfessionalLevel.placeholder = "Digite seu nivel profissional..."


                  const inputUsername = document.createElement("input")
                  inputUsername.name = "username"
                  inputUsername.classList = "input-default input-2"
                  inputUsername.placeholder = "Digite seu nome de usuário..."

                  h2.innerText = "Cadastre-se"

                  form.id = "formSignUp"

                  button.id = "btnSignUp"
                  button.innerText = "Cadastrar"

                  form.append(inputEmail, inputPassword, inputProfessionalLevel, inputUsername, button)

                  form.addEventListener("submit", (event) => {
                        event.preventDefault()

                        const inputs = [...form]
                        inputs.splice(-1, 1)

                        const obj = {}
                        inputs.forEach(element => {
                              return obj[element.name] = element.value
                        })

                        Api.createUser(obj)
                        window.location.reload()
                  })

            }
            else {
                  form.append(inputEmail, inputPassword, button)

                  form.addEventListener("submit", (event) => {
                        event.preventDefault()

                        const inputs = [...form]
                        inputs.splice(-1, 1)


                        const obj = {}
                        inputs.forEach(element => {
                              return obj[element.name] = element.value
                        })

                        Api.login(obj)
                  })
            }

            div.append(h2, buttonClose, form)

            section.append(div)

            return document.querySelector("body").append(section)

      }


      static partnersCard(partner) {

            const li = document.createElement("li")

            const h3 = document.createElement("h3")
            h3.classList = "font-title-4"
            h3.innerText = partner.name

            const spanDesc = document.createElement("span")
            spanDesc.classList = "font-text-2"
            spanDesc.innerText = partner.description

            const spanHour = document.createElement("span")
            spanHour.classList = "font-text-2"
            spanHour.innerText = `Abre às ${partner.opening_hours}`

            const spanSector = document.createElement("span")
            spanSector.classList = "font-text-3"
            spanSector.innerText = partner.sectors.description

            li.append(h3, spanDesc, spanHour, spanSector)

            return li
      }

      static sectorOptions(sector){
            const option = document.createElement("option")

            option.value = sector
            option.innerText = sector

            return option
      }



      static async listPartners(sector = "") {
            const allPartners = await Api.listCompanies(sector)

            const ul = document.querySelector("#partners")            

            ul.innerHTML = ""

            allPartners.forEach(element => {
                  ul.append(this.partnersCard(element))
            })            

            return ul
      }

      static async listAllSectors(){
            const allPartners = await Api.listCompanies()

            const sectors = []

            const select = document.querySelector("#partnersSelect")

            allPartners.forEach(element => {                  
                  if(!sectors.includes(element.sectors.description)){
                        sectors.push(element.sectors.description)
                  }
            })

            sectors.forEach(element => {
                  select.append(this.sectorOptions(element))
            })


            return select
      }


      static selectSector(){

            const select = document.querySelector("#partnersSelect")

            select.addEventListener("change", (event) => {
                  
                  if(event.target.value == "all"){
                        this.listPartners()
                  }
                  else{
                        this.listPartners(event.target.value)
                  }
            })

            return select
      }



}

Home.modalController()
Home.listPartners()
Home.selectSector()
Home.listAllSectors()
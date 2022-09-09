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
                        console.log(event)
                        event.preventDefault()

                        const inputs = [...form]
                        inputs.splice(-1, 1)

                        const obj = {}
                        inputs.forEach(element => {
                              return obj[element.name] = element.value
                        })

                        Api.createUser(obj)                        
                  })                  

            }
            else{
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


      

}

Home.modalController()
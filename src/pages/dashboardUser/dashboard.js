import { Api } from "../api/api.js"

class UserDashboard {

      static logout() {
            const btnLogout = document.querySelector("#logout")

            btnLogout.addEventListener("click", () => {
                  localStorage.removeItem("KenzieEmpresas:token")
                  localStorage.removeItem("KenzieEmpresas:uuid")

                  window.location.replace("../../../index.html")
            })
      }

      static async listCoworkers() {
            const ul = document.querySelector("#coworkersList")
            ul.innerHTML = ""

            const coworkers = await Api.coworkers()

            if (coworkers == false) {
                  return false
            }

            this.departmentInformation(coworkers[0])
            this.myCompanie(coworkers[0])

            coworkers[0].users.forEach(element => {
                  // ul.append(this.employeCard(element))
                  if (localStorage.getItem("KenzieEmpresas:uuid") != element.uuid) {
                        ul.append(this.employeCard(element))
                  }
            })

            if (ul.children.length < 1) {
                  const li = document.createElement("li")
                  const p = document.createElement("p")
                  p.innerText = "Não existem outros funcionarios para esse departamento"

                  li.append(p)

                  ul.append(li)
            }

            return ul
      }

      static employeCard(employe) {

            const li = document.createElement("li")
            li.id = employe.uuid

            const h3 = document.createElement("h3")
            h3.innerText = employe.username

            const pLevel = document.createElement("p")
            pLevel.innerText = `Cargo: ${employe.professional_level}`

            const pWork = document.createElement("p")
            pWork.innerText = `Modalidade: ${employe.kind_of_work}`


            li.append(h3, pLevel, pWork)

            return li
      }

      static departmentInformation(department) {

            console.log(department)
            const section = document.querySelector("#departmentInformation")

            section.innerHTML = ""

            const pName = document.createElement("p")
            pName.innerText = department.name

            const pDesc = document.createElement("p")
            pDesc.innerText = department.description

            return section.append(pName, pDesc)

      }

      static async myCompanie(id) {

            const companies = await Api.listCompanies()

            const companieName = document.querySelector("#companieName")

            companies.forEach(element => {
                  if (element.uuid == id.company_uuid) {
                        companieName.innerText = element.name
                        companieName.classList.remove("font-title-3 align-center")
                  }
            })

            return companieName
      }

      static buttonEditData() {
            const btn = document.querySelector("#myData")

            btn.addEventListener("click", () => {
                  this.modalEditData()
            })
      }

      static modalEditData() {
            const section = document.createElement("section")
            section.id = "modal"
            section.classList = "modal"

            const div = document.createElement("div")

            const h2 = document.createElement("h2")
            h2.innerText = "Meus dados"

            const btnClose = document.createElement("button")
            btnClose.classList = "button-close"
            btnClose.innerText = "X"
            btnClose.addEventListener("click", () => {
                  document.querySelector("#modal").remove()
            })

            const form = document.createElement("form")

            const inputUsername = document.createElement("input")
            inputUsername.name = "username"
            inputUsername.classList = "input-default input-2"
            inputUsername.placeholder = "Digite seu novo nome de usuário"

            const inputEmail = document.createElement("input")
            inputEmail.name = "email"
            inputEmail.type = "email"
            inputEmail.classList = "input-default input-2"
            inputEmail.placeholder = "Digite seu novo email"

            const inputPassword = document.createElement("input")
            inputPassword.name = "password"
            inputPassword.type = "password"
            inputPassword.classList = "input-default input-2"
            inputPassword.placeholder = "Digite sua nova senha"

            const button = document.createElement("button")
            button.innerText = "Atualizar"
            button.classList = "button-default button-3 button-width"

            form.append(inputUsername, inputEmail, inputPassword, button)

            form.addEventListener("submit", (event) => {
                  event.preventDefault()

                  const inputs = [...form]
                  inputs.splice(-1, 1)

                  const obj = {}

                  inputs.forEach(element => {
                        if (element.value) {
                              console.log(element)
                              return obj[element.name] = element.value
                        }

                  })

                  console.log(obj)
                  Api.editUser(obj)
                  window.location.reload()
            })

            div.append(h2, btnClose, form)

            section.append(div)

            return document.querySelector("body").append(section)
      }


      static async typeOfUser() {
            const user = await Api.aboutUser()

            console.log(user)
      }





}

UserDashboard.logout()
UserDashboard.listCoworkers()
UserDashboard.buttonEditData()
UserDashboard.typeOfUser()

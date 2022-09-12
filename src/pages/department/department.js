import { Api } from "../api/api.js"

export class Department {

      static departmentCards(department) {

            const li = document.createElement("li")
            li.id = department.uuid
            li.addEventListener("click", async (event) => {
                  let target = event.target

                  if (target.tagName == "H3" || target.tagName == "P") {
                        target = event.target.parentElement
                  }

                  const idToAppend = target.parentElement.parentElement.id

                  const liToAppend = document.getElementById(idToAppend)


                  const div = await this.departmentEmployes(target.id)

                  console.log(div.children)
                  console.log(div.children.length)

                  if (div.children.length > 0) {
                        liToAppend.append(div)
                  }

            })

            const h3 = document.createElement("h3")
            h3.innerText = department.name

            const p = document.createElement("p")
            p.innerText = department.description


            li.append(h3, p)

            return li
      }

      static async companieDepartments(companieId) {
            const departments = await Api.listDepartments(companieId)

            const ul = document.createElement("ul")
            ul.classList = "companies carrossel"

            if (departments == false) {
                  const li = document.createElement("li")
                  const p = document.createElement("p")
                  p.innerText = "Não existe departamentos para essa empresa"

                  li.append(p)

                  ul.append(li)

                  return ul
            }

            departments.forEach(element => {
                  ul.append(this.departmentCards(element))
            });

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

      static async departmentEmployes(departmentId) {
            const employes = await Api.listUsers()

            if (document.querySelector("#employes")) {
                  document.querySelector("#employes").remove()
            }

            const ul = document.createElement("ul")
            ul.classList = "companies carrossel"



            employes.forEach(element => {
                  if (element.department_uuid == departmentId) {
                        ul.append(this.employeCard(element))
                  }
            })

            const div = document.createElement("div")
            div.id = "employes"

            const title = document.createElement("h4")
            title.innerText = "Funcionarios do departamento:"


            if (ul.children.length > 0) {

                  div.append(title, ul)

                  return div
            }
            return div
      }


      static async loadPage() {
            const h2 = document.querySelector("#companieName")
            h2.innerText = sessionStorage.getItem("Companie:Name")

            const departments = document.querySelector("#allDepartments")

            departments.append(await this.companieDepartments(sessionStorage.getItem("Companie:Id")))


            const sectionEmployes = document.querySelector("#allEmployes")

            sectionEmployes.append(await this.listCompanieEmployes())


            const departmentOptions = document.querySelector("#departmentOptions")

            departmentOptions.addEventListener("change", (event) => {
                  const value = event.target.value

                  if (value == "create") {
                        return this.modalCreateDepartment()
                  }
                  if (value == "edit") {
                        return this.modalEditDepartment()
                  }
                  if (value == "delete") {
                        return this.deleteDepartment()
                  }

            })


            const employesOptions = document.querySelector("#employeOptions")

            employesOptions.addEventListener("change", (event) => {
                  const value = event.target.value

                  console.log(value)

                  if (value == "hire") {
                        return this.hireEmploye()
                  }
                  if (value == "edit") {
                        return this.editEmploye()
                  }
                  if (value == "delete") {
                        return this.fireEmploye()
                  }
            })


      }

      static async listCompanieEmployes() {
            const ul = document.createElement("ul")
            ul.classList = "companies carrossel"

            // const companieDepartments = await Api.listDepartments(sessionStorage.getItem("Companie:Id"))

            // const allEmployes = await Api.listUsers()


            // companieDepartments.forEach(department => {
            //       allEmployes.forEach(employe => {
            //             if(department.uuid == employe.department_uuid){
            //                   ul.append(this.employeCard(employe))
            //             }
            //       })
            // })

            const companieEmployes = await this.allEmployes()

            companieEmployes.forEach(element => {
                  ul.append(this.employeCard(element))
            })

            if (ul.children.length < 1) {
                  const li = document.createElement("li")
                  const p = document.createElement("p")
                  p.innerText = "Não existe funcionarios para essa empresa"

                  li.append(p)

                  ul.append(li)
            }

            return ul

      }

      static async allEmployes() {
            const companieDepartments = await Api.listDepartments(sessionStorage.getItem("Companie:Id"))

            const allEmployes = await Api.listUsers()

            const companieEmployes = []


            companieDepartments.forEach(department => {
                  allEmployes.forEach(employe => {
                        if (department.uuid == employe.department_uuid) {
                              companieEmployes.push(employe)
                        }
                  })
            })

            return companieEmployes
      }

      static modalCreateDepartment() {
            const section = document.createElement("section")
            section.id = "modal"
            section.classList = "modal"

            const div = document.createElement("div")

            const h2 = document.createElement("h2")
            h2.innerText = "Criar departamento"

            const btnClose = document.createElement("button")
            btnClose.classList = "button-close"
            btnClose.innerText = "X"
            btnClose.addEventListener("click", () => {
                  document.querySelector("#modal").remove()
            })

            const form = document.createElement("form")

            const inputName = document.createElement("input")
            inputName.name = "name"
            inputName.classList = "input-default input-2"
            inputName.placeholder = "Digite o nome do departamento"

            const inputDesc = document.createElement("input")
            inputDesc.name = "description"
            inputDesc.classList = "input-default input-2"
            inputDesc.placeholder = "Digite a descrição do departamento"

            const button = document.createElement("button")
            button.innerText = "Criar departamento"
            button.classList = "button-default button-3 button-width"

            form.append(inputName, inputDesc, button)

            form.addEventListener("submit", (event) => {
                  event.preventDefault()

                  const inputs = [...form]
                  inputs.splice(-1, 1)

                  const obj = {}

                  inputs.forEach(element => {
                        return obj[element.name] = element.value
                  })

                  obj.company_uuid = sessionStorage.getItem("Companie:Id")

                  Api.createDepartment(obj)
                  window.location.reload()
            })

            div.append(h2, btnClose, form)

            section.append(div)

            return document.querySelector("body").append(section)
      }

      static createDepartmentOptions(department) {
            const option = document.createElement("option")

            option.innerText = department.name
            option.value = department.uuid

            return option
      }


      static async modalEditDepartment() {
            const section = document.createElement("section")
            section.id = "modal"
            section.classList = "modal"

            const div = document.createElement("div")
            div.id = "modalDepartment"

            const h2 = document.createElement("h2")
            h2.innerText = "Editar departamento"


            const btnClose = document.createElement("button")
            btnClose.classList = "button-close"
            btnClose.innerText = "X"
            btnClose.addEventListener("click", () => {
                  document.querySelector("#modal").remove()
            })



            const select = document.createElement("select")
            select.classList = "input-default input-2"

            const option = document.createElement("option")
            option.innerText = "Selecione um departamento"

            select.append(option)

            const companieDepartments = await Api.listDepartments(sessionStorage.getItem("Companie:Id"))

            companieDepartments.forEach(element => {
                  select.append(this.createDepartmentOptions(element))
            })



            const form = document.createElement("form")

            const inputDesc = document.createElement("input")
            inputDesc.name = "description"
            inputDesc.classList = "input-default input-2"
            inputDesc.placeholder = "Digite a nova descrição do departamento"

            const button = document.createElement("button")
            button.innerText = "Atualizar descrição"
            button.classList = "button-default button-3 button-width"



            form.addEventListener("submit", (event) => {
                  event.preventDefault()

                  const inputs = [...form]
                  inputs.splice(-1, 1)

                  const obj = {}

                  inputs.forEach(element => {
                        return obj[element.name] = element.value
                  })

                  const departmentId = select.value

                  Api.editDepartment(obj, departmentId)
                  window.location.reload()
            })

            form.append(inputDesc, button)

            div.append(h2, btnClose, select, form)

            section.append(div)

            return document.querySelector("body").append(section)

      }


      static async deleteDepartment() {

            const section = document.createElement("section")
            section.id = "modal"
            section.classList = "modal"

            const div = document.createElement("div")
            div.id = "modalDepartment"

            const h2 = document.createElement("h2")
            h2.innerText = "Deletar departamento"

            const btnClose = document.createElement("button")
            btnClose.classList = "button-close"
            btnClose.innerText = "X"
            btnClose.addEventListener("click", () => {
                  document.querySelector("#modal").remove()
            })



            const select = document.createElement("select")
            select.classList = "input-default input-2"

            const option = document.createElement("option")
            option.innerText = "Selecione um departamento"

            select.append(option)

            const companieDepartments = await Api.listDepartments(sessionStorage.getItem("Companie:Id"))

            companieDepartments.forEach(element => {
                  select.append(this.createDepartmentOptions(element))
            })

            const button = document.createElement("button")
            button.innerText = "Deletar departamento"
            button.classList = "button-default button-3 button-width"

            button.addEventListener("click", () => {
                  Api.deleteDepartment(select.value)
                  window.location.reload()
            })

            div.append(h2, btnClose, select, button)

            section.append(div)

            return document.querySelector("body").append(section)

      }

      static createEmployeOptions(employe) {
            const option = document.createElement("option")
            option.value = employe.uuid
            option.innerText = `${employe.username} | ${employe.professional_level} | ${employe.kind_of_work}`

            return option
      }


      static async hireEmploye() {
            const section = document.createElement("section")
            section.id = "modal"
            section.classList = "modal"

            const div = document.createElement("div")

            const btnClose = document.createElement("button")
            btnClose.classList = "button-close"
            btnClose.innerText = "X"
            btnClose.addEventListener("click", () => {
                  document.querySelector("#modal").remove()
            })

            const employes = await Api.avaliableEmployes()

            const select = document.createElement("select")
            select.name = "user_uuid"
            select.classList = "input-default input-2"

            const option = document.createElement("option")
            option.innerText = "Selecione um funcionario..."

            select.append(option)

            employes.forEach(element => {
                  select.append(this.createEmployeOptions(element))
            })

            const departments = await Api.listDepartments(sessionStorage.getItem("Companie:Id"))

            const selectDepartment = document.createElement("select")
            selectDepartment.name = "department_uuid"
            selectDepartment.classList = "input-default input-2"

            const optionDepartment = document.createElement("option")
            optionDepartment.innerText = "Selecione um departamento..."

            selectDepartment.append(optionDepartment)

            departments.forEach(element => {
                  selectDepartment.append(this.createDepartmentOptions(element))
            })

            const button = document.createElement("button")
            button.innerText = "Contratar"
            button.classList = "button-default button-3 button-width"


            button.addEventListener("click", () => {
                  const obj = {
                        user_uuid: select.value,
                        department_uuid: selectDepartment.value
                  }

                  Api.hireEmploye(obj)
                  window.location.reload()
            })

            div.append(btnClose, select, selectDepartment, button)

            section.append(div)

            return document.querySelector("body").append(section)

      }


      static async editEmploye() {
            const section = document.createElement("section")
            section.id = "modal"
            section.classList = "modal"

            const div = document.createElement("div")

            const btnClose = document.createElement("button")
            btnClose.classList = "button-close"
            btnClose.innerText = "X"
            btnClose.addEventListener("click", () => {
                  document.querySelector("#modal").remove()
            })

            const departments = await Api.listDepartments(sessionStorage.getItem("Companie:Id"))

            const selectDepartment = document.createElement("select")
            selectDepartment.name = "department_uuid"
            selectDepartment.classList = "input-default input-2"

            const optionDepartment = document.createElement("option")
            optionDepartment.innerText = "Selecione um departamento..."

            selectDepartment.append(optionDepartment)

            departments.forEach(element => {
                  selectDepartment.append(this.createDepartmentOptions(element))
            })


            selectDepartment.addEventListener("change", (event) => {
                  const value = event.target.value

                  employes.forEach(element => {
                        if (element.department_uuid == value) {
                              select.append(this.createEmployeOptions(element))
                        }
                  })

            })


            const employes = await this.allEmployes()

            const select = document.createElement("select")
            select.name = "user_uuid"
            select.classList = "input-default input-2"

            const option = document.createElement("option")
            option.innerText = "Selecione um funcionario..."

            select.append(option)



            const selectWork = document.createElement("select")
            selectWork.name = "kind_of_work"
            selectWork.classList = "input-default input-2"

            const option0 = document.createElement("option")
            option0.innerText = "Selecione um tipo de trabalho"

            const option1 = document.createElement("option")
            option1.innerText = "Home Office"
            option1.value = "home office"

            const option2 = document.createElement("option")
            option2.innerText = "Presencial"
            option2.value = "presencial"

            const option3 = document.createElement("option")
            option3.innerText = "Hibrido"
            option3.value = "hibrido"

            selectWork.append(option0, option1, option2, option3)


            const selectLevel = document.createElement("select")
            selectLevel.name = "professional_level"
            selectLevel.classList = "input-default input-2"

            const option4 = document.createElement("option")
            option4.innerText = "Selecione um cargo"

            const option5 = document.createElement("option")
            option5.innerText = "Júnior"
            option5.value = "júnior"

            const option6 = document.createElement("option")
            option6.innerText = "Pleno"
            option6.value = "pleno"

            const option7 = document.createElement("option")
            option7.innerText = "Sênior"
            option7.value = "sênior"

            const option8 = document.createElement("option")
            option8.innerText = "Estagiario"
            option8.value = "estágio"

            selectLevel.append(option4, option8, option5, option6, option7)


            const button = document.createElement("button")
            button.innerText = "Atualizar"
            button.classList = "button-default button-3 button-width"

            button.addEventListener("click", () => {
                  const obj = {
                        kind_of_work: selectWork.value,
                        professional_level: selectLevel.value
                  }

                  Api.editEmploy(obj, select.value)
                  window.location.reload()
            })

            div.append(btnClose, selectDepartment, select, selectWork, selectLevel, button)

            section.append(div)

            return document.querySelector("body").append(section)
      }


      static async fireEmploye(){

            const section = document.createElement("section")
            section.id = "modal"
            section.classList = "modal"

            const div = document.createElement("div")

            const btnClose = document.createElement("button")
            btnClose.classList = "button-close"
            btnClose.innerText = "X"
            btnClose.addEventListener("click", () => {
                  document.querySelector("#modal").remove()
            })

            const departments = await Api.listDepartments(sessionStorage.getItem("Companie:Id"))

            const selectDepartment = document.createElement("select")
            selectDepartment.name = "department_uuid"
            selectDepartment.classList = "input-default input-2"

            const optionDepartment = document.createElement("option")
            optionDepartment.innerText = "Selecione um departamento..."

            selectDepartment.append(optionDepartment)

            departments.forEach(element => {
                  selectDepartment.append(this.createDepartmentOptions(element))
            })

           
            selectDepartment.addEventListener("change", (event) => {
                  const value = event.target.value

                  employes.forEach(element => {
                        if (element.department_uuid == value) {
                              select.append(this.createEmployeOptions(element))
                        }
                  })

            })


            const employes = await this.allEmployes()

            const select = document.createElement("select")
            select.name = "user_uuid"
            select.classList = "input-default input-2"

            const option = document.createElement("option")
            option.innerText = "Selecione um funcionario..."

            select.append(option)

            const button = document.createElement("button")
            button.innerText = "Demitir"
            button.classList = "button-default button-3 button-width"

            button.addEventListener("click", () => {                 

                  Api.fireEmploye(select.value)
                  window.location.reload()
            })


            div.append(btnClose, selectDepartment, select, button)

            section.append(div)

            return document.querySelector("body").append(section)
      }








}


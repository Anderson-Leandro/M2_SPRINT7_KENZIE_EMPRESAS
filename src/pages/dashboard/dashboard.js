import { Api } from "../api/api.js"
import { Department } from "../department/department.js"



class Dashboard {



      static async listAllAvaliableSectors(){
            const allPartners = await Api.listCompanies()

            const sectors = []

            const ul = document.querySelector("#companiesSectors")

            allPartners.forEach(element => {                  
                  if(!sectors.includes(element.sectors.description)){
                        sectors.push(element.sectors.description)
                  }
            })

            ul.innerHTML = ""

            sectors.forEach(element => {
                  ul.append(this.cardSectors(element))
            })           


            return sectors
      }

      static cardSectors(sector){
            const li = document.createElement("li")
            li.classList = "font-text-1 text-center width-45"
            li.innerText = sector
            li.id = sector

            li.addEventListener("click", () => {
                  const title = document.querySelector("#listTitle")
                  title.innerText = sector
                  this.companiesBySector(li.id)
            })

            return li

      }


      static async modalCreateCompanie(){

            const section = document.createElement("section")
            section.id = "registerCompanie"
            section.classList = "modal"

            const div = document.createElement("div")

            const h2 = document.createElement("h2")
            h2.innerText = "Criar empresa"

            const btnClose = document.createElement("button")
            btnClose.classList = "button-close"
            btnClose.innerText = "X"
            btnClose.addEventListener("click", () => {
                  document.querySelector("#registerCompanie").remove() 
            })

            const form = document.createElement("form")

            const inputName = document.createElement("input")
            inputName.name = "name"
            inputName.classList = "input-default input-2"
            inputName.placeholder = "Digite o nome da empresa"

            const inputHour = document.createElement("input")
            inputHour.name = "opening_hours"
            inputHour.classList = "input-default input-2"
            inputHour.placeholder = "Digite o horario de abertura da empresa"

            const inputDesc = document.createElement("input")
            inputDesc.name = "description"
            inputDesc.classList = "input-default input-2"
            inputDesc.placeholder = "Digite a descrição da empresa"

            const select = document.createElement("select")
            select.name = "sector_uuid"
            select.classList = "input-default input-2"

            const option = document.createElement("option")
            option.innerText = "Selecione um setor"
            option.value = null

            const button = document.createElement("button")
            button.innerText = "Criar empresa"
            button.classList = "button-default button-3 button-width"


            select.append(option)

            const sectors = await Api.listSectors()

            sectors.forEach(element =>{
                  select.append(this.createSectorOptions(element))
            })


            form.append(inputName, inputHour, inputDesc, select, button)

            form.addEventListener("submit", (event) => {
                  event.preventDefault()

                  const inputs = [...form]
                  inputs.splice(-1, 1)

                  const obj = {}

                  inputs.forEach(element => {
                        return obj[element.name] = element.value
                  })

                  Api.registerCompanie(obj)
            })

            div.append(h2, btnClose, form)

            section.append(div)

            return document.querySelector("body").append(section)
      }


      static createSectorOptions(sector){
            const option = document.createElement("option")

            option.value = sector.uuid
            option.innerText = sector.description

            return option
      }

      static listenerController(){
            const createCompanie = document.querySelector("#createCompanie")

            createCompanie.addEventListener("click", () => {
                  this.modalCreateCompanie()
            })

            const selectCompanie = document.querySelector("#selectCompanie")

            selectCompanie.addEventListener("change", async (event) => {
                  const target = event.target.value

                  const companies = await Api.listCompanies()

                  companies.forEach(element => {
                        if (element.uuid == target){
                              sessionStorage.setItem("Companie:Id", element.uuid)
                              sessionStorage.setItem("Companie:Name", element.name)
                              
                              window.location.replace("../department/department.html")

                        }
                  })
            })
      }

      static async selectCompanies(){
            const selectCompanies = document.querySelector("#selectCompanie")

            const companies = await Api.listCompanies()

            companies.forEach(element => {
                  selectCompanies.append(this.createCompanieOptions(element))
            })

            return companies
      }

      static createCompanieOptions(companie){
            const option = document.createElement("option")

            option.value = companie.uuid
            option.innerText = companie.name

            return option
      }


      static async companiesBySector(sector = ""){
            const companies = await Api.listCompanies(sector)

            const ul = document.querySelector("#companiesSectors")

            ul.innerHTML = ""

            companies.forEach(async element => {
                  ul.classList.add("no-side-margin")
                  ul.append(await this.companiesCard(element))
            })

            return companies
      }

      static async companiesCard(companie){
            const li = document.createElement("li")
            li.id = companie.uuid
            li.classList = "font-text-1 max-width"

            const h2 = document.createElement("h2")
            h2.innerText = companie.name

            const pHours = document.createElement("p")
            pHours.innerText = `Horário: ${companie.opening_hours}`

            const pDesc = document.createElement("p")
            pDesc.innerText = `Ramo: ${companie.sectors.description}`

            const h4Departments = document.createElement("h4")
            h4Departments.innerText = "Departamentos:"

            const ul = await Department.companieDepartments(companie.uuid)

            li.append(h2, pHours, pDesc, h4Departments, ul)

            return li
      }

      static allMyCompanies(){
            const myCompanies = document.querySelector("#myCompanies")

            const title = document.querySelector("#listTitle")   
            
            const ul = document.querySelector("#companiesSectors")

            myCompanies.addEventListener("click", () => {
                  title.innerText = "Minhas empresas"
                  ul.classList.add("no-side-margin")
                  this.companiesBySector()
            })
      }


      static logout(){
            const btnLogout = document.querySelector("#logout")

            btnLogout.addEventListener("click", () => {
                  localStorage.removeItem("KenzieEmpresas:token")
                  localStorage.removeItem("KenzieEmpresas:uuid")

                  window.location.replace("../../../index.html")
            })
      }


      static buttonBack(){
            const btnBack = document.querySelector("#back")

            btnBack.addEventListener("click", () => {
                  window.location.reload()
            })
      }





}

Dashboard.listAllAvaliableSectors()
Dashboard.listenerController()
Dashboard.selectCompanies()
Dashboard.allMyCompanies()
Dashboard.logout()
Dashboard.buttonBack()
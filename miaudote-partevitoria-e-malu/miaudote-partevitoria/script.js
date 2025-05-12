
document.addEventListener("DOMContentLoaded", () => {
  const setupLoginForm = () => {
    const loginForm = document.querySelector(".login-form")
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        if (!email || !password) {
          alert("Por favor, preencha todos os campos!")
          return
        }

        const button = document.querySelector(".btn-primary")
        const originalText = button.textContent
        button.innerHTML = '<span class="loading-spinner"></span> Entrando...'
        button.disabled = true

        setTimeout(() => {
          alert("Login realizado com sucesso!")

          button.innerHTML = originalText
          button.disabled = false

          window.location.href = "index.html"
        }, 1500)
      })
    }
  }

  const setupFilters = () => {
    const filterButton = document.querySelector(".btn-filter")
    const clearFilterButton = document.querySelector(".btn-clear-filter")
    const catCards = document.querySelectorAll(".cat-card")

    if (filterButton) {
      filterButton.addEventListener("click", () => {
        const selectedIdades = getSelectedFilters("idade")
        const selectedSexos = getSelectedFilters("sexo")
        const selectedCores = getSelectedFilters("cor")
        const selectedSaude = getSelectedFilters("saude")

        const anyFilterSelected =
          selectedIdades.length > 0 || selectedSexos.length > 0 || selectedCores.length > 0 || selectedSaude.length > 0

        if (!anyFilterSelected) {
          alert("Nenhum filtro selecionado!")
          return
        }

        catCards.forEach((card) => {
          const idade = card.getAttribute("data-idade")
          const sexo = card.getAttribute("data-sexo")
          const cor = card.getAttribute("data-cor")
          const saude = card.getAttribute("data-saude")

          const matchesIdade = selectedIdades.length === 0 || selectedIdades.includes(idade)
          const matchesSexo = selectedSexos.length === 0 || selectedSexos.includes(sexo)
          const matchesCor = selectedCores.length === 0 || selectedCores.includes(cor)

  
          const matchesSaude =
            selectedSaude.length === 0 || selectedSaude.every((item) => saude && saude.includes(item))

          if (matchesIdade && matchesSexo && matchesCor && matchesSaude) {
            card.classList.remove("hidden")
          } else {
            card.classList.add("hidden")
          }
        })

      
        updateCatCounter()
      })
    }


    if (clearFilterButton) {
      clearFilterButton.addEventListener("click", () => {
      
        document.querySelectorAll('.filter-option input[type="checkbox"]').forEach((checkbox) => {
          checkbox.checked = false
        })

        
        catCards.forEach((card) => {
          card.classList.remove("hidden")
        })

     
        updateCatCounter()
      })
    }
  }

  const getSelectedFilters = (name) => {
    const checkboxes = document.querySelectorAll(`.filter-option input[name="${name}"]:checked`)
    return Array.from(checkboxes).map((checkbox) => checkbox.value)
  }


  const updateCatCounter = () => {
    const visibleCats = document.querySelectorAll(".cat-card:not(.hidden)").length
    const pageTitle = document.querySelector(".page-title")

    if (pageTitle) {
      pageTitle.textContent = `${visibleCats} Gatinhos Encontrados`
    }
  }


  const setupAdoptButtons = () => {
    const adoptButtons = document.querySelectorAll(".btn-adopt")
    adoptButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const catName = this.closest(".cat-info").querySelector("h3").textContent
        alert(`Você iniciou o processo de adoção para ${catName}! Em breve entraremos em contato.`)
      })
    })
  }

  setupLoginForm()
  setupFilters()
  setupAdoptButtons()
})


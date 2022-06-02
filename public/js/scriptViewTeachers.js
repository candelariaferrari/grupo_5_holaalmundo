window.addEventListener("load", function()  
{ 
  let converIndividual = document.getElementById("conversacion-individual") 
  let converGrupal = document.getElementById("conversacion-grupal") 
  let claseIndividual = document.getElementById("clase-individual")
  let claseGrupal = document.getElementById("clase-grupal")
  let examen = document.getElementById("examenes")
  let tematicas = document.querySelector("#tematicas")
  let niveles = document.querySelector("#niveles")

  converIndividual.addEventListener("click", function() 
  {
    tematicas.classList.toggle("check-active")
  })

  converGrupal.addEventListener("click", function() 
  {
    tematicas.classList.toggle("check-active")
  })

  claseIndividual.addEventListener("click", function() 
  {
    niveles.classList.toggle("check-active")
  })

  claseGrupal.addEventListener("click", function() 
  {
    niveles.classList.toggle("check-active")
  })

  examen.addEventListener("click", function() 
  {
    niveles.classList.toggle("check-active")
  })
})



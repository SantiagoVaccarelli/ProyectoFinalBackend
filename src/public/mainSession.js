const buttonDeslogueo = document.querySelector("#desloguearse");
const divHastaluego = document.querySelector('#hastaluego');
const divTitle =document.querySelector('#title');
const divDesloguearse = document.querySelector('#buttondesloguearse');

buttonDeslogueo.addEventListener("click", (event) =>{
    divHastaluego.innerHTML = `<div style=" text-align: center">Hasta luego</div>`
    divDesloguearse.innerHTML =   ` `
    divTitle.innerHTML = ` `
})
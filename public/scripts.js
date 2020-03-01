document.querySelector('header button').addEventListener("click", function() {
   let form = document.querySelector('.form')

   form.classList.toggle('hide') /* Funcao toogle que 
   verifica se o elemento possui a classe indicada e caso
   sim retira, caso nao adiciona. */
})
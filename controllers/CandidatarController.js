class CandidatarController{
    constructor(containerDescId, containerFormId){
        //this.btnEl = document.getElementById(btnId);
        this.containerDescEl = document.getElementById(containerDescId);
        this.containerFormEl = document.getElementById(containerFormId);
        this.onContinue();
    }

    onContinue(){
        this.containerDescEl.addEventListener('submit', e => {
            e.preventDefault();            
            this.showForm();
        })
    }
}

function showForm(){
    document.querySelector(".container-desc").style.display = "none";
    document.querySelector(".container-form").style.display = "block";
}
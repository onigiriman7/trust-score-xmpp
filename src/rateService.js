

export function rateService(){
    var service = document.createElement("div", {id:"serviceSelection"});
    service.innerText = "Works"
    service.innerHTML = ("<button>Pavan</button> <button>Akash</button> <button>Varun</button>")
    document.body.appendChild(service)
}
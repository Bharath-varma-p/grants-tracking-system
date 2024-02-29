$(document).ready(function () {
    setTimeout(() => {
        document.querySelectorAll("button.dropdown-toggle").forEach(elm => {
            elm.addEventListener("click", e => {
                const input = elm.parentElement.querySelector(".bs-searchbox input")
                if (input) {
                    setTimeout(() => {
                        input.focus()
                    }, 0)
                }
            })
        })
    }, 0)
})
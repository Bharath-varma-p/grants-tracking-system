$(document).ready(() => {
    const buttons = document.querySelectorAll(".bootstrap-select button")

    buttons.forEach(button => {
        button.setAttribute("tabindex", "null")

        button.addEventListener("blur", (e) => {
            e.target.setAttribute("tabindex", "null")
        })
    })
})
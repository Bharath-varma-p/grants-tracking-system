function getNow() {
    const now = new Date()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let year = now.getFullYear()
    let hour = now.getHours()
    let minute = now.getMinutes()

    if (month < 10)
        month = "0" + month.toString()
    if (day < 10)
        day = "0" + day.toString()

    return `${month}/${day}/${year} ${hour}:${minute}`
}
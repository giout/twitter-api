export const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/

    if (regex.test(password)) return true

    return false
}
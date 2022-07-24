const usuarios = []

export function guardarUsuario(usuario) {
    usuarios.push(usuario)
}

export function obtenerUsuarios() {
    return usuarios
}

export function obtenerUsuarioPorNombre(username) {
    const usuario = usuarios.find(u => u.username === username)
    if (!usuario) throw new Error('no existe un usuario con ese nombre')
    return usuario
}

export function asegurarNombreUnico(username) {
    const usuario = usuarios.find(u => u.username === username)
    if (usuario) throw new Error('el nombre de usuario no está disponible')
}

export function obtenerUsuarioPorId(id) {
    const usuario = usuarios.find(u => u.id === id)
    if (!usuario) throw new Error('no existe un usuario con ese id')
    return usuario
}

export function autenticarUsuario(email, password) {
    let usuario = {}
    usuario.email = email
    usuario.password = password
    // try {
    //     usuario = obtenerUsuarioPorNombre(email)
    // } catch (error) {
    //     throw new Error('error de autenticacion')
    // }
    // if (usuario.password !== password) {
    //     throw new Error('error de autenticacion')
    // }
    return usuario
}

export function registrarUsuario(email, password) {
    const usuario = {email, password}
    usuarios.push(usuario)
    console.log(usuario)
    return usuario
}
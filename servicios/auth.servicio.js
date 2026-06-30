import * as authRepositorio from '../repositorios/auth.repositorio.js';

export const guardarTokenRecuperacion = async (email) =>
  authRepositorio.guardarTokenRecuperacion(email);

export const resetearContraseniaConToken = async (token, nuevaContrasenia) =>
  authRepositorio.resetearContraseniaConToken(token, nuevaContrasenia);
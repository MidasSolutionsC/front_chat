// user-validation.util.ts

export default class ValidateMemberUtil{

  public static validateUsersByRoles(
    usuarios: any[], // Cambia el tipo de 'any' según tu modelo de datos de usuario
    roles: { [rol: string]: { require: boolean, min: number, max: number } }
  ): boolean {
    for (const [rol, config] of Object.entries(roles)) {
      const cantidadUsuariosConRol = usuarios.filter(user => user.rol.toString() === rol.toString()).length;
  
      if (config.require && cantidadUsuariosConRol === 0) {
        // Rol requerido pero no hay usuarios con este rol
        return false;
      }
  
      if (cantidadUsuariosConRol < config.min || cantidadUsuariosConRol > config.max) {
        // Cantidad de usuarios con este rol no cumple con los límites establecidos
        return false;
      }
    }
  
    return true; // Todos los criterios de validación pasaron
  }

  public static validateUsersByRoles2(
    usuarios: any[], // Cambia el tipo de 'any' según tu modelo de datos de usuario
    roles: { field: string, require: boolean, min: number, max: number }[]
  ): boolean {
    for (const config of roles) {
      for (const usuario of usuarios) {
        // Utiliza el campo proporcionado para acceder al rol dentro del usuario
        const rol = ValidateMemberUtil.getRol(usuario, config.field);

        if (config.require && !rol) {
          // Rol requerido pero no se encuentra en el usuario
          return false;
        }

        if (rol) {
          const cantidadUsuariosConRol = usuarios.filter(user =>
            ValidateMemberUtil.getRol(user, config.field) === rol).length;

          if (cantidadUsuariosConRol < config.min || cantidadUsuariosConRol > config.max) {
            // Cantidad de usuarios con este rol no cumple con los límites establecidos
            return false;
          }
        }
      }
    }

    return true; // Todos los criterios de validación pasaron
  }

  private static getRol(usuario: any, campo: string): string | null {
    // Divide el campo en partes y recorre la estructura del usuario para obtener el rol
    const partes = campo.split('.');
    let valor = usuario;

    for (const parte of partes) {
      valor = valor[parte];
      if (!valor) {
        return null;
      }
    }

    return valor;
  }


  static validateUsersByRolesFull(
    usuarios: any[], // Cambia el tipo de 'any' según tu modelo de datos de usuario
    roles: { field: string, value: string, require?: boolean, min?: number, max?: number }[]
  ): any {
    const res: any = {success: true, message: ''}

    for (const config of roles) {
      const { field, value, require = false, min = 0, max = 1 } = config;
      const cantidadUsuariosConRol = usuarios.filter(user => ValidateMemberUtil.hasRole(user, field, value)).length;

      if (require && cantidadUsuariosConRol === 0) {
        // Rol requerido pero no hay usuarios con este rol
        res.message = `Rol requerido pero no hay usuarios con este rol: ${value.toUpperCase()}`;
        res.success = false;
        return res;
      }

      if (cantidadUsuariosConRol < min || cantidadUsuariosConRol > max) {
        // Cantidad de usuarios con este rol no cumple con los límites establecidos
        res.message = `La cantidad de usuarios con el rol: ${value.toUpperCase()} no cumple con los límites establecidos, MÍNIMO: ${min} y MÁXIMO: ${max}`;
        res.success = false;
        return res;
      }
    }

    return res; // Todos los criterios de validación pasaron
  }

  private static hasRole(usuario: any, campo: string, valor: string): boolean {
    const partes = campo.split('.');
    let valorRol = usuario;

    for (const parte of partes) {
      valorRol = valorRol[parte];
      if (!valorRol) {
        return false;
      }
    }

    return valorRol.toString() === valor.toString();
  }
}

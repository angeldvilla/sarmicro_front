//Server
export const ENDPOINT = "https://poliza.transargelia.com.co/public/api"; /* -> RUTA PRINCIPAL DE LA API */

//Login & Register
export const LOGIN_URL = "/login"; /* -> RUTA PARA CONCATENAR EL INICIO DE SESIÓN */   
export const REGISTER_URL = "/register"; /* -> RUTA CONCATENAR EL REGISTRO DE UN USUARIO */ 
export const LOGOUT_URL = "/logout"; /* -> RUTA PARA CERRAR LAS SESIONES */
export const USERS_URL = "/usuarios" /* -> RUTA PARA CONSULTAR LOS USUARIOS ACTIVOS (CRUD) */
export const ROLES_URL = "/roles";
export const ROLES_USER_URL = "/role-user";
export const PERMISSIONS_URL = "/permisos";
export const PERMISSIONSANDROLES_URL= "/userpermiso";
export const CLIENTES_URL = "/clientes"; /* -> RUTA PARA CONSULTAR LOS CLIENTES ACTIVOS (CRUD) */
export const POLIZAS_URL = "/poliza"; /* -> RUTA PARA CONSULTAR LAS POLIZAS ACTIVAS (CRUD) */
export const VALOR_POLIZA_URL = "/valor_poliza"; /* -> RUTA PARA CONSULTAR LOS VALORES DE POLIZAS ACTIVAS (CRUD) */
export const CUOTAS_URL = "/cuota" /* -> RUTA PARA CONSULTAR LAS CUOTAS ACTIVAS (CRUD) */
export const PAGOS_URL = "/pago"; /* -> RUTA PARA CONSULTAR LOS PAGOS ACTIVOS (CRUD) */
 export const VEHICULOS_URL = "/vehiculo";  /* -> RUTA PARA CONSULTAR LOS VEHICULOS ACTIVOS (CRUD)  */
export const PARQUE_AUTOMOTOR_URL = "/parque-automotor"; 
export const VEHICULOS_OFF_URL = "/parque-automotor-desvinculado"

export const REGISTER_ALL_POLIZAS = "/registerPolizas"; /* -> RUTA PARA REGISTRAR TODAS LAS POLIZAS DEL PARQUE AUTOMOTORO */
export const REGISTER_OFF_VEHICULOS = "/registra-movil-poliza"
export const DETAIL_POLICYS_URL = "" /* -> RUTA PARA CONSULTAR LOS DETALLES DE UNA POLIZA ELIMINADA */
export const TIPO_POLIZA_URL = "/tipov-poliza";
export const TIPO_EMPRESA_URL = "/tipo-empresa-poliza";
export const NEW_COMPANY = "/compañia";


export const EXPORT_EXCEL_VINCULADO_URL = "https://poliza.transargelia.com.co/public/api/recibos/parque-automotor-vinculado-excel";
export const EXPORT_EXCEL_DESVINCULADO_URL = "https://poliza.transargelia.com.co/public/api/recibos/parque-automotor-desvinculado-excel";

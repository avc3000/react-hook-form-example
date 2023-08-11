import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm();
  const onSubmit = handleSubmit((data) => { console.log(data); reset() });

  return (
    <div className='form'>
      <form onSubmit={onSubmit}>
        <h2>USO DE "REACT HOOK FORM"</h2>
        <label htmlFor="nombre">Nombre</label>
        <input type="text" { ...register("nombre", { required: { value: true, message: "Nombre es requerido."}, minLength: { value: 3, message: "Inserte mínimo 3 caracteres." }, maxLength: { value: 30, message: "Inserte máximo 30 caracteres." } }) } />
        {
          errors.nombre && <span>{errors.nombre.message}</span>
        }
        <label htmlFor="correo">Correo</label>
        <input type="email" { ...register("correo", { required: { value: true, message: "Correo es requerido." }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,4}$/, message: "Correo no válido." } }) } />
        {
          errors.correo && <span>{errors.correo.message}</span>
        }
        <label htmlFor="password">Password</label>
        <input type="password" { ...register("password", { required: { value: true, message: "Password requerido." }, minLength: { value: 6, message: "Debe ingresar mínimo 6 caracteres." } }) } />
        {
          errors.password && <span>{errors.password.message}</span>
        }
        <label htmlFor="confirmarPassword">Confirmar Password</label>
        <input type="password" { ...register("confirmarPassword", { required: { value: true, message: "Confirme password." }, validate: value => value === watch('password') || 'Los passwords no coinciden.' }) } />
        {
          errors.confirmarPassword && <span>{errors.confirmarPassword.message}</span>
        }
        <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
        <input type="date" { ...register("fechaNacimiento", { required: { value: true, message: "Fecha de nacimiento es requerido." }, validate: (value) => { const fechaNacimiento = new Date(value); const fechaActual = new Date(); const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear(); return edad >= 18 || "Debe ser mayor de edad"; } }) } />
        {
          errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>
        }
        <label htmlFor="pais">País</label>
        <select name="pais" id="pais" { ...register("pais") }>
          <option value="mx">México</option>
          <option value="co">Colombia</option>
          <option value="pe">Perú</option>
        </select>
        {
          watch("pais") == "pe" && (
            <>
              <input type="text" style={{ marginTop: "10px" }} placeholder='provincia' { ...register("provincia", { required: { value: true, message: "Provincia es requerida." } }) } />
              {
                errors.provincia && <span>{errors.provincia.message}</span>
              }
            </>
          )
        }
        <label htmlFor="foto">Foto de Perfil</label>
        <input type="file" { ...register("foto") } onChange={(e) => { setValue('fotoUsuario', e.target.files[0].name) }} />
        <div className='terminos'>
          <div>
            <label htmlFor="terminos">Términos y condiciones</label>
          </div>
          <div>
            <input type="checkbox" { ...register("terminos", { required: { value: true, message: "Debe aceptar términos y condiciones." } }) } />
          </div>
        </div>
        {
          errors.terminos && <span>{errors.terminos.message}</span>
        }
        <button>Envíar</button>
      </form>
    </div>
  )
}

export default App;

import { useFormik } from 'formik'
import signIn from './services/signIn'
import * as yup from 'yup'

const signInSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username required'),
  password: yup.string().required('Password required'),
})

const SignInForm = ({ setUser }) => {

  console.log('setUser', setUser)
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: ''
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      const response = await signIn(values)
      const newUser = response.data
      if (newUser) {
        console.log('newUser', newUser)
        setUser(newUser)
        window.localStorage.setItem(
          'loggedMoveBankUser', JSON.stringify(newUser)
        )
      }
    },
    errors: null,
  })

  return (
    <>
      <div>Please sign in</div>
      <form onSubmit={formik.handleSubmit}>
        <label>Name</label>
        <input
          id="name"
          name="name"
          type="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (<div style={{ color: 'red' }}>{formik.errors.name}</div>) : null}

        <label>Username</label>
        <input
          id="username"
          name="username"
          type="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (<div style={{ color: 'red' }}>{formik.errors.username}</div>) : null}

        <label>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (<div style={{ color: 'red' }}>{formik.errors.password}</div>) : null}
        <button type="submit">Submit</button>
      </form>
    </>
  )

}

export default SignInForm
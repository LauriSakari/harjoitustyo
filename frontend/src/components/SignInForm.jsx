
import { useFormik } from 'formik'
import signIn from '../services/signIn'
import * as yup from 'yup'

const signInSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

const SignInForm = ({ setUser, handleNotificationChange }) => {

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: ''
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      try {
        const response = await signIn(values)
        const newUser = response.data
        if (newUser) {
          setUser(newUser)
          window.localStorage.setItem(
            'loggedMoveBankUser', JSON.stringify(newUser)
          )
          handleNotificationChange({ message: `Welcome ${newUser.username}`, type: 'success' })
          setTimeout(() => {
            handleNotificationChange({ message: null })
          }, 4000)
        }
      } catch (error) {
        const errorMessage = error.response.data.error.message
        handleNotificationChange({ message: errorMessage, type: 'error' })
      }

    },
    errors: null,
  })

  return (
    <>
      <p>Please sign in:</p>
      <form onSubmit={formik.handleSubmit}>
        <div className='label-input'>
          <label>Name:</label>
          <input
            id="name"
            name="name"
            type="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </div>
        {formik.touched.name && formik.errors.name ? (<div className='signin-error' >{formik.errors.name}</div>) : null}
        <div className='label-input'>
          <label>Username:</label>
          <input
            id="username"
            name="username"
            type="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
        </div>
        {formik.touched.username && formik.errors.username ? (<div className='signin-error'>{formik.errors.username}</div>) : null}
        <div className='label-input'>
          <label>Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>
        {formik.touched.password && formik.errors.password ? (<div className='signin-error'>{formik.errors.password}</div>) : null}
        <button type="submit">Submit</button>
      </form>
    </>
  )

}

export default SignInForm
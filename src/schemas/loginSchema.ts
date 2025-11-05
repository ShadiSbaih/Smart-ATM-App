import * as yup from 'yup'

export const loginSchema = yup.object().shape({
	username: yup.string().required('Username is required'),
	pin: yup.string().required('PIN is required').min(4, 'PIN must be at least 4 characters'),
})

export type LoginValues = yup.InferType<typeof loginSchema>

export default loginSchema

import * as Yup from 'yup'

export const withdrawSchema = Yup.object().shape({
	amount: Yup.number()
		.required('Amount is required')
		.positive('Amount must be positive')
		.min(1, 'Minimum withdrawal is 1 ILS')
		.max(5000, 'Maximum withdrawal is 5,000 ILS')
		.typeError('Amount must be a valid number'),
	currency: Yup.string().default('ILS'),
})

export type WithdrawFormValues = Yup.InferType<typeof withdrawSchema>

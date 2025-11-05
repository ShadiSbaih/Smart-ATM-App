import * as Yup from 'yup'

export const depositSchema = Yup.object().shape({
	amount: Yup.number()
		.required('Amount is required')
		.positive('Amount must be positive')
		.min(1, 'Minimum deposit is 1 ILS')
		.max(10000, 'Maximum deposit is 10,000 ILS')
		.typeError('Amount must be a valid number'),
	currency: Yup.string().default('ILS'),
})

export type DepositFormValues = Yup.InferType<typeof depositSchema>

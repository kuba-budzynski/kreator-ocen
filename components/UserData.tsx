import React, {useEffect} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import formatDate from '@bitty/format-date';
import Astrisk from '../components/Astrisk'
import ErrorMessage from '../components/ErrorMessage'


const UserData = ({passData, reset}) => {

    const validation = yup.object().shape({
        id: yup.string()
            .max(20, 'Maksymalnie 20 znaków')
            .required('Wymagane pole'),
        name: yup.string()
            .max(50, "Maksymalnie 50 znaków")
            .required('Wymagane pole'),
        surname: yup.string()
            .max(50, 'Maksymalnie 50 znaków')
            .required('Wymagane pole'),
        email: yup.string()
            .required('Wymagane pole')
            .max(100, 'Maksymalnie 100 znaków')
            .email('Podaj poprawny email'),
        phone: yup.string()
            .optional(),
        address1: yup.string()
            .max(255, 'Maksymalnie 50 znaków')
            .required('Wymagane pole'),
        address2: yup.string()
            .max(255, 'Maksymalnie 50 znaków')
            .optional(),
        link: yup.string()
            .optional()
    });

    const formik = useFormik({
        initialValues: {
          id: 'x/' + formatDate(new Date(), 'D/MM/YYYY'),
          name: '',
          surname: '',
          address1: '',
          address2: '',
          email: '',
          phone: '',
          link: ''
        },
        validationSchema: validation,
        onSubmit: () =>  console.log()
      })

    const change = (val) => {
        formik.handleChange(val)
    }

    useEffect(() => {
        if(validation.isValidSync(formik.values)) passData(formik.values)
        else passData({})
    }, [formik.values])

    useEffect(() => {
        formik.resetForm()
    }, [reset])

    return (
        <div className="w-full bg-warmGray-200 px-3 md:px-6 my-6 py-3 md:py-6 rounded-xl">
            <form className="w-full h-full space-x-0 xl:space-x-5 flex flex-col lg:flex-row" autoComplete="off">
            <div className="w-full xl:w-1/2 flex flex-col lg:space-y-4 px-4 ">
                <div className="w-full py-2 lg:py-0">
                    <label className="text-gray-500 text-base pl-3 font-semibold" htmlFor="id">Identyfikator <Astrisk/></label>
                    <input aria-label="Id" name="id" type="text" required 
                        className={`bg-gray-50 px-4 py-3 rounded-md text-sm w-full mt-1 shadow-md text-gray-600 focus:outline-none ${formik.touched.id && formik.errors.id ? "border-2 border-red-600": ""}`}
                        value={formik.values.id} onChange={change} onBlur={formik.handleBlur} placeholder="x/dzień/miejsiąc/rok" autoComplete="off"/>
                    {formik.touched.id && formik.errors.id ? <ErrorMessage msg={formik.errors.id} /> : null}
                </div>

                <div className="w-full py-2 lg:py-0">
                    <label className="text-gray-500 text-base pl-3 font-semibold" htmlFor="name">Imię <Astrisk/></label>
                    <input aria-label="name" name="name" type="text" required 
                        className={`bg-gray-50 px-4 py-3 rounded-md text-sm w-full mt-1 shadow-md text-gray-600 focus:outline-none ${formik.touched.name && formik.errors.name ? "border-2 border-red-600": ""}`}
                        value={formik.values.name} onChange={change} onBlur={formik.handleBlur} placeholder="Adam Robert" autoComplete="off"/>
                    {formik.touched.name && formik.errors.name ? <ErrorMessage msg={formik.errors.name} /> : null}
                </div>

                <div className="w-full py-2 lg:py-0">
                    <label className="text-gray-500 text-base pl-3 font-semibold" htmlFor="surname">Nazwisko <Astrisk/></label>
                    <input aria-label="name" name="surname" type="text" required 
                        className={`bg-gray-50 px-4 py-3 rounded-md text-sm w-full mt-1 shadow-md text-gray-600 focus:outline-none ${formik.touched.surname && formik.errors.surname ? "border-2 border-red-600": ""}`}
                        value={formik.values.surname} onChange={change} onBlur={formik.handleBlur} placeholder="Kowalski" autoComplete="off"/>
                    {formik.touched.surname && formik.errors.surname ? <ErrorMessage msg={formik.errors.surname} /> : null}
                </div>

                <div className="w-full py-2 lg:py-0">
                    <label className="text-gray-500 text-base pl-3 font-semibold" htmlFor="link">Link do doboru</label>
                    <input aria-label="link" name="link" type="text" required 
                        className={`bg-gray-50 px-4 py-3 rounded-md text-sm w-full mt-1 shadow-md text-gray-600 focus:outline-none ${formik.touched.link && formik.errors.link ? "border-2 border-red-600": ""}`}
                        value={formik.values.link} onChange={change} onBlur={formik.handleBlur} placeholder="https://www.cieplowlasciwe.pl/wynik/xxxx" autoComplete="off"/>
                    {formik.touched.link && formik.errors.link ? <ErrorMessage msg={formik.errors.link} /> : null}
                </div>

            </div>
            <div className="w-full xl:w-1/2 flex flex-col lg:space-y-4 px-4">
                <div className="w-full py-2 lg:py-0">
                    <label className="text-gray-500 text-base pl-3 font-semibold" htmlFor="email">Adres email <Astrisk/></label>
                    <input aria-label="email" name="email" type="text" required 
                        className={`bg-gray-50 px-4 py-3 rounded-md text-sm w-full mt-1 shadow-md text-gray-600 focus:outline-none ${formik.touched.email && formik.errors.email ? "border-2 border-red-600": ""}`}
                        value={formik.values.email} onChange={change} onBlur={formik.handleBlur} placeholder="przykładowy@adres.pl"  autoComplete="off"/>
                    {formik.touched.email && formik.errors.email ? <ErrorMessage msg={formik.errors.email} /> : null}
                </div>

                <div className="w-full py-2 lg:py-0">
                    <label className="text-gray-500 text-base pl-3 font-semibold" htmlFor="phone">Telefon</label>
                    <input aria-label="phone" name="phone" type="text" required 
                        className={`bg-gray-50 px-4 py-3 rounded-md text-sm w-full mt-1 shadow-md text-gray-600 focus:outline-none ${formik.touched.phone && formik.errors.phone ? "border-2 border-red-600": ""}`}
                        value={formik.values.phone} onChange={change} onBlur={formik.handleBlur} placeholder="000 000 000" autoComplete="off"/>
                    {formik.touched.phone && formik.errors.phone ? <ErrorMessage msg={formik.errors.phone} /> : null}
                </div>

                <div className="w-full py-2 lg:py-0">
                    <label className="text-gray-500 text-base pl-3 font-semibold" htmlFor="address1">Adres linia 1 <Astrisk/></label>
                    <input aria-label="address1" name="address1" type="text" required 
                        className={`bg-gray-50 px-4 py-3 rounded-md text-sm w-full mt-1 shadow-md text-gray-600 focus:outline-none ${formik.touched.address1 && formik.errors.address1 ? "border-2 border-red-600": ""}`}
                        value={formik.values.address1} onChange={change} onBlur={formik.handleBlur} placeholder="Ulica, numer" autoComplete="off"/>
                    {formik.touched.address1 && formik.errors.address1 ? <ErrorMessage msg={formik.errors.address1} /> : null}
                </div>

                <div className="w-full py-2 lg:py-0">
                    <label className="text-gray-500 text-base pl-3 font-semibold" htmlFor="address2">Adres linia 2</label>
                    <input aria-label="address2" name="address2" type="text" required 
                        className={`bg-gray-50 px-4 py-3 rounded-md text-sm w-full mt-1 shadow-md text-gray-600 focus:outline-none ${formik.touched.address2 && formik.errors.address2 ? "border-2 border-red-600": ""}`}
                        value={formik.values.address2} onChange={change} onBlur={formik.handleBlur} placeholder="Kod pocztowy, miejscowość" autoComplete="off"/>
                    {formik.touched.address2 && formik.errors.address2 ? <ErrorMessage msg={formik.errors.address2} /> : null}
                </div>
            </div>
            </form>
        </div>
    );
}

export default UserData;

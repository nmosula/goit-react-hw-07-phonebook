import { Formik, Field } from 'formik';
import { Form, FormField, ErrorMessage, FrmButton } from './UserForm.styled';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContactsItems } from 'redux/contactsSlice';
import Notiflix from 'notiflix';


const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const numberRegex = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const UserSchema = Yup.object().shape({
    name: Yup.string()
        .matches(nameRegex, {message: "Invalid name", })
        .required('Required'),
    number: Yup.string()
        .matches(numberRegex, {message: "Invalid number. For example '123-45-67'", })
        .required('Required')
});


const UserForm = () => {
    const dispatch = useDispatch();
    const contactsItems = useSelector(getContactsItems);

    
    return (
        <Formik
            initialValues={{
                name: '',
                number: '',
            }}
            validationSchema={UserSchema}
            onSubmit={(data, actions) => {
                if (contactsItems.find(item => item.name.toLowerCase() === data.name.toLowerCase())) {
                    return Notiflix.Notify.failure(`Контакт ${data.name} вже існує`);
                }
                dispatch(addContact(data));
                Notiflix.Notify.success(`Контакт ${data.name} доданий до контактів`);
                
                actions.resetForm();
            }}
        >

            <Form>
                <FormField>
                    Name
                    <Field name="name" />
                    <ErrorMessage name="name" component="span" />
                </FormField>
                <FormField>
                    Tel
                    <Field name="number" />
                    <ErrorMessage name="number" component="span" />
                </FormField>
                <FrmButton type="submit">Add Contact</FrmButton>
            </Form>
    
        </Formik>
    );
    
}

export default UserForm;
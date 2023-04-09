import * as Yup from 'yup';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { selectContactsItems } from 'redux/contactsSlice';
import { addContact } from 'redux/operations';
import { Formik, Field } from 'formik';
import { Form, FormField, ErrorMessage, FrmButton } from './UserForm.styled';


const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
const numberRegex = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const UserSchema = Yup.object().shape({
    name: Yup.string()
        .matches(nameRegex, {message: "Invalid name", })
        .required('Required'),
    phone: Yup.string()
        .matches(numberRegex, {message: "Invalid number. For example '123-45-67'", })
        .required('Required')
});


const UserForm = () => {
    const dispatch = useDispatch();
    const contactsItems = useSelector(selectContactsItems);

    
    return (
        <Formik
            initialValues={{
                name: '',
                phone: '',
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
                    <Field name="phone" />
                    <ErrorMessage name="phone" component="span" />
                </FormField>
                <FrmButton type="submit">Add Contact</FrmButton>
            </Form>
    
        </Formik>
    );
    
}

export default UserForm;
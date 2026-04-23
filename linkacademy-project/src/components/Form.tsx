import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import './form.css';

type FormValues = {
  name: string;
  email: string;
  message: string;
  subscribe: boolean;
};

const initialValues: FormValues = {
  name: '',
  email: '',
  message: '',
  subscribe: false,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nume obligatoriu'),
  email: Yup.string().email('Email invalid').required('Email obligatoriu'),
  message: Yup.string().min(10, 'Trimite cel puțin 10 caractere').required('Mesaj obligatoriu'),
  subscribe: Yup.boolean(),
});

export const Footer: React.FC = () => {
  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    // simulare trimitere către server
    console.log('Form submit', values);
    alert('Mulțumim! Formular trimis.');
    resetForm();
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-info">
          <h4>Contact</h4>
          <p>Adresa - Bucuresti</p>
          <p>Telefon: 0123 456 789</p>
        </div>

        <div className="footer-form">
          <h4>Trimite-ne un mesaj</h4>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <label htmlFor="name">Nume</label>
                <Field id="name" name="name" placeholder="Numele tău" />
                <div className="error"><ErrorMessage name="name" /></div>

                <label htmlFor="email">Email</label>
                <Field id="email" name="email" type="email" placeholder="adresa@exemplu.com" />
                <div className="error"><ErrorMessage name="email" /></div>

                <label htmlFor="message">Mesaj</label>
                <Field id="message" name="message" as="textarea" rows={4} placeholder="Scrie mesajul..." />
                <div className="error"><ErrorMessage name="message" /></div>

                <label className="checkbox">
                  <Field type="checkbox" name="subscribe" />
                  Abonează‑te la newsletter
                </label>

                <button type="submit" disabled={isSubmitting} className="button-primary">Trimite</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Noir Kicks</small>
      </div>
    </footer>
  );
};
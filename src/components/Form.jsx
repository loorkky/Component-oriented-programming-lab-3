import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../styles/form.css';

const schema = yup.object().shape({
  contact: yup
    .string()
    .required('Поле "Мій контакт" є обов’язковим')
    .matches(
      /^((\+?38)?(0\d{9})|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}))$/,
      'Повинен бути номер телефону або email'
    ),
  format: yup.string().required('Поле "Мій формат" є обов’язковим'),
  topic: yup.string().required('Поле "Тема доповіді" є обов’язковим'),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Дані форми:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-group">
        <label htmlFor="name">Прізвище, ім’я</label>
        <input type="text" id="name" {...register('name')} placeholder="Ваше ім’я" />
      </div>

      <div className="form-group">
        <label htmlFor="contact">Мій контакт</label>
        <input type="text" id="contact" {...register('contact')} placeholder="Email або телефон" />
        {errors.contact && <p className="error">{errors.contact.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="format">Мій формат</label>
        <input type="text" id="format" {...register('format')} placeholder="Ваш формат" />
        {errors.format && <p className="error">{errors.format.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="topic">Тема доповіді</label>
        <input type="text" id="topic" {...register('topic')} placeholder="Тема вашої доповіді" />
        {errors.topic && <p className="error">{errors.topic.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="idea">Короткий опис, ідея</label>
        <textarea id="idea" {...register('idea')} placeholder="Опишіть вашу ідею" />
      </div>

      <button type="submit" className="submit-btn">Відправити</button>
    </form>
  );
};

export default Form;

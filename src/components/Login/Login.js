import React, { useState, useEffect } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// создаем компонент для вызова формы
const Login = (props) => {
  // состояние значения инпута с типом email
  const [enteredEmail, setEnteredEmail] = useState('');
  // состояние валидности значения инпута с типом email
  const [emailIsValid, setEmailIsValid] = useState(false);
  // состояние значения инпута с типом password
  const [enteredPassword, setEnteredPassword] = useState('');
  // состояние валидности значения инпута с типом password
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  // состояние, которое проверяет ваилдность формы
  const [formIsValid, setFormIsValid] = useState(false);


// функция, внутри которой устанавливается таймер. Эта функция возвращает функцию (cleanup), внутри которой происходит очистка  до обновления данных.
  useEffect(()=> {
    // debauncing -задержка
    const identifier = setTimeout(()=> {
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      )
    }, 3000)

    // cleanup func
    return () =>{
      clearTimeout(identifier)
    }
    
  },[enteredEmail, enteredPassword])

  // функция, которая меняет значение инпута с типом email с помощью события onChange
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    // форма будет валидна, если в значении почты имеется символ @ и пароль будет больше 6 знаков, без пробелов
    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );
  };

  // функция, которая меняет значение инпута с типом password с помощью события onChange
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    // форма будет валидна, если знчение паролья будет больше 6 знаков, без пробелов и в названии почты имеется символ @ 
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
  };

  // функция, которая проверяет email, с помощью события onBlur(при отведении курсора) который должен включать в себя символ @
  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  // функция, которая проверяет пароль, с помощью события onBlur который длина не меньше шести знаков и без пробелов
  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  // функция обработчика событий, который отправляет форму в бекенд, если логин валидный
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);

  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

//TECH IMPORTS 
import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//COMPONENT IMPORTS 
import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)

    const contactFormHeading=screen.getByRole("heading", /Contact Form/i);

    expect(contactFormHeading).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

   const firstNameInput=screen.getByTestId(/fn/i);

   userEvent.type(firstNameInput, "test");

   expect(firstNameInput).toBeInTheDocument();

   const error=screen.getByTestId(/error/i);

   expect(error).toBeInTheDocument();

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitButton=screen.getByTestId(/submit/i);

    userEvent.click(submitButton);

    const errors=screen.getAllByTestId(/error/i);

    expect(errors[0]).toBeInTheDocument();

    expect(errors[1]).toBeInTheDocument();

    expect(errors[2]).toBeInTheDocument();


});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

    render(<ContactForm />)

    const firstNameInput=screen.getByTestId(/fn/i);

    const lastNameInput=screen.getByTestId(/ln/i);

    const emailInput=screen.getByTestId(/email/i);

    const submitButton=screen.getByTestId(/submit/i);


    userEvent.type(firstNameInput, "Ahmed");

    userEvent.type(lastNameInput, "Ahmed");

    userEvent.click(submitButton);

    const errors=screen.getAllByTestId(/error/i);

    expect(errors[0]).toBeInTheDocument();

    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

    render(<ContactForm />)

    const emailInput=screen.getByTestId(/email/i);

    userEvent.type(emailInput, "test");

    const errors=screen.getAllByTestId(/error/i);

    expect(errors[0]).toBeInTheDocument();

    screen.getByText(/email must be a valid email address/i);


});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

    render(<ContactForm />)

    const lastNameInput=screen.getByTestId(/ln/i);

    const submitButton=screen.getByTestId(/submit/i);

    userEvent.click(submitButton);

    const errors=screen.getAllByTestId(/error/i);

    expect(errors[0]).toBeInTheDocument();

    screen.getByText(/lastName is a required field/i);


    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

    render(<ContactForm />)

    const firstNameInput=screen.getByTestId(/fn/i);

    const lastNameInput=screen.getByTestId(/ln/i);

    const emailInput=screen.getByTestId(/email/i);

    const submitButton=screen.getByTestId(/submit/i);


    userEvent.type(firstNameInput, "Ahmed");

    userEvent.type(lastNameInput, "Ahmed");

    userEvent.type(emailInput, "Ahmed@gmail.com");

    userEvent.click(submitButton);

    expect(screen.getByText(/You Submitted/i)).toBeInTheDocument();
    
});

test('renders all fields text when all fields are submitted.', async () => {

    render(<ContactForm />)

    const firstNameInput=screen.getByTestId(/fn/i);

    const lastNameInput=screen.getByTestId(/ln/i);

    const emailInput=screen.getByTestId(/email/i);

    const messageInput=screen.getByTestId(/message/i);

    const submitButton=screen.getByTestId(/submit/i);


    userEvent.type(firstNameInput, "Ahmed");

    userEvent.type(lastNameInput, "Serag");

    userEvent.type(emailInput, "Ahmed@gmail.com");

    userEvent.type(messageInput, "test");

    userEvent.click(submitButton);

    expect(screen.getByText(/You Submitted/i)).toBeInTheDocument();

    await waitFor(()=>{
    expect(screen.findAllByText(/Ahmed/i));

    expect(screen.findAllByText(/Serag/i));

    expect(screen.findAllByText(/Ahmed@Gmail.com/i));

    expect(screen.findAllByText(/test/i));
    })
    
});
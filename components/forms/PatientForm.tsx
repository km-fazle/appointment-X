"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import { useState } from "react"
import SubmitButton from "../SubmitButton"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patients.actions"
import { UserFormValidation } from "@/lib/validation"

export enum FormFieldType{
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONEINPUT = 'phoneinput',
  CHECKBOX = 'checkbox',
  DATEPICKER = 'datepicker',
  SELECT = 'select',
  SKELETON ='skeleton',
}
 
 const PatientForm =() => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  });

  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
  
    try {
      const userData = { name, email, phone };
      console.log(userData);
  
      const user = await createUser(userData);
  
      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
      <section className ="mb-12 space-y-4">
        <h1 className = "text-white header">Hi there 👋🏻</h1>
        <p className = "text-dark-700">Schedule Your First Appointment.</p>
      </section>
      <CustomFormField
        fieldType ={FormFieldType.INPUT}
        control = {form.control}
        name = "name"
        label = "Full name"
        placeholder = "John Doe"
        iconSrc = "/assets/icons/user.svg"
        iconAlt= "user"
      />
      <CustomFormField
        fieldType ={FormFieldType.INPUT}
        control = {form.control}
        name = "email"
        label = "Email"
        placeholder = "johndoe@example.com"
        iconSrc = "/assets/icons/email.svg"
        iconAlt= "email"
      />
      <CustomFormField
        fieldType ={FormFieldType.PHONEINPUT}
        control = {form.control}
        name = "phone"
        label = "Phone Number"
        placeholder = "555-000-0000"
        iconSrc = "/assets/icons/phone.svg"
        iconAlt= "phone"
      />

      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default PatientForm
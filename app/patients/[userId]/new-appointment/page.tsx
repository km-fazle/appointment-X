import AppointmentForm from "@/components/forms/AppointmentForm";
// import PatientForm from "@/components/forms/PatientForm";
import { getPatient } from "@/lib/actions/patients.actions";
import Image from "next/image";
import * as Sentry from "@sentry/nextjs";
export default async function NewAppoinment({params: {userId}}:SearchParamProps) {
  const patient = await getPatient(userId);

  Sentry.metrics.set("user_view_new-appointment", patient.name);
  return (
     <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
      <div className="sub-container max-w-[860px] flex-1 justify-between">
        <Image
          src="/assets/icons/logo-full.svg"
          height={1000}
          width={1000}
          alt="patient"
          className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2024 AppointmentX</p>
        </div>
      </section>

      <Image
       src = "/assets/images/appointment-img.png"
       height ={500}
       width = {800}
       alt ="appointment"
       className = "side-img max-w-[390px] bg-bottom"
       />
     </div>
  )
}
"use client";

import { useSignUpForm } from "@/view/ui-logic/hooks/use-sign-up-form";

import Input from "../global/input";
import { Button } from "@/view/components/global/button";
import { Modal } from "../global/modal";

import { MailIcon } from "@/view/components/icons/mail-icon";
import { PadlockIcon } from "@/view/components/icons/padlock-icon";
import { ProfileIcon } from "@/view/components/icons/profile-icon";
import { IdIcon } from "@/view/components/icons/id-icon";

export function SignUpForm() {
  const {
    register,
    errors,
    isSubmitting,
    nameWatch,
    cpfWatch,
    emailWatch,
    passwordWatch,
    confirmPasswordWatch,
    formRef,
    showModal,
    handleModal,
    state,
    handleSignUp,
  } = useSignUpForm();

  return (
    <form ref={formRef} action={handleSignUp} className="flex flex-col gap-10">
      <div className="space-y-4 text-gray-light">
        <div className="space-y-2 w-full">
          <label>Nome Completo</label>
          <Input type="text" {...register("name")}>
            <ProfileIcon
              className={
                !!nameWatch
                  ? errors.name
                    ? "fill-red-500"
                    : "fill-indigo-blue"
                  : "fill-orange-light"
              }
            />
          </Input>
          {errors.name && (
            <span className="pt-1 text-xs font-bold text-red-400">
              {errors.name?.message}
            </span>
          )}
        </div>
        <div className="space-y-2 w-full">
          <label>E-mail</label>
          <Input type="email" {...register("email")}>
            <MailIcon
              className={
                !!emailWatch
                  ? errors.email
                    ? "fill-red-500"
                    : "fill-indigo-blue"
                  : "fill-orange-light"
              }
            />
          </Input>
          {errors.email && (
            <span className="pt-1 text-xs font-bold text-red-400">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="space-y-2 w-full">
          <label>CPF</label>
          <Input type="text" {...register("cpf")}>
            <IdIcon
              className={
                !!cpfWatch
                  ? errors.cpf
                    ? "stroke-red-500"
                    : "stroke-indigo-blue"
                  : "stroke-orange-light"
              }
            />
          </Input>
          {errors.cpf && (
            <span className="pt-1 text-xs font-bold text-red-400">
              {errors.cpf?.message}
            </span>
          )}
        </div>
        <div className="space-y-2 w-full">
          <label>Senha</label>
          <Input type="password" {...register("password")}>
            <PadlockIcon
              className={
                !!passwordWatch
                  ? errors.password
                    ? "fill-red-500"
                    : "fill-indigo-blue"
                  : "fill-orange-light"
              }
            />
          </Input>
          {errors.password && (
            <span className="pt-1 text-xs font-bold text-red-400">
              {errors.password?.message}
            </span>
          )}
        </div>
        <div className="space-y-2 w-full">
          <label>Confirme sua Senha</label>
          <Input type="password" {...register("confirmPassword")}>
            <PadlockIcon
              className={
                !!confirmPasswordWatch
                  ? errors.confirmPassword
                    ? "fill-red-500"
                    : "fill-indigo-blue"
                  : "fill-orange-light"
              }
            />
          </Input>
          {errors.confirmPassword && (
            <span className="pt-1 text-xs font-bold text-red-400">
              {errors.confirmPassword?.message}
            </span>
          )}
        </div>
      </div>
      <Button
        content="Cadastrar"
        disabled={isSubmitting}
        className="w-full md:px-[8.25rem] py-[1.125rem] rounded whitespace-nowrap text-center bg-orange-light text-purple-dark hover:bg-orange-300 font-medium disabled:opacity-50"
      />
      {state.error && (
        <Modal
          type="error"
          content="O usuário já possui cadastro."
          isOpen={!showModal}
          onClose={handleModal}
        />
      )}
    </form>
  );
}

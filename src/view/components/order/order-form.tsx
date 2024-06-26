"use client";

import { useCreateOrderForm } from "@/view/ui-logic/hooks/use-create-order-form";

import Input from "../global/input";
import { Button } from "../global/button";

import { OrderIcon } from "../icons/order-icon";
import { ProfileIcon } from "../icons/profile-icon";
import { ArrowSelectIcon } from "../icons/arrow-select-icon";

export function OrderForm() {
  const {
    register,
    errors,
    isSubmitting,
    titleWatch,
    emailWatch,
    emailsSearched,
    formRef,
    isSelectIconOpen,
    handleSelectClick,
    showOptions,
    handleCreateOrderForm,
  } = useCreateOrderForm();

  return (
    <form
      ref={formRef}
      action={handleCreateOrderForm}
      className="flex flex-col gap-10"
    >
      <div className="space-y-4 text-gray-light">
        <div className="space-y-2 w-full">
          <label htmlFor="title">Título do Pedido</label>
          <Input
            type="text"
            placeholder="Digite um título para o pedido"
            {...register("title")}
          >
            <OrderIcon
              className={
                !!titleWatch
                  ? errors.title
                    ? "stroke-red-500"
                    : "stroke-indigo-blue"
                  : "stroke-orange-light"
              }
            />
          </Input>
          {errors.title && (
            <span className="pt-1 text-xs font-bold text-red-400">
              {errors.title?.message}
            </span>
          )}
        </div>

        <div className="space-y-2 w-full">
          <label htmlFor="email">Destinatário</label>
          <div className="flex flex-col justify-between gap-4 relative w-full p-4 rounded bg-gray-light">
            <div className="flex gap-4 items-center w-full">
              <ProfileIcon
                className={
                  !!emailWatch
                    ? errors.email
                      ? "fill-red-500"
                      : "fill-indigo-blue"
                    : "fill-orange-light"
                }
              />
              <span className="border-[1px] bg-bluish-gray rounded w-[1px] h-6" />
              <input
                className="grow min-w-5 outline-none text-base font-normal text-purple-dark bg-gray-light appearance-none"
                {...register("email")}
              />
              <ArrowSelectIcon side={isSelectIconOpen ? "top" : "down"} />
            </div>
            {emailsSearched.length > 0 && showOptions && (
              <ul className="absolute top-16 right-0 w-full p-1 rounded bg-gray-light text-purple-dark">
                {emailsSearched.map((option, idx) => {
                  return (
                    <li
                      key={idx}
                      onClick={() => handleSelectClick(option)}
                      className="p-1.5 hover:bg-orange-light hover:opacity-90 hover:rounded hover:cursor-pointer"
                    >
                      {option}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {errors.email && (
            <span className="pt-1 text-xs font-bold text-red-400">
              {errors.email?.message}
            </span>
          )}
        </div>
      </div>
      <Button
        content="Criar o pedido"
        type="submit"
        disabled={isSubmitting}
        className="w-full md:px-[8.25rem] py-[1.125rem] rounded whitespace-nowrap text-center bg-orange-light text-purple-dark hover:bg-orange-300 font-medium disabled:opacity-50"
      />
    </form>
  );
}

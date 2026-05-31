"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";

import {
  CreateWordInput,
  CreateWordSchema,
  WORD_CLASSES,
} from "../types/word.schema";
import { useAddWord } from "../hooks/useDictionaryQueries";
import FormInput from "@/shared/forms/FormInput";
import { Button } from "@/components/ui/button";
import FormCombobox from "@/shared/forms/FormCombobox";

const AddWordForm = () => {
  const { mutate, isPending } = useAddWord();

  const methods = useForm<CreateWordInput>({
    resolver: zodResolver(CreateWordSchema),
  });

  const onSubmit = (data: CreateWordInput) => {
    mutate(data, { onSuccess: () => methods.reset() });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full mx-auto flex gap-4"
      >
        <FormInput name="title" placeholder="Enter word" />
        <FormInput name="meaning" placeholder="Enter meaning" />
        <FormCombobox
          name="wordClass"
          itemsArray={WORD_CLASSES}
          placeholder="Enter word class"
        />
        <Button
          type="submit"
          disabled={isPending}
          className="bg-sky-700 text-sky-100 hover:!bg-sky-800 hover:!text-sky-50"
        >
          <PlusIcon /> {isPending ? "Adding Word" : "Add Word"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddWordForm;

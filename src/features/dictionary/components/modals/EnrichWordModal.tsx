"use client";

import { useState } from "react";
import { FormProvider, useFieldArray } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash2Icon } from "lucide-react";

import FormCombobox from "@/shared/forms/FormCombobox";
import FormInput from "@/shared/forms/FormInput";
import AppModal from "@/shared/ui/AppModal";
import { WORD_CLASSES, Word } from "../../types/word.schema";
import { useUpdateWord } from "../../hooks/useDictionaryQueries";
import { cn } from "@/lib/utils";
import {
  EnrichWord,
  UpdateWordInput,
  EnrichWordSchema,
} from "../../types/word.schema";
import { Button } from "@/components/ui/button";

const baseWrapperClassName =
  "flex flex-col gap-2 border border-sky-400 p-3 rounded-md";

const UpdateWordModal = ({ word }: { word: Word }) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useUpdateWord();

  const methods = useForm<EnrichWord>({
    resolver: zodResolver(EnrichWordSchema),
    defaultValues: {
      wordClass: word?.wordClass,
      synonyms: word?.synonyms,
      opposites: word?.opposites,
    },
  });

  const {
    fields: synonymFields,
    append: appendSynonym,
    remove: removeSynonym,
  } = useFieldArray({ control: methods.control, name: "synonyms" });

  const {
    fields: oppositeFields,
    append: appendOpposite,
    remove: removeOpposite,
  } = useFieldArray({ control: methods.control, name: "opposites" });

  const onSubmit = (data: UpdateWordInput) => {
    mutate({ id: word._id, data }, { onSuccess: () => setOpen(false) });
  };

  const handleClose = () => {
    methods.reset({
      wordClass: word?.wordClass ?? "",
      synonyms: word?.synonyms ?? [],
      opposites: word?.opposites ?? [],
    });
    setOpen((open) => !open);
  };

  return (
    <AppModal
      modalContentClassName="!w-[550px] !max-w-none h-fit max-h-none overflow-y-auto"
      open={open}
      onClose={handleClose}
      title={`Update ${word?.title}`}
      triggerTitle="Enritch word"
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <div className={cn(baseWrapperClassName)}>
            <span>Synonyms</span>
            {synonymFields.map((field, index) => (
              <div key={field.id} className="flex gap-3">
                <FormInput
                  name={`synonyms.${index}.title`}
                  placeholder="Enter synonym"
                />
                <FormInput
                  name={`synonyms.${index}.meaning`}
                  placeholder="Enter meaning"
                />
                <FormCombobox
                  name={`synonyms.${index}.wordClass`}
                  itemsArray={WORD_CLASSES}
                  placeholder="Enter word class"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="border-gray-400 text-gray-400 w-fit px-4"
                  onClick={() => removeSynonym(index)}
                >
                  <Trash2Icon size={16} strokeWidth={1.5} color="red" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="border-gray-400 text-gray-400 w-fit px-4"
              onClick={() =>
                appendSynonym({ title: "", meaning: "", wordClass: "" })
              }
            >
              <PlusIcon />
            </Button>
          </div>
          <div className={cn(baseWrapperClassName)}>
            <span>Opposites</span>
            {oppositeFields.map((field, index) => (
              <div key={field.id} className="flex gap-3">
                <FormInput
                  name={`opposite.${index}.title`}
                  placeholder="Enter opoosite"
                />
                <FormInput
                  name={`opposites.${index}.meaning`}
                  placeholder="Enter meaning"
                />
                <FormCombobox
                  name={`opposites.${index}.wordClass`}
                  itemsArray={WORD_CLASSES}
                  placeholder="Enter word class"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="border-gray-400 text-gray-400 w-fit px-4"
                  onClick={() => removeOpposite(index)}
                >
                  <Trash2Icon size={16} strokeWidth={1.5} color="red" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="border-gray-400 text-gray-400 w-fit px-4"
              onClick={() =>
                appendOpposite({ title: "", meaning: "", wordClass: "" })
              }
            >
              <PlusIcon />
            </Button>
          </div>

          <div className="space-x-6 flex">
            <Button
              type="submit"
              className="flex-1 !bg-sky-500 text-sky-50 hover:!bg-sky-600"
            >
              Save
            </Button>
            <Button
              type="submit"
              variant="outline"
              className="flex-1 !border-sky-500 text-sky-400 hover:border-sky-500 hover:text-sky-500 hover:!bg-gray-100"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </FormProvider>
    </AppModal>
  );
};

export default UpdateWordModal;

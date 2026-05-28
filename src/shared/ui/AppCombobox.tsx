import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

interface AppComboboxProps {
  itemsArray: string[];
  inputPlaceholder?: string;
  name: string;
  value: string;
  onChange?: (value: string | null) => void;
}

const AppCombobox = ({
  name,
  value = "",
  onChange,
  itemsArray,
  inputPlaceholder,
}: AppComboboxProps) => {
  console.log(value);
  return (
    <Combobox
      items={itemsArray}
      value={value}
      onValueChange={(value: string | null) => onChange?.(value ?? "")}
    >
      <ComboboxInput
        name={name}
        className="w-full
        border-sky-200
        has-[[data-slot=input-group-control]:focus-visible]:ring-0
        has-[[data-slot=input-group-control]:focus-visible]:border-sky-400
        has-[[data-slot=input-group-control]:focus-visible]:shadow-none
      "
        placeholder={inputPlaceholder}
      />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList className="pointer-events-auto z-100">
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default AppCombobox;

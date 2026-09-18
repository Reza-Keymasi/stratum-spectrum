import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

interface ComboboxItem {
  label: string;
  value: string;
}

type SingleProps = {
  multiple?: false;
  value: string;
  onChange?: (value: string | null) => void;
};

type MultipleProps = {
  multiple: true;
  value: string[];
  onChange?: (value: string[]) => void;
};

type AppComboboxProps = (SingleProps | MultipleProps) & {
  itemsArray: ComboboxItem[];
  inputPlaceholder?: string;
  name: string;
  isDisabled?: boolean;
};

const AppCombobox = ({
  name,
  value,
  onChange,
  itemsArray,
  inputPlaceholder,
  multiple = false,
  isDisabled = false,
}: AppComboboxProps) => {
  const anchor = useComboboxAnchor();

  const findItem = (val: string) => {
    return itemsArray.find((item) => item.value === val) ?? null;
  };

  const comboboxValue = multiple
    ? (Array.isArray(value) ? value : [])
        .map(findItem)
        .filter((item): item is ComboboxItem => item !== null)
    : value !== undefined && value !== null && typeof value === "string"
      ? findItem(value)
      : null;

  const handleChange = (val: ComboboxItem | ComboboxItem[] | null) => {
    if (multiple) {
      const arr = Array.isArray(val) ? val : [];
      (onChange as MultipleProps["onChange"])?.(arr.map((item) => item.value));
    } else {
      (onChange as SingleProps["onChange"])?.(
        val ? (val as ComboboxItem).value : null,
      );
    }
  };

  return (
    <Combobox
      items={itemsArray}
      value={comboboxValue}
      multiple={multiple}
      onValueChange={handleChange}
      disabled={isDisabled}
    >
      {multiple ? (
        <ComboboxChips
          ref={anchor}
          className={cn(
            isDisabled ? "bg-gray-100/30" : "bg-gray-200/30",
            "w-full border-none focus-within:border-ring-0 focus-within:ring-0 focus-within:bg-gray-200/50",
          )}
          data-chip="parent"
        >
          <ComboboxValue>
            {(values: ComboboxItem[]) => (
              <>
                {values?.map((v) => (
                  <ComboboxChip className="bg-gray-200" key={v.value}>
                    {v.label}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  className={cn("cursor-pointer disabled:cursor-not-allowed")}
                  placeholder={inputPlaceholder}
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>
      ) : (
        <ComboboxInput
          name={name}
          className="w-full
          border-none bg-gray-200/30 py-6
          has-[[data-slot=input-group-control]:focus-visible]:ring-0
          has-[[data-slot=input-group-control]:focus-visible]:bg-gray-200/50
          has-[[data-slot=input-group-control]:focus-visible]:shadow-none
          cursor-pointer disabled:cursor-not-allowed
        "
          placeholder={inputPlaceholder}
        />
      )}

      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList className="pointer-events-auto z-100">
          {(item: ComboboxItem) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default AppCombobox;

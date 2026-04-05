import { useController, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type TextareaInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName;
  control: Control<TFieldValues>;
  placeholder: string;
  rows?: number;
};

function TextareaInput<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  control,
  placeholder,
  rows = 6,
}: TextareaInputProps<TFieldValues, TName>) {
  const { field, fieldState } = useController({ name, control });
  const { t } = useTranslation();

  return (
    <div>
      <textarea
        {...field}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-none rounded-2xl bg-white px-4 py-3 outline-none"
      />
      {fieldState.error?.message ? (
        <p className="mt-1 text-sm text-red-500">{t(fieldState.error.message)}</p>
      ) : null}
    </div>
  );
}

export default TextareaInput;

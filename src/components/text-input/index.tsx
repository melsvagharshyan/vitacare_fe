import { useController, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

type TextInputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName;
  control: Control<TFieldValues>;
  placeholder: string;
  type?: 'text' | 'email';
};

function TextInput<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  name,
  control,
  placeholder,
  type = 'text',
}: TextInputProps<TFieldValues, TName>) {
  const { field, fieldState } = useController({ name, control });

  return (
    <div>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-white px-4 py-3 outline-none"
      />
      {fieldState.error?.message ? (
        <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
      ) : null}
    </div>
  );
}

export default TextInput;

import type React from "react";

declare module "react-hook-form" {
  export type FieldValues = Record<string, any>;
  export type FieldPath<TFieldValues extends FieldValues = FieldValues> =
    string;

  export type ControllerRenderProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  > = {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: any;
    disabled?: boolean;
    name: TName;
    ref: any;
  };

  export type ControllerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues,
  > = {
    name: TName;
    control?: any;
    defaultValue?: any;
    rules?: any;
    disabled?: boolean;
    render: (props: {
      field: ControllerRenderProps<TFieldValues, TName>;
      fieldState: any;
      formState: any;
    }) => React.ReactElement;
  };

  export type UseFormReturn<TFieldValues extends FieldValues = FieldValues> =
    any;
  export type UseFormProps<TFieldValues extends FieldValues = FieldValues> =
    any;

  export function useForm<TFieldValues extends FieldValues = FieldValues>(
    props?: UseFormProps<TFieldValues>
  ): UseFormReturn<TFieldValues>;

  export const Controller: React.FC<ControllerProps<any, any, any>>;
  export const FormProvider: React.FC<any>;
  export function useFormContext<
    TFieldValues extends FieldValues = FieldValues,
  >(): UseFormReturn<TFieldValues>;
  export function useFormState<TFieldValues extends FieldValues = FieldValues>(
    props?: any
  ): any;
}

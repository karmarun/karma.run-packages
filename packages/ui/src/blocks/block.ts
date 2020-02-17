export interface BlockProps<V = any> {
  readonly value: V
  readonly onChange: React.Dispatch<React.SetStateAction<V>>
  readonly autofocus?: boolean
  readonly disabled?: boolean
}

export type BlockConstructorFn<V = any> = (props: BlockProps<V>) => JSX.Element
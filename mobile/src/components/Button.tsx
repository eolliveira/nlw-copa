import { Button as ButtonNativeBase, Text, IButtonProps } from "native-base";

//extende as propriedades do botão
interface ButtonProps extends IButtonProps {
  title: string;
}

//...rest , passa qual quer outra propriedade do botão como parametro
export const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <ButtonNativeBase {...rest }>
      <Text>{title}</Text>
    </ButtonNativeBase>
  );
};

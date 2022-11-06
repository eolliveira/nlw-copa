import { Button as ButtonNativeBase, Text, IButtonProps } from "native-base";

//extende as propriedades do botão
interface ButtonProps extends IButtonProps {
  title: string;
}

export const Button = ({ title }: ButtonProps) => {
  return (
    <ButtonNativeBase>
      <Text>{title}</Text>
    </ButtonNativeBase>
  );
};

import { Button as ButtonNativeBase, Text, IButtonProps } from "native-base";
import { color } from "native-base/lib/typescript/theme/styled-system";

//extende as propriedades do botão
interface ButtonProps extends IButtonProps {
  title: string;
  type: "PRIMNARY" | "SECONDARY";
}

//...rest , passa qual quer outra propriedade do botão como parametro
export const Button = ({ title, type, ...rest }: ButtonProps) => {
  return (
    <ButtonNativeBase
      w='full'
      h={14}
      bg={type === "SECONDARY" ? "red.500" : "yellow.500"}
      rounded="sm"
      textTransform="uppercase"
      //sobreescreve a propriedade
      _pressed={{
        bg: type === "SECONDARY" ? "red.600" : "yellow.600",
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={type === "SECONDARY" ? "white" : "black"}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
};

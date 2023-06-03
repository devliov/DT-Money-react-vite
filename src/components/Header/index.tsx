import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
// npm install @radix-ui/react-dialog
// usado para melhorar as leituras de tela e unidade dos componentes
import * as Dialog from "@radix-ui/react-dialog";
import LogoImage from "../../assets/Logo(2).svg";
import { NewTransactionModal } from "./NewTransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={LogoImage} />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  );
}

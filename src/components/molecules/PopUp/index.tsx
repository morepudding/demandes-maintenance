import { Button } from "@/components/atoms/Button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "../Dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export type PopUp = {
    titlePopup?: string;
    messagePopup?: string;
};

type PopupProps = React.PropsWithChildren<{
    content: PopUp;
    onProceedChange: (value: boolean) => void;
    disabled?: boolean;
}>;

export default function Popup({
    content,
    onProceedChange,
    children,
    disabled = false,
}: PopupProps) {
    const onValidation = () => {
        onProceedChange(true);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled}>{children}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{content.titlePopup}</DialogTitle>
                    <DialogDescription>
                        {content.messagePopup}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button>ANNULER</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={onValidation}>VALIDER</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

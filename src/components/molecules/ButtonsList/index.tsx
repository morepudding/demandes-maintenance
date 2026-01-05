import { Button } from "@/components/atoms/Button";
import Popup, { PopUp } from "../PopUp";

export type ButtonsActionList = {
    label?: string;
    popupOptions?: PopUp;
    action?: () => void;
    isDisabled?: boolean;
    isDone?: boolean;
    isLoading?: boolean;
};

export default function ButtonsList({
    actions = [],
}: {
    actions: ButtonsActionList[];
}) {
    return (
        <div className="flex gap-3">
            {actions.map(
                ({
                    label,
                    action,
                    popupOptions,
                    isDisabled,
                    isDone,
                    isLoading,
                }) =>
                    label ? (
                        popupOptions ? (
                            <Popup
                                key={`buttons-liste-popup${label}`}
                                content={popupOptions}
                                onProceedChange={action || (() => {})}
                            >
                                {label}
                            </Popup>
                        ) : (
                            <Button
                                key={`buttons-liste-${label}`}
                                disabled={isDisabled}
                                onClick={action}
                                isDone={isDone}
                                isLoading={isLoading}
                            >
                                {label}
                            </Button>
                        )
                    ) : null,
            )}
        </div>
    );
}

import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";

export function InputWithLabel({
    labelContent,
    inputProps,
}: {
    labelContent: string;
    inputProps: React.ComponentProps<typeof Input>;
}) {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">{labelContent}</Label>
            <Input {...inputProps} />
        </div>
    );
}

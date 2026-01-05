import sql from "mssql";

export const formatQueryResult = (
    result: sql.IResult<Record<string, unknown>>,
    unique: boolean = false,
) => {
    if (result.recordset.length > 1 || !unique) {
        return result.recordset.map((recordset) => formatRecordset(recordset));
    }

    if (result.recordset.length === 0) {
        if (unique) {
            return null;
        }
        return [];
    }

    return formatRecordset(result.recordset[0]);
};

const formatRecordset = (recordset: Record<string, unknown>) => {
    return Object.entries(recordset).reduce((acc, [key, value]) => {
        const lowercasedKey = key.toLowerCase();
        let newKey = "";
        for (let i = 0; i < lowercasedKey.length; i++) {
            const character = lowercasedKey[i];
            if (character === "_") {
                newKey = `${newKey}${lowercasedKey[i + 1].toUpperCase()}`;
                i++;
            } else {
                newKey = `${newKey}${character}`;
            }
        }

        acc[newKey] = value;
        return acc;
    }, {} as Record<string, unknown>);
};

export const formatInput = (input: Record<string, unknown>) => {
    return Object.entries(input).reduce((acc, [key, value]) => {
        const snakeCaseKey = key
            .replace(/[A-Z]/g, (letter, index) => {
                return index === 0
                    ? letter.toLowerCase()
                    : `_${letter.toLowerCase()}`;
            })
            .toUpperCase();

        acc[snakeCaseKey] = value;
        return acc;
    }, {} as Record<string, unknown>);
};
